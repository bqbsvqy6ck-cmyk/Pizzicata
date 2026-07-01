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

const TRAFFICO_INFO = {
  verde:  { label: 'Poco traffico',   tempo: '20-25 min', color: '#27AE60', emoji: '🟢' },
  giallo: { label: 'Traffico medio',  tempo: '35-45 min', color: '#E8A317', emoji: '🟡' },
  rosso:  { label: 'Traffico alto',   tempo: '60 min e più', color: '#C0392B', emoji: '🔴' },
};

const PAG_ICON = { contanti: '💵', pos: '💳', online: '📱' };

const PRODOTTI = [
  { id: 1, cat: 'Pizze Rosse', nome: 'Margherita' },
  { id: 2, cat: 'Pizze Rosse', nome: 'Marinara' },
  { id: 3, cat: 'Pizze Rosse', nome: 'Calabrese' },
  { id: 4, cat: 'Pizze Rosse', nome: 'Capricciosa' },
  { id: 5, cat: 'Pizze Rosse', nome: 'Carminello' },
  { id: 6, cat: 'Pizze Rosse', nome: 'Contadina' },
  { id: 7, cat: 'Pizze Rosse', nome: 'Diavola' },
  { id: 8, cat: 'Pizze Rosse', nome: 'Golosa' },
  { id: 9, cat: 'Pizze Rosse', nome: 'Laziale' },
  { id: 10, cat: 'Pizze Rosse', nome: 'Maratona' },
  { id: 11, cat: 'Pizze Rosse', nome: 'Marsigliese' },
  { id: 12, cat: 'Pizze Rosse', nome: 'Napoli' },
  { id: 13, cat: 'Pizze Rosse', nome: 'Palermitana' },
  { id: 14, cat: 'Pizze Rosse', nome: 'Porcona' },
  { id: 15, cat: 'Pizze Rosse', nome: 'Puttanesca' },
  { id: 16, cat: 'Pizze Rosse', nome: 'Rustica' },
  { id: 17, cat: 'Pizze Rosse', nome: 'Siciliana' },
  { id: 18, cat: 'Pizze Rosse', nome: 'Tirolese' },
  { id: 19, cat: 'Pizze Rosse', nome: 'Tonno' },
  { id: 20, cat: 'Pizze Rosse', nome: 'Vegetariana' },
  { id: 23, cat: 'Pizze Rosse', nome: '4 Stagioni' },
  { id: 25, cat: 'Pizze Rosse', nome: 'Campagnola' },
  { id: 26, cat: 'Pizze Rosse', nome: 'Ghiottona' },
  { id: 31, cat: 'Pizze Rosse', nome: 'Nova' },
  { id: 35, cat: 'Pizze Rosse', nome: 'Simpatica' },
  { id: 21, cat: 'Pizze Bianche', nome: 'Biancaneve' },
  { id: 22, cat: 'Pizze Bianche', nome: 'Certosino' },
  { id: 24, cat: 'Pizze Bianche', nome: 'Bufala' },
  { id: 27, cat: 'Pizze Bianche', nome: 'Giambone' },
  { id: 28, cat: 'Pizze Bianche', nome: 'Golden' },
  { id: 29, cat: 'Pizze Bianche', nome: 'Nduja' },
  { id: 30, cat: 'Pizze Bianche', nome: 'Nonno Federico' },
  { id: 32, cat: 'Pizze Bianche', nome: 'Ortolana' },
  { id: 33, cat: 'Pizze Bianche', nome: 'Saporita' },
  { id: 34, cat: 'Pizze Bianche', nome: 'Sfiziosa' },
  { id: 36, cat: 'Pizze Speciali', nome: '3 Porcellini' },
  { id: 37, cat: 'Pizze Speciali', nome: 'Bismark' },
  { id: 38, cat: 'Pizze Speciali', nome: 'Boscaiola' },
  { id: 39, cat: 'Pizze Speciali', nome: 'Gourmet' },
  { id: 40, cat: 'Pizze Speciali', nome: 'Gustosa' },
  { id: 41, cat: 'Pizze Speciali', nome: 'La 4 Mori' },
  { id: 42, cat: 'Limited Edition', nome: 'Elio' },
  { id: 43, cat: 'Limited Edition', nome: 'Yammie-Ja' },
  { id: 44, cat: 'Limited Edition', nome: 'Gioia' },
  { id: 45, cat: 'Limited Edition', nome: 'A Pork' },
  { id: 46, cat: 'Limited Edition', nome: 'Primavera' },
  { id: 47, cat: 'Limited Edition', nome: 'Supernova' },
  { id: 48, cat: 'Limited Edition', nome: 'La Antò' },
  { id: 202, cat: 'Focacce', nome: 'Balsamica' },
  { id: 49, cat: 'Focacce', nome: 'Burrata' },
  { id: 50, cat: 'Focacce', nome: 'Bruschetta' },
  { id: 51, cat: 'Focacce', nome: 'Italia' },
  { id: 52, cat: 'Focacce', nome: 'Prosciutto Crudo' },
  { id: 53, cat: 'Focacce', nome: 'Speck' },
  { id: 54, cat: 'Focacce', nome: 'Tropea' },
  { id: 55, cat: 'Focacce', nome: 'Montebianco' },
  { id: 56, cat: 'Calzoni', nome: 'Calzone della Casa' },
  { id: 57, cat: 'Calzoni', nome: 'Calzone Doppio' },
  { id: 58, cat: 'Calzoni', nome: 'Calzone Goloso' },
  { id: 59, cat: 'Calzoni', nome: 'Calzone Gustoso' },
  { id: 60, cat: 'Panuozzi', nome: 'U Pork' },
  { id: 61, cat: 'Panuozzi', nome: 'Americano' },
  { id: 62, cat: 'Panuozzi', nome: 'Balsamico' },
  { id: 63, cat: 'Panuozzi', nome: 'Boscaiolo' },
  { id: 64, cat: 'Panuozzi', nome: 'Calabrese' },
  { id: 65, cat: 'Panuozzi', nome: 'Classico' },
  { id: 66, cat: 'Panuozzi', nome: 'Estivo' },
  { id: 67, cat: 'Panuozzi', nome: 'Fresco' },
  { id: 68, cat: 'Panuozzi', nome: 'Hamburger' },
  { id: 69, cat: 'Panuozzi', nome: 'Mediterraneo' },
  { id: 70, cat: 'Panuozzi', nome: 'Porcaro' },
  { id: 71, cat: 'Panuozzi', nome: 'Valdostano' },
  { id: 72, cat: 'Panuozzi', nome: 'Vegetariano' },
  { id: 73, cat: 'Hamburger', nome: 'Capo' },
  { id: 74, cat: 'Hamburger', nome: 'Ciccio' },
  { id: 75, cat: 'Hamburger', nome: 'Fanalino di Coda' },
  { id: 76, cat: 'Hamburger', nome: 'Il Lordone' },
  { id: 77, cat: 'Hamburger', nome: 'Ultra Pork Burger' },
  { id: 78, cat: 'Hamburger', nome: 'Menu Panino' },
  { id: 200, cat: 'Pane del Forno', nome: 'Filone Classico' },
  { id: 201, cat: 'Pane del Forno', nome: 'Filone Integrale' },
  { id: 79, cat: 'Farinata', nome: 'Classica' },
  { id: 80, cat: 'Farinata', nome: 'con Burrata' },
  { id: 81, cat: 'Farinata', nome: 'al Lardo' },
  { id: 82, cat: 'Farinata', nome: 'ai Formaggi' },
  { id: 83, cat: 'Farinata', nome: 'Cotto e Mozzarella' },
  { id: 84, cat: 'Farinata', nome: 'Fontina e Soppressata' },
  { id: 85, cat: 'Farinata', nome: 'Friarielli e Salsiccia' },
  { id: 86, cat: 'Farinata', nome: 'Gorgo e Cipolla' },
  { id: 87, cat: 'Farinata', nome: 'con Mortadella' },
  { id: 88, cat: 'Farinata', nome: 'Scamorza e Salamino' },
  { id: 89, cat: 'Farinata', nome: 'Fargherita' },
  { id: 90, cat: 'Fritti', nome: 'Chiacchiere Semplici' },
  { id: 91, cat: 'Fritti', nome: 'Chiacchiere al Crudo' },
  { id: 92, cat: 'Fritti', nome: 'Chiacchiere al Sugo' },
  { id: 93, cat: 'Fritti', nome: 'Chiacchiere con Burrata' },
  { id: 94, cat: 'Fritti', nome: 'Chiacchiere Tris' },
  { id: 95, cat: 'Fritti', nome: 'Crocchette di Patate' },
  { id: 96, cat: 'Fritti', nome: "Olive all'Ascolana" },
  { id: 97, cat: 'Fritti', nome: 'Nuggets di Pollo' },
  { id: 98, cat: 'Fritti', nome: 'Panelle' },
  { id: 99, cat: 'Fritti', nome: 'Patatine Fritte' },
  { id: 100, cat: 'Fritti', nome: 'Scugnizzi Fritti' },
  { id: 101, cat: 'Fritti', nome: 'Suppli Romani' },
  { id: 102, cat: 'Dolci', nome: 'Cannoli Siciliani' },
  { id: 103, cat: 'Dolci', nome: 'Cheesecake alla Fragola' },
  { id: 104, cat: 'Dolci', nome: 'Chiacchiere con Zucchero' },
  { id: 105, cat: 'Dolci', nome: 'Chiacchiere con Nutella' },
  { id: 106, cat: 'Dolci', nome: 'Focaccia alla Nutella' },
  { id: 107, cat: 'Dolci', nome: 'Profiterol' },
  { id: 108, cat: 'Dolci', nome: 'Semifreddo al Cocco' },
  { id: 109, cat: 'Dolci', nome: 'Sorbetto al Limone' },
  { id: 110, cat: 'Dolci', nome: 'Tiramisu' },
  { id: 111, cat: 'Dolci', nome: 'Tortino Ricotta e Cioccolato' },
  { id: 112, cat: 'Dolci', nome: 'Tortino Ricotta e Pere' },
  { id: 113, cat: 'Dolci', nome: 'Zuppa Inglese' },
  { id: 114, cat: 'Bevande', nome: 'Acqua Naturale' },
  { id: 115, cat: 'Bevande', nome: 'Acqua Frizzante' },
  { id: 116, cat: 'Bevande', nome: 'Coca Cola' },
  { id: 117, cat: 'Bevande', nome: 'Coca Cola Zero' },
  { id: 118, cat: 'Bevande', nome: 'Fanta' },
  { id: 119, cat: 'Bevande', nome: 'Sprite' },
  { id: 120, cat: 'Bevande', nome: 'Chinotto' },
  { id: 121, cat: 'Bevande', nome: 'Estathe al Limone' },
  { id: 122, cat: 'Bevande', nome: 'Estathe alla Pesca' },
  { id: 123, cat: 'Bevande', nome: 'Moretti Rossa 33cl' },
  { id: 124, cat: 'Bevande', nome: 'Becks 33cl' },
  { id: 125, cat: 'Bevande', nome: 'Ichnusa 33cl' },
  { id: 126, cat: 'Bevande', nome: 'Menabrea 33cl' },
  { id: 127, cat: 'Bevande', nome: 'Moretti Classica 66cl' },
  { id: 128, cat: 'Bevande', nome: 'Ichnusa Non Filtrata 50cl' },
  { id: 129, cat: 'Bevande', nome: 'Aperol Spritz' },
  { id: 130, cat: 'Bevande', nome: 'Fontanafredda Rosso' },
  { id: 131, cat: 'Bevande', nome: 'Fontanafredda Arneis' },
  { id: 132, cat: 'Bevande', nome: 'Spumante Santero 958 Extra Dry' },
];
const AGGIUNTE_CUCINA = [
  'Uovo', 'Würstel', 'Salsiccia', 'Bacon', 'Pomodorini', 'Funghi', 'Olive',
  'Prosciutto cotto', 'Carciofi', 'Peperoni', 'Salamino', 'Brie', 'Fontina',
  'Gorgonzola', 'Cipolla', 'Certosino', 'Zucchine', 'Melanzane', 'Friarielli',
  'Grana', 'Soppressata', 'Scamorza', 'Acciughe', 'Capperi', 'Rinforzo mozzarella',
  'Rinforzo salsa di pomodoro', 'Patatine fritte', 'Bufala', 'Crudo', 'Speck', 'Burrata',
];

