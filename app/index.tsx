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
  'Pane del Forno': [
    { id: 200, name: 'Filone Classico', desc: 'Pane artigianale 500gr, cotto nel forno a legna. Disponibile ogni mattina.', price: 1.50, limitato: true },
    { id: 201, name: 'Filone Integrale', desc: 'Pane integrale artigianale 500gr, dal forno a legna. Disponibile ogni mattina.', price: 2.00, limitato: true },
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

// Helper combo: classifica un articolo per la Combo Famiglia
const isPizzaCombo = (id) => id >= 1 && id <= 66;       // tutte le pizze
const isDolceCombo = (id) => id >= 102 && id <= 113;    // dolci
const isBibitaCombo = (id) => id >= 114 && id <= 122;   // bibite analcoliche (no birre/spritz)

// --- AGGIUNTE / EXTRA ---
// Categorie su cui si possono fare aggiunte
const CATEGORIE_CON_AGGIUNTE = ['Pizze Rosse', 'Pizze Bianche', 'Pizze Speciali', 'Limited Edition', 'Focacce', 'Calzoni', 'Panuozzi', 'Hamburger', 'Farinata'];

// Impasto integrale (solo pizze/focacce ecc., non farinata che non ha impasto a lievitazione classica - ma lo lasciamo su tutto per semplicità tranne farinata)
const IMPASTO_INTEGRALE = { nome: 'Impasto integrale', prezzo: 1.00 };

// Lista aggiunte ingredienti, raggruppate per prezzo
const AGGIUNTE = [
  // +1,00 €
  { nome: 'Würstel', prezzo: 1.00 },
  { nome: 'Salsiccia', prezzo: 1.00 },
  { nome: 'Bacon', prezzo: 1.00 },
  { nome: 'Pomodorini', prezzo: 1.00 },
  { nome: 'Funghi', prezzo: 1.00 },
  { nome: 'Olive', prezzo: 1.00 },
  { nome: 'Prosciutto cotto', prezzo: 1.00 },
  { nome: 'Carciofi', prezzo: 1.00 },
  { nome: 'Peperoni', prezzo: 1.00 },
  { nome: 'Salamino', prezzo: 1.00 },
  { nome: 'Brie', prezzo: 1.00 },
  { nome: 'Fontina', prezzo: 1.00 },
  { nome: 'Gorgonzola', prezzo: 1.00 },
  { nome: 'Cipolla', prezzo: 1.00 },
  { nome: 'Certosino', prezzo: 1.00 },
  { nome: 'Zucchine', prezzo: 1.00 },
  { nome: 'Melanzane', prezzo: 1.00 },
  { nome: 'Friarielli', prezzo: 1.00 },
  { nome: 'Grana', prezzo: 1.00 },
  { nome: 'Soppressata', prezzo: 1.00 },
  { nome: 'Scamorza', prezzo: 1.00 },
  { nome: 'Acciughe', prezzo: 1.00 },
  { nome: 'Capperi', prezzo: 1.00 },
  { nome: 'Rinforzo mozzarella', prezzo: 1.00 },
  { nome: 'Rinforzo salsa di pomodoro', prezzo: 1.00 },
  { nome: 'Patatine fritte', prezzo: 1.50 },
  // +2,50 €
  { nome: 'Bufala', prezzo: 2.50 },
  { nome: 'Crudo', prezzo: 2.50 },
  { nome: 'Speck', prezzo: 2.50 },
  // +4,00 €
  { nome: 'Burrata', prezzo: 4.00 },
];

// Stato ordine: etichetta e colore per il cliente
const STATO_INFO = {
  nuovo: { label: 'In attesa di conferma', colore: '#8B7355', step: 0 },
  in_lavorazione: { label: 'Accettato, in preparazione', colore: '#C8961E', step: 1 },
  pronto: { label: 'In consegna', colore: '#2C5A2E', step: 2 },
  consegnato: { label: 'Consegnato', colore: '#2C5A2E', step: 3 },
  rifiutato: { label: 'Rifiutato', colore: '#8B1A1A', step: -1 },
};
const STATO_STEPS = ['nuovo', 'in_lavorazione', 'pronto', 'consegnato'];

const ORARI_SERA_FULL = ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '22:45'];
const ORARI_PRANZO_FULL = ['12:30', '13:00', '13:30', '14:00'];
const ORARI_PANE = ['Mattina (9:00-12:00)', 'Sera (18:00-22:45)'];

