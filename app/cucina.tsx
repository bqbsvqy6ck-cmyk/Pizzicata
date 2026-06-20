import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const supabase = createClient(
  'https://wjbmcqzyismcmxbcndtw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqYm1jcXp5aXNtY214YmNuZHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzgzMjEsImV4cCI6MjA5NzIxNDMyMX0.P8iSPh72J9mJwFbDzAIuaFb5Ouq4Z1xGMvR8I5fvOFw'
);

const C = {
  rosso: '#8B1A1A', crema: '#F2E8D5', oro: '#C8961E',
  marrone: '#3D1A00', grigio: '#8B7355', verde: '#2C5A2E',
};

const STATI = {
  nuovo:          { label: 'Nuovo',          color: '#C0392B', next: 'in_lavorazione', nextLabel: '▶  Prendi in carico' },
  in_lavorazione: { label: 'In lavorazione', color: '#D07000', next: 'pronto',          nextLabel: '✓  Pronto per uscita' },
  pronto:         { label: 'Pronto',         color: '#27AE60', next: 'consegnato',      nextLabel: '🛵  Consegnato / Ritirato' },
  consegnato:     { label: 'Consegnato',     color: '#555',    next: null,              nextLabel: null },
};

const PAG_ICON = { contanti: '💵', pos: '💳', online: '📱' };

