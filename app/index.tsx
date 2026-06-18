import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const supabase = createClient(
  'https://wjbmcqzyismcmxbcndtw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqYm1jcXp5aXNtY214YmNuZHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzgzMjEsImV4cCI6MjA5NzIxNDMyMX0.P8iSPh72J9mJwFbDzAIuaFb5Ouq4Z1xGMvR8I5fvOFw'
);

const C = {
  rosso: '#8B1A1A', crema: '#F2E8D5', cremaScuro: '#E8D5B0',
  oro: '#C8961E', marrone: '#3D1A00', grigio: '#8B7355',
};

const MENU = {
  'Pane del Forno': [
    { id: 200, name: 'Filone Classico', desc: 'Pane artigianale 500gr, cotto nel forno a legna. Disponibile ogni mattina — max 4-6 filoni al giorno', price: 1.50, limitato: true },
    { id: 201, name: 'Filone Integrale', desc: 'Pane integrale artigianale 500gr, dal forno a legna. Disponibile ogni mattina — max 4-6 filoni al giorno', price: 2.00, limitato: true },
  ],
  'Pizze Rosse': [
    { id: 1, name: 'Margherita', desc: 'Pomodoro, Mozzarella, Basilico', price: 6.50 },
    { id: 2, name: 'Marinara', desc: "Pomodoro, Olio all'aglio, Origano", price: 5.50 },
    { id: 3, name: 'Calabrese', desc: 'Pomodoro, Mozzarella, Scamorza, Soppressata', price: 8.50 },
    { id: 4, name: 'Capricciosa', desc: 'Pomodoro, Mozzarella, Cotto, Olive, Salamino, Carciofi', price: 8.50 },
    { id: 5, name: 'Carminello', desc: 'Pomodoro, Mozzarella, Funghi, Salsiccia, Fontina, Bacon', price: 9.00 },
    { id: 6, name: 'Contadina', desc: 'Pomodoro, Mozzarella, Cotto, Funghi, Salamino', price: 8.00 },
    { id: 7, name: 'Diavola', desc: 'Pomodoro, Mozzarella, Salsiccia, Friarielli', price: 8.50 },
    { id: 8, name: 'Golosa', desc: 'Pomodoro, Mozzarella, Friarielli, Salsiccia, Soppressata', price: 9.00 },
    { id: 9, name: 'Laziale', desc: 'Pomodoro, Mozzarella, Acciughe, Zucchine', price: 7.50 },
    { id: 10, name: 'Maratona', desc: 'Pomodoro, Mozzarella, Cotto, Fontina', price: 7.50 },
    { id: 11, name: 'Marsigliese', desc: 'Pomodoro, Mozzarella, Cipolle, Gorgonzola', price: 7.50 },
    { id: 12, name: 'Napoli', desc: 'Pomodoro, Mozzarella, Acciughe, Capperi, Olive', price: 7.00 },
    { id: 13, name: 'Palermitana', desc: 'Pomodoro, Mozzarella, Melanzane, Acciughe, Capperi, Olive', price: 8.50 },
    { id: 14, name: 'Porcona', desc: 'Pomodoro, Mozzarella, Salamino, Soppressata, Wurstel, Bacon, Nduja', price: 10.00 },
    { id: 15, name: 'Puttanesca', desc: 'Pomodoro, Sugo, Olive, Acciughe, Capperi, Origano, Pecorino', price: 9.00 },
    { id: 16, name: 'Rustica', desc: 'Pomodoro, Zucchine, Scamorza, Olive, Salsiccia, Grana', price: 8.50 },
    { id: 17, name: 'Siciliana', desc: 'Pomodoro, Olive, Acciughe, Capperi, Origano', price: 6.50 },
    { id: 18, name: 'Tirolese', desc: 'Pomodoro, Mozzarella, Brie, Speck', price: 8.00 },
    { id: 19, name: 'Tonno', desc: 'Pomodoro, Mozzarella, Tonno', price: 7.50 },
    { id: 20, name: 'Vegetariana', desc: 'Pomodoro, Mozzarella, Verdure, Grana', price: 8.00 },
  ],
  'Pizze Bianche': [
    { id: 21, name: 'Biancaneve', desc: 'Mozzarella', price: 6.00 },
    { id: 22, name: 'Certosino', desc: 'Mozzarella, Certosino', price: 7.00 },
    { id: 23, name: '4 Stagioni', desc: 'Mozzarella, Cotto, Olive, Carciofi, Funghi', price: 8.00 },
    { id: 24, name: 'Bufala', desc: 'Mozzarella di Bufala, Pomodorini, Origano', price: 8.50 },
    { id: 25, name: 'Campagnola', desc: 'Mozzarella, Fontina, Salsiccia, Zucchine, Grana', price: 8.50 },
    { id: 26, name: 'Ghiottona', desc: 'Mozzarella, Salsiccia, Grana, Verdure, Bacon', price: 9.00 },
    { id: 27, name: 'Giambone', desc: 'Mozzarella, Pomodorini, Tonno, Zucchine, Cipolla, Rucola, Grana', price: 9.00 },
    { id: 28, name: 'Golden', desc: 'Mozzarella, Cipolla, Funghi, Salsiccia, Grana, Olio al tartufo', price: 10.50 },
    { id: 29, name: 'Nduja Bianca', desc: "Mozzarella, Nduja, Salsiccia, Cipolla, Basilico", price: 9.00 },
    { id: 30, name: 'Nonno Federico', desc: 'Mozzarella, Gorgonzola, Cipolla, Salsiccia, Peperoni, Uovo', price: 9.00 },
    { id: 31, name: 'Nova', desc: 'Mozzarella, Salsiccia, Burrata', price: 10.00 },
    { id: 32, name: 'Ortolana', desc: 'Mozzarella, Pomodorini, Peperoni, Melanzane, Zucchine, Cipolla', price: 8.00 },
    { id: 33, name: 'Saporita', desc: 'Mozzarella, Funghi, Scamorza', price: 8.50 },
    { id: 34, name: 'Sfiziosa', desc: 'Mozzarella, Certosino, Salsiccia, Salsa', price: 8.50 },
    { id: 35, name: 'Simpatica', desc: 'Mozzarella, Funghi, Olive, Fontina, Gorgo', price: 8.50 },
  ],
  'Pizze Speciali': [
    { id: 36, name: '3 Porcellini', desc: 'Pomodoro, Mozzarella, Wurstel, Salsiccia, Salamino', price: 9.00 },
    { id: 37, name: 'Bismark', desc: 'Pomodoro, Mozzarella, Bacon, Salsiccia, Patatine, Salsa Burger', price: 9.50 },
    { id: 38, name: 'Boscaiola', desc: 'Pomodoro, Mozzarella, Cotto, Scamorza, Salsiccia, Grana', price: 9.00 },
    { id: 39, name: 'Gourmet', desc: 'Funghi, Cipolla, Carciofi, Certosino, Olio al tartufo, Grana', price: 10.50 },
    { id: 40, name: 'Gustosa', desc: 'Pomodorini, Mozzarella, Salsiccia, Salamino, Olive, Bacon', price: 9.00 },
    { id: 41, name: 'La 4 Mori', desc: 'Mozzarella, Pomodorini, Salsiccia, Grana', price: 8.50 },
  ],
  'Limited Edition': [
    { id: 42, name: 'Elio', desc: 'Pomodoro, Mozzarella, Salsiccia, Gorgonzola, Zucchine', price: 7.00 },
    { id: 43, name: 'Yammie-Ja', desc: 'Crema di Cipolla, Mozzarella, Salsiccia, Bacon, Nduja', price: 11.00 },
    { id: 44, name: 'Gioia', desc: 'Mozzarella, Pomodorini, Crocchette, Bacon, Grana, Scamorza, Nduja', price: 12.00 },
    { id: 45, name: 'A Pork', desc: 'Mozzarella, Cipolla, Pulled Pork, Insalata, Salsa BBQ, Cheddar', price: 15.00 },
    { id: 46, name: 'Primavera', desc: 'Mozzarella, Zucchine, Melanzane, Peperoni, Tonno, Grana', price: 12.00 },
    { id: 47, name: 'Supernova', desc: 'Pomodoro, Soppressata, Salsiccia, Nduja, Burrata', price: 12.00 },
  ],
  'Focacce': [
    { id: 48, name: 'Balsamica', desc: 'Certosino, Rucola, Pomodorini, Grana, Speck, Glassa balsamica', price: 10.50 },
    { id: 49, name: 'Burrata', desc: 'Pomodorini, Rucola, Crudo, Burrata, Grana, Olio EVO', price: 12.50 },
    { id: 50, name: 'Bruschetta', desc: 'Pomodorini, Olio, Sale, Origano, Basilico', price: 6.50 },
    { id: 51, name: 'Italia', desc: 'Pomodorini, Rucola, Bufala', price: 8.50 },
    { id: 52, name: 'Prosciutto Crudo', desc: '', price: 7.50 },
    { id: 53, name: 'Speck', desc: '', price: 7.00 },
    { id: 54, name: 'Tropea', desc: 'Pomodorini, Cipolla, Olio, Sale, Origano', price: 7.00 },
    { id: 55, name: 'Montebianco', desc: 'Pomodorini, Rucola, Crudo, Bufala, Grana, Olio EVO', price: 10.00 },
  ],
  'Calzoni': [
    { id: 56, name: 'Calzone della Casa', desc: 'Pomodoro, Mozzarella di Bufala, Cotto, Grana', price: 9.00 },
    { id: 57, name: 'Calzone Doppio', desc: 'Pomodoro, Bufala, Gorgonzola, Cipolla, Cotto, Funghi', price: 12.50 },
    { id: 58, name: 'Calzone Goloso', desc: 'Pomodoro, Bufala, Friarielli, Soppressata', price: 9.00 },
    { id: 59, name: 'Calzone Gustoso', desc: 'Pomodoro, Bufala, Scamorza, Friarielli', price: 9.00 },
  ],
  'Panuozzi': [
    { id: 60, name: 'U Pork', desc: 'Cipolla, Pomodorini, Pulled Pork, Insalata, Salsa BBQ, Cheddar', price: 15.00 },
    { id: 61, name: 'Americano', desc: 'Wurstel, Patatine, Ketchup, Maionese', price: 10.00 },
    { id: 62, name: 'Balsamico', desc: 'Speck, Rucola, Certosino, Aceto Balsamico', price: 10.00 },
    { id: 63, name: 'Boscaiolo', desc: 'Funghi, Bacon, Salsiccia, Salsa BBQ', price: 10.00 },
    { id: 64, name: 'Calabrese', desc: 'Scamorza, Soppressata, Nduja, Pomodorini, Cipolla', price: 10.00 },
    { id: 65, name: 'Classico', desc: 'Salsiccia, Friarielli, Scamorza', price: 10.00 },
    { id: 66, name: 'Estivo', desc: 'Prosciutto Crudo, Burrata', price: 10.00 },
    { id: 67, name: 'Fresco', desc: 'Prosciutto Crudo, Insalata, Pomodorini, Bufala', price: 10.00 },
    { id: 68, name: 'Hamburger', desc: 'Hamburger di Fassona, Maionese e Ketchup', price: 10.00 },
    { id: 69, name: 'Mediterraneo', desc: 'Tonno, Pomodorini, Carciofi, Maionese', price: 10.00 },
    { id: 70, name: 'Porcaro', desc: 'Salsiccia, Peperoni, Salsa Hamburger', price: 10.00 },
    { id: 71, name: 'Valdostano', desc: 'Cotto, Fontina, Mozzarella, Maionese', price: 10.00 },
    { id: 72, name: 'Vegetariano', desc: 'Funghi, Peperoni, Melanzane, Friarielli', price: 10.00 },
  ],
  'Hamburger': [
    { id: 73, name: 'Capo', desc: 'Hamburger, Lattuga, Pomodoro, Cipolla, Fontina, Bacon, BBQ', price: 10.00 },
    { id: 74, name: 'Ciccio', desc: 'Hamburger, Lattuga, Pomodoro, Cheddar, Bacon, Ketchup, Mayonese', price: 10.00 },
    { id: 75, name: 'Fanalino di Coda', desc: 'Hamburger, Soppressata, Peperoni, Cipolla, Fontina, Lattuga, BBQ', price: 12.00 },
    { id: 76, name: 'Il Lordone', desc: 'Doppio Hamburger, Doppio Cheddar, Bacon, Lattuga, Salsa Pizzicata', price: 18.00 },
    { id: 77, name: 'Ultra Pork Burger', desc: 'Hamburger di Fasona, Pulled Pork, Doppio Bacon, Doppio Cheddar, BBQ', price: 20.00 },
    { id: 78, name: 'Menu Panino', desc: 'Hamburger, Lattuga, Pomodoro, Cheddar, Ketchup + patatine e bibita', price: 14.00 },
  ],
  'Farinata': [
    { id: 79, name: 'Classica', desc: '', price: 3.50 },
    { id: 80, name: 'con Burrata', desc: '', price: 7.00 },
    { id: 81, name: 'al Lardo', desc: '', price: 5.00 },
    { id: 82, name: 'ai Formaggi', desc: '', price: 5.00 },
    { id: 83, name: 'Cotto e Mozzarella', desc: '', price: 5.00 },
    { id: 84, name: 'Fontina e Soppressata', desc: '', price: 5.00 },
    { id: 85, name: 'Friarielli e Salsiccia', desc: '', price: 5.00 },
    { id: 86, name: 'Gorgo e Cipolla', desc: '', price: 5.00 },
    { id: 87, name: 'con Mortadella', desc: '', price: 5.00 },
    { id: 88, name: 'Scamorza e Salamino', desc: '', price: 5.00 },
    { id: 89, name: 'Fargherita', desc: 'Pomodoro e Mozzarella', price: 5.00 },
  ],
  'Fritti': [
    { id: 90, name: 'Chiacchiere Semplici', desc: 'Chiacchiere Napoletane', price: 4.00 },
    { id: 91, name: 'Chiacchiere al Crudo', desc: '', price: 7.00 },
    { id: 92, name: 'Chiacchiere al Sugo', desc: '', price: 5.50 },
    { id: 93, name: 'Chiacchiere con Burrata', desc: '', price: 9.00 },
    { id: 94, name: 'Chiacchiere Tris', desc: 'Cotto, Crudo e Mortadella', price: 8.00 },
    { id: 95, name: 'Crocchette di Patate', desc: '8 pezzi', price: 4.00 },
    { id: 96, name: "Olive all'Ascolana", desc: '9 pezzi', price: 4.50 },
    { id: 97, name: 'Nuggets di Pollo', desc: '8 pezzi', price: 7.00 },
    { id: 98, name: 'Panelle', desc: '8 pezzi', price: 5.00 },
    { id: 99, name: 'Patatine Fritte', desc: 'Porzione', price: 4.00 },
    { id: 100, name: 'Scugnizzi Fritti', desc: 'Ripieni di Speck e Formaggio', price: 4.00 },
    { id: 101, name: 'Suppli Romani', desc: '', price: 7.00 },
  ],
  'Dolci': [
    { id: 102, name: 'Cannoli Siciliani', desc: '', price: 4.00 },
    { id: 103, name: 'Cheesecake alla Fragola', desc: '', price: 4.00 },
    { id: 104, name: 'Chiacchiere con Zucchero', desc: '', price: 5.00 },
    { id: 105, name: 'Chiacchiere con Nutella', desc: '', price: 6.00 },
    { id: 106, name: 'Focaccia alla Nutella', desc: '', price: 7.00 },
    { id: 107, name: 'Profiterol', desc: '', price: 4.00 },
    { id: 108, name: 'Semifreddo al Cocco', desc: '', price: 4.50 },
    { id: 109, name: 'Sorbetto al Limone', desc: '', price: 4.50 },
    { id: 110, name: 'Tiramisu', desc: '', price: 4.50 },
    { id: 111, name: 'Tortino Ricotta e Cioccolato', desc: '', price: 4.50 },
    { id: 112, name: 'Tortino Ricotta e Pere', desc: '', price: 4.00 },
    { id: 113, name: 'Zuppa Inglese', desc: '', price: 3.50 },
  ],
  'Bevande': [
    { id: 114, name: 'Acqua Naturale', desc: '', price: 1.00 },
    { id: 115, name: 'Acqua Frizzante', desc: '', price: 1.00 },
    { id: 116, name: 'Coca Cola', desc: '', price: 2.50 },
    { id: 117, name: 'Coca Cola Zero', desc: '', price: 2.50 },
    { id: 118, name: 'Fanta', desc: '', price: 2.50 },
    { id: 119, name: 'Sprite', desc: '', price: 2.50 },
    { id: 120, name: 'Chinotto', desc: '', price: 2.50 },
    { id: 121, name: 'Estathe al Limone', desc: '', price: 2.50 },
    { id: 122, name: 'Estathe alla Pesca', desc: '', price: 2.50 },
    { id: 123, name: 'Moretti Rossa 33cl', desc: '', price: 3.00 },
    { id: 124, name: 'Becks 33cl', desc: '', price: 3.00 },
    { id: 125, name: 'Ichnusa 33cl', desc: '', price: 3.00 },
    { id: 126, name: 'Menabrea 33cl', desc: '', price: 3.00 },
    { id: 127, name: 'Moretti Classica 66cl', desc: '', price: 3.50 },
    { id: 128, name: 'Ichnusa Non Filtrata 50cl', desc: '', price: 3.50 },
    { id: 129, name: 'Aperol Spritz', desc: '', price: 3.50 },
  ],
};