export default function Cucina() {
  const [sbloccato, setSbloccato] = useState(false);
  const [passwordInserita, setPasswordInserita] = useState('');
  const [errorePassword, setErrorePassword] = useState('');
  const [ordini, setOrdini] = useState([]);
  const [filtro, setFiltro] = useState('attivi');
  const [aperto, setAperto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [suonoAttivo, setSuonoAttivo] = useState(false);
  const [nuovoArrivato, setNuovoArrivato] = useState(false);
  const [traffico, setTraffico] = useState('verde');
  const idsNuoviPrec = useRef(null);
  const audioCtxRef = useRef(null);

  const suonaCampanello = () => {
    try {
      if (!audioCtxRef.current) {
        const AC = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AC();
      }
      const ctx = audioCtxRef.current;
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
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AC();
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
    } catch (e) {}
    setSuonoAttivo(true);
    suonaCampanello();
  };

  const [conteggioOrdini, setConteggioOrdini] = useState({});
  const [nonDisponibili, setNonDisponibili] = useState([]);
  const [pannelloDisp, setPannelloDisp] = useState(false);
  const [catDisp, setCatDisp] = useState('Pizze Rosse');

  const caricaNonDisponibili = async () => {
    const { data } = await supabase.from('prodotti_non_disponibili').select('id_prodotto');
    if (data) setNonDisponibili(data.map(r => r.id_prodotto));
  };

  useEffect(() => {
    caricaNonDisponibili();
    const t = setInterval(caricaNonDisponibili, 30000);
    return () => clearInterval(t);
  }, []);

  const toggleDisponibilita = async (idProdotto, nome) => {
    const giaNon = nonDisponibili.includes(idProdotto);
    if (giaNon) {
      setNonDisponibili(prev => prev.filter(x => x !== idProdotto));
      await supabase.from('prodotti_non_disponibili').delete().eq('id_prodotto', idProdotto);
    } else {
      setNonDisponibili(prev => [...prev, idProdotto]);
      await supabase.from('prodotti_non_disponibili').insert([{ id_prodotto: idProdotto, nome }]);
    }
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
    // conta gli ordini totali per ogni telefono
    const { data: tuttiOrdini } = await supabase.from('ordini').select('telefono').neq('stato', 'rifiutato');
    if (tuttiOrdini) {
      const conteggio = {};
      tuttiOrdini.forEach(o => { if (o.telefono) conteggio[o.telefono] = (conteggio[o.telefono] || 0) + 1; });
      setConteggioOrdini(conteggio);
    }
    setErrMsg('');
  };

  useEffect(() => {
    carica();
    const interval = setInterval(carica, 15000);
    return () => clearInterval(interval);
  }, []);

  const caricaTraffico = async () => {
    const { data } = await supabase.from('stato_locale').select('traffico').eq('id', 1).single();
    if (data && data.traffico) setTraffico(data.traffico);
  };
  useEffect(() => {
    caricaTraffico();
    const t = setInterval(caricaTraffico, 30000);
    return () => clearInterval(t);
  }, []);

  const cambiaTraffico = async (livello) => {
    setTraffico(livello);
    const { error } = await supabase
      .from('stato_locale')
      .update({ traffico: livello, aggiornato_il: new Date().toISOString() })
      .eq('id', 1);
    if (error) setErrMsg('Errore traffico: ' + error.message);
  };

  const ordiniNuovi = ordini.filter(o => o.stato === 'nuovo');
  const ceNuoviDaAccettare = ordiniNuovi.length > 0;

  useEffect(() => {
    if (!suonoAttivo || !ceNuoviDaAccettare) return;
    suonaCampanello();
    const t = setInterval(suonaCampanello, 3000);
    return () => clearInterval(t);
  }, [suonoAttivo, ceNuoviDaAccettare, ordiniNuovi.length]);

  useEffect(() => {
    if (!ceNuoviDaAccettare) { setNuovoArrivato(false); return; }
    setNuovoArrivato(true);
    const t = setInterval(() => setNuovoArrivato(v => !v), 700);
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
    if (nuovo === null) return;
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

  // Ordini di OGGI (per il contatore che si azzera ogni giorno)
  const isOggi = (o) => {
    const t = new Date(o.created_at);
    const adesso = new Date();
    return t.getDate() === adesso.getDate() &&
           t.getMonth() === adesso.getMonth() &&
           t.getFullYear() === adesso.getFullYear();
  };
  const ordiniOggi = ordini.filter(isOggi);

  const visibili = filtro === 'attivi'
    ? ordini.filter(o => o.stato !== 'consegnato' && o.stato !== 'rifiutato')
    : ordiniOggi;

  return (
    <View style={S.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.marrone} />
      {!sbloccato && (
        <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(160deg, #2e1808 0%, #140800 100%)', zIndex: 999999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ fontSize: 50, marginBottom: 12 }}>🔒</div>
          <div style={{ fontFamily: FONT_TITOLO, fontSize: 24, fontWeight: 900, color: C.crema, marginBottom: 8 }}>Cucina Pizzicata</div>
          <div style={{ fontFamily: FONT_TESTO, fontSize: 14, color: C.grigio, marginBottom: 20 }}>Inserisci la password per accedere</div>
          <input
            type="password"
            value={passwordInserita}
            onChange={(e) => setPasswordInserita(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { if (passwordInserita === 'Carminiello') { setSbloccato(true); setErrorePassword(''); } else { setErrorePassword('Password errata'); } } }}
            placeholder="Password"
            style={{ padding: 14, fontSize: 16, borderRadius: 12, border: '2px solid ' + C.oro, background: '#1d0e02', color: C.crema, width: '100%', maxWidth: 280, textAlign: 'center', outline: 'none', marginBottom: 12 }}
          />
          {errorePassword ? <div style={{ color: '#FF6B6B', fontSize: 13, marginBottom: 12 }}>{errorePassword}</div> : null}
          <button
            onClick={() => { if (passwordInserita === 'Carminiello') { setSbloccato(true); setErrorePassword(''); } else { setErrorePassword('Password errata'); } }}
            style={{ background: C.oro, color: C.marrone, fontWeight: 900, fontSize: 16, border: 'none', borderRadius: 12, padding: '14px 40px', cursor: 'pointer', fontFamily: FONT_TESTO }}
          >
            Entra
          </button>
        </div>
      )}

      {/* HEADER fisso (solo titolo, filtri e suono) */}
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
                Oggi ({ordiniOggi.length})
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
          <TouchableOpacity
            style={[S.refreshBtn, { marginLeft: 8, backgroundColor: 'rgba(200,150,30,0.3)' }]}
            onPress={() => setPannelloDisp(true)}
          >
            <Text style={{ fontSize: 20 }}>📦</Text>
          </TouchableOpacity>
        </View>
        {!suonoAttivo && (
          <TouchableOpacity onPress={attivaSuono} style={{ marginTop: 8, backgroundColor: 'rgba(200,150,30,0.18)', borderRadius: 8, padding: 8 }}>
            <Text style={{ color: C.oro, fontSize: 12, fontWeight: '700', textAlign: 'center' }}>🔔 Tocca per attivare il suono dei nuovi ordini</Text>
          </TouchableOpacity>
        )}
        {errMsg ? <Text style={S.errMsg}>{errMsg}</Text> : null}
      </View>

      {/* TUTTO IL RESTO SCORRE: banner allarme, controllo traffico, lista ordini */}
      <ScrollView style={S.scroll} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Banner allarme nuovi ordini (ora scorre con la lista) */}
        {ceNuoviDaAccettare && (
          <View style={{ backgroundColor: nuovoArrivato ? '#C0392B' : '#8B0000', padding: 16, alignItems: 'center', borderRadius: 12, marginBottom: 12 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '900' }}>
              🔔 {ordiniNuovi.length === 1 ? '1 NUOVO ORDINE DA ACCETTARE!' : `${ordiniNuovi.length} NUOVI ORDINI DA ACCETTARE!`}
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 2 }}>Premi "Prendi in carico" o "Rifiuta" per fermare l'allarme</Text>
          </View>
        )}

        {/* Controllo traffico (ora scorre con la lista) */}
        <View style={{ marginBottom: 12 }}>
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
          const giornoArrivo = ordine.created_at
            ? new Date(ordine.created_at).toLocaleDateString('it-IT', { weekday: 'short', day: '2-digit', month: '2-digit' })
            : '';
          const pagLabel = ordine.pagamento
            ? ordine.pagamento.charAt(0).toUpperCase() + ordine.pagamento.slice(1)
            : 'Contanti';
          const numeroGiorno = (() => {
            const giornoOrd = new Date(ordine.created_at);
            const stessoGiorno = ordini.filter(o => {
              const d = new Date(o.created_at);
              return d.getDate() === giornoOrd.getDate() && d.getMonth() === giornoOrd.getMonth() && d.getFullYear() === giornoOrd.getFullYear();
            });
            // ordini sono ordinati dal più recente: conta quanti nello stesso giorno hanno id <= a questo
            return stessoGiorno.filter(o => o.id <= ordine.id).length;
          })();

          return (
            <View key={ordine.id} style={[S.card, { borderLeftColor: cfg.color, background: 'linear-gradient(160deg, #2e1808 0%, #1d0e02 100%)' }]}>

              <TouchableOpacity
                style={S.cardHeader}
                onPress={() => setAperto(isAperto ? null : ordine.id)}
                activeOpacity={0.8}
              >
                <View style={S.cardHeaderLeft}>
                  <View style={[S.statoBadge, { backgroundColor: cfg.color }]}>
                    <Text style={S.statoTxt}>{cfg.label.toUpperCase()}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <Text style={{ fontFamily: FONT_TITOLO, fontSize: 16, fontWeight: '900', color: C.oro }}>#{numeroGiorno}</Text>
                    <Text style={[S.cardNome, { marginTop: 0 }]}>{ordine.cliente}</Text>
                  </View>
                  <Text style={S.cardOrario}>{orarioLabel}</Text>
                  {oraArrivo ? <Text style={{ fontSize: 12, color: C.grigio, marginTop: 2 }}>Ricevuto: {giornoArrivo} alle {oraArrivo}</Text> : null}
                </View>
                <View style={S.cardHeaderRight}>
                  <Text style={S.cardTotale}>€ {Number(ordine.totale || 0).toFixed(2)}</Text>
                  <Text style={S.cardTipo}>{isAsporto ? '🏪 ASPORTO' : '🛵 DOMICILIO'}</Text>
                  <Text style={{ color: C.oro, fontSize: 18, marginTop: 6 }}>{isAperto ? '▲' : '▼'}</Text>
                </View>
              </TouchableOpacity>

              {isAperto && (
                <View style={S.cardBody}>

                  <View style={S.sezione}>
                    <Text style={S.sezioneLabel}>CLIENTE</Text>
                    <Text style={S.infoVal}>👤 {ordine.cliente}</Text>
                    <Text style={S.infoVal}>📞 {ordine.telefono}</Text>
                    {(() => {
                      const n = conteggioOrdini[ordine.telefono] || 0;
                      if (n <= 1) return <Text style={{ fontFamily: FONT_TESTO, fontSize: 13, color: '#7FD17F', fontWeight: '800', marginTop: 3 }}>🌟 Primo ordine di questo cliente!</Text>;
                      return <Text style={{ fontFamily: FONT_TESTO, fontSize: 13, color: C.oroChiaro, fontWeight: '800', marginTop: 3 }}>🔁 Ordine n° {n} di questo cliente</Text>;
                    })()}
                  </View>

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

                  <View style={S.sezione}>
                    <Text style={S.sezioneLabel}>PAGAMENTO</Text>
                    <Text style={S.infoVal}>
                      {PAG_ICON[ordine.pagamento] || '💵'} {pagLabel}
                    </Text>
                  </View>

                  <View style={S.sezione}>
                    <Text style={S.sezioneLabel}>ARTICOLI</Text>
                    {items.map((item, i) => (
                      <View key={i} style={S.itemRow}>
                        <Text style={S.itemQty}>×{item.qty}</Text>
                        <View style={{ flex: 1 }}>
                          <Text style={S.itemName}>{item.name}</Text>
                          {item.integrale ? <Text style={S.itemExtra}>+ Impasto integrale</Text> : null}
                          {item.aggiunte && item.aggiunte.length > 0 ? (
                            <Text style={S.itemExtra}>+ {(() => {
                              const conteggio = {};
                              item.aggiunte.forEach(a => { conteggio[a] = (conteggio[a] || 0) + 1; });
                              return Object.entries(conteggio).map(([nome, q]) => q > 1 ? `${nome} ×${q}` : nome).join(', ');
                            })()}</Text>
                          ) : null}
                          {item.rimozioni && item.rimozioni.length > 0 ? (
                            <Text style={[S.itemExtra, { color: '#FF9999' }]}>− senza {item.rimozioni.join(', ')}</Text>
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

                  {ordine.note ? (
                    <View style={S.noteBox}>
                      <Text style={S.sezioneLabel}>⚠️ NOTE / ALLERGIE</Text>
                      <Text style={S.noteTxt}>{ordine.note}</Text>
                    </View>
                  ) : null}

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

      {pannelloDisp && (
        <div onClick={() => setPannelloDisp(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', background: 'rgba(0,0,0,0.7)', zIndex: 999999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#1d0e02', width: '100%', maxWidth: 600, height: '88vh', borderTopLeftRadius: 22, borderTopRightRadius: 22, display: 'flex', flexDirection: 'column', border: '2px solid ' + C.oro, borderBottom: 'none' }}>
            <div style={{ padding: '18px 20px 12px', borderBottom: '1px solid rgba(232,184,75,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: FONT_TITOLO, fontSize: 20, fontWeight: 900, color: C.crema }}>📦 Disponibilità</span>
                <span onClick={() => setPannelloDisp(false)} style={{ fontSize: 26, color: C.grigio, cursor: 'pointer' }}>✕</span>
              </div>
              <div style={{ fontFamily: FONT_TESTO, fontSize: 12, color: C.grigio, marginTop: 4 }}>Tocca per segnare esaurito/disponibile. I clienti non potranno ordinarli.</div>
            </div>
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '10px 16px', borderBottom: '1px solid rgba(232,184,75,0.15)' }}>
              {['Pizze Rosse', 'Pizze Bianche', 'Pizze Speciali', 'Limited Edition', 'Focacce', 'Calzoni', 'Panuozzi', 'Hamburger', 'Farinata', 'Fritti', 'Dolci', 'Bevande', 'Pane del Forno', '🧀 Ingredienti'].map(c => (
                <button key={c} onClick={() => setCatDisp(c)} style={{ whiteSpace: 'nowrap', padding: '8px 14px', borderRadius: 18, border: 'none', cursor: 'pointer', fontFamily: FONT_TESTO, fontSize: 13, fontWeight: 700, background: catDisp === c ? C.oro : 'rgba(255,255,255,0.08)', color: catDisp === c ? C.marrone : C.grigio }}>{c}</button>
              ))}
            </div>
            <div style={{ overflowY: 'auto', padding: '12px 16px', flex: 1 }}>
              {catDisp === '🧀 Ingredienti' ? (
                AGGIUNTE_CUCINA.map(nome => {
                  const idFinto = 10000 + AGGIUNTE_CUCINA.indexOf(nome);
                  const esaurito = nonDisponibili.includes(idFinto);
                  return (
                    <div key={nome} onClick={() => toggleDisponibilita(idFinto, nome)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 16px', marginBottom: 8, borderRadius: 12, cursor: 'pointer', background: esaurito ? 'rgba(192,57,43,0.2)' : 'rgba(255,255,255,0.05)', border: `2px solid ${esaurito ? '#C0392B' : 'rgba(255,255,255,0.08)'}` }}>
                      <span style={{ fontFamily: FONT_TESTO, fontSize: 15, fontWeight: 600, color: esaurito ? '#FF9999' : C.crema, textDecoration: esaurito ? 'line-through' : 'none' }}>{nome}</span>
                      <span style={{ fontFamily: FONT_TESTO, fontSize: 13, fontWeight: 800, color: esaurito ? '#FF9999' : '#7FD17F' }}>{esaurito ? '✕ Esaurito' : '✓ Disponibile'}</span>
                    </div>
                  );
                })
              ) : (
                PRODOTTI.filter(p => p.cat === catDisp).map(p => {
                  const esaurito = nonDisponibili.includes(p.id);
                  return (
                    <div key={p.id} onClick={() => toggleDisponibilita(p.id, p.nome)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 16px', marginBottom: 8, borderRadius: 12, cursor: 'pointer', background: esaurito ? 'rgba(192,57,43,0.2)' : 'rgba(255,255,255,0.05)', border: `2px solid ${esaurito ? '#C0392B' : 'rgba(255,255,255,0.08)'}` }}>
                      <span style={{ fontFamily: FONT_TESTO, fontSize: 15, fontWeight: 600, color: esaurito ? '#FF9999' : C.crema, textDecoration: esaurito ? 'line-through' : 'none' }}>{p.nome}</span>
                      <span style={{ fontFamily: FONT_TESTO, fontSize: 13, fontWeight: 800, color: esaurito ? '#FF9999' : '#7FD17F' }}>{esaurito ? '✕ Esaurito' : '✓ Disponibile'}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
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

  cardBody: { borderTopWidth: 1, borderTopColor: 'rgba(232,184,75,0.12)' },
  sezione: { padding: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  sezioneLabel: { fontFamily: FONT_TESTO, fontSize: 9, letterSpacing: 2, color: C.oro, marginBottom: 6, fontWeight: '800' },
  infoVal: { fontFamily: FONT_TESTO, fontSize: 14, color: C.crema, fontWeight: '600', marginBottom: 3 },

  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, gap: 8 },
  itemQty: { fontFamily: FONT_TESTO, fontSize: 14, fontWeight: '800', color: C.oroChiaro, minWidth: 28 },
  itemName: { flex: 1, fontFamily: FONT_TESTO, fontSize: 13, color: C.crema },
  itemExtra: { fontFamily: FONT_TESTO, fontSize: 11, color: C.oroChiaro, marginTop: 1, fontStyle: 'italic' },
  itemPrice: { fontFamily: FONT_TESTO, fontSize: 13, color: C.grigio },
  totaleRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(232,184,75,0.15)' },
  totaleLbl: { fontFamily: FONT_TESTO, fontSize: 11, fontWeight: '800', color: C.grigio, letterSpacing: 1 },
  totaleVal: { fontFamily: FONT_TITOLO, fontSize: 18, fontWeight: '900', color: C.oroChiaro },

  noteBox: { margin: 14, marginTop: 0, backgroundColor: 'rgba(200,150,30,0.12)', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: 'rgba(232,184,75,0.2)' },
  noteTxt: { fontFamily: FONT_TESTO, fontSize: 13, color: '#FFD080', fontStyle: 'italic', marginTop: 4 },

  actionBtn: { margin: 14, marginTop: 6, borderRadius: 12, padding: 16, alignItems: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.3)' },
  actionBtnTxt: { fontFamily: FONT_TESTO, color: 'white', fontSize: 15, fontWeight: '800' },
  quickBtn: { marginHorizontal: 14, marginBottom: 14, borderRadius: 10, padding: 12, alignItems: 'center' },
  quickBtnTxt: { fontFamily: FONT_TESTO, color: 'white', fontSize: 13, fontWeight: '700' },
}); 