// Restituisce gli orari disponibili per "oggi" in base all'ora corrente
// Per i giorni futuri restituisce sempre tutti gli orari
const getOrariDisponibili = (isOggi: boolean) => {
  if (!isOggi) return [...ORARI_PRANZO_FULL, ...ORARI_SERA_FULL];
  const ora = new Date().getHours();
  const minuti = new Date().getMinutes();
  const oraDecimale = ora + minuti / 60;
  // Pranzo disponibile: tra 12:00 e 14:30 (apertura 12:00, primo slot 30min dopo = 12:30)
  // Sera disponibile: tra 18:00 e 22:45 (apertura 18:00, primo slot 30min dopo = 18:30)
  if (oraDecimale < 14.5) {
    // Siamo ancora nel pranzo o prima: mostra pranzo filtrato + sera
    const pranziFiltrati = ORARI_PRANZO_FULL.filter(o => {
      const [h, m] = o.split(':').map(Number);
      return (h + m / 60) > oraDecimale + 0.3; // almeno 20 min nel futuro
    });
    return [...pranziFiltrati, ...ORARI_SERA_FULL];
  }
  if (oraDecimale < 18.5) {
    // Pranzo finito, sera non ancora aperta
    return ORARI_SERA_FULL;
  }
  // Siamo a cena: mostra solo orari sera futuri
  return ORARI_SERA_FULL.filter(o => {
    const [h, m] = o.split(':').map(Number);
    return (h + m / 60) > oraDecimale + 0.3;
  });
};

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
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [indirizzo, setIndirizzo] = useState('');
  const [allergie, setAllergie] = useState('');
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
      onLogin({ telefono: clean, nome: data.nome, cognome: data.cognome || '', email: data.email || '', indirizzo: data.indirizzo || '', pagamento: data.pagamento || 'contanti', allergie: data.allergie || '', premio: data.premio_attivo || '' });
    } else {
      setStep(2);
      setErrore('');
    }
  };

  const registra = async () => {
    if (!nome.trim()) { setErrore('Inserisci il tuo nome'); return; }
    if (!cognome.trim()) { setErrore('Inserisci il tuo cognome'); return; }
    const clean = tel.replace(/\s/g, '');
    setLoading(true);
    const datiCliente = {
      telefono: clean,
      nome: nome.trim(),
      cognome: cognome.trim(),
      email: email.trim(),
      indirizzo: indirizzo.trim(),
      pagamento: 'contanti',
      allergie: allergie.trim(),
    };
    const { error } = await supabase.from('clienti').insert([datiCliente]);
    setLoading(false);
    if (error) { setErrore('Errore: ' + error.message); return; }
    onLogin(datiCliente);
  };

  return (
    <View style={S.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.rosso} />
      <View style={S.loginHeader}>
        <Text style={S.loginLogo}>Pizzicata</Text>
        <Text style={S.loginSub}>- TORINO -</Text>
      </View>
      <ScrollView style={S.loginBody} contentContainerStyle={S.loginBodyContent} showsVerticalScrollIndicator={false}>
        <Text style={S.loginEmoji}>🍕</Text>
        <Text style={S.loginTitle}>Benvenuto!</Text>
        <Text style={S.loginDesc}>
          {step === 1 ? 'Inserisci il tuo numero di telefono per ordinare' : 'Prima volta? Completa i tuoi dati'}
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
            <Text style={S.formLabel}>NOME *</Text>
            <input style={inputStyle} placeholder="Mario" value={nome} onChange={(e) => setNome(e.target.value)} />
            <View style={{ height: 12 }} />
            <Text style={S.formLabel}>COGNOME *</Text>
            <input style={inputStyle} placeholder="Rossi" value={cognome} onChange={(e) => setCognome(e.target.value)} />
            <View style={{ height: 12 }} />
            <Text style={S.formLabel}>EMAIL</Text>
            <input style={inputStyle} placeholder="mario.rossi@email.com" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            <View style={{ height: 12 }} />
            <Text style={S.formLabel}>INDIRIZZO</Text>
            <input style={inputStyle} placeholder="Via, numero civico..." value={indirizzo} onChange={(e) => setIndirizzo(e.target.value)} />
            <View style={{ height: 12 }} />
            <Text style={S.formLabel}>ALLERGIE / INTOLLERANZE (se presenti)</Text>
            <input style={inputStyle} placeholder="Es. glutine, lattosio..." value={allergie} onChange={(e) => setAllergie(e.target.value)} />
            {errore ? <Text style={S.errore}>{errore}</Text> : null}
            <TouchableOpacity style={S.checkoutBtn} onPress={registra}>
              <Text style={S.checkoutText}>{loading ? 'Registrazione...' : 'Crea account'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStep(1)} style={{ marginTop: 12, alignItems: 'center', marginBottom: 30 }}>
              <Text style={{ color: C.grigio, fontSize: 13 }}>Indietro</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function CartScreen({ cart, setCart, cartTotal, cartTotalRaw, scontoCombo, scontoPremio, premioLabel, bibitaOmaggioId, setBibitaOmaggioId, mancia, setMancia, manciaConfermata, setManciaConfermata, combo, setCombo, ordered, setOrdered, setTab, handleOrder, utente }) {
  const [indirizzo, setIndirizzo] = useState(utente.indirizzo || '');
  const [note, setNote] = useState(utente.allergie && utente.allergie.trim() ? `Allergie/intolleranze: ${utente.allergie.trim()}` : '');
  const [tipoOrdine, setTipoOrdine] = useState('domicilio');
  const [pagamento, setPagamento] = useState(utente.pagamento || 'contanti');
  const [giornoSelezionato, setGiornoSelezionato] = useState(0);
  const [errore, setErrore] = useState('');

  const haPane = cart.some(i => i.id >= 200);
  const calendario = getCalendario().filter((_, i) => !haPane || i > 0);

  // Orari dipendono dal giorno selezionato: oggi → logica orario corrente, altri → tutti
  const isOggi = giornoSelezionato === 0 && !haPane; // pane: sempre giorno dopo
  const ORARI = getOrariDisponibili(isOggi);
  const [orario, setOrario] = useState(() => getOrariDisponibili(true)[0] || '18:30');
  const [oraCustom, setOraCustom] = useState('19');
  const [minCustom, setMinCustom] = useState('00');

  useEffect(() => {
    const nuovi = getOrariDisponibili(giornoSelezionato === 0 && !haPane);
    if (!nuovi.includes(orario)) setOrario(nuovi[0] || '18:30');
  }, [giornoSelezionato, haPane]);

  const spedizioneExtra = tipoOrdine === 'domicilio' ? 2.5 : 0;

  const addQty = (cartKey) => setCart(prev => prev.map(c => c.cartKey === cartKey ? { ...c, qty: c.qty + 1 } : c));
  const removeQty = (cartKey) => setCart(prev => prev.map(c => c.cartKey === cartKey ? { ...c, qty: c.qty - 1 } : c).filter(c => c.qty > 0));

  const doOrder = () => {
    if (combo) {
      setErrore('Hai una Combo Famiglia non confermata. Completala e premi "Conferma combo", oppure annullala dal menù.');
      return;
    }
    if (tipoOrdine === 'domicilio' && !indirizzo.trim()) { setErrore('Inserisci il tuo indirizzo!'); return; }
    setErrore('');
    const orarioFinale = orario === 'custom' ? `${oraCustom}:${minCustom}` : orario;
    handleOrder({ indirizzo, note, tipoOrdine, orario: orarioFinale, pagamento, giorno: calendario[giornoSelezionato].full });
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
          {/* Articoli carrello con +/- */}
          {cart.map(item => (
            <View key={item.cartKey} style={S.cartCard}>
              <Text style={{ fontSize: 24 }}>{item.id >= 200 ? '🍞' : '🍕'}</Text>
              <View style={{ flex: 1 }}>
                <Text style={S.cartName}>{item.name}</Text>
                {item.integrale && <Text style={S.cartExtra}>+ Impasto integrale</Text>}
                {item.aggiunte && item.aggiunte.length > 0 && (
                  <Text style={S.cartExtra}>+ {item.aggiunte.map(a => a.nome).join(', ')}</Text>
                )}
                <Text style={S.cartPrice}>€ {(item.price * item.qty).toFixed(2)}</Text>
              </View>
              <View style={S.qtyCtrl}>
                <TouchableOpacity style={S.qtyMinus} onPress={() => removeQty(item.cartKey)}>
                  <Text style={S.qtyMinusText}>−</Text>
                </TouchableOpacity>
                <Text style={S.qtyN}>{item.qty}</Text>
                <TouchableOpacity style={S.qtyPlus} onPress={() => addQty(item.cartKey)}>
                  <Text style={S.qtyPlusText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Banner info pane */}
          {haPane && (
            <View style={{ backgroundColor: '#FFF8E7', borderRadius: 12, padding: 12, borderLeftWidth: 4, borderLeftColor: C.oro, marginBottom: 12 }}>
              <Text style={{ fontSize: 12, color: '#8B6914', fontWeight: '700' }}>🍞 Ordine con pane del forno</Text>
              <Text style={{ fontSize: 11, color: C.grigio, marginTop: 3 }}>Il pane viene preparato il giorno prima — scegli la data di domani o successiva.</Text>
            </View>
          )}

          {/* Tipo ordine */}
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
                {isOggi && <option value="Appena possibile">Appena possibile</option>}
                <option value="custom">Scegli un orario...</option>
                {ORARI.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              {orario === 'custom' && (
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 8, alignItems: 'center' }}>
                  <select value={oraCustom} onChange={(e) => { setOraCustom(e.target.value); }} style={{ ...inputStyle, height: 44, flex: 1 }}>
                    {Array.from({ length: 11 }, (_, k) => k + 12).map(h => <option key={h} value={String(h).padStart(2, '0')}>{String(h).padStart(2, '0')}</option>)}
                  </select>
                  <Text style={{ fontSize: 20, fontWeight: '700', color: C.marrone }}>:</Text>
                  <select value={minCustom} onChange={(e) => { setMinCustom(e.target.value); }} style={{ ...inputStyle, height: 44, flex: 1 }}>
                    {['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </View>
              )}
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

          {/* Bibita omaggio premio ruota */}
          {utente.premio === 'bibita' && (
            <View style={{ backgroundColor: '#FFF8E8', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 2, borderColor: C.oro }}>
              <Text style={{ fontSize: 15, fontWeight: '800', color: C.marrone, marginBottom: 4 }}>🥤 Hai una bibita in omaggio!</Text>
              <Text style={{ fontSize: 12, color: C.grigio, marginBottom: 10 }}>Premio della ruota. Scegli quale bibita vuoi gratis (le altre le paghi normalmente).</Text>
              {(() => {
                const bibiteCarrello = cart.filter(c => isBibitaCombo(c.id));
                if (bibiteCarrello.length === 0) {
                  return <Text style={{ fontSize: 13, color: C.rosso }}>Aggiungi una bibita dal menù per usare l'omaggio.</Text>;
                }
                return (
                  <select
                    value={bibitaOmaggioId || ''}
                    onChange={(e) => setBibitaOmaggioId(e.target.value ? Number(e.target.value) : null)}
                    style={{ ...inputStyle, height: 44 }}
                  >
                    <option value="">— Scegli la bibita omaggio —</option>
                    {bibiteCarrello.map(b => (
                      <option key={b.id} value={b.id}>{b.name} (€ {b.price.toFixed(2)})</option>
                    ))}
                  </select>
                );
              })()}
            </View>
          )}

          {errore ? <Text style={S.errore}>{errore}</Text> : null}

          {/* Mancia al locale */}
          {(() => {
            const totalePreMancia = cartTotal + spedizioneExtra;
            const arrotonda = Math.max(0, Math.ceil(totalePreMancia) - totalePreMancia);
            const arrotondaVal = Math.round(arrotonda * 100) / 100;
            const opzioni = [
              { label: '1 €', val: 1 },
              { label: '2 €', val: 2 },
              { label: '5 €', val: 5 },
              { label: arrotondaVal > 0 ? `Arrotonda (+€ ${arrotondaVal.toFixed(2)})` : 'Arrotonda', val: arrotondaVal },
            ];
            return (
              <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E8D5B0' }}>
                <Text style={{ fontSize: 15, fontWeight: '800', color: C.marrone }}>💛 Offri una mancia</Text>
                <Text style={{ fontSize: 12, color: C.grigio, marginTop: 2, marginBottom: 10 }}>Un piccolo gesto per il nostro staff. Del tutto facoltativo.</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {opzioni.map((o, i) => {
                    const attiva = mancia === o.val && o.val > 0;
                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => setMancia(attiva ? 0 : o.val)}
                        style={{
                          paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10,
                          borderWidth: 2, borderColor: attiva ? C.oro : '#E8D5B0',
                          backgroundColor: attiva ? '#FFF3D6' : 'white',
                        }}
                      >
                        <Text style={{ fontSize: 13, fontWeight: '700', color: attiva ? '#8B6914' : C.grigio }}>{o.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {mancia > 0 && (
                  <TouchableOpacity
                    onPress={() => setManciaConfermata(!manciaConfermata)}
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 8 }}
                  >
                    <View style={{
                      width: 22, height: 22, borderRadius: 6, borderWidth: 2,
                      borderColor: manciaConfermata ? '#2C5A2E' : '#C0AE90',
                      backgroundColor: manciaConfermata ? '#2C5A2E' : 'white',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      {manciaConfermata && <Text style={{ color: 'white', fontSize: 14, fontWeight: '900' }}>✓</Text>}
                    </View>
                    <Text style={{ fontSize: 13, color: C.marrone, fontWeight: '600' }}>Confermo la mancia di € {mancia.toFixed(2)}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })()}

          <View style={S.totalCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <Text style={S.totalRow}>Subtotale</Text>
              <Text style={S.totalRow}>€ {cartTotalRaw.toFixed(2)}</Text>
            </View>
            {scontoCombo > 0 && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={[S.totalRow, { color: '#2C5A2E' }]}>🎁 Bibite combo omaggio</Text>
                <Text style={[S.totalRow, { color: '#2C5A2E' }]}>− € {scontoCombo.toFixed(2)}</Text>
              </View>
            )}
            {scontoPremio > 0 && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={[S.totalRow, { color: '#C8961E' }]}>🎡 {premioLabel}</Text>
                <Text style={[S.totalRow, { color: '#C8961E' }]}>− € {scontoPremio.toFixed(2)}</Text>
              </View>
            )}
            {tipoOrdine === 'domicilio' && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={S.totalRow}>Consegna</Text>
                <Text style={S.totalRow}>€ 2.50</Text>
              </View>
            )}
            {manciaConfermata && mancia > 0 && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={[S.totalRow, { color: '#C8961E' }]}>💛 Mancia</Text>
                <Text style={[S.totalRow, { color: '#C8961E' }]}>+ € {mancia.toFixed(2)}</Text>
              </View>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={S.totalBig}>Totale</Text>
              <Text style={[S.totalBig, { color: C.rosso }]}>€ {(cartTotal + spedizioneExtra + (manciaConfermata ? mancia : 0)).toFixed(2)}</Text>
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

// RUOTA DELLA FORTUNA (componente esterno e stabile)
function RuotaFortuna({ girando, premio, rotazione, onGira, onChiudi }) {
  const N = 6;
  const gradiPerSpicchio = 360 / N;
  const spicchi = [
    { val: 'bibita', colore: '#C8961E' },
    { val: 'sconto10', colore: '#8B1A1A' },
    { val: 'bibita', colore: '#2C5A2E' },
    { val: 'sconto10', colore: '#C8961E' },
    { val: 'bibita', colore: '#8B1A1A' },
    { val: 'sconto10', colore: '#2C5A2E' },
  ];
  const conic = spicchi
    .map((s, i) => `${s.colore} ${i * gradiPerSpicchio}deg ${(i + 1) * gradiPerSpicchio}deg`)
    .join(', ');

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      zIndex: 99999, padding: 20,
    }}>
      <div style={{ fontSize: 26, fontWeight: 900, color: '#F2E8D5', marginBottom: 4, textAlign: 'center' }}>Ruota della Fortuna!</div>
      <div style={{ fontSize: 14, color: 'rgba(242,232,213,0.85)', marginBottom: 24, textAlign: 'center' }}>
        {premio ? 'Complimenti!' : 'Hai speso piu di 15 euro: gira e vinci!'}
      </div>

      <div style={{ position: 'relative', width: 280, height: 300 }}>
        <div style={{
          position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)',
          width: 0, height: 0, borderLeft: '15px solid transparent', borderRight: '15px solid transparent',
          borderTop: '26px solid #fff', zIndex: 5, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))',
        }} />
        <div style={{
          position: 'absolute', top: 20, left: '50%', marginLeft: -130,
          width: 260, height: 260, borderRadius: '50%',
          background: `conic-gradient(${conic})`,
          border: '8px solid #C8961E', boxSizing: 'border-box',
          boxShadow: '0 0 30px rgba(200,150,30,0.5)',
          transform: `rotate(${rotazione}deg)`,
          transition: 'transform 4.2s cubic-bezier(0.15, 0.7, 0.1, 1)',
        }}>
          {spicchi.map((s, i) => {
            const centro = i * gradiPerSpicchio + gradiPerSpicchio / 2;
            return (
              <div key={i} style={{
                position: 'absolute', top: '50%', left: '50%', width: 0, height: 0,
                transform: `rotate(${centro}deg) translateY(-85px)`,
              }}>
                <div style={{
                  transform: 'translate(-50%, -50%)',
                  color: 'white', fontSize: 12, fontWeight: 800, textAlign: 'center',
                  lineHeight: 1.15, width: 64, textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                }}>
                  {s.val === 'bibita' ? <><div>Bibita</div><div>omaggio</div></> : <><div>Sconto</div><div>10%</div></>}
                </div>
              </div>
            );
          })}
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: 22, height: 22, marginTop: -11, marginLeft: -11, background: '#fff', borderRadius: '50%', border: '3px solid #C8961E', zIndex: 2 }} />
        </div>
      </div>

      {!premio ? (
        <button onClick={onGira} disabled={girando} style={{
          background: girando ? '#8B7355' : '#C8961E', color: '#3D1A00', fontWeight: 900, fontSize: 18,
          border: 'none', borderRadius: 16, padding: '16px 50px', marginTop: 24,
          cursor: girando ? 'default' : 'pointer', fontFamily: 'inherit',
        }}>
          {girando ? 'Gira...' : 'GIRA!'}
        </button>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 24 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 20, textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 40 }}>{premio === 'bibita' ? '🥤' : '🎟️'}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#3D1A00', marginTop: 8 }}>
              {premio === 'bibita' ? 'Bibita in omaggio!' : 'Sconto 10%!'}
            </div>
            <div style={{ fontSize: 13, color: '#8B7355', marginTop: 4 }}>Lo userai al tuo prossimo ordine</div>
          </div>
          <button onClick={onChiudi} style={{
            background: '#8B1A1A', color: 'white', fontWeight: 800, fontSize: 16,
            border: 'none', borderRadius: 16, padding: '14px 40px', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Fantastico!
          </button>
        </div>
      )}
    </div>
  );
}

// Pannello scelta aggiunte: si apre quando si tocca un prodotto con aggiunte disponibili
function PannelloAggiunte({ prodotto, onConferma, onChiudi }) {
  const [sel, setSel] = useState([]);
  const [integrale, setIntegrale] = useState(false);

  if (!prodotto) return null;

  const toggle = (agg) => {
    setSel(prev => prev.find(a => a.nome === agg.nome)
      ? prev.filter(a => a.nome !== agg.nome)
      : [...prev, agg]);
  };

  const costoExtra = sel.reduce((s, a) => s + a.prezzo, 0) + (integrale ? IMPASTO_INTEGRALE.prezzo : 0);
  const totale = prodotto.price + costoExtra;
  const farinata = prodotto.id >= 114 && prodotto.id <= 126; // farinata: niente impasto integrale

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 99998,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}
      onClick={onChiudi}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FBF6EC', width: '100%', maxWidth: 520, maxHeight: '85vh',
          borderTopLeftRadius: 22, borderTopRightRadius: 22, display: 'flex', flexDirection: 'column',
          boxShadow: '0 -8px 30px rgba(0,0,0,0.3)',
        }}
      >
        {/* header */}
        <div style={{ padding: '18px 20px 12px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 19, fontWeight: 900, color: '#5A2D0C' }}>{prodotto.name}</div>
              {prodotto.desc ? <div style={{ fontSize: 12, color: '#8B7355', marginTop: 2 }}>{prodotto.desc}</div> : null}
            </div>
            <div onClick={onChiudi} style={{ fontSize: 22, color: '#8B7355', cursor: 'pointer', padding: 4, lineHeight: 1 }}>✕</div>
          </div>
          <div style={{ fontSize: 13, color: '#8B7355', marginTop: 8 }}>Personalizza con impasto e aggiunte (facoltativo)</div>
        </div>

        {/* corpo scrollabile */}
        <div style={{ overflowY: 'auto', padding: '14px 20px', flex: 1 }}>
          {!farinata && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#8B7355', textTransform: 'uppercase', marginBottom: 8 }}>Impasto</div>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: integrale ? '#FFF3D6' : 'white', border: `2px solid ${integrale ? '#C8961E' : 'rgba(0,0,0,0.08)'}`, borderRadius: 12, cursor: 'pointer' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" checked={integrale} onChange={() => setIntegrale(v => !v)} style={{ width: 18, height: 18, accentColor: '#C8961E' }} />
                  <span style={{ fontSize: 14, color: '#5A2D0C', fontWeight: 600 }}>Impasto integrale</span>
                </span>
                <span style={{ fontSize: 14, color: '#8B1A1A', fontWeight: 700 }}>+€ 1,00</span>
              </label>
            </div>
          )}

          <div style={{ fontSize: 12, fontWeight: 800, color: '#8B7355', textTransform: 'uppercase', marginBottom: 8 }}>Aggiunte</div>
          {AGGIUNTE.map(agg => {
            const attiva = !!sel.find(a => a.nome === agg.nome);
            return (
              <label key={agg.nome} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', marginBottom: 7, background: attiva ? '#FFF3D6' : 'white', border: `2px solid ${attiva ? '#C8961E' : 'rgba(0,0,0,0.08)'}`, borderRadius: 12, cursor: 'pointer' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" checked={attiva} onChange={() => toggle(agg)} style={{ width: 18, height: 18, accentColor: '#C8961E' }} />
                  <span style={{ fontSize: 14, color: '#5A2D0C', fontWeight: 600 }}>{agg.nome}</span>
                </span>
                <span style={{ fontSize: 14, color: '#8B1A1A', fontWeight: 700 }}>+€ {agg.prezzo.toFixed(2).replace('.', ',')}</span>
              </label>
            );
          })}
        </div>

        {/* footer fisso */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(0,0,0,0.08)', background: '#FBF6EC' }}>
          <button
            onClick={() => onConferma(prodotto, sel, integrale)}
            style={{
              width: '100%', background: '#8B1A1A', color: 'white', border: 'none', borderRadius: 14,
              padding: '15px', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 20,
            }}
          >
            <span>Aggiungi al carrello</span>
            <span>€ {totale.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [utente, setUtenteRaw] = useState(() => {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('pizzicata_utente') : null;
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const setUtente = (u) => {
    setUtenteRaw(u);
    try {
      if (u) localStorage.setItem('pizzicata_utente', JSON.stringify(u));
      else localStorage.removeItem('pizzicata_utente');
    } catch {}
  };
  const [tab, setTab] = useState('home');
  const [cat, setCat] = useState('Pizze Rosse');
  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);
  const [ora, setOra] = useState(new Date());
  const [combo, setCombo] = useState(null); // combo in corso di composizione: null o { pizze:4, dolci:4, bibite:4 }
  const [combosConfermate, setCombosConfermate] = useState(0); // quante combo già confermate (4 bibite gratis ciascuna)
  const [bibitaOmaggioId, setBibitaOmaggioId] = useState(null); // bibita scelta come omaggio premio ruota
  const [prodottoAggiunte, setProdottoAggiunte] = useState(null); // prodotto di cui scegliere le aggiunte (apre overlay)
  const [mancia, setMancia] = useState(0); // mancia al locale scelta al checkout
  const [manciaConfermata, setManciaConfermata] = useState(false); // spunta di conferma mancia
  const [ruotaVisibile, setRuotaVisibile] = useState(false); // mostra la ruota dopo ordine >=15€
  const [ruotaGirando, setRuotaGirando] = useState(false);
  const [ruotaPremio, setRuotaPremio] = useState(null);
  const [ruotaRotazione, setRuotaRotazione] = useState(0);

  const giraRuota = () => {
    if (ruotaGirando || ruotaPremio) return;
    setRuotaGirando(true);
    const N = 6;
    const gradiPerSpicchio = 360 / N;
    // spicchi: 0,2,4 = bibita ; 1,3,5 = sconto10
    const vincente = Math.random() < 0.5 ? 'bibita' : 'sconto10';
    const indiciValidi = vincente === 'bibita' ? [0, 2, 4] : [1, 3, 5];
    const idx = indiciValidi[Math.floor(Math.random() * indiciValidi.length)];
    const centroSpicchio = idx * gradiPerSpicchio + gradiPerSpicchio / 2;
    const target = 6 * 360 + (360 - centroSpicchio);
    setRuotaRotazione(target);
    setTimeout(() => {
      setRuotaPremio(vincente);
      setRuotaGirando(false);
      try { supabase.from('clienti').update({ premio_attivo: vincente }).eq('telefono', utente.telefono); } catch (e) {}
      setUtente({ ...utente, premio: vincente });
    }, 4300);
  };

  const chiudiRuota = () => {
    setRuotaVisibile(false);
    setRuotaGirando(false);
    setRuotaPremio(null);
    setRuotaRotazione(0);
    setCart([]);
    setOrdered(false);
    setTab('home');
  };

  useEffect(() => {
    const t = setInterval(() => setOra(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  if (!utente) return <LoginScreen onLogin={setUtente} />;

  const add = (item) => {
    // Durante una combo in corso: tetto = quanto già confermato + 4
    if (combo) {
      const tot = (pred) => cart.filter(c => pred(c.id)).reduce((s, c) => s + c.qty, 0);
      const base = combosConfermate * 4; // già confermati (liberi)
      if (isPizzaCombo(item.id) && tot(isPizzaCombo) >= base + combo.pizze) { alert('Hai già 4 pizze in questa combo. Conferma la combo per aggiungere altro.'); return; }
      if (isDolceCombo(item.id) && tot(isDolceCombo) >= base + combo.dolci) { alert('Hai già 4 dolci in questa combo. Conferma la combo per aggiungere altro.'); return; }
      if (isBibitaCombo(item.id) && tot(isBibitaCombo) >= base + combo.bibite) { alert('Hai già 4 bibite in questa combo. Conferma la combo per aggiungere altro.'); return; }
    }
    setCart(prev => {
      // item liscio: cartKey = id semplice
      const key = String(item.id);
      const ex = prev.find(c => c.cartKey === key);
      if (ex) return prev.map(c => c.cartKey === key ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, cartKey: key, qty: 1, aggiunte: [], integrale: false, prezzoBase: item.price }];
    });
  };

  // Aggiunge un prodotto con aggiunte/integrale scelte (dal pannello aggiunte)
  const aggiungiConAggiunte = (item, aggiunteSel, integrale) => {
    const costoAggiunte = aggiunteSel.reduce((s, a) => s + a.prezzo, 0) + (integrale ? IMPASTO_INTEGRALE.prezzo : 0);
    const prezzoFinale = item.price + costoAggiunte;
    // chiave univoca: id + nomi aggiunte ordinati + integrale
    const firma = [...aggiunteSel.map(a => a.nome).sort(), integrale ? 'INT' : ''].join('|');
    const key = item.id + '::' + firma;
    setCart(prev => {
      const ex = prev.find(c => c.cartKey === key);
      if (ex) return prev.map(c => c.cartKey === key ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, {
        ...item,
        cartKey: key,
        qty: 1,
        price: prezzoFinale,
        prezzoBase: item.price,
        aggiunte: aggiunteSel,
        integrale,
      }];
    });
  };

  // Conferma la combo in corso: la blocca e permette di aggiungere altro / aprire nuove combo
  const confermaCombo = () => {
    setCombosConfermate(n => n + 1);
    setCombo(null);
  };

  const remove = (cartKey) => setCart(prev =>
    prev.map(c => c.cartKey === cartKey ? { ...c, qty: c.qty - 1 } : c).filter(c => c.qty > 0)
  );

  const cartN = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotalRaw = cart.reduce((s, i) => s + i.price * i.qty, 0);
  // Sconto combo: 4 bibite gratis per OGNI combo confermata
  const bibiteGratisTotali = combosConfermate * 4;
  let scontoCombo = 0;
  if (bibiteGratisTotali > 0) {
    let contate = 0;
    // sconta le bibite più economiche per prime? No: ordine naturale, prime N bibite gratis
    for (const c of cart) {
      if (isBibitaCombo(c.id)) {
        for (let k = 0; k < c.qty; k++) {
          if (contate < bibiteGratisTotali) { scontoCombo += c.price; contate++; }
        }
      }
    }
  }
  const cartTotalDopoCombo = Math.max(0, cartTotalRaw - scontoCombo);
  // Premio attivo dal giro ruota precedente
  let scontoPremio = 0;
  let premioLabel = '';
  if (utente.premio === 'sconto10' && cartTotalDopoCombo > 0) {
    scontoPremio = cartTotalDopoCombo * 0.10;
    premioLabel = 'Sconto 10% (premio ruota)';
  } else if (utente.premio === 'bibita' && bibitaOmaggioId) {
    // sconta la bibita scelta dal cliente (una unità)
    const bevandaScelta = Object.values(MENU).flat().find(p => p.id === bibitaOmaggioId);
    const nelCarrello = cart.find(c => c.id === bibitaOmaggioId);
    if (bevandaScelta && nelCarrello) {
      scontoPremio = bevandaScelta.price;
      premioLabel = 'Bibita omaggio (premio ruota)';
    }
  }
  const cartTotal = Math.max(0, cartTotalDopoCombo - scontoPremio);

  const handleOrder = async ({ indirizzo, note, tipoOrdine, orario, pagamento, giorno }) => {
    const spedizione = tipoOrdine === 'domicilio' ? 2.5 : 0;
    // Costruisce un riepilogo dettagliato per la cucina
    const nomeBibitaOmaggio = bibitaOmaggioId ? (Object.values(MENU).flat().find(p => p.id === bibitaOmaggioId)?.name || '') : '';
    const righeRiepilogo = [];
    righeRiepilogo.push(`Subtotale: € ${cartTotalRaw.toFixed(2)}`);
    if (scontoCombo > 0) righeRiepilogo.push(`Sconto combo (bibite omaggio): -€ ${scontoCombo.toFixed(2)}`);
    if (scontoPremio > 0 && utente.premio === 'sconto10') righeRiepilogo.push(`Sconto 10% (premio ruota): -€ ${scontoPremio.toFixed(2)}`);
    if (scontoPremio > 0 && utente.premio === 'bibita') righeRiepilogo.push(`Bibita OMAGGIO (premio ruota): ${nomeBibitaOmaggio} -€ ${scontoPremio.toFixed(2)}`);
    if (spedizione > 0) righeRiepilogo.push(`Consegna a domicilio: +€ ${spedizione.toFixed(2)}`);
    const manciaEffettiva = manciaConfermata && mancia > 0 ? mancia : 0;
    if (manciaEffettiva > 0) righeRiepilogo.push(`Mancia al locale: +€ ${manciaEffettiva.toFixed(2)}`);
    if (combosConfermate > 0) righeRiepilogo.push(`${combosConfermate}x COMBO FAMIGLIA (4 pizze + 4 dolci + 4 bibite omaggio ciascuna)`);
    const noteCliente = (note || '').trim();
    const noteComplete = [
      noteCliente ? `NOTE CLIENTE: ${noteCliente}` : '',
      '--- RIEPILOGO ---',
      ...righeRiepilogo,
    ].filter(Boolean).join('\n');

    const { error } = await supabase.from('ordini').insert([{
      cliente: utente.nome,
      telefono: utente.telefono,
      items: JSON.stringify(cart.map(i => ({
        name: i.name,
        qty: i.qty,
        price: i.price,
        aggiunte: (i.aggiunte || []).map(a => a.nome),
        integrale: !!i.integrale,
      }))),
      totale: cartTotal + spedizione + manciaEffettiva,
      stato: 'nuovo',
      note: noteComplete,
      indirizzo: tipoOrdine === 'domicilio' ? indirizzo : 'Asporto',
      tipo: tipoOrdine,
      orario_consegna: giorno + ' - ' + orario,
      pagamento: pagamento,
    }]);
    if (error) {
      alert('Errore: ' + error.message);
      return;
    }
    if (indirizzo && utente.indirizzo !== indirizzo) {
      await supabase.from('clienti').update({ indirizzo }).eq('telefono', utente.telefono);
    }
    // premioInSospeso = il cliente aveva già un premio non ancora usato (prima di questo ordine)
    const premioInSospeso = !!utente.premio;
    // Se questo ordine ha consumato un premio, azzeralo nel DB
    if (premioInSospeso) {
      await supabase.from('clienti').update({ premio_attivo: '' }).eq('telefono', utente.telefono);
      setUtente({ ...utente, premio: '', indirizzo: indirizzo || utente.indirizzo });
    }
    const totaleOrdine = cartTotal + spedizione + manciaEffettiva;
    setCombo(null);
    setCombosConfermate(0);
    setBibitaOmaggioId(null);
    setMancia(0);
    setManciaConfermata(false);
    setOrdered(true);
    // Ruota: ordine >=15€ e nessun premio era già in sospeso, e non ne ha appena vinto uno
    if (totaleOrdine >= 15 && !premioInSospeso) {
      setTimeout(() => setRuotaVisibile(true), 800);
    }
  };

  const oraStr = ora.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  const dataStr = ora.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });

  const Home = () => (
    <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={S.heroBanner} activeOpacity={0.85} onPress={() => setTab('profilo')}>
        <View style={{ flex: 1 }}>
          <Text style={S.heroGreeting}>Ciao {utente.nome}!</Text>
          <Text style={S.heroName}>Il tuo profilo</Text>
          <Text style={S.heroSlogan}>Tocca per modificare i tuoi dati →</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 28, color: C.oro, fontWeight: '900' }}>{oraStr}</Text>
          <Text style={{ fontSize: 10, color: 'rgba(242,232,213,0.6)', marginTop: 2, textAlign: 'right' }}>{dataStr}</Text>
        </View>
      </TouchableOpacity>

      <Text style={S.secLabel}>ORDINA ORA</Text>
      <TouchableOpacity style={[S.quickBtn, { backgroundColor: C.rosso, marginBottom: 16 }]} onPress={() => setTab('menu')}>
        <Text style={{ fontSize: 32 }}>🍕</Text>
        <Text style={S.quickLabel}>Ordina ora</Text>
        <Text style={S.quickSub}>Domicilio o asporto</Text>
      </TouchableOpacity>

      <Text style={S.secLabel}>PANE FRESCO</Text>
      <View style={S.paneCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Text style={{ fontSize: 28 }}>🍞</Text>
          <View>
            <Text style={S.paneTitolo}>Pane del Forno a Legna</Text>
            <Text style={S.paneSub}>Fresco ogni mattina dal forno a legna!</Text>
          </View>
        </View>
        <TouchableOpacity style={S.paneBtn} onPress={() => { setCat('Pane del Forno'); setTab('menu'); }}>
          <Text style={S.paneBtnText}>Prenota il tuo filone →</Text>
        </TouchableOpacity>
      </View>

      <Text style={S.secLabel}>OFFERTE</Text>
      <TouchableOpacity style={S.offerBig} onPress={() => setTab('offers')}>
        <View>
          <Text style={S.offerBigTitle}>Combo Famiglia</Text>
          <Text style={S.offerBigDesc}>4 pizze + 4 dolci a scelta</Text>
          <Text style={{ color: C.oro, fontSize: 12, marginTop: 6, fontStyle: 'italic' }}>4 bibite in omaggio!</Text>
        </View>
        <Text style={{ fontSize: 52 }}>🎁</Text>
      </TouchableOpacity>

      <Text style={S.secLabel}>INFORMAZIONI</Text>
      <View style={[S.tilesRow, { marginBottom: 24 }]}>
        <TouchableOpacity style={S.tile} activeOpacity={0.7} onPress={() => window.open('https://www.google.com/maps/search/?api=1&query=La+Pizzicata+Corso+Giambone+Torino', '_blank')}>
          <Text style={S.tileIcon}>📍</Text>
          <Text style={S.tileTitle}>Dove siamo</Text>
          <Text style={S.tileVal}>C.so Giambone 8/b{'\n'}Torino</Text>
        </TouchableOpacity>
        <View style={S.tile}>
          <Text style={S.tileIcon}>🕐</Text>
          <Text style={S.tileTitle}>Orari</Text>
          <Text style={S.tileVal}>LUN-DOM{'\n'}12:00-14:30{'\n'}18:00-22:45</Text>
        </View>
        <TouchableOpacity style={S.tile} activeOpacity={0.7} onPress={() => {
          const scelta = window.confirm('Chiama 331 5695959?\n\nOK = 331 5695959\nAnnulla = 011 0362310');
          window.location.href = scelta ? 'tel:3315695959' : 'tel:0110362310';
        }}>
          <Text style={S.tileIcon}>📞</Text>
          <Text style={S.tileTitle}>Telefono</Text>
          <Text style={S.tileVal}>331 5695959{'\n'}011 0362310</Text>
        </TouchableOpacity>
      </View>

      <Text style={S.secLabel}>SEGUICI</Text>
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: '#E1306C', borderRadius: 16, padding: 16, alignItems: 'center' }}
          activeOpacity={0.8}
          onPress={() => window.open('https://www.instagram.com/pizzicata_pizzeria', '_blank')}
        >
          <Text style={{ fontSize: 28 }}>📷</Text>
          <Text style={{ color: 'white', fontWeight: '800', fontSize: 14, marginTop: 4 }}>Instagram</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2 }}>@pizzicata_pizzeria</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: '#000000', borderRadius: 16, padding: 16, alignItems: 'center' }}
          activeOpacity={0.8}
          onPress={() => window.open('https://www.tiktok.com/@pizzicatapizzeria', '_blank')}
        >
          <Text style={{ fontSize: 28 }}>🎵</Text>
          <Text style={{ color: 'white', fontWeight: '800', fontSize: 14, marginTop: 4 }}>TikTok</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2 }}>@pizzicatapizzeria</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const Menu = () => {
    const base = combosConfermate * 4;
    const comboPizze = combo ? Math.max(0, cart.filter(c => isPizzaCombo(c.id)).reduce((s, c) => s + c.qty, 0) - base) : 0;
    const comboDolci = combo ? Math.max(0, cart.filter(c => isDolceCombo(c.id)).reduce((s, c) => s + c.qty, 0) - base) : 0;
    const comboBibite = combo ? Math.max(0, cart.filter(c => isBibitaCombo(c.id)).reduce((s, c) => s + c.qty, 0) - base) : 0;
    const comboCompleta = combo && comboPizze >= combo.pizze && comboDolci >= combo.dolci && comboBibite >= combo.bibite;
    return (
    <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
      {combosConfermate > 0 && !combo && (
        <View style={{ backgroundColor: '#2C5A2E', borderRadius: 12, padding: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: '700', fontSize: 13 }}>✓ {combosConfermate} Combo Famiglia confermata{combosConfermate > 1 ? 'e' : ''}</Text>
          <TouchableOpacity onPress={() => { setCombo({ pizze: 4, dolci: 4, bibite: 4 }); setCat('Pizze Rosse'); }}>
            <Text style={{ color: C.oro, fontWeight: '800', fontSize: 13 }}>+ Altra combo</Text>
          </TouchableOpacity>
        </View>
      )}
      {combo && (
        <View style={{ backgroundColor: C.marrone, borderRadius: 16, padding: 14, marginBottom: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ color: C.crema, fontWeight: '800', fontSize: 15 }}>🎁 Combo Famiglia {combosConfermate > 0 ? `#${combosConfermate + 1}` : ''}</Text>
            <TouchableOpacity onPress={() => setCombo(null)}>
              <Text style={{ color: 'rgba(242,232,213,0.6)', fontSize: 12 }}>Annulla ✕</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ flex: 1, backgroundColor: comboPizze >= combo.pizze ? '#2C5A2E' : 'rgba(255,255,255,0.12)', borderRadius: 10, padding: 8, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 11 }}>Pizze</Text>
              <Text style={{ color: 'white', fontWeight: '800', fontSize: 16 }}>{comboPizze}/{combo.pizze}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: comboDolci >= combo.dolci ? '#2C5A2E' : 'rgba(255,255,255,0.12)', borderRadius: 10, padding: 8, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 11 }}>Dolci</Text>
              <Text style={{ color: 'white', fontWeight: '800', fontSize: 16 }}>{comboDolci}/{combo.dolci}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: comboBibite >= combo.bibite ? '#2C5A2E' : 'rgba(255,255,255,0.12)', borderRadius: 10, padding: 8, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 11 }}>Bibite 🎁</Text>
              <Text style={{ color: 'white', fontWeight: '800', fontSize: 16 }}>{comboBibite}/{combo.bibite}</Text>
            </View>
          </View>
          {comboCompleta ? (
            <TouchableOpacity style={{ backgroundColor: C.oro, borderRadius: 10, padding: 12, alignItems: 'center', marginTop: 10 }} onPress={confermaCombo}>
              <Text style={{ color: C.marrone, fontWeight: '800', fontSize: 14 }}>✓ Conferma combo</Text>
            </TouchableOpacity>
          ) : (
            <Text style={{ color: 'rgba(242,232,213,0.7)', fontSize: 11, marginTop: 8, textAlign: 'center' }}>
              Scegli 4 pizze, 4 dolci e 4 bibite. Le bibite sono in omaggio!
            </Text>
          )}
        </View>
      )}
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
          <Text style={{ fontSize: 11, color: C.grigio, marginTop: 2 }}>Disponibile ogni mattina, solo su preordine per il giorno successivo. Il ritiro in pizzeria comprende solo il costo del pane. La consegna a domicilio ha un costo aggiuntivo di €2.50.</Text>
        </View>
      )}
      {MENU[cat].map(item => {
        const conAggiunte = CATEGORIE_CON_AGGIUNTE.includes(cat) && !combo;
        // quantità: per categorie con aggiunte somma tutte le righe con stesso id
        const qty = conAggiunte
          ? cart.filter(c => c.id === item.id).reduce((s, c) => s + c.qty, 0)
          : (cart.find(c => c.cartKey === String(item.id))?.qty || 0);
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
                {conAggiunte ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    {qty > 0 && <Text style={{ fontSize: 12, color: C.grigio, fontWeight: '700' }}>{qty} nel carrello</Text>}
                    <TouchableOpacity style={S.addBtn} onPress={() => setProdottoAggiunte(item)}>
                      <Text style={S.addBtnText}>+ Aggiungi</Text>
                    </TouchableOpacity>
                  </View>
                ) : qty === 0 ? (
                  <TouchableOpacity style={S.addBtn} onPress={() => add(item)}>
                    <Text style={S.addBtnText}>+ Aggiungi</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={S.qtyCtrl}>
                    <TouchableOpacity style={S.qtyMinus} onPress={() => remove(String(item.id))}>
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
  };

  const Offers = () => (
    <ScrollView style={S.scroll}>
      <View style={[S.offerCard, { backgroundColor: C.rosso }]}>
        <Text style={S.offerTitle}>Combo Famiglia</Text>
        <Text style={S.offerDesc}>4 pizze a scelta + 4 dolci a scelta</Text>
        <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 12, marginTop: 12 }}>
          <Text style={{ color: C.oro, fontWeight: '800', fontSize: 14 }}>OMAGGIO INCLUSO</Text>
          <Text style={{ color: 'white', fontSize: 13, marginTop: 4 }}>4 bibite a scelta (escluse birre)</Text>
        </View>
        <TouchableOpacity style={S.offerBtn} onPress={() => { setCombo({ pizze: 4, dolci: 4, bibite: 4 }); setCat('Pizze Rosse'); setTab('menu'); }}>
          <Text style={S.offerBtnText}>Inizia la combo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const Profilo = () => {
    const [pNome, setPNome] = useState(utente.nome || '');
    const [pCognome, setPCognome] = useState(utente.cognome || '');
    const [pEmail, setPEmail] = useState(utente.email || '');
    const [pIndirizzo, setPIndirizzo] = useState(utente.indirizzo || '');
    const [pPagamento, setPPagamento] = useState(utente.pagamento || 'contanti');
    const [pAllergie, setPAllergie] = useState(utente.allergie || '');
    const [salvato, setSalvato] = useState(false);
    const [salvando, setSalvando] = useState(false);

    const salvaProfilo = async () => {
      setSalvando(true);
      const { error } = await supabase.from('clienti').update({
        nome: pNome.trim(),
        cognome: pCognome.trim(),
        email: pEmail.trim(),
        indirizzo: pIndirizzo.trim(),
        pagamento: pPagamento,
        allergie: pAllergie.trim(),
      }).eq('telefono', utente.telefono);
      setSalvando(false);
      if (error) { alert('Errore: ' + error.message); return; }
      setUtente({ ...utente, nome: pNome.trim(), cognome: pCognome.trim(), email: pEmail.trim(), indirizzo: pIndirizzo.trim(), pagamento: pPagamento, allergie: pAllergie.trim() });
      setSalvato(true);
      setTimeout(() => setSalvato(false), 2000);
    };

    const inputStyleP = { width: '100%', padding: 12, fontSize: 15, borderRadius: 10, border: '1px solid #E8D5B0', backgroundColor: 'white', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' };

    return (
      <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => setTab('home')} style={{ marginBottom: 12 }}>
          <Text style={{ color: C.rosso, fontSize: 15, fontWeight: '700' }}>← Indietro</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: '900', color: C.marrone, marginBottom: 4 }}>Il tuo profilo</Text>
        <Text style={{ fontSize: 13, color: C.grigio, marginBottom: 20 }}>I tuoi dati vengono salvati per i prossimi ordini.</Text>

        {utente.premio ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setTab('menu')}
            style={{ backgroundColor: utente.premio === 'bibita' ? '#C8961E' : '#8B1A1A', borderRadius: 18, padding: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 14, boxShadow: '0 4px 16px rgba(200,150,30,0.35)' }}
          >
            <Text style={{ fontSize: 44 }}>{utente.premio === 'bibita' ? '🥤' : '🎟️'}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontWeight: '900', fontSize: 17 }}>
                🎉 Hai un premio che ti aspetta!
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.95)', fontSize: 14, marginTop: 4 }}>
                {utente.premio === 'bibita' ? 'Una bibita in OMAGGIO sul prossimo ordine' : 'SCONTO 10% sul prossimo ordine'}
              </Text>
              <Text style={{ color: 'white', fontSize: 13, fontWeight: '800', marginTop: 8 }}>
                Ordina ora per usarlo →
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}

        <View style={S.formBox}>
          <Text style={S.formLabel}>NOME</Text>
          <input style={inputStyleP} value={pNome} onChange={(e) => setPNome(e.target.value)} placeholder="Nome" />
        </View>
        <View style={S.formBox}>
          <Text style={S.formLabel}>COGNOME</Text>
          <input style={inputStyleP} value={pCognome} onChange={(e) => setPCognome(e.target.value)} placeholder="Cognome" />
        </View>
        <View style={S.formBox}>
          <Text style={S.formLabel}>EMAIL</Text>
          <input style={inputStyleP} value={pEmail} onChange={(e) => setPEmail(e.target.value)} placeholder="email@esempio.com" type="email" />
        </View>
        <View style={S.formBox}>
          <Text style={S.formLabel}>INDIRIZZO</Text>
          <input style={inputStyleP} value={pIndirizzo} onChange={(e) => setPIndirizzo(e.target.value)} placeholder="Via, numero civico..." />
        </View>
        <View style={S.formBox}>
          <Text style={S.formLabel}>METODO DI PAGAMENTO PREFERITO</Text>
          <select value={pPagamento} onChange={(e) => setPPagamento(e.target.value)} style={{ ...inputStyleP, height: 44 }}>
            <option value="contanti">Contanti</option>
            <option value="pos">POS (Bancomat/Carta)</option>
            <option value="online">Online</option>
          </select>
        </View>
        <View style={S.formBox}>
          <Text style={S.formLabel}>ALLERGIE / INTOLLERANZE</Text>
          <textarea style={{ ...inputStyleP, minHeight: 70, resize: 'vertical' }} value={pAllergie} onChange={(e) => setPAllergie(e.target.value)} placeholder="Es. glutine, lattosio, frutta secca..." />
        </View>

        <TouchableOpacity style={[S.checkoutBtn, { backgroundColor: salvato ? '#2C5A2E' : C.rosso }]} onPress={salvaProfilo} disabled={salvando}>
          <Text style={S.checkoutText}>{salvando ? 'Salvataggio...' : salvato ? '✓ Salvato!' : 'Salva profilo'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 16, alignItems: 'center', padding: 12 }} onPress={() => { setUtente(null); }}>
          <Text style={{ color: C.grigio, fontSize: 14 }}>Esci dall'account</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const Ordini = () => {
    const [ordini, setOrdini] = useState(null);
    const [caricando, setCaricando] = useState(true);

    const caricaOrdini = async () => {
      const { data, error } = await supabase
        .from('ordini')
        .select('*')
        .eq('telefono', utente.telefono)
        .order('created_at', { ascending: false });
      if (!error) setOrdini(data || []);
      setCaricando(false);
    };

    useEffect(() => {
      caricaOrdini();
      const t = setInterval(caricaOrdini, 20000); // aggiorna stato ogni 20s
      return () => clearInterval(t);
    }, []);

    const riordina = (ordine) => {
      let items = [];
      try { items = JSON.parse(ordine.items); } catch {}
      if (!items.length) { alert('Impossibile riordinare questo ordine.'); return; }
      // Ricostruisce il carrello cercando i prodotti nel MENU per nome, riapplicando aggiunte/integrale
      const nuovoCarrello = [];
      const tuttiProdotti = Object.values(MENU).flat();
      for (const it of items) {
        const trovato = tuttiProdotti.find(p => p.name === it.name);
        if (!trovato) continue;
        const nomiAgg = it.aggiunte || [];
        const aggOggetti = nomiAgg.map(n => AGGIUNTE.find(a => a.nome === n)).filter(Boolean);
        const integrale = !!it.integrale;
        const costoExtra = aggOggetti.reduce((s, a) => s + a.prezzo, 0) + (integrale ? IMPASTO_INTEGRALE.prezzo : 0);
        const firma = [...aggOggetti.map(a => a.nome).sort(), integrale ? 'INT' : ''].join('|');
        const key = (aggOggetti.length || integrale) ? trovato.id + '::' + firma : String(trovato.id);
        nuovoCarrello.push({
          ...trovato,
          cartKey: key,
          qty: it.qty || 1,
          price: trovato.price + costoExtra,
          prezzoBase: trovato.price,
          aggiunte: aggOggetti,
          integrale,
        });
      }
      if (!nuovoCarrello.length) { alert('I prodotti di questo ordine non sono più disponibili.'); return; }
      setCombo(null);
      setCart(nuovoCarrello);
      setTab('cart');
    };

    const fmtData = (iso) => {
      if (!iso) return '';
      const d = new Date(iso);
      return d.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }) + ' alle ' + d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    };

    const attivi = (ordini || []).filter(o => o.stato !== 'consegnato' && o.stato !== 'rifiutato');
    const storico = (ordini || []).filter(o => o.stato === 'consegnato' || o.stato === 'rifiutato');

    return (
      <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 24, fontWeight: '900', color: C.marrone, marginBottom: 4 }}>I miei ordini</Text>
        <Text style={{ fontSize: 13, color: C.grigio, marginBottom: 20 }}>Segui lo stato e rivedi i tuoi ordini passati.</Text>

        {caricando && <Text style={{ color: C.grigio, textAlign: 'center', marginTop: 20 }}>Caricamento...</Text>}

        {!caricando && (ordini || []).length === 0 && (
          <View style={{ alignItems: 'center', paddingTop: 40 }}>
            <Text style={{ fontSize: 40 }}>🧾</Text>
            <Text style={{ color: C.grigio, fontSize: 15, marginTop: 12, textAlign: 'center' }}>Non hai ancora fatto ordini.</Text>
            <TouchableOpacity style={[S.checkoutBtn, { marginTop: 16, paddingHorizontal: 28 }]} onPress={() => setTab('menu')}>
              <Text style={S.checkoutText}>Ordina ora</Text>
            </TouchableOpacity>
          </View>
        )}

        {attivi.length > 0 && <Text style={S.secLabel}>IN CORSO</Text>}
        {attivi.map(o => {
          const info = STATO_INFO[o.stato] || STATO_INFO.nuovo;
          let items = [];
          try { items = JSON.parse(o.items); } catch {}
          return (
            <View key={o.id} style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: info.colore }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color: C.grigio }}>{fmtData(o.created_at)}</Text>
                <Text style={{ fontSize: 13, fontWeight: '800', color: C.rosso }}>€ {Number(o.totale).toFixed(2)}</Text>
              </View>
              {/* Barra stato */}
              {o.stato !== 'rifiutato' ? (
                <View style={{ flexDirection: 'row', gap: 4, marginBottom: 8 }}>
                  {STATO_STEPS.map((s, idx) => (
                    <View key={s} style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: idx <= info.step ? info.colore : '#E8D5B0' }} />
                  ))}
                </View>
              ) : null}
              <Text style={{ fontSize: 15, fontWeight: '800', color: info.colore, marginBottom: 8 }}>{info.label}</Text>
              <Text style={{ fontSize: 13, color: C.grigio }}>
                {items.map(i => `${i.qty}× ${i.name}`).join(', ')}
              </Text>
              <Text style={{ fontSize: 12, color: C.grigio, marginTop: 6 }}>{o.tipo === 'domicilio' ? '🛵 Consegna' : '🥡 Asporto'} · {o.orario_consegna || ''}</Text>
            </View>
          );
        })}

        {storico.length > 0 && <Text style={S.secLabel}>STORICO</Text>}
        {storico.map(o => {
          const info = STATO_INFO[o.stato] || STATO_INFO.consegnato;
          let items = [];
          try { items = JSON.parse(o.items); } catch {}
          return (
            <View key={o.id} style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 13, color: C.grigio }}>{fmtData(o.created_at)}</Text>
                <Text style={{ fontSize: 13, fontWeight: '800', color: C.marrone }}>€ {Number(o.totale).toFixed(2)}</Text>
              </View>
              <Text style={{ fontSize: 12, fontWeight: '700', color: info.colore, marginBottom: 8 }}>{info.label}</Text>
              <Text style={{ fontSize: 13, color: C.grigio, marginBottom: 4 }}>
                {items.map(i => `${i.qty}× ${i.name}`).join(', ')}
              </Text>
              <Text style={{ fontSize: 12, color: C.grigio, marginBottom: 12 }}>{o.tipo === 'domicilio' ? '🛵 Consegna' : '🥡 Asporto'} · {o.orario_consegna || ''} · {o.pagamento || ''}</Text>
              <TouchableOpacity style={{ backgroundColor: C.rosso, borderRadius: 12, padding: 12, alignItems: 'center' }} onPress={() => riordina(o)}>
                <Text style={{ color: 'white', fontWeight: '800', fontSize: 14 }}>🔄 Riordina</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        <View style={{ height: 24 }} />
      </ScrollView>
    );
  };

  // Home e Menu non usano hook interni: le chiamo come funzioni per evitare il
  // rimontaggio che resettava lo scroll. Profilo/Ordini usano hook -> restano componenti.
  const screens = {
    home: Home(),
    menu: Menu(),
    cart: <CartScreen cart={cart} setCart={setCart} cartTotal={cartTotal} cartTotalRaw={cartTotalRaw} scontoCombo={scontoCombo} scontoPremio={scontoPremio} premioLabel={premioLabel} bibitaOmaggioId={bibitaOmaggioId} setBibitaOmaggioId={setBibitaOmaggioId} mancia={mancia} setMancia={setMancia} manciaConfermata={manciaConfermata} setManciaConfermata={setManciaConfermata} combo={combo} setCombo={setCombo} ordered={ordered} setOrdered={setOrdered} setTab={setTab} handleOrder={handleOrder} utente={utente} />,
    offers: Offers(),
    profilo: <Profilo />,
    ordini: <Ordini />,
  };

  return (
    <View style={S.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.rosso} />
      {ruotaVisibile && (
        <RuotaFortuna
          girando={ruotaGirando}
          premio={ruotaPremio}
          rotazione={ruotaRotazione}
          onGira={giraRuota}
          onChiudi={chiudiRuota}
        />
      )}
      {prodottoAggiunte && (
        <PannelloAggiunte
          prodotto={prodottoAggiunte}
          onConferma={(prod, agg, integrale) => { aggiungiConAggiunte(prod, agg, integrale); setProdottoAggiunte(null); }}
          onChiudi={() => setProdottoAggiunte(null)}
        />
      )}
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
          { key: 'cart', icon: '🛒', label: 'Carrello' },
          { key: 'ordini', icon: '🧾', label: 'Ordini' },
          { key: 'offers', icon: '🎁', label: 'Offerte' },
        ].map(n => (
          <TouchableOpacity key={n.key} style={S.navBtn} onPress={() => setTab(n.key)}>
            <View>
              <Text style={{ fontSize: 22 }}>{n.icon}</Text>
              {n.key === 'cart' && cartN > 0 && (
                <View style={{ position: 'absolute', top: -4, right: -10, backgroundColor: C.oro, borderRadius: 9, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 }}>
                  <Text style={{ color: C.marrone, fontSize: 11, fontWeight: '800' }}>{cartN}</Text>
                </View>
              )}
            </View>
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
  header: { backgroundColor: C.rosso, paddingTop: 40 },
  flagBar: { flexDirection: 'row', height: 14, borderTopWidth: 2, borderBottomWidth: 2, borderColor: C.oro },
  flagSeg: { flex: 1 },
  headerInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 8 },
  headerLogo: { fontSize: 26, fontWeight: '900', color: C.crema, letterSpacing: -1 },
  headerSub: { fontSize: 9, color: C.oro, letterSpacing: 4, marginTop: 1 },
  cartBadge: { position: 'relative', padding: 4 },
  cartDot: { position: 'absolute', top: 0, right: 0, backgroundColor: C.oro, borderRadius: 10, width: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  cartDotText: { fontSize: 10, fontWeight: 'bold', color: C.marrone },
  loginHeader: { backgroundColor: C.rosso, paddingTop: 60, paddingBottom: 24, alignItems: 'center' },
  loginLogo: { fontSize: 42, fontWeight: '900', color: C.crema, letterSpacing: -1 },
  loginSub: { fontSize: 11, color: C.oro, letterSpacing: 4, marginTop: 2 },
  loginBody: { flex: 1, padding: 24 },
  loginBodyContent: { alignItems: 'center', justifyContent: 'center', flexGrow: 1 },
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
  cartExtra: { fontSize: 11, color: C.grigio, marginTop: 1 },
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
  navbar: { backgroundColor: C.marrone, flexDirection: 'row', paddingBottom: 12, paddingTop: 6, borderTopWidth: 3, borderTopColor: C.rosso },
  navBtn: { flex: 1, alignItems: 'center', gap: 2 },
  navLabel: { fontSize: 9, color: 'rgba(242,232,213,0.35)', letterSpacing: 0.5, fontWeight: '600' },
  navLabelOn: { color: C.oro },
  navDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.oro, marginTop: 2 },
});