const CAT_EMOJI = {
  'Pane del Forno': '🍞', 'Pizze Rosse': '🍕', 'Pizze Bianche': '🍕',
  'Pizze Speciali': '⭐', 'Limited Edition': '🔥', 'Focacce': '🫓',
  'Calzoni': '🥙', 'Panuozzi': '🥪', 'Hamburger': '🍔',
  'Farinata': '🫓', 'Fritti': '🍟', 'Dolci': '🍰', 'Bevande': '🥤',
};

const ORARI_SERA = ['Appena possibile', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '22:45'];
const ORARI_PRANZO = ['Appena possibile', '12:00', '12:30', '13:00', '13:30', '14:00'];
const ORARI_PANE = ['Mattina (12:00-14:30)', 'Sera (18:00-22:45)'];

const getCalendario = () => {
  const giorni = [];
  const oggi = new Date();
  const nomiGiorni = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  const nomiMesi = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
  for (let i = 0; i < 14; i++) {
    const d = new Date(oggi);
    d.setDate(oggi.getDate() + i);
    giorni.push({
      label: i === 0 ? 'Oggi' : nomiGiorni[d.getDay()],
      data: d.getDate() + ' ' + nomiMesi[d.getMonth()],
      full: d.toLocaleDateString('it-IT'),
      isPranzo: true,
      isSera: true,
    });
  }
  return giorni;
};

