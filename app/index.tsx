import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
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
  'Pizze Rosse': [
    { id: 1, name: 'Margherita', desc: 'Pomodoro, Mozzarella, Basilico', price: 6.00 },
    { id: 2, name: 'Marinara', desc: "Pomodoro, Olio all'aglio, Origano", price: 5.00 },
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
    { id: 21, name: 'Certosino', desc: 'Mozzarella, Certosino', price: 7.00 },
    { id: 22, name: '4 Stagioni', desc: 'Mozzarella, Cotto, Olive, Carciofi, Funghi', price: 8.00 },
    { id: 23, name: 'Bufala', desc: 'Mozzarella di Bufala, Pomodorini, Origano', price: 8.50 },
    { id: 24, name: 'Campagnola', desc: 'Mozzarella, Fontina, Salsiccia, Zucchine, Grana', price: 8.50 },
    { id: 25, name: 'Ghiottona', desc: 'Mozzarella, Salsiccia, Grana, Verdure, Bacon', price: 9.00 },
    { id: 26, name: 'Giambone', desc: 'Mozzarella, Pomodorini, Tonno, Zucchine, Cipolla, Rucola, Grana', price: 9.00 },
    { id: 27, name: 'Golden', desc: 'Mozzarella, Cipolla, Funghi, Salsiccia, Grana, Olio al tartufo', price: 10.50 },
    { id: 28, name: 'Nduja Bianca', desc: "Mozzarella, Nduja, Salsiccia, Cipolla, Basilico", price: 9.00 },
    { id: 29, name: 'Nonno Federico', desc: 'Mozzarella, Gorgonzola, Cipolla, Salsiccia, Peperoni, Uovo', price: 9.00 },
    { id: 30, name: 'Nova', desc: 'Mozzarella, Salsiccia, Burrata', price: 10.00 },
    { id: 31, name: 'Ortolana', desc: 'Mozzarella, Pomodorini, Peperoni, Melanzane, Zucchine, Cipolla', price: 8.00 },
    { id: 32, name: 'Saporita', desc: 'Mozzarella, Funghi, Scamorza', price: 8.50 },
    { id: 33, name: 'Sfiziosa', desc: 'Mozzarella, Certosino, Salsiccia, Salsa', price: 8.50 },
    { id: 34, name: 'Simpatica', desc: 'Mozzarella, Funghi, Olive, Fontina, Gorgo', price: 8.50 },
  ],
  'Pizze Speciali': [
    { id: 35, name: '3 Porcellini', desc: 'Pomodoro, Mozzarella, Wurstel, Salsiccia, Salamino', price: 9.00 },
    { id: 36, name: 'Bismark', desc: 'Pomodoro, Mozzarella, Bacon, Salsiccia, Patatine, Salsa Burger', price: 9.50 },
    { id: 37, name: 'Boscaiola', desc: 'Pomodoro, Mozzarella, Cotto, Scamorza, Salsiccia, Grana', price: 9.00 },
    { id: 38, name: 'Gourmet', desc: 'Funghi, Cipolla, Carciofi, Certosino, Olio al tartufo, Grana', price: 10.50 },
    { id: 39, name: 'Gustosa', desc: 'Pomodorini, Mozzarella, Salsiccia, Salamino, Olive, Bacon', price: 9.00 },
    { id: 40, name: 'La 4 Mori', desc: 'Mozzarella, Pomodorini, Salsiccia, Grana', price: 8.50 },
  ],
  'Limited Edition': [
    { id: 41, name: 'Elio', desc: 'Pomodoro, Mozzarella, Salsiccia, Gorgonzola, Zucchine', price: 7.00 },
    { id: 42, name: 'Yammie-Ja', desc: 'Crema di Cipolla, Mozzarella, Salsiccia, Bacon, Nduja', price: 11.00 },
    { id: 43, name: 'Gioia', desc: 'Mozzarella, Pomodorini, Crocchette, Bacon, Grana, Scamorza, Nduja', price: 12.00 },
    { id: 44, name: 'A Pork', desc: 'Mozzarella, Cipolla, Pulled Pork, Insalata, Salsa BBQ, Cheddar', price: 15.00 },
    { id: 45, name: 'Primavera', desc: 'Mozzarella, Zucchine, Melanzane, Peperoni, Tonno, Grana', price: 12.00 },
    { id: 46, name: 'Supernova', desc: 'Pomodoro, Soppressata, Salsiccia, Nduja, Burrata', price: 12.00 },
  ],
  'Focacce': [
    { id: 47, name: 'Balsamica', desc: 'Certosino, Rucola, Pomodorini, Grana, Speck, Glassa balsamica', price: 10.50 },
    { id: 48, name: 'Burrata', desc: 'Pomodorini, Rucola, Crudo, Burrata, Grana, Olio EVO', price: 12.50 },
    { id: 49, name: 'Bruschetta', desc: 'Pomodorini, Olio, Sale, Origano, Basilico', price: 6.50 },
    { id: 50, name: 'Italia', desc: 'Pomodorini, Rucola, Bufala', price: 8.50 },
    { id: 51, name: 'Prosciutto Crudo', desc: '', price: 7.50 },
    { id: 52, name: 'Speck', desc: '', price: 7.00 },
    { id: 53, name: 'Tropea', desc: 'Pomodorini, Cipolla, Olio, Sale, Origano', price: 7.00 },
    { id: 54, name: 'Montebianco', desc: 'Pomodorini, Rucola, Crudo, Bufala, Grana, Olio EVO', price: 10.00 },
  ],
  'Calzoni': [
    { id: 55, name: 'Calzone della Casa', desc: 'Pomodoro, Mozzarella di Bufala, Cotto, Grana', price: 9.00 },
    { id: 56, name: 'Calzone Doppio', desc: 'Pomodoro, Bufala, Gorgonzola, Cipolla, Cotto, Funghi', price: 12.50 },
    { id: 57, name: 'Calzone Goloso', desc: 'Pomodoro, Bufala, Friarielli, Soppressata', price: 9.00 },
    { id: 58, name: 'Calzone Gustoso', desc: 'Pomodoro, Bufala, Scamorza, Friarielli', price: 9.00 },
  ],
  'Panuozzi': [
    { id: 59, name: 'U Pork', desc: 'Cipolla, Pomodorini, Pulled Pork, Insalata, Salsa BBQ, Cheddar', price: 15.00 },
    { id: 60, name: 'Americano', desc: 'Wurstel, Patatine, Ketchup, Maionese', price: 10.00 },
    { id: 61, name: 'Balsamico', desc: 'Speck, Rucola, Certosino, Aceto Balsamico', price: 10.00 },
    { id: 62, name: 'Boscaiolo', desc: 'Funghi, Bacon, Salsiccia, Salsa BBQ', price: 10.00 },
    { id: 63, name: 'Calabrese', desc: 'Scamorza, Soppressata, Nduja, Pomodorini, Cipolla', price: 10.00 },
    { id: 64, name: 'Classico', desc: 'Salsiccia, Friarielli, Scamorza', price: 10.00 },
    { id: 65, name: 'Estivo', desc: 'Prosciutto Crudo, Burrata', price: 10.00 },
    { id: 66, name: 'Fresco', desc: 'Prosciutto Crudo, Insalata, Pomodorini, Bufala', price: 10.00 },
    { id: 67, name: 'Hamburger', desc: 'Hamburger di Fassona, Maionese e Ketchup', price: 10.00 },
    { id: 68, name: 'Mediterraneo', desc: 'Tonno, Pomodorini, Carciofi, Maionese', price: 10.00 },
    { id: 69, name: 'Porcaro', desc: 'Salsiccia, Peperoni, Salsa Hamburger', price: 10.00 },
    { id: 70, name: 'Valdostano', desc: 'Cotto, Fontina, Mozzarella, Maionese', price: 10.00 },
    { id: 71, name: 'Vegetariano', desc: 'Funghi, Peperoni, Melanzane, Friarielli', price: 10.00 },
  ],
  'Hamburger': [
    { id: 72, name: 'Capo', desc: 'Hamburger, Lattuga, Pomodoro, Cipolla, Fontina, Bacon, BBQ', price: 10.00 },
    { id: 73, name: 'Ciccio', desc: 'Hamburger, Lattuga, Pomodoro, Cheddar, Bacon, Ketchup, Mayonese', price: 10.00 },
    { id: 74, name: 'Fanalino di Coda', desc: 'Hamburger, Soppressata, Peperoni, Cipolla, Fontina, Lattuga, BBQ', price: 12.00 },
    { id: 75, name: 'Il Lordone', desc: 'Doppio Hamburger, Doppio Cheddar, Bacon, Lattuga, Salsa Pizzicata', price: 18.00 },
    { id: 76, name: 'Ultra Pork Burger', desc: 'Hamburger di Fasona, Pulled Pork, Doppio Bacon, Doppio Cheddar, BBQ', price: 20.00 },
    { id: 77, name: 'Menu Panino', desc: 'Hamburger, Lattuga, Pomodoro, Cheddar, Ketchup + patatine e bibita', price: 14.00 },
  ],
  'Farinata': [
    { id: 78, name: 'Classica', desc: '', price: 3.50 },
    { id: 79, name: 'con Burrata', desc: '', price: 7.00 },
    { id: 80, name: 'al Lardo', desc: '', price: 5.00 },
    { id: 81, name: 'ai Formaggi', desc: '', price: 5.00 },
    { id: 82, name: 'Cotto e Mozzarella', desc: '', price: 5.00 },
    { id: 83, name: 'Fontina e Soppressata', desc: '', price: 5.00 },
    { id: 84, name: 'Friarielli e Salsiccia', desc: '', price: 5.00 },
    { id: 85, name: 'Gorgo e Cipolla', desc: '', price: 5.00 },
    { id: 86, name: 'con Mortadella', desc: '', price: 5.00 },
    { id: 87, name: 'Scamorza e Salamino', desc: '', price: 5.00 },
    { id: 88, name: 'Fargherita', desc: 'Pomodoro e Mozzarella', price: 5.00 },
  ],
  'Fritti': [
    { id: 89, name: 'Chiacchiere Semplici', desc: 'Chiacchiere Napoletane', price: 4.00 },
    { id: 90, name: 'Chiacchiere al Crudo', desc: '', price: 7.00 },
    { id: 91, name: 'Chiacchiere al Sugo', desc: '', price: 5.50 },
    { id: 92, name: 'Chiacchiere con Burrata', desc: '', price: 9.00 },
    { id: 93, name: 'Chiacchiere Tris', desc: 'Cotto, Crudo e Mortadella', price: 8.00 },
    { id: 94, name: 'Crocchette di Patate', desc: '8 pezzi', price: 4.00 },
    { id: 95, name: "Olive all'Ascolana", desc: '9 pezzi', price: 4.50 },
    { id: 96, name: 'Nuggets di Pollo', desc: '8 pezzi', price: 7.00 },
    { id: 97, name: 'Panelle', desc: '8 pezzi', price: 5.00 },
    { id: 98, name: 'Patatine Fritte', desc: 'Porzione', price: 4.00 },
    { id: 99, name: 'Scugnizzi Fritti', desc: 'Ripieni di Speck e Formaggio', price: 4.00 },
    { id: 100, name: 'Suppli Romani', desc: '', price: 7.00 },
  ],
  'Dolci': [
    { id: 101, name: 'Cannoli Siciliani', desc: '', price: 4.00 },
    { id: 102, name: 'Cheesecake alla Fragola', desc: '', price: 4.00 },
    { id: 103, name: 'Chiacchiere con Zucchero', desc: '', price: 5.00 },
    { id: 104, name: 'Chiacchiere con Nutella', desc: '', price: 6.00 },
    { id: 105, name: 'Focaccia alla Nutella', desc: '', price: 7.00 },
    { id: 106, name: 'Profiterol', desc: '', price: 4.00 },
    { id: 107, name: 'Semifreddo al Cocco', desc: '', price: 4.50 },
    { id: 108, name: 'Sorbetto al Limone', desc: '', price: 4.50 },
    { id: 109, name: 'Tiramisu', desc: '', price: 4.50 },
    { id: 110, name: 'Tortino Ricotta e Cioccolato', desc: '', price: 4.50 },
    { id: 111, name: 'Tortino Ricotta e Pere', desc: '', price: 4.00 },
    { id: 112, name: 'Zuppa Inglese', desc: '', price: 3.50 },
  ],
  'Bevande': [
    { id: 113, name: 'Acqua Naturale', price: 1.00 },
    { id: 114, name: 'Acqua Frizzante', price: 1.00 },
    { id: 115, name: 'Coca Cola', desc: '', price: 2.50 },
    { id: 116, name: 'Fanta', desc: '', price: 2.50 },
    { id: 117, name: 'Sprite', desc: '', price: 2.50 },
    { id: 118, name: 'Chinotto', desc: '', price: 2.50 },
    { id: 119, name: 'Estathe', desc: '', price: 2.50 },
    { id: 120, name: 'becks 33cl', desc: '', price: 3.00 },
    { id: 121, name: 'Menabrea 33cl', desc: '', price: 3.00 },
    { id: 122, name: 'Ichnusa 33cl', desc: '', price: 3.00 },
    { id: 123, name: 'Ichnusa Non Filtrata 50cl', desc: '', price: 3.50 },
    { id: 124, name: 'Moretti 66cl', desc: '', price: 3.50 },
    { id: 125, name: 'Aperol Spritz', desc: '', price: 3.50 },
  ],
};

