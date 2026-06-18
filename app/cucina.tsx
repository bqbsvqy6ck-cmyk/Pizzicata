import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const supabase = createClient(
  'https://wjbmcqzyismcmxbcndtw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqYm1jcXp5aXNtY214YmNuZHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzgzMjEsImV4cCI6MjA5NzIxNDMyMX0.P8iSPh72J9mJwFbDzAIuaFb5Ouq4Z1xGMvR8I5fvOFw'
);

const C = {
  rosso: '#8B1A1A', crema: '#F2E8D5', oro: '#C8961E',
  marrone: '#3D1A00', grigio: '#8B7355', verde: '#2C5A2E',
};

const STATO_CONFIG = {
  nuovo:      { label: 'Nuovo',       color: C.rosso,  next: 'in_lavorazione', nextLabel: '▶ Prendi in carico' },
  in_lavorazione: { label: 'In lavorazione', color: '#E07B00', next: 'pronto', nextLabel: '✓ Pronto' },
  pronto:     { label: 'Pronto',      color: C.verde,  next: 'consegnato', nextLabel: '✓ Consegnato / Ritirato' },
  consegnato: { label: 'Consegnato',  color: C.grigio, next: null, nextLabel: null },
};

const PAGAMENTO_ICON = { contanti: '💵', pos: '💳', online: '📱' };