// LOGIN SCREEN
function LoginScreen({ onLogin }) {
  const [tel, setTel] = useState('');
  const [nome, setNome] = useState('');
  const [step, setStep] = useState(1);
  const [errore, setErrore] = useState('');
  const [loading, setLoading] = useState(false);

  const avanti = async () => {
    const clean = tel.replace(/\s/g, '');
    if (clean.length < 9) { setErrore('Inserisci un numero valido'); return; }
    setLoading(true);
    const { data } = await supabase.from('clienti').select('*').eq('telefono', clean).single();
    setLoading(false);
    if (data) {
      onLogin({ telefono: clean, nome: data.nome, indirizzo: data.indirizzo || '' });
    } else {
      setStep(2);
      setErrore('');
    }
  };

  const registra = async () => {
    if (!nome.trim()) { setErrore('Inserisci il tuo nome'); return; }
    const clean = tel.replace(/\s/g, '');
    setLoading(true);
    await supabase.from('clienti').insert([{ telefono: clean, nome: nome.trim() }]);
    setLoading(false);
    onLogin({ telefono: clean, nome: nome.trim(), indirizzo: '' });
  };

  return (
    <View style={S.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.rosso} />
      <View style={S.loginHeader}>
        <Text style={S.loginLogo}>Pizzicata</Text>
        <Text style={S.loginSub}>- TORINO -</Text>
      </View>
      <View style={S.loginBody}>
        <Text style={S.loginEmoji}>🍕</Text>
        <Text style={S.loginTitle}>Benvenuto!</Text>
        <Text style={S.loginDesc}>
          {step === 1 ? 'Inserisci il tuo numero di telefono per ordinare' : 'Prima volta? Inserisci il tuo nome'}
        </Text>
        {step === 1 ? (
          <View style={S.loginBox}>
            <Text style={S.formLabel}>NUMERO DI TELEFONO</Text>
            <input
              style={inputStyle}
              placeholder="333 1234567"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              type="tel"
            />
            {errore ? <Text style={S.errore}>{errore}</Text> : null}
            <TouchableOpacity style={S.checkoutBtn} onPress={avanti}>
              <Text style={S.checkoutText}>{loading ? 'Caricamento...' : 'Continua'}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={S.loginBox}>
            <Text style={S.formLabel}>COME TI CHIAMI?</Text>
            <input
              style={inputStyle}
              placeholder="Mario Rossi"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {errore ? <Text style={S.errore}>{errore}</Text> : null}
            <TouchableOpacity style={S.checkoutBtn} onPress={registra}>
              <Text style={S.checkoutText}>{loading ? 'Registrazione...' : 'Accedi'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStep(1)} style={{ marginTop: 12, alignItems: 'center' }}>
              <Text style={{ color: C.grigio, fontSize: 13 }}>Indietro</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

function CartScreen({ cart, cartTotal, ordered, setOrdered, setCart, setTab, handleOrder, utente }) {
  const [indirizzo, setIndirizzo] = useState(utente.indirizzo || '');
  const [note, setNote] = useState('');
  const [tipoOrdine, setTipoOrdine] = useState('domicilio');
  const [orario, setOrario] = useState('Appena possibile');
  const [pagamento, setPagamento] = useState('contanti');
  const [giornoSelezionato, setGiornoSelezionato] = useState(0);
  const [errore, setErrore] = useState('');

  // Per il pane: sempre dal giorno dopo (index 1+)
  const haPane = cart.some(i => i.id >= 200);
  const calendario = getCalendario().filter((_, i) => !haPane || i > 0);

  const ora = new Date().getHours();
  const isPranzo = ora < 15;
  const ORARI = isPranzo ? ORARI_PRANZO : ORARI_SERA;

  const spedizioneExtra = tipoOrdine === 'domicilio' ? 2.5 : 0;

  const doOrder = () => {
    if (tipoOrdine === 'domicilio' && !indirizzo.trim()) { setErrore('Inserisci il tuo indirizzo!'); return; }
    setErrore('');
    handleOrder({ indirizzo, note, tipoOrdine, orario, pagamento, giorno: calendario[giornoSelezionato].full });
  };

  if (ordered) return (
    <View style={S.empty}>
      <Text style={{ fontSize: 80 }}>🎉</Text>
      <Text style={S.emptyTitle}>Ordine inviato!</Text>
      <Text style={S.emptySub}>Ciao {utente.nome}, ti contatteremo presto!</Text>
      <TouchableOpacity style={S.emptyBtn} onPress={() => { setOrdered(false); setCart([]); setTab('home'); }}>
        <Text style={S.emptyBtnText}>Torna alla Home</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={S.scroll}>
      {cart.length === 0 ? (
        <View style={S.empty}>
          <Text style={{ fontSize: 64 }}>🛒</Text>
          <Text style={S.emptyTitle}>Carrello vuoto</Text>
          <Text style={S.emptySub}>Aggiungi qualcosa dal menu!</Text>
          <TouchableOpacity style={S.emptyBtn} onPress={() => setTab('menu')}>
            <Text style={S.emptyBtnText}>Vai al Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {cart.map(item => (
            <View key={item.id} style={S.cartCard}>
              <Text style={{ fontSize: 26 }}>{item.id >= 200 ? '🍞' : '🍕'}</Text>
              <View style={{ flex: 1 }}>
                <Text style={S.cartName}>{item.name}</Text>
                <Text style={S.cartPrice}>€ {(item.price * item.qty).toFixed(2)}</Text>
              </View>
              <Text style={{ fontSize: 13, color: C.grigio }}>x{item.qty}</Text>
            </View>
          ))}

          {/* Banner info pane */}
          {haPane && (
            <View style={{ backgroundColor: '#FFF8E7', borderRadius: 12, padding: 12, borderLeftWidth: 4, borderLeftColor: C.oro, marginBottom: 12 }}>
              <Text style={{ fontSize: 12, color: '#8B6914', fontWeight: '700' }}>🍞 Ordine con pane del forno</Text>
              <Text style={{ fontSize: 11, color: C.grigio, marginTop: 3 }}>Il pane viene preparato il giorno prima — scegli la data di domani o successiva.</Text>
            </View>
          )}

          {/* Tipo ordine — sempre visibile */}
          <View style={S.formBox}>
            <Text style={S.formLabel}>TIPO ORDINE</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity style={[S.typeBtn, tipoOrdine === 'domicilio' && S.typeBtnActive]} onPress={() => setTipoOrdine('domicilio')}>
                <Text style={{ fontSize: 22 }}>🛵</Text>
                <Text style={[S.typeBtnText, tipoOrdine === 'domicilio' && S.typeBtnTextActive]}>Domicilio</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[S.typeBtn, tipoOrdine === 'asporto' && S.typeBtnActive]} onPress={() => setTipoOrdine('asporto')}>
                <Text style={{ fontSize: 22 }}>🏪</Text>
                <Text style={[S.typeBtnText, tipoOrdine === 'asporto' && S.typeBtnTextActive]}>Asporto</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Orario ritiro pane (solo se asporto + pane) */}
          {haPane && tipoOrdine === 'asporto' && (
            <View style={S.formBox}>
              <Text style={S.formLabel}>ORARIO RITIRO PANE</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {ORARI_PANE.map(o => (
                  <TouchableOpacity key={o} style={[S.typeBtn, orario === o && S.typeBtnActive]} onPress={() => setOrario(o)}>
                    <Text style={[S.typeBtnText, orario === o && S.typeBtnTextActive]}>{o}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Indirizzo */}
          {tipoOrdine === 'domicilio' && (
            <View style={S.formBox}>
              <Text style={S.formLabel}>INDIRIZZO DI CONSEGNA *</Text>
              <input style={inputStyle} placeholder="Via, numero civico..." value={indirizzo} onChange={(e) => setIndirizzo(e.target.value)} />
              <Text style={{ fontSize: 10, color: C.grigio, marginTop: 6, fontStyle: 'italic' }}>Consegniamo entro 5km da Corso Giambone 8/b</Text>
            </View>
          )}

          {/* Calendario */}
          <View style={S.formBox}>
            <Text style={S.formLabel}>GIORNO</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {calendario.map((g, i) => (
                  <TouchableOpacity key={i} style={[S.calBtn, giornoSelezionato === i && S.calBtnActive]} onPress={() => setGiornoSelezionato(i)}>
                    <Text style={[S.calGiorno, giornoSelezionato === i && { color: 'white' }]}>{g.label}</Text>
                    <Text style={[S.calData, giornoSelezionato === i && { color: 'rgba(255,255,255,0.8)' }]}>{g.data}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Orario consegna (non per pane asporto) */}
          {!(haPane && tipoOrdine === 'asporto') && (
            <View style={S.formBox}>
              <Text style={S.formLabel}>ORARIO</Text>
              <select value={orario} onChange={(e) => setOrario(e.target.value)} style={{ ...inputStyle, height: 44 }}>
                {ORARI.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </View>
          )}

          {/* Pagamento */}
          <View style={S.formBox}>
            <Text style={S.formLabel}>METODO DI PAGAMENTO</Text>
            <View style={{ gap: 8 }}>
              {[
                { key: 'contanti', icon: '💵', label: 'Contanti', sub: 'Paga alla consegna' },
                { key: 'pos', icon: '💳', label: 'POS', sub: 'Bancomat o carta' },
                { key: 'online', icon: '📱', label: 'Online', sub: 'Paga subito in app' },
              ].map(p => (
                <TouchableOpacity key={p.key} style={[S.pagBtn, pagamento === p.key && S.pagBtnActive]} onPress={() => setPagamento(p.key)}>
                  <Text style={{ fontSize: 24 }}>{p.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[S.pagLabel, pagamento === p.key && { color: 'white' }]}>{p.label}</Text>
                    <Text style={[S.pagSub, pagamento === p.key && { color: 'rgba(255,255,255,0.7)' }]}>{p.sub}</Text>
                  </View>
                  {pagamento === p.key && <Text style={{ color: 'white', fontSize: 18 }}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Note */}
          <View style={S.formBox}>
            <Text style={S.formLabel}>NOTE E ALLERGIE</Text>
            <textarea style={textareaStyle} placeholder="Allergie, intolleranze, richieste speciali..." value={note} onChange={(e) => setNote(e.target.value)} />
          </View>

          {errore ? <Text style={S.errore}>{errore}</Text> : null}

          <View style={S.totalCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <Text style={S.totalRow}>Subtotale</Text>
              <Text style={S.totalRow}>€ {cartTotal.toFixed(2)}</Text>
            </View>
            {tipoOrdine === 'domicilio' && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={S.totalRow}>Consegna</Text>
                <Text style={S.totalRow}>€ 2.50</Text>
              </View>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={S.totalBig}>Totale</Text>
              <Text style={[S.totalBig, { color: C.rosso }]}>€ {(cartTotal + spedizioneExtra).toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity style={S.checkoutBtn} onPress={doOrder}>
            <Text style={S.checkoutText}>Conferma Ordine</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const inputStyle = {
  border: '1.5px solid #E8D5B0', borderRadius: 10, padding: 12,
  fontSize: 14, color: '#3D1A00', width: '100%', outline: 'none',
  fontFamily: 'inherit', backgroundColor: 'white', boxSizing: 'border-box',
};

const textareaStyle = {
  border: '1.5px solid #E8D5B0', borderRadius: 10, padding: 12,
  fontSize: 14, color: '#3D1A00', width: '100%', minHeight: 80,
  outline: 'none', fontFamily: 'inherit', resize: 'none',
  backgroundColor: 'white', boxSizing: 'border-box',
};

export default function App() {
  const [utente, setUtente] = useState(null);
  const [tab, setTab] = useState('home');
  const [cat, setCat] = useState('Pane del Forno');
  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);
  const [ora, setOra] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setOra(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  if (!utente) return <LoginScreen onLogin={setUtente} />;

  const add = (item) => setCart(prev => {
    const ex = prev.find(c => c.id === item.id);
    if (ex) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
    return [...prev, { ...item, qty: 1 }];
  });

  const remove = (id) => setCart(prev =>
    prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c).filter(c => c.qty > 0)
  );

  const cartN = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handleOrder = async ({ indirizzo, note, tipoOrdine, orario, pagamento, giorno }) => {
    const spedizione = tipoOrdine === 'domicilio' ? 2.5 : 0;
    try {
      await supabase.from('ordini').insert([{
        cliente: utente.nome,
        telefono: utente.telefono,
        items: JSON.stringify(cart.map(i => ({ name: i.name, qty: i.qty, price: i.price }))),
        totale: cartTotal + spedizione,
        stato: 'nuovo',
        note: note,
        indirizzo: tipoOrdine === 'domicilio' ? indirizzo : 'Asporto',
        tipo: tipoOrdine,
        orario_consegna: giorno + ' - ' + orario,
        pagamento: pagamento,
      }]);
      if (utente.indirizzo !== indirizzo && indirizzo) {
        await supabase.from('clienti').update({ indirizzo }).eq('telefono', utente.telefono);
      }
    } catch (e) {
      console.log('Errore:', e);
    }
    setOrdered(true);
  };

  const oraStr = ora.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  const dataStr = ora.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });

  const Home = () => (
    <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
      <View style={S.heroBanner}>
        <View>
          <Text style={S.heroGreeting}>Ciao {utente.nome}!</Text>
          <Text style={S.heroName}>Pizzicata</Text>
          <Text style={S.heroSlogan}>e che pizza... ragazzi!</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 28, color: C.oro, fontWeight: '900' }}>{oraStr}</Text>
          <Text style={{ fontSize: 10, color: 'rgba(242,232,213,0.6)', marginTop: 2, textAlign: 'right' }}>{dataStr}</Text>
        </View>
      </View>

      <View style={S.paneCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Text style={{ fontSize: 28 }}>🍞</Text>
          <View>
            <Text style={S.paneTitolo}>Pane del Forno a Legna</Text>
            <Text style={S.paneSub}>Fresco ogni mattina — solo 4-6 filoni al giorno!</Text>
          </View>
        </View>
        <TouchableOpacity style={S.paneBtn} onPress={() => { setCat('Pane del Forno'); setTab('menu'); }}>
          <Text style={S.paneBtnText}>Prenota il tuo filone →</Text>
        </TouchableOpacity>
      </View>

      <View style={S.tilesRow}>
        <View style={S.tile}>
          <Text style={S.tileIcon}>📍</Text>
          <Text style={S.tileTitle}>Dove siamo</Text>
          <Text style={S.tileVal}>C.so Giambone 8/b{'\n'}Torino</Text>
        </View>
        <View style={S.tile}>
          <Text style={S.tileIcon}>🕐</Text>
          <Text style={S.tileTitle}>Orari</Text>
          <Text style={S.tileVal}>LUN-DOM{'\n'}12:00-14:30{'\n'}18:00-22:45</Text>
        </View>
        <View style={S.tile}>
          <Text style={S.tileIcon}>📞</Text>
          <Text style={S.tileTitle}>Telefono</Text>
          <Text style={S.tileVal}>331 5695959{'\n'}011 0362310</Text>
        </View>
      </View>

      <Text style={S.secLabel}>ORDINA ORA</Text>
      <TouchableOpacity style={[S.quickBtn, { backgroundColor: C.rosso, marginBottom: 16 }]} onPress={() => setTab('menu')}>
        <Text style={{ fontSize: 32 }}>🍕</Text>
        <Text style={S.quickLabel}>Ordina ora</Text>
        <Text style={S.quickSub}>Domicilio o asporto</Text>
      </TouchableOpacity>

      <Text style={S.secLabel}>OFFERTE</Text>
      <TouchableOpacity style={S.offerBig} onPress={() => setTab('offers')}>
        <View>
          <Text style={S.offerBigTitle}>Combo Famiglia</Text>
          <Text style={S.offerBigDesc}>4 pizze + 4 dolci a scelta</Text>
          <Text style={{ color: C.oro, fontSize: 12, marginTop: 6, fontStyle: 'italic' }}>4 bibite in omaggio!</Text>
        </View>
        <Text style={{ fontSize: 52 }}>🎁</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const Menu = () => (
    <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16, marginTop: -16, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: C.crema }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {Object.keys(MENU).map(c => (
            <TouchableOpacity key={c} style={[S.catPill, cat === c && S.catPillActive]} onPress={() => setCat(c)}>
              <Text style={{ fontSize: 11 }}>{CAT_EMOJI[c]}</Text>
              <Text style={[S.catPillText, cat === c && S.catPillTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {cat === 'Pane del Forno' && (
        <View style={{ backgroundColor: '#FFF8E7', borderRadius: 12, padding: 12, borderLeftWidth: 4, borderLeftColor: C.oro, marginBottom: 12, marginTop: 8 }}>
          <Text style={{ fontSize: 13, color: '#8B6914', fontWeight: '700' }}>Pane fresco dal forno a legna</Text>
          <Text style={{ fontSize: 11, color: C.grigio, marginTop: 2 }}>Disponibile ogni mattina. Ritiro in pizzeria o consegna a domicilio (+€2.50). Solo preordine per il giorno successivo.</Text>
        </View>
      )}
      {MENU[cat].map(item => {
        const qty = cart.find(c => c.id === item.id)?.qty || 0;
        return (
          <View key={item.id} style={S.card}>
            <View style={[S.cardLeft, item.limitato && { backgroundColor: '#FFF8E7' }]}>
              <Text style={S.cardEmoji}>{CAT_EMOJI[cat]}</Text>
              {item.limitato && <Text style={{ fontSize: 8, color: C.oro, fontWeight: '700', marginTop: 2 }}>LIMITATO</Text>}
            </View>
            <View style={S.cardBody}>
              <Text style={S.cardName}>{item.name}</Text>
              {item.desc ? <Text style={S.cardDesc}>{item.desc}</Text> : null}
              <View style={S.cardFooter}>
                <Text style={S.cardPrice}>€ {item.price.toFixed(2)}</Text>
                {qty === 0 ? (
                  <TouchableOpacity style={S.addBtn} onPress={() => add(item)}>
                    <Text style={S.addBtnText}>+ Aggiungi</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={S.qtyCtrl}>
                    <TouchableOpacity style={S.qtyMinus} onPress={() => remove(item.id)}>
                      <Text style={S.qtyMinusText}>-</Text>
                    </TouchableOpacity>
                    <Text style={S.qtyN}>{qty}</Text>
                    <TouchableOpacity style={S.qtyPlus} onPress={() => add(item)}>
                      <Text style={S.qtyPlusText}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        );
      })}
      <View style={{ height: 20 }} />
    </ScrollView>
  );

  const Offers = () => (
    <ScrollView style={S.scroll}>
      <View style={[S.offerCard, { backgroundColor: C.rosso }]}>
        <Text style={S.offerTitle}>Combo Famiglia</Text>
        <Text style={S.offerDesc}>4 pizze a scelta + 4 dolci a scelta</Text>
        <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 12, marginTop: 12 }}>
          <Text style={{ color: C.oro, fontWeight: '800', fontSize: 14 }}>OMAGGIO INCLUSO</Text>
          <Text style={{ color: 'white', fontSize: 13, marginTop: 4 }}>4 bibite a scelta (escluse birre)</Text>
        </View>
        <TouchableOpacity style={S.offerBtn} onPress={() => setTab('menu')}>
          <Text style={S.offerBtnText}>Ordina ora</Text>
        </TouchableOpacity>
      </View>
      <View style={[S.offerCard, { backgroundColor: C.marrone }]}>
        <Text style={S.offerTitle}>Lunch Express</Text>
        <Text style={S.offerDesc}>Pizza + bibita a pranzo ogni giorno</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginTop: 10 }}>
          <Text style={S.offerPrice}>€ 9,50</Text>
          <Text style={S.offerOld}>€ 13,00</Text>
        </View>
        <TouchableOpacity style={S.offerBtn} onPress={() => setTab('menu')}>
          <Text style={S.offerBtnText}>Ordina ora</Text>
        </TouchableOpacity>
      </View>
      <View style={[S.offerCard, { backgroundColor: '#2C5A2E' }]}>
        <Text style={S.offerTitle}>Pane Fresco</Text>
        <Text style={S.offerDesc}>Filoni artigianali dal forno a legna</Text>
        <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 12, marginTop: 12 }}>
          <Text style={{ color: C.oro, fontWeight: '800', fontSize: 14 }}>OGNI MATTINA</Text>
          <Text style={{ color: 'white', fontSize: 13, marginTop: 4 }}>Solo 4-6 filoni al giorno — prenota!</Text>
        </View>
        <TouchableOpacity style={S.offerBtn} onPress={() => { setCat('Pane del Forno'); setTab('menu'); }}>
          <Text style={S.offerBtnText}>Prenota ora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const screens = {
    home: <Home />,
    menu: <Menu />,
    cart: <CartScreen cart={cart} cartTotal={cartTotal} ordered={ordered} setOrdered={setOrdered} setCart={setCart} setTab={setTab} handleOrder={handleOrder} utente={utente} />,
    offers: <Offers />,
  };

  return (
    <View style={S.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.rosso} />
      <View style={S.header}>
        <View style={S.flagBar}>
          <View style={[S.flagSeg, { backgroundColor: '#2D5A27' }]} />
          <View style={[S.flagSeg, { backgroundColor: '#FFFFFF' }]} />
          <View style={[S.flagSeg, { backgroundColor: C.rosso }]} />
        </View>
        <View style={S.headerInner}>
          <View>
            <Text style={S.headerLogo}>Pizzicata</Text>
            <Text style={S.headerSub}>- TORINO -</Text>
          </View>
          {cartN > 0 && (
            <TouchableOpacity style={S.cartBadge} onPress={() => setTab('cart')}>
              <Text style={{ fontSize: 22 }}>🛒</Text>
              <View style={S.cartDot}><Text style={S.cartDotText}>{cartN}</Text></View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ flex: 1 }}>{screens[tab]}</View>
      <View style={S.navbar}>
        {[
          { key: 'home', icon: '🏠', label: 'Home' },
          { key: 'menu', icon: '🍕', label: 'Menu' },
          { key: 'cart', icon: '🛒', label: 'Ordine' },
          { key: 'offers', icon: '🎁', label: 'Offerte' },
        ].map(n => (
          <TouchableOpacity key={n.key} style={S.navBtn} onPress={() => setTab(n.key)}>
            <Text style={{ fontSize: 22 }}>{n.icon}</Text>
            <Text style={[S.navLabel, tab === n.key && S.navLabelOn]}>{n.label}</Text>
            {tab === n.key && <View style={S.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.crema },
  scroll: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  header: { backgroundColor: C.rosso, paddingTop: 48 },
  flagBar: { flexDirection: 'row', height: 20, borderTopWidth: 2, borderBottomWidth: 2, borderColor: C.oro },
  flagSeg: { flex: 1 },
  headerInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14 },
  headerLogo: { fontSize: 36, fontWeight: '900', color: C.crema, letterSpacing: -1 },
  headerSub: { fontSize: 11, color: C.oro, letterSpacing: 4, marginTop: 1 },
  cartBadge: { position: 'relative', padding: 4 },
  cartDot: { position: 'absolute', top: 0, right: 0, backgroundColor: C.oro, borderRadius: 10, width: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  cartDotText: { fontSize: 10, fontWeight: 'bold', color: C.marrone },
  loginHeader: { backgroundColor: C.rosso, paddingTop: 60, paddingBottom: 24, alignItems: 'center' },
  loginLogo: { fontSize: 42, fontWeight: '900', color: C.crema, letterSpacing: -1 },
  loginSub: { fontSize: 11, color: C.oro, letterSpacing: 4, marginTop: 2 },
  loginBody: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  loginEmoji: { fontSize: 64, marginBottom: 16 },
  loginTitle: { fontSize: 26, fontWeight: '900', color: C.marrone, marginBottom: 8 },
  loginDesc: { fontSize: 14, color: C.grigio, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  loginBox: { width: '100%', gap: 12 },
  heroBanner: { backgroundColor: C.marrone, borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  heroGreeting: { fontSize: 13, color: 'rgba(242,232,213,0.7)', fontStyle: 'italic' },
  heroName: { fontSize: 32, fontWeight: '900', color: C.crema, letterSpacing: -1 },
  heroSlogan: { fontSize: 12, color: C.oro, fontStyle: 'italic', marginTop: 2 },
  paneCard: { backgroundColor: '#FFF8E7', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 2, borderColor: C.oro },
  paneTitolo: { fontSize: 15, fontWeight: '800', color: C.marrone },
  paneSub: { fontSize: 11, color: C.grigio, marginTop: 2 },
  paneBtn: { backgroundColor: C.oro, borderRadius: 10, padding: 10, alignItems: 'center', marginTop: 8 },
  paneBtnText: { color: C.marrone, fontWeight: '800', fontSize: 13 },
  tilesRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  tile: { flex: 1, backgroundColor: 'white', borderRadius: 16, padding: 12, alignItems: 'center' },
  tileIcon: { fontSize: 20, marginBottom: 4 },
  tileTitle: { fontSize: 9, color: C.grigio, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 },
  tileVal: { fontSize: 10, color: C.marrone, fontWeight: '600', textAlign: 'center', lineHeight: 14 },
  secLabel: { fontSize: 10, letterSpacing: 3, color: C.oro, fontWeight: '700', marginBottom: 10, textTransform: 'uppercase' },
  quickBtn: { borderRadius: 20, padding: 20, alignItems: 'center', gap: 4 },
  quickLabel: { fontSize: 18, fontWeight: '800', color: 'white' },
  quickSub: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  offerBig: { backgroundColor: C.marrone, borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  offerBigTitle: { fontSize: 20, fontWeight: '800', color: C.crema },
  offerBigDesc: { fontSize: 12, color: 'rgba(242,232,213,0.7)', marginTop: 2 },
  offerBadge: { backgroundColor: C.oro, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', marginBottom: 6 },
  offerBadgeText: { fontSize: 10, fontWeight: '800', color: C.marrone },
  catScroll: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: C.crema },
  catPill: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: 'white', marginRight: 8, borderWidth: 1.5, borderColor: 'rgba(139,26,26,0.1)' },
  catPillActive: { backgroundColor: C.rosso, borderColor: C.rosso },
  catPillText: { fontSize: 11, color: C.grigio, fontWeight: '600' },
  catPillTextActive: { color: 'white' },
  card: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 16, marginBottom: 10, overflow: 'hidden' },
  cardLeft: { width: 60, backgroundColor: C.cremaScuro, alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
  cardEmoji: { fontSize: 28 },
  cardBody: { flex: 1, padding: 14 },
  cardName: { fontSize: 15, fontWeight: '700', color: C.marrone },
  cardDesc: { fontSize: 11, color: C.grigio, marginTop: 3, lineHeight: 15 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  cardPrice: { fontSize: 18, fontWeight: '800', color: C.rosso },
  addBtn: { backgroundColor: C.rosso, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 7 },
  addBtnText: { color: 'white', fontSize: 12, fontWeight: '700' },
  qtyCtrl: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyMinus: { width: 28, height: 28, borderRadius: 8, backgroundColor: C.cremaScuro, alignItems: 'center', justifyContent: 'center' },
  qtyMinusText: { fontSize: 16, fontWeight: '700', color: C.rosso },
  qtyN: { fontSize: 15, fontWeight: '700', color: C.marrone, minWidth: 18, textAlign: 'center' },
  qtyPlus: { width: 28, height: 28, borderRadius: 8, backgroundColor: C.rosso, alignItems: 'center', justifyContent: 'center' },
  qtyPlusText: { fontSize: 16, fontWeight: '700', color: 'white' },
  formBox: { backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12 },
  formLabel: { fontSize: 11, color: C.grigio, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 },
  typeBtn: { flex: 1, padding: 12, borderRadius: 12, alignItems: 'center', backgroundColor: C.cremaScuro, gap: 4 },
  typeBtnActive: { backgroundColor: C.rosso },
  typeBtnText: { color: C.marrone, fontWeight: '700', fontSize: 13 },
  typeBtnTextActive: { color: 'white' },
  calBtn: { padding: 10, borderRadius: 12, alignItems: 'center', backgroundColor: C.cremaScuro, minWidth: 60 },
  calBtnActive: { backgroundColor: C.rosso },
  calGiorno: { fontSize: 11, fontWeight: '700', color: C.marrone },
  calData: { fontSize: 10, color: C.grigio, marginTop: 2 },
  pagBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, backgroundColor: C.cremaScuro },
  pagBtnActive: { backgroundColor: C.rosso },
  pagLabel: { fontSize: 14, fontWeight: '700', color: C.marrone },
  pagSub: { fontSize: 11, color: C.grigio, marginTop: 1 },
  empty: { alignItems: 'center', paddingTop: 80, gap: 12, paddingHorizontal: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: C.marrone },
  emptySub: { fontSize: 13, color: C.grigio, textAlign: 'center' },
  emptyBtn: { backgroundColor: C.rosso, borderRadius: 14, paddingHorizontal: 28, paddingVertical: 12, marginTop: 8 },
  emptyBtnText: { color: 'white', fontWeight: '700', fontSize: 14 },
  cartCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 14, padding: 14, marginBottom: 10, gap: 12 },
  cartName: { fontSize: 14, fontWeight: '700', color: C.marrone },
  cartPrice: { fontSize: 13, color: C.rosso, marginTop: 2 },
  totalCard: { backgroundColor: 'white', borderRadius: 16, padding: 18, marginBottom: 14 },
  totalRow: { fontSize: 13, color: C.grigio },
  totalBig: { fontSize: 18, fontWeight: '800', color: C.marrone },
  checkoutBtn: { backgroundColor: C.rosso, borderRadius: 18, padding: 18, alignItems: 'center', marginBottom: 30 },
  checkoutText: { color: 'white', fontSize: 16, fontWeight: '800' },
  offerCard: { borderRadius: 20, padding: 22, marginBottom: 14 },
  offerTitle: { fontSize: 22, fontWeight: '800', color: C.crema },
  offerDesc: { fontSize: 12, color: 'rgba(242,232,213,0.75)', marginTop: 3 },
  offerPrice: { fontSize: 30, fontWeight: '900', color: C.oro },
  offerOld: { fontSize: 15, color: 'rgba(242,232,213,0.4)', textDecorationLine: 'line-through', paddingBottom: 4 },
  offerBtn: { backgroundColor: C.crema, borderRadius: 12, padding: 12, alignItems: 'center', marginTop: 14 },
  offerBtnText: { fontWeight: '800', color: C.marrone, fontSize: 13 },
  errore: { color: C.rosso, textAlign: 'center', marginBottom: 12, fontWeight: '700' },
  navbar: { backgroundColor: C.marrone, flexDirection: 'row', paddingBottom: 24, paddingTop: 10, borderTopWidth: 3, borderTopColor: C.rosso },
  navBtn: { flex: 1, alignItems: 'center', gap: 2 },
  navLabel: { fontSize: 9, color: 'rgba(242,232,213,0.35)', letterSpacing: 0.5, fontWeight: '600' },
  navLabelOn: { color: C.oro },
  navDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.oro, marginTop: 2 },
});