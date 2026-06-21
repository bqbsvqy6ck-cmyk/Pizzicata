import { createClient } from '@supabase/supabase-js';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const supabase = createClient(
  'https://wjbmcqzyismcmxbcndtw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqYm1jcXp5aXNtY214YmNuZHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzgzMjEsImV4cCI6MjA5NzIxNDMyMX0.P8iSPh72J9mJwFbDzAIuaFb5Ouq4Z1xGMvR8I5fvOFw'
);

const C = {
  rosso: '#8B1A1A', rossoScuro: '#5C0F0F', crema: '#F2E8D5', cremaScuro: '#E8D5B0',
  oro: '#C8961E', oroChiaro: '#E8B84B', marrone: '#3D1A00', grigio: '#8B7355', verde: '#2C5A2E',
};
const FONT_TITOLO = "'Fraunces', Georgia, serif";
const FONT_TESTO = "'Inter', -apple-system, sans-serif";

const STATI = {
  nuovo:          { label: 'Nuovo',          color: '#C0392B', next: 'in_lavorazione', nextLabel: '▶  Prendi in carico' },
  in_lavorazione: { label: 'In lavorazione', color: '#D07000', next: 'pronto',          nextLabel: '🛵  In consegna' },
  pronto:         { label: 'Pronto',         color: '#27AE60', next: 'consegnato',      nextLabel: '🛵  Consegnato / Ritirato' },
  consegnato:     { label: 'Consegnato',     color: '#555',    next: null,              nextLabel: null },
  rifiutato:      { label: 'Rifiutato',      color: '#8B0000', next: null,              nextLabel: null },
};

// Livelli di traffico: colore + tempo di attesa comunicato al cliente
const TRAFFICO_INFO = {
  verde:  { label: 'Poco traffico',   tempo: '15-20 min', color: '#27AE60', emoji: '🟢' },
  giallo: { label: 'Traffico medio',  tempo: '30-40 min', color: '#E8A317', emoji: '🟡' },
  rosso:  { label: 'Traffico alto',   tempo: '60 min e più', color: '#C0392B', emoji: '🔴' },
};

// Livelli di traffico/attesa che la cucina può impostare
const TRAFFICO = {
  verde:  { label: 'Poco traffico',  tempo: '15-20 min', color: '#27AE60', emoji: '🟢' },
  giallo: { label: 'Traffico medio', tempo: '30-40 min', color: '#E8A800', emoji: '🟡' },
  rosso:  { label: 'Molto traffico', tempo: '60 min e più', color: '#C0392B', emoji: '🔴' },
};

const PAG_ICON = { contanti: '💵', pos: '💳', online: '📱' };