export default function Cucina() {
  const [ordini, setOrdini] = useState([]);
  const [filtro, setFiltro] = useState('attivi'); // 'attivi' | 'tutti'

  const carica = async () => {
    const { data } = await supabase
      .from('ordini')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(80);
    if (data) setOrdini(data);
  };

  useEffect(() => {
    carica();
    // Polling ogni 15 secondi
    const interval = setInterval(carica, 15000);
    return () => clearInterval(interval);
  }, []);

  const avanzaStato = async (ordine) => {
    const cfg = STATO_CONFIG[ordine.stato];
    if (!cfg?.next) return;
    await supabase.from('ordini').update({ stato: cfg.next }).eq('id', ordine.id);
    setOrdini(prev => prev.map(o => o.id === ordine.id ? { ...o, stato: cfg.next } : o));
  };

  const ordiniVisibili = filtro === 'attivi'
    ? ordini.filter(o => o.stato !== 'consegnato')
    : ordini;

  return (
    <View style={S.root}>
      {/* Header */}
      <View style={S.header}>
        <Text style={S.headerTitle}>🍕 Cucina Pizzicata</Text>
        <View style={S.filtroRow}>
          <TouchableOpacity
            style={[S.filtroBtn, filtro === 'attivi' && S.filtroBtnOn]}
            onPress={() => setFiltro('attivi')}
          >
            <Text style={[S.filtroBtnText, filtro === 'attivi' && S.filtroBtnTextOn]}>Attivi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[S.filtroBtn, filtro === 'tutti' && S.filtroBtnOn]}
            onPress={() => setFiltro('tutti')}
          >
            <Text style={[S.filtroBtnText, filtro === 'tutti' && S.filtroBtnTextOn]}>Tutti</Text>
          </TouchableOpacity>
          <TouchableOpacity style={S.refreshBtn} onPress={carica}>
            <Text style={{ color: C.oro, fontSize: 18 }}>↻</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={S.scroll} contentContainerStyle={{ paddingBottom: 40 }}>
        {ordiniVisibili.length === 0 && (
          <View style={S.empty}>
            <Text style={{ fontSize: 48 }}>✅</Text>
            <Text style={S.emptyText}>Nessun ordine attivo</Text>
          </View>
        )}

        {ordiniVisibili.map(ordine => {
          const cfg = STATO_CONFIG[ordine.stato] || STATO_CONFIG.nuovo;
          let items = [];
          try { items = JSON.parse(ordine.items || '[]'); } catch {}
          const isAsporto = ordine.tipo === 'asporto' || ordine.indirizzo === 'Asporto';

          return (
            <View key={ordine.id} style={[S.card, { borderLeftColor: cfg.color }]}>
              {/* Top row: stato + orario */}
              <View style={S.cardTop}>
                <View style={[S.statoBadge, { backgroundColor: cfg.color }]}>
                  <Text style={S.statoText}>{cfg.label.toUpperCase()}</Text>
                </View>
                <Text style={S.orario}>{ordine.orario_consegna || '—'}</Text>
              </View>

              {/* Cliente */}
              <View style={S.section}>
                <Text style={S.sectionLabel}>CLIENTE</Text>
                <Text style={S.clienteNome}>{ordine.cliente}</Text>
                <Text style={S.clienteInfo}>📞 {ordine.telefono}</Text>
              </View>

              {/* Consegna */}
              <View style={S.section}>
                <Text style={S.sectionLabel}>CONSEGNA</Text>
                <Text style={S.infoValue}>
                  {isAsporto ? '🏪 Asporto in pizzeria' : `🛵 ${ordine.indirizzo}`}
                </Text>
              </View>

              {/* Pagamento */}
              <View style={S.section}>
                <Text style={S.sectionLabel}>PAGAMENTO</Text>
                <Text style={S.infoValue}>
                  {PAGAMENTO_ICON[ordine.pagamento] || '💵'} {ordine.pagamento
                    ? ordine.pagamento.charAt(0).toUpperCase() + ordine.pagamento.slice(1)
                    : 'Contanti'}
                </Text>
              </View>

              {/* Articoli */}
              <View style={S.section}>
                <Text style={S.sectionLabel}>ARTICOLI</Text>
                {items.map((item, i) => (
                  <View key={i} style={S.itemRow}>
                    <Text style={S.itemQty}>x{item.qty}</Text>
                    <Text style={S.itemName}>{item.name}</Text>
                    <Text style={S.itemPrice}>€ {(item.price * item.qty).toFixed(2)}</Text>
                  </View>
                ))}
                <View style={S.totalRow}>
                  <Text style={S.totalLabel}>TOTALE</Text>
                  <Text style={S.totalValue}>€ {Number(ordine.totale || 0).toFixed(2)}</Text>
                </View>
              </View>

              {/* Note */}
              {ordine.note ? (
                <View style={[S.section, S.noteBox]}>
                  <Text style={S.sectionLabel}>⚠️ NOTE / ALLERGIE</Text>
                  <Text style={S.noteText}>{ordine.note}</Text>
                </View>
              ) : null}

              {/* Bottone avanza stato */}
              {cfg.next && (
                <TouchableOpacity
                  style={[S.actionBtn, { backgroundColor: cfg.color }]}
                  onPress={() => avanzaStato(ordine)}
                >
                  <Text style={S.actionBtnText}>{cfg.nextLabel}</Text>
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
  root: { flex: 1, backgroundColor: '#1A0A00' },
  header: { backgroundColor: C.marrone, paddingTop: 52, paddingHorizontal: 16, paddingBottom: 14, borderBottomWidth: 3, borderBottomColor: C.rosso },
  headerTitle: { fontSize: 22, fontWeight: '900', color: C.crema, marginBottom: 10 },
  filtroRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  filtroBtn: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.08)' },
  filtroBtnOn: { backgroundColor: C.rosso },
  filtroBtnText: { color: 'rgba(242,232,213,0.5)', fontWeight: '700', fontSize: 13 },
  filtroBtnTextOn: { color: 'white' },
  refreshBtn: { marginLeft: 'auto', padding: 6 },
  scroll: { flex: 1, padding: 14 },
  empty: { alignItems: 'center', marginTop: 80, gap: 12 },
  emptyText: { color: C.grigio, fontSize: 16 },
  card: { backgroundColor: '#2A1200', borderRadius: 16, marginBottom: 16, borderLeftWidth: 5, overflow: 'hidden' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, paddingBottom: 8 },
  statoBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  statoText: { color: 'white', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  orario: { color: C.oro, fontSize: 13, fontWeight: '700' },
  section: { paddingHorizontal: 14, paddingVertical: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  sectionLabel: { fontSize: 9, letterSpacing: 2, color: C.grigio, marginBottom: 4, fontWeight: '700' },
  clienteNome: { fontSize: 18, fontWeight: '800', color: C.crema },
  clienteInfo: { fontSize: 13, color: C.oro, marginTop: 2 },
  infoValue: { fontSize: 14, color: C.crema, fontWeight: '600' },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 3 },
  itemQty: { fontSize: 13, fontWeight: '800', color: C.oro, minWidth: 28 },
  itemName: { flex: 1, fontSize: 13, color: C.crema },
  itemPrice: { fontSize: 13, color: C.grigio },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  totalLabel: { fontSize: 12, fontWeight: '800', color: C.grigio, letterSpacing: 1 },
  totalValue: { fontSize: 16, fontWeight: '900', color: C.oro },
  noteBox: { backgroundColor: 'rgba(200,150,30,0.1)', borderRadius: 10, margin: 10, padding: 10 },
  noteText: { fontSize: 13, color: '#FFD080', fontStyle: 'italic' },
  actionBtn: { margin: 14, marginTop: 6, borderRadius: 12, padding: 14, alignItems: 'center' },
  actionBtnText: { color: 'white', fontSize: 14, fontWeight: '800' },
});