const CAT_EMOJI = {
  'Pizze Rosse': '🍕', 'Pizze Bianche': '🍕', 'Pizze Speciali': '⭐',
  'Limited Edition': '🔥', 'Focacce': '🫓', 'Calzoni': '🥙',
  'Panuozzi': '🥪', 'Hamburger': '🍔', 'Farinata': '🫓',
  'Fritti': '🍟', 'Dolci': '🍰', 'Bevande': '🥤',
};

export default function App() {
  const [tab, setTab] = useState('home');
  const [cat, setCat] = useState('Pizze Rosse');
  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);

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

  const handleOrder = async () => {
    try {
      await supabase.from('ordini').insert([{
        cliente: 'Cliente App',
        items: JSON.stringify(cart.map(i => ({ name: i.name, qty: i.qty, price: i.price }))),
        totale: cartTotal + 2.5,
        stato: 'nuovo'
      }]);
    } catch (e) {
      console.log('Errore ordine:', e);
    }
    setOrdered(true);
  };

  const Home = () => (
    <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
      <View style={S.heroBanner}>
        <View>
          <Text style={S.heroGreeting}>Benvenuto da</Text>
          <Text style={S.heroName}>Pizzicata</Text>
          <Text style={S.heroSlogan}>e che pizza... ragazzi!</Text>
        </View>
        <Text style={{ fontSize: 70 }}>🍕</Text>
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
          <Text style={S.tileVal}>12:00-14:30{'\n'}18:00-23:00</Text>
        </View>
        <View style={S.tile}>
          <Text style={S.tileIcon}>📞</Text>
          <Text style={S.tileTitle}>Telefono</Text>
          <Text style={S.tileVal}>331 5695959{'\n'}011 0362310</Text>
        </View>
      </View>
      <Text style={S.secLabel}>ORDINA ORA</Text>
      <View style={S.quickRow}>
        <TouchableOpacity style={[S.quickBtn, { backgroundColor: C.rosso }]} onPress={() => setTab('menu')}>
          <Text style={{ fontSize: 32 }}>🛵</Text>
          <Text style={S.quickLabel}>Delivery</Text>
          <Text style={S.quickSub}>A casa tua</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[S.quickBtn, { backgroundColor: C.marrone }]} onPress={() => setTab('menu')}>
          <Text style={{ fontSize: 32 }}>🛍️</Text>
          <Text style={S.quickLabel}>Asporto</Text>
          <Text style={S.quickSub}>Ritiro in negozio</Text>
        </TouchableOpacity>
      </View>
      <Text style={S.secLabel}>OFFERTA DEL GIORNO</Text>
      <TouchableOpacity style={S.offerBig} onPress={() => setTab('offers')}>
        <View>
          <View style={S.offerBadge}><Text style={S.offerBadgeText}>-27%</Text></View>
          <Text style={S.offerBigTitle}>Lunch Express</Text>
          <Text style={S.offerBigDesc}>Pizza + bibita a pranzo</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginTop: 8 }}>
            <Text style={S.offerBigPrice}>9,50</Text>
            <Text style={S.offerBigOld}>13,00</Text>
          </View>
        </View>
        <Text style={{ fontSize: 64 }}>🍕</Text>
      </TouchableOpacity>
      <TouchableOpacity style={S.fidelityTeaser} onPress={() => setTab('fidelity')}>
        <Text style={{ fontSize: 28 }}>⭐</Text>
        <View style={{ flex: 1 }}>
          <Text style={S.fidelityTeaserTitle}>La tua Fidelity Card</Text>
          <Text style={S.fidelityTeaserSub}>7/10 timbri - ancora 3 per la pizza gratis!</Text>
        </View>
        <Text style={{ color: C.oro, fontSize: 18 }}>›</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const Menu = () => (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={S.catScroll}>
        {Object.keys(MENU).map(c => (
          <TouchableOpacity key={c} style={[S.catPill, cat === c && S.catPillActive]} onPress={() => setCat(c)}>
            <Text style={{ fontSize: 13 }}>{CAT_EMOJI[c]}</Text>
            <Text style={[S.catPillText, cat === c && S.catPillTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
        {MENU[cat].map(item => {
          const qty = cart.find(c => c.id === item.id)?.qty || 0;
          return (
            <View key={item.id} style={S.card}>
              <View style={S.cardLeft}>
                <Text style={S.cardEmoji}>{CAT_EMOJI[cat]}</Text>
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
    </View>
  );

  const Cart = () => {
    if (ordered) return (
      <View style={S.empty}>
        <Text style={{ fontSize: 80 }}>🎉</Text>
        <Text style={S.emptyTitle}>Ordine inviato!</Text>
        <Text style={S.emptySub}>Ti contatteremo presto per confermare.</Text>
        <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 20, marginTop: 16, width: '100%', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: C.grigio }}>Tempo stimato</Text>
          <Text style={{ fontSize: 32, fontWeight: '900', color: C.rosso, marginTop: 4 }}>30-45 min</Text>
        </View>
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
                <Text style={{ fontSize: 28 }}>🍕</Text>
                <View style={{ flex: 1 }}>
                  <Text style={S.cartName}>{item.name}</Text>
                  <Text style={S.cartPrice}>€ {(item.price * item.qty).toFixed(2)}</Text>
                </View>
                <View style={S.qtyCtrl}>
                  <TouchableOpacity style={S.qtyMinus} onPress={() => remove(item.id)}>
                    <Text style={S.qtyMinusText}>-</Text>
                  </TouchableOpacity>
                  <Text style={S.qtyN}>{item.qty}</Text>
                  <TouchableOpacity style={S.qtyPlus} onPress={() => add(item)}>
                    <Text style={S.qtyPlusText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={S.totalCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={S.totalRow}>Subtotale</Text>
                <Text style={S.totalRow}>€ {cartTotal.toFixed(2)}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={S.totalRow}>Consegna</Text>
                <Text style={S.totalRow}>€ 2.50</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={S.totalBig}>Totale</Text>
                <Text style={[S.totalBig, { color: C.rosso }]}>€ {(cartTotal + 2.5).toFixed(2)}</Text>
              </View>
            </View>
            <TouchableOpacity style={S.checkoutBtn} onPress={handleOrder}>
              <Text style={S.checkoutText}>Conferma Ordine</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    );
  };

  const Offers = () => (
    <ScrollView style={S.scroll}>
      {[
        { title: 'Combo Serata', desc: '2 pizze + 2 bibite', price: 18, old: 24, tag: '-25%', color: C.rosso },
        { title: 'Lunch Express', desc: 'Pizza + bibita a pranzo', price: 9.5, old: 13, tag: '-27%', color: C.marrone },
        { title: 'Famiglia Felice', desc: '4 pizze + 4 bibite + dolce', price: 38, old: 52, tag: '-27%', color: '#2C5A2E' },
      ].map((o, i) => (
        <View key={i} style={[S.offerCard, { backgroundColor: o.color }]}>
          <View style={S.offerTag}><Text style={S.offerTagText}>{o.tag}</Text></View>
          <Text style={S.offerTitle}>{o.title}</Text>
          <Text style={S.offerDesc}>{o.desc}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginTop: 10 }}>
            <Text style={S.offerPrice}>€ {o.price.toFixed(2)}</Text>
            <Text style={S.offerOld}>€ {o.old.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={S.offerBtn}>
            <Text style={S.offerBtnText}>Riscatta ora</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const Fidelity = () => (
    <ScrollView style={S.scroll}>
      <View style={S.fidCard}>
        <Text style={S.fidCardTitle}>La tua Fidelity Card</Text>
        <Text style={S.fidPoints}>340</Text>
        <Text style={S.fidPointsLabel}>PUNTI</Text>
        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 16 }} />
        <Text style={S.fidStampsLabel}>TIMBRI - 7 / 10</Text>
        <View style={S.stampsRow}>
          {Array.from({ length: 10 }).map((_, i) => (
            <View key={i} style={[S.stamp, i < 7 && S.stampOn]}>
              <Text style={{ fontSize: i < 7 ? 18 : 12 }}>{i < 7 ? '🍕' : '·'}</Text>
            </View>
          ))}
        </View>
        <Text style={S.fidNote}>ancora 3 pizze per ottenere 1 pizza gratis!</Text>
      </View>
      <View style={S.howCard}>
        <Text style={[S.secLabel, { marginBottom: 12 }]}>COME FUNZIONA</Text>
        {[
          ['🍕', 'Ogni pizza ordinata = 1 timbro'],
          ['🎁', '10 timbri = 1 pizza gratuita'],
          ['⭐', 'Ogni 10 euro spesi = 10 punti'],
          ['🏆', '100 punti = 5 euro di sconto'],
        ].map(([e, t], i) => (
          <View key={i} style={S.howRow}>
            <Text style={{ fontSize: 22 }}>{e}</Text>
            <Text style={S.howText}>{t}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const screens = { home: Home, menu: Menu, cart: Cart, offers: Offers, fidelity: Fidelity };
  const Screen = screens[tab];

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
      <View style={{ flex: 1 }}><Screen /></View>
      <View style={S.navbar}>
        {[
          { key: 'home', icon: '🏠', label: 'Home' },
          { key: 'menu', icon: '🍕', label: 'Menu' },
          { key: 'cart', icon: '🛒', label: 'Ordine' },
          { key: 'offers', icon: '🎁', label: 'Offerte' },
          { key: 'fidelity', icon: '⭐', label: 'Fidelity' },
        ].map(n => (
          <TouchableOpacity key={n.key} style={S.navBtn} onPress={() => setTab(n.key)}>
            <Text style={{ fontSize: 20 }}>{n.icon}</Text>
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
  flagBar: { flexDirection: 'row', height: 5 },
  flagSeg: { flex: 1 },
  headerInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14 },
  headerLogo: { fontSize: 36, fontWeight: '900', color: C.crema, letterSpacing: -1 },
  headerSub: { fontSize: 11, color: C.oro, letterSpacing: 4, marginTop: 1 },
  cartBadge: { position: 'relative', padding: 4 },
  cartDot: { position: 'absolute', top: 0, right: 0, backgroundColor: C.oro, borderRadius: 10, width: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  cartDotText: { fontSize: 10, fontWeight: 'bold', color: C.marrone },
  heroBanner: { backgroundColor: C.rosso, borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  heroGreeting: { fontSize: 13, color: 'rgba(242,232,213,0.7)', fontStyle: 'italic' },
  heroName: { fontSize: 32, fontWeight: '900', color: C.crema, letterSpacing: -1 },
  heroSlogan: { fontSize: 12, color: C.oro, fontStyle: 'italic', marginTop: 2 },
  tilesRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  tile: { flex: 1, backgroundColor: 'white', borderRadius: 16, padding: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  tileIcon: { fontSize: 20, marginBottom: 4 },
  tileTitle: { fontSize: 9, color: C.grigio, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 },
  tileVal: { fontSize: 10, color: C.marrone, fontWeight: '600', textAlign: 'center', lineHeight: 14 },
  secLabel: { fontSize: 10, letterSpacing: 3, color: C.oro, fontWeight: '700', marginBottom: 10, textTransform: 'uppercase' },
  quickRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  quickBtn: { flex: 1, borderRadius: 20, padding: 18, alignItems: 'center', gap: 4, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, elevation: 4 },
  quickLabel: { fontSize: 15, fontWeight: '800', color: 'white' },
  quickSub: { fontSize: 10, color: 'rgba(255,255,255,0.7)' },
  offerBig: { backgroundColor: C.marrone, borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  offerBadge: { backgroundColor: C.oro, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', marginBottom: 6 },
  offerBadgeText: { fontSize: 10, fontWeight: '800', color: C.marrone },
  offerBigTitle: { fontSize: 20, fontWeight: '800', color: C.crema },
  offerBigDesc: { fontSize: 12, color: 'rgba(242,232,213,0.7)', marginTop: 2 },
  offerBigPrice: { fontSize: 30, fontWeight: '900', color: C.oro },
  offerBigOld: { fontSize: 14, color: 'rgba(242,232,213,0.4)', textDecorationLine: 'line-through', paddingBottom: 4 },
  fidelityTeaser: { backgroundColor: 'white', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  fidelityTeaserTitle: { fontSize: 14, fontWeight: '700', color: C.marrone },
  fidelityTeaserSub: { fontSize: 11, color: C.grigio, marginTop: 2 },
  catScroll: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: C.crema },
  catPill: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: 'white', marginRight: 8, borderWidth: 1.5, borderColor: 'rgba(139,26,26,0.1)' },
  catPillActive: { backgroundColor: C.rosso, borderColor: C.rosso },
  catPillText: { fontSize: 11, color: C.grigio, fontWeight: '600' },
  catPillTextActive: { color: 'white' },
  card: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 16, marginBottom: 10, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardLeft: { width: 60, backgroundColor: C.cremaScuro, alignItems: 'center', justifyContent: 'center' },
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
  empty: { alignItems: 'center', paddingTop: 80, gap: 12, paddingHorizontal: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: C.marrone },
  emptySub: { fontSize: 13, color: C.grigio, textAlign: 'center' },
  emptyBtn: { backgroundColor: C.rosso, borderRadius: 14, paddingHorizontal: 28, paddingVertical: 12, marginTop: 8 },
  emptyBtnText: { color: 'white', fontWeight: '700', fontSize: 14 },
  cartCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 14, padding: 14, marginBottom: 10, gap: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cartName: { fontSize: 14, fontWeight: '700', color: C.marrone },
  cartPrice: { fontSize: 13, color: C.rosso, marginTop: 2 },
  totalCard: { backgroundColor: 'white', borderRadius: 16, padding: 18, marginBottom: 14 },
  totalRow: { fontSize: 13, color: C.grigio },
  totalBig: { fontSize: 18, fontWeight: '800', color: C.marrone },
  checkoutBtn: { backgroundColor: C.rosso, borderRadius: 18, padding: 18, alignItems: 'center', marginBottom: 30 },
  checkoutText: { color: 'white', fontSize: 16, fontWeight: '800' },
  offerCard: { borderRadius: 20, padding: 22, marginBottom: 14 },
  offerTag: { backgroundColor: C.oro, alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 8 },
  offerTagText: { fontSize: 11, fontWeight: '800', color: C.marrone },
  offerTitle: { fontSize: 22, fontWeight: '800', color: C.crema },
  offerDesc: { fontSize: 12, color: 'rgba(242,232,213,0.75)', marginTop: 3 },
  offerPrice: { fontSize: 30, fontWeight: '900', color: C.oro },
  offerOld: { fontSize: 15, color: 'rgba(242,232,213,0.4)', textDecorationLine: 'line-through', paddingBottom: 4 },
  offerBtn: { backgroundColor: C.crema, borderRadius: 12, padding: 12, alignItems: 'center', marginTop: 14 },
  offerBtnText: { fontWeight: '800', color: C.marrone, fontSize: 13 },
  fidCard: { backgroundColor: C.marrone, borderRadius: 24, padding: 24, marginBottom: 16, alignItems: 'center' },
  fidCardTitle: { fontSize: 16, fontWeight: '700', color: C.crema, marginBottom: 10 },
  fidPoints: { fontSize: 52, fontWeight: '900', color: C.oro, lineHeight: 56 },
  fidPointsLabel: { fontSize: 10, color: 'rgba(200,150,30,0.6)', letterSpacing: 3 },
  fidStampsLabel: { fontSize: 10, color: 'rgba(242,232,213,0.5)', letterSpacing: 2, marginBottom: 12 },
  stampsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 14 },
  stamp: { width: 46, height: 46, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.07)', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: 'rgba(200,150,30,0.25)' },
  stampOn: { backgroundColor: C.rosso, borderColor: C.rosso },
  fidNote: { fontSize: 11, color: 'rgba(242,232,213,0.5)', fontStyle: 'italic', textAlign: 'center' },
  howCard: { backgroundColor: 'white', borderRadius: 20, padding: 20, marginBottom: 30 },
  howRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.cremaScuro },
  howText: { fontSize: 13, color: C.marrone, fontWeight: '500' },
  navbar: { backgroundColor: C.marrone, flexDirection: 'row', paddingBottom: 24, paddingTop: 10, borderTopWidth: 3, borderTopColor: C.rosso },
  navBtn: { flex: 1, alignItems: 'center', gap: 2 },
  navLabel: { fontSize: 9, color: 'rgba(242,232,213,0.35)', letterSpacing: 0.5, fontWeight: '600' },
  navLabelOn: { color: C.oro },
  navDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.oro, marginTop: 2 },
});