export default function Cucina() {
  const [ordini, setOrdini] = useState([]);
  const [filtro, setFiltro] = useState('attivi');
  const [aperto, setAperto] = useState(null); // id ordine espanso
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [suonoAttivo, setSuonoAttivo] = useState(false);
  const [nuovoArrivato, setNuovoArrivato] = useState(false); // per il lampeggio visivo
  const [traffico, setTraffico] = useState('verde'); // livello traffico locale
  const [traffico, setTraffico] = useState('verde'); // verde/giallo/rosso - mole di lavoro
  const idsNuoviPrec = useRef(null); // set degli id "nuovi" al giro precedente
  const audioCtxRef = useRef(null);

  // Suono campanello generato senza file audio (Web Audio API)
  const suonaCampanello = () => {
    try {
      if (!audioCtxRef.current) {
        const AC = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AC();
      }
      const ctx = audioCtxRef.current;
      // tre note brevi tipo "din-don-din"
      const note = [880, 1175, 988];
      note.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(ctx.destination);
        const t0 = ctx.currentTime + i * 0.18;
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(0.4, t0 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
        osc.start(t0);
        osc.stop(t0 + 0.18);
      });
    } catch (e) {}
  };

  const attivaSuono = () => {
    // Sblocca l'audio (i browser lo bloccano finché l'utente non interagisce)
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AC();
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
    } catch (e) {}
    setSuonoAttivo(true);
    suonaCampanello(); // beep di conferma
  };

  const carica = async () => {
    const { data, error } = await supabase
      .from('ordini')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) { setErrMsg('Errore caricamento: ' + error.message); return; }
    if (data) {
      idsNuoviPrec.current = new Set(data.filter(o => o.stato === 'nuovo').map(o => o.id));
      setOrdini(data);
    }
    setErrMsg('');
  };

  useEffect(() => {
    carica();
    const interval = setInterval(carica, 15000);
    return () => clearInterval(interval);
  }, []);

  // Carica il livello di traffico attuale dal database
  const caricaTraffico = async () => {
    const { data } = await supabase.from('stato_locale').select('traffico').eq('id', 1).single();
    if (data && data.traffico) setTraffico(data.traffico);
  };
  useEffect(() => {
    caricaTraffico();
    const t = setInterval(caricaTraffico, 30000); // riallinea ogni 30s
    return () => clearInterval(t);
  }, []);

  // Cambia il livello di traffico (lo vedrà anche il cliente nella sua home)
  const cambiaTraffico = async (livello) => {
    setTraffico(livello); // aggiorna subito a schermo
    const { error } = await supabase
      .from('stato_locale')
      .update({ traffico: livello, aggiornato_il: new Date().toISOString() })
      .eq('id', 1);
    if (error) setErrMsg('Errore traffico: ' + error.message);
  };

  // Carica il livello di traffico attuale dal database
  const caricaTraffico = async () => {
    const { data } = await supabase.from('impostazioni').select('valore').eq('id', 'traffico').single();
    if (data?.valore) setTraffico(data.valore);
  };
  useEffect(() => {
    caricaTraffico();
    const t = setInterval(caricaTraffico, 30000);
    return () => clearInterval(t);
  }, []);

  // Imposta un nuovo livello di traffico (lo vedono anche i clienti)
  const cambiaTraffico = async (livello) => {
    setTraffico(livello); // aggiorna subito a schermo
    await supabase.from('impostazioni').update({ valore: livello, updated_at: new Date().toISOString() }).eq('id', 'traffico');
  };

  // Conta gli ordini ancora da accettare (stato 'nuovo')
  const ordiniNuovi = ordini.filter(o => o.stato === 'nuovo');
  const ceNuoviDaAccettare = ordiniNuovi.length > 0;

  // Suono che si RIPETE finché ci sono ordini nuovi non ancora accettati.
  // Si ferma da solo appena prendi in carico (o rifiuti) tutti gli ordini nuovi.
  useEffect(() => {
    if (!suonoAttivo || !ceNuoviDaAccettare) return;
    suonaCampanello(); // suona subito
    const t = setInterval(suonaCampanello, 3000); // e ripete ogni 3 secondi
    return () => clearInterval(t);
  }, [suonoAttivo, ceNuoviDaAccettare, ordiniNuovi.length]);

  // Lampeggio visivo attivo finché ci sono ordini nuovi non accettati
  useEffect(() => {
    if (!ceNuoviDaAccettare) { setNuovoArrivato(false); return; }
    setNuovoArrivato(true);
    const t = setInterval(() => setNuovoArrivato(v => !v), 700); // lampeggia
    return () => clearInterval(t);
  }, [ceNuoviDaAccettare]);

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

  const rifiutaOrdine = async (ordine) => {
    const conferma = window.confirm(`Rifiutare l'ordine di ${ordine.cliente || 'cliente'}?\n\nL'ordine verrà segnato come rifiutato.`);
    if (!conferma) return;
    setLoading(true);
    const { error } = await supabase
      .from('ordini')
      .update({ stato: 'rifiutato' })
      .eq('id', ordine.id);
    setLoading(false);
    if (error) { setErrMsg('Errore: ' + error.message); return; }
    setOrdini(prev => prev.map(o => o.id === ordine.id ? { ...o, stato: 'rifiutato' } : o));
  };

  const cambiaOrario = async (ordine) => {
    const attuale = ordine.orario_consegna || '';
    const nuovo = window.prompt('Nuovo orario di consegna/ritiro per questo ordine:', attuale);
    if (nuovo === null) return; // annullato
    const val = nuovo.trim();
    if (!val) return;
    setLoading(true);
    const { error } = await supabase
      .from('ordini')
      .update({ orario_consegna: val })
      .eq('id', ordine.id);
    setLoading(false);
    if (error) {
      setErrMsg('Errore aggiornamento orario: ' + error.message);
      return;
    }
    setOrdini(prev => prev.map(o => o.id === ordine.id ? { ...o, orario_consegna: val } : o));
  };

  // Reset automatico giornaliero: gli ordini già usciti (consegnati o rifiutati)
  // più vecchi di 24 ore non vengono più mostrati. La lista si "pulisce" da sola ogni giorno.
  const ORA = Date.now();
  const VENTIQUATTRORE = 24 * 60 * 60 * 1000;
  const nonVecchio = (o) => {
    // gli ordini ancora in lavorazione restano sempre visibili
    if (o.stato !== 'consegnato' && o.stato !== 'rifiutato') return true;
    // quelli usciti spariscono dopo 24h
    const t = new Date(o.created_at).getTime();
    if (isNaN(t)) return true;
    return (ORA - t) < VENTIQUATTRORE;
  };

  const visibili = filtro === 'attivi'
    ? ordini.filter(o => o.stato !== 'consegnato' && o.stato !== 'rifiutato')
    : ordini.filter(nonVecchio);

  return (
    <View style={S.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.marrone} />

      {/* HEADER */}
      <View style={[S.header, { background: 'radial-gradient(circle at 85% -30%, rgba(232,184,75,0.4), transparent 55%), linear-gradient(135deg, #8B1A1A 0%, #5C0F0F 100%)' }]}>
        <Text style={S.headerTitle}>🍕 Cucina Pizzicata</Text>
        <View style={S.headerRow}>
          <View style={S.filtroRow}>
            <TouchableOpacity
              style={[S.filtroBtn, filtro === 'attivi' && S.filtroBtnOn]}
              onPress={() => setFiltro('attivi')}
            >
              <Text style={[S.filtroBtnTxt, filtro === 'attivi' && S.filtroBtnTxtOn]}>
                Attivi ({ordini.filter(o => o.stato !== 'consegnato' && o.stato !== 'rifiutato').length})
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
          <TouchableOpacity
            style={[S.refreshBtn, { marginLeft: 8, backgroundColor: suonoAttivo ? 'rgba(45,90,39,0.4)' : 'rgba(192,57,43,0.35)' }]}
            onPress={attivaSuono}
          >
            <Text style={{ fontSize: 20 }}>{suonoAttivo ? '🔔' : '🔕'}</Text>
          </TouchableOpacity>
        </View>
        {!suonoAttivo && (
          <TouchableOpacity onPress={attivaSuono} style={{ marginTop: 8, backgroundColor: 'rgba(200,150,30,0.18)', borderRadius: 8, padding: 8 }}>
            <Text style={{ color: C.oro, fontSize: 12, fontWeight: '700', textAlign: 'center' }}>🔔 Tocca per attivare il suono dei nuovi ordini</Text>
          </TouchableOpacity>
        )}
        {errMsg ? <Text style={S.errMsg}>{errMsg}</Text> : null}

        {/* Selettore traffico / tempo di attesa (lo vedono i clienti) */}
        <View style={{ marginTop: 12, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 10 }}>
          <Text style={{ fontFamily: FONT_TESTO, color: 'rgba(242,232,213,0.7)', fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 8 }}>⏱️ TEMPO DI ATTESA (visibile ai clienti)</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {Object.keys(TRAFFICO).map(liv => {
              const t = TRAFFICO[liv];
              const attivo = traffico === liv;
              return (
                <TouchableOpacity
                  key={liv}
                  onPress={() => cambiaTraffico(liv)}
                  style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, backgroundColor: attivo ? t.color : 'rgba(255,255,255,0.08)', borderWidth: attivo ? 0 : 1, borderColor: 'rgba(255,255,255,0.15)' }}
                >
                  <Text style={{ fontSize: 18 }}>{t.emoji}</Text>
                  <Text style={{ fontFamily: FONT_TESTO, color: attivo ? '#fff' : 'rgba(242,232,213,0.7)', fontSize: 11, fontWeight: '800', marginTop: 2 }}>{t.tempo}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {ceNuoviDaAccettare && (
        <View style={{ backgroundColor: nuovoArrivato ? '#C0392B' : '#8B0000', padding: 16, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '900' }}>
            🔔 {ordiniNuovi.length === 1 ? '1 NUOVO ORDINE DA ACCETTARE!' : `${ordiniNuovi.length} NUOVI ORDINI DA ACCETTARE!`}
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 2 }}>Premi "Prendi in carico" o "Rifiuta" per fermare l'allarme</Text>
        </View>
      )}

      {/* CONTROLLO TRAFFICO */}
      <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
        <Text style={{ fontFamily: FONT_TESTO, fontSize: 11, fontWeight: '800', letterSpacing: 1, color: C.oro, marginBottom: 8 }}>⏱️ TEMPO DI ATTESA MOSTRATO AI CLIENTI</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {['verde', 'giallo', 'rosso'].map(liv => {
            const info = TRAFFICO_INFO[liv];
            const attivo = traffico === liv;
            return (
              <TouchableOpacity
                key={liv}
                onPress={() => cambiaTraffico(liv)}
                style={{
                  flex: 1, borderRadius: 12, padding: 10, alignItems: 'center',
                  backgroundColor: attivo ? info.color : 'rgba(255,255,255,0.06)',
                  borderWidth: 2, borderColor: attivo ? info.color : 'rgba(255,255,255,0.1)',
                }}
              >
                <Text style={{ fontSize: 20 }}>{info.emoji}</Text>
                <Text style={{ fontFamily: FONT_TESTO, fontSize: 12, fontWeight: '800', color: attivo ? '#fff' : C.grigio, marginTop: 2 }}>{info.tempo}</Text>
                <Text style={{ fontFamily: FONT_TESTO, fontSize: 9, color: attivo ? 'rgba(255,255,255,0.8)' : C.grigio, marginTop: 1 }}>{info.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
            <View key={ordine.id} style={[S.card, { borderLeftColor: cfg.color, background: 'linear-gradient(160deg, #2e1808 0%, #1d0e02 100%)' }]}>

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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                      <Text style={S.infoVal}>🕐 {orarioLabel}</Text>
                      <TouchableOpacity onPress={() => cambiaOrario(ordine)} style={{ backgroundColor: 'rgba(200,150,30,0.2)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 }}>
                        <Text style={{ color: C.oro, fontSize: 12, fontWeight: '800' }}>✏️ Modifica orario</Text>
                      </TouchableOpacity>
                    </View>
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
                        <View style={{ flex: 1 }}>
                          <Text style={S.itemName}>{item.name}</Text>
                          {item.integrale ? <Text style={S.itemExtra}>+ Impasto integrale</Text> : null}
                          {item.aggiunte && item.aggiunte.length > 0 ? (
                            <Text style={S.itemExtra}>+ {item.aggiunte.join(', ')}</Text>
                          ) : null}
                        </View>
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

                  {/* Bottone avanza stato + Rifiuta */}
                  {cfg.next && (
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      <TouchableOpacity
                        style={[S.actionBtn, { backgroundColor: cfg.color, flex: 1, margin: 0 }, loading && { opacity: 0.6 }]}
                        onPress={() => avanzaStato(ordine)}
                        disabled={loading}
                      >
                        <Text style={S.actionBtnTxt}>
                          {loading ? 'Aggiornamento...' : cfg.nextLabel}
                        </Text>
                      </TouchableOpacity>
                      {(ordine.stato === 'nuovo' || ordine.stato === 'in_lavorazione') && (
                        <TouchableOpacity
                          style={[S.actionBtn, { backgroundColor: '#8B0000', margin: 0, paddingHorizontal: 18 }, loading && { opacity: 0.6 }]}
                          onPress={() => rifiutaOrdine(ordine)}
                          disabled={loading}
                        >
                          <Text style={S.actionBtnTxt}>✕ Rifiuta</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                  {ordine.stato === 'consegnato' && (
                    <View style={[S.actionBtn, { backgroundColor: '#333' }]}>
                      <Text style={S.actionBtnTxt}>✓ Ordine completato</Text>
                    </View>
                  )}
                  {ordine.stato === 'rifiutato' && (
                    <View style={[S.actionBtn, { backgroundColor: '#8B0000' }]}>
                      <Text style={S.actionBtnTxt}>✕ Ordine rifiutato</Text>
                    </View>
                  )}
                </View>
              )}

              {/* Bottoni rapidi anche da chiuso (solo per "nuovo") */}
              {!isAperto && ordine.stato === 'nuovo' && (
                <View style={{ flexDirection: 'row', gap: 8, marginHorizontal: 14, marginBottom: 14 }}>
                  <TouchableOpacity
                    style={[S.quickBtn, { backgroundColor: STATI.nuovo.color, flex: 1, marginHorizontal: 0, marginBottom: 0 }]}
                    onPress={() => avanzaStato(ordine)}
                    disabled={loading}
                  >
                    <Text style={S.quickBtnTxt}>▶ Prendi in carico</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[S.quickBtn, { backgroundColor: '#8B0000', marginHorizontal: 0, marginBottom: 0, paddingHorizontal: 18 }]}
                    onPress={() => rifiutaOrdine(ordine)}
                    disabled={loading}
                  >
                    <Text style={S.quickBtnTxt}>✕ Rifiuta</Text>
                  </TouchableOpacity>
                </View>
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
  header: {
    paddingTop: 52, paddingHorizontal: 16, paddingBottom: 14,
    backgroundColor: '#8B1A1A',
    background: 'radial-gradient(circle at 85% -30%, rgba(232,184,75,0.4), transparent 55%), linear-gradient(135deg, #8B1A1A 0%, #5C0F0F 100%)',
    borderBottomWidth: 2, borderBottomColor: C.oro,
  },
  headerTitle: { fontFamily: FONT_TITOLO, fontSize: 24, fontWeight: '900', color: C.crema, marginBottom: 10, textShadow: '0 2px 12px rgba(0,0,0,0.4)' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  filtroRow: { flexDirection: 'row', gap: 8 },
  filtroBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.25)' },
  filtroBtnOn: { backgroundColor: C.oro },
  filtroBtnTxt: { fontFamily: FONT_TESTO, color: 'rgba(242,232,213,0.55)', fontWeight: '700', fontSize: 13 },
  filtroBtnTxtOn: { color: C.marrone },
  refreshBtn: { padding: 6 },
  errMsg: { fontFamily: FONT_TESTO, color: '#FF6B6B', fontSize: 12, marginTop: 8, fontWeight: '600' },
  scroll: { flex: 1, padding: 12 },
  empty: { alignItems: 'center', marginTop: 80, gap: 14 },
  emptyTxt: { fontFamily: FONT_TESTO, color: C.grigio, fontSize: 16 },

  // Card
  card: {
    borderRadius: 16, marginBottom: 14, borderLeftWidth: 5, overflow: 'hidden',
    backgroundColor: '#2a1505',
    background: 'linear-gradient(160deg, #2e1808 0%, #1d0e02 100%)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 14 },
  cardHeaderLeft: { flex: 1, gap: 4 },
  cardHeaderRight: { alignItems: 'flex-end', gap: 2 },
  statoBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' },
  statoTxt: { fontFamily: FONT_TESTO, color: 'white', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  cardNome: { fontFamily: FONT_TITOLO, fontSize: 19, fontWeight: '900', color: C.crema, marginTop: 4 },
  cardOrario: { fontFamily: FONT_TESTO, fontSize: 12, color: C.oroChiaro },
  cardTotale: { fontFamily: FONT_TITOLO, fontSize: 22, fontWeight: '900', color: C.oroChiaro },
  cardTipo: { fontFamily: FONT_TESTO, fontSize: 16, fontWeight: '900', color: C.crema, marginTop: 4, backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },

  // Body espanso
  cardBody: { borderTopWidth: 1, borderTopColor: 'rgba(232,184,75,0.12)' },
  sezione: { padding: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  sezioneLabel: { fontFamily: FONT_TESTO, fontSize: 9, letterSpacing: 2, color: C.oro, marginBottom: 6, fontWeight: '800' },
  infoVal: { fontFamily: FONT_TESTO, fontSize: 14, color: C.crema, fontWeight: '600', marginBottom: 3 },

  // Articoli
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, gap: 8 },
  itemQty: { fontFamily: FONT_TESTO, fontSize: 14, fontWeight: '800', color: C.oroChiaro, minWidth: 28 },
  itemName: { flex: 1, fontFamily: FONT_TESTO, fontSize: 13, color: C.crema },
  itemExtra: { fontFamily: FONT_TESTO, fontSize: 11, color: C.oroChiaro, marginTop: 1, fontStyle: 'italic' },
  itemPrice: { fontFamily: FONT_TESTO, fontSize: 13, color: C.grigio },
  totaleRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(232,184,75,0.15)' },
  totaleLbl: { fontFamily: FONT_TESTO, fontSize: 11, fontWeight: '800', color: C.grigio, letterSpacing: 1 },
  totaleVal: { fontFamily: FONT_TITOLO, fontSize: 18, fontWeight: '900', color: C.oroChiaro },

  // Note
  noteBox: { margin: 14, marginTop: 0, backgroundColor: 'rgba(200,150,30,0.12)', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: 'rgba(232,184,75,0.2)' },
  noteTxt: { fontFamily: FONT_TESTO, fontSize: 13, color: '#FFD080', fontStyle: 'italic', marginTop: 4 },

  // Bottoni
  actionBtn: { margin: 14, marginTop: 6, borderRadius: 12, padding: 16, alignItems: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.3)' },
  actionBtnTxt: { fontFamily: FONT_TESTO, color: 'white', fontSize: 15, fontWeight: '800' },
  quickBtn: { marginHorizontal: 14, marginBottom: 14, borderRadius: 10, padding: 12, alignItems: 'center' },
  quickBtnTxt: { fontFamily: FONT_TESTO, color: 'white', fontSize: 13, fontWeight: '700' },
});