export default function Cucina() {
  const [ordini, setOrdini] = useState([]);
  const [filtro, setFiltro] = useState('attivi');
  const [aperto, setAperto] = useState(null); // id ordine espanso
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const carica = async () => {
    const { data, error } = await supabase
      .from('ordini')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) { setErrMsg('Errore caricamento: ' + error.message); return; }
    if (data) setOrdini(data);
    setErrMsg('');
  };

  useEffect(() => {
    carica();
    const interval = setInterval(carica, 15000);
    return () => clearInterval(interval);
  }, []);

  const avanzaStato = async (ordine) => {
    const cfg = STATI[ordine.stato];
    if (!cfg?.next) return;
    setLoading(true);
    const { error } = await supabase
      .from('ordini')
      .update({ stato: cfg.next })
      .eq('id', ordine.id);
    setLoading(false);
    if (error) {
      setErrMsg('Errore aggiornamento: ' + error.message);
      return;
    }
    setOrdini(prev => prev.map(o => o.id === ordine.id ? { ...o, stato: cfg.next } : o));
  };

  const visibili = filtro === 'attivi'
    ? ordini.filter(o => o.stato !== 'consegnato')
    : ordini;

  return (
    <View style={S.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.marrone} />

      {/* HEADER */}
      <View style={S.header}>
        <Text style={S.headerTitle}>🍕 Cucina Pizzicata</Text>
        <View style={S.headerRow}>
          <View style={S.filtroRow}>
            <TouchableOpacity
              style={[S.filtroBtn, filtro === 'attivi' && S.filtroBtnOn]}
              onPress={() => setFiltro('attivi')}
            >
              <Text style={[S.filtroBtnTxt, filtro === 'attivi' && S.filtroBtnTxtOn]}>
                Attivi ({ordini.filter(o => o.stato !== 'consegnato').length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[S.filtroBtn, filtro === 'tutti' && S.filtroBtnOn]}
              onPress={() => setFiltro('tutti')}
            >
              <Text style={[S.filtroBtnTxt, filtro === 'tutti' && S.filtroBtnTxtOn]}>
                Tutti ({ordini.length})
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={S.refreshBtn} onPress={carica}>
            <Text style={{ color: C.oro, fontSize: 22 }}>↻</Text>
          </TouchableOpacity>
        </View>
        {errMsg ? <Text style={S.errMsg}>{errMsg}</Text> : null}
      </View>

      {/* LISTA ORDINI */}
      <ScrollView style={S.scroll} contentContainerStyle={{ paddingBottom: 40 }}>
        {visibili.length === 0 && (
          <View style={S.empty}>
            <Text style={{ fontSize: 52 }}>✅</Text>
            <Text style={S.emptyTxt}>Nessun ordine attivo</Text>
          </View>
        )}

        {visibili.map(ordine => {
          const cfg = STATI[ordine.stato] || STATI.nuovo;
          const isAperto = aperto === ordine.id;
          let items = [];
          try { items = JSON.parse(ordine.items || '[]'); } catch {}
          const isAsporto = ordine.tipo === 'asporto' || ordine.indirizzo === 'Asporto';
          const orarioLabel = ordine.orario_consegna || '—';
          const oraArrivo = ordine.created_at
            ? new Date(ordine.created_at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
            : '';
          const pagLabel = ordine.pagamento
            ? ordine.pagamento.charAt(0).toUpperCase() + ordine.pagamento.slice(1)
            : 'Contanti';

          return (
            <View key={ordine.id} style={[S.card, { borderLeftColor: cfg.color }]}>

              {/* HEADER CARD — sempre visibile, tap per espandere */}
              <TouchableOpacity
                style={S.cardHeader}
                onPress={() => setAperto(isAperto ? null : ordine.id)}
                activeOpacity={0.8}
              >
                <View style={S.cardHeaderLeft}>
                  <View style={[S.statoBadge, { backgroundColor: cfg.color }]}>
                    <Text style={S.statoTxt}>{cfg.label.toUpperCase()}</Text>
                  </View>
                  <Text style={S.cardNome}>{ordine.cliente}</Text>
                  <Text style={S.cardOrario}>{orarioLabel}</Text>
                  {oraArrivo ? <Text style={{ fontSize: 12, color: C.grigio, marginTop: 2 }}>Ordine ricevuto: {oraArrivo}</Text> : null}
                </View>
                <View style={S.cardHeaderRight}>
                  <Text style={S.cardTotale}>€ {Number(ordine.totale || 0).toFixed(2)}</Text>
                  <Text style={S.cardTipo}>{isAsporto ? '🏪 ASPORTO' : '🛵 DOMICILIO'}</Text>
                  <Text style={{ color: C.oro, fontSize: 18, marginTop: 6 }}>{isAperto ? '▲' : '▼'}</Text>
                </View>
              </TouchableOpacity>

              {/* DETTAGLI — visibili solo se aperto */}
              {isAperto && (
                <View style={S.cardBody}>

                  {/* Cliente */}
                  <View style={S.sezione}>
                    <Text style={S.sezioneLabel}>CLIENTE</Text>
                    <Text style={S.infoVal}>👤 {ordine.cliente}</Text>
                    <Text style={S.infoVal}>📞 {ordine.telefono}</Text>
                  </View>

                  {/* Consegna */}
                  <View style={S.sezione}>
                    <Text style={S.sezioneLabel}>CONSEGNA</Text>
                    <Text style={S.infoVal}>
                      {isAsporto ? '🏪 Ritiro in pizzeria' : '🛵 ' + ordine.indirizzo}
                    </Text>
                    <Text style={S.infoVal}>🕐 {orarioLabel}</Text>
                  </View>

                  {/* Pagamento */}
                  <View style={S.sezione}>
                    <Text style={S.sezioneLabel}>PAGAMENTO</Text>
                    <Text style={S.infoVal}>
                      {PAG_ICON[ordine.pagamento] || '💵'} {pagLabel}
                    </Text>
                  </View>

                  {/* Articoli */}
                  <View style={S.sezione}>
                    <Text style={S.sezioneLabel}>ARTICOLI</Text>
                    {items.map((item, i) => (
                      <View key={i} style={S.itemRow}>
                        <Text style={S.itemQty}>×{item.qty}</Text>
                        <Text style={S.itemName}>{item.name}</Text>
                        <Text style={S.itemPrice}>€ {(item.price * item.qty).toFixed(2)}</Text>
                      </View>
                    ))}
                    <View style={S.totaleRow}>
                      <Text style={S.totaleLbl}>TOTALE</Text>
                      <Text style={S.totaleVal}>€ {Number(ordine.totale || 0).toFixed(2)}</Text>
                    </View>
                  </View>

                  {/* Note / allergie */}
                  {ordine.note ? (
                    <View style={S.noteBox}>
                      <Text style={S.sezioneLabel}>⚠️ NOTE / ALLERGIE</Text>
                      <Text style={S.noteTxt}>{ordine.note}</Text>
                    </View>
                  ) : null}

                  {/* Bottone avanza stato */}
                  {cfg.next && (
                    <TouchableOpacity
                      style={[S.actionBtn, { backgroundColor: cfg.color }, loading && { opacity: 0.6 }]}
                      onPress={() => avanzaStato(ordine)}
                      disabled={loading}
                    >
                      <Text style={S.actionBtnTxt}>
                        {loading ? 'Aggiornamento...' : cfg.nextLabel}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {!cfg.next && (
                    <View style={[S.actionBtn, { backgroundColor: '#333' }]}>
                      <Text style={S.actionBtnTxt}>✓ Ordine completato</Text>
                    </View>
                  )}
                </View>
              )}

              {/* Bottone rapido anche da chiuso (solo per "nuovo") */}
              {!isAperto && ordine.stato === 'nuovo' && (
                <TouchableOpacity
                  style={[S.quickBtn, { backgroundColor: STATI.nuovo.color }]}
                  onPress={() => avanzaStato(ordine)}
                  disabled={loading}
                >
                  <Text style={S.quickBtnTxt}>▶ Prendi in carico</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#140800' },
  header: { backgroundColor: C.marrone, paddingTop: 52, paddingHorizontal: 16, paddingBottom: 14, borderBottomWidth: 3, borderBottomColor: C.rosso },
  headerTitle: { fontSize: 22, fontWeight: '900', color: C.crema, marginBottom: 10 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  filtroRow: { flexDirection: 'row', gap: 8 },
  filtroBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.08)' },
  filtroBtnOn: { backgroundColor: C.rosso },
  filtroBtnTxt: { color: 'rgba(242,232,213,0.45)', fontWeight: '700', fontSize: 13 },
  filtroBtnTxtOn: { color: 'white' },
  refreshBtn: { padding: 6 },
  errMsg: { color: '#FF6B6B', fontSize: 12, marginTop: 8, fontWeight: '600' },
  scroll: { flex: 1, padding: 12 },
  empty: { alignItems: 'center', marginTop: 80, gap: 14 },
  emptyTxt: { color: C.grigio, fontSize: 16 },

  // Card
  card: { backgroundColor: '#221000', borderRadius: 16, marginBottom: 14, borderLeftWidth: 5, overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 14 },
  cardHeaderLeft: { flex: 1, gap: 4 },
  cardHeaderRight: { alignItems: 'flex-end', gap: 2 },
  statoBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
  statoTxt: { color: 'white', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  cardNome: { fontSize: 18, fontWeight: '800', color: C.crema, marginTop: 4 },
  cardOrario: { fontSize: 12, color: C.oro },
  cardTotale: { fontSize: 20, fontWeight: '900', color: C.oro },
  cardTipo: { fontSize: 16, fontWeight: '900', color: C.crema, marginTop: 4, backgroundColor: 'rgba(0,0,0,0.25)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },

  // Body espanso
  cardBody: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  sezione: { padding: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  sezioneLabel: { fontSize: 9, letterSpacing: 2, color: C.grigio, marginBottom: 6, fontWeight: '700' },
  infoVal: { fontSize: 14, color: C.crema, fontWeight: '600', marginBottom: 3 },

  // Articoli
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, gap: 8 },
  itemQty: { fontSize: 14, fontWeight: '800', color: C.oro, minWidth: 28 },
  itemName: { flex: 1, fontSize: 13, color: C.crema },
  itemPrice: { fontSize: 13, color: C.grigio },
  totaleRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  totaleLbl: { fontSize: 11, fontWeight: '800', color: C.grigio, letterSpacing: 1 },
  totaleVal: { fontSize: 18, fontWeight: '900', color: C.oro },

  // Note
  noteBox: { margin: 14, marginTop: 0, backgroundColor: 'rgba(200,150,30,0.1)', borderRadius: 10, padding: 12 },
  noteTxt: { fontSize: 13, color: '#FFD080', fontStyle: 'italic', marginTop: 4 },

  // Bottoni
  actionBtn: { margin: 14, marginTop: 6, borderRadius: 12, padding: 16, alignItems: 'center' },
  actionBtnTxt: { color: 'white', fontSize: 15, fontWeight: '800' },
  quickBtn: { marginHorizontal: 14, marginBottom: 14, borderRadius: 10, padding: 12, alignItems: 'center' },
  quickBtnTxt: { color: 'white', fontSize: 13, fontWeight: '700' },
});