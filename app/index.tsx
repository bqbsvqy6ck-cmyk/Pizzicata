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

const VIDEO_DAL_FORNO = [
  { piattaforma: 'instagram', url: 'https://www.instagram.com/reel/C9SNNnHt5Tf/', titolo: 'Dietro le quinte' },
  { piattaforma: 'tiktok', url: 'https://vm.tiktok.com/ZNRTJXwPe/', titolo: 'In pizzeria' },
  { piattaforma: 'tiktok', url: 'https://vm.tiktok.com/ZNRTJbhke/', titolo: 'Dal forno a legna' },
];

const TRAFFICO_INFO = {
  verde:  { label: 'Tempi regolari', tempo: '20-25 min', color: '#27AE60', emoji: '🟢' },
  giallo: { label: "Un po' di attesa", tempo: '35-45 min', color: '#E8A317', emoji: '🟡' },
  rosso:  { label: 'Molto richiesti', tempo: '60 min e più', color: '#C0392B', emoji: '🔴' },
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
    { id: 48, name: 'La Antò', desc: 'Bianca, Crocchette di patate, Scamorza, Salsiccia, Grana, Basilico, Pepe', price: 11.00 },
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
    { id: 130, name: 'Fontanafredda Rosso', desc: 'Vino rosso, bottiglia', price: 10.00 },
    { id: 131, name: 'Fontanafredda Arneis', desc: 'Vino bianco, bottiglia', price: 10.00 },
    { id: 132, name: 'Spumante Santero 958 Extra Dry', desc: 'Spumante, bottiglia', price: 10.00 },
  ],
};

const CAT_EMOJI = {
  'Pane del Forno': '🍞', 'Pizze Rosse': '🍕', 'Pizze Bianche': '🍕',
  'Pizze Speciali': '⭐', 'Limited Edition': '🔥', 'Focacce': '🫓',
  'Calzoni': '🥙', 'Panuozzi': '🥪', 'Hamburger': '🍔',
  'Farinata': '🫓', 'Fritti': '🍟', 'Dolci': '🍰', 'Bevande': '🥤',
};

const isPizzaCombo = (id) => id >= 1 && id <= 66;
const isDolceCombo = (id) => id >= 102 && id <= 113;
const isBibitaCombo = (id) => id >= 114 && id <= 122;

const CATEGORIE_RIMOVIBILI = ['Pizze Rosse', 'Pizze Bianche', 'Pizze Speciali', 'Limited Edition', 'Focacce', 'Calzoni', 'Panuozzi', 'Hamburger'];

const ingredientiDi = (item) => {
  if (!item || !item.desc) return [];
  return item.desc.split(',').map(s => s.trim()).filter(s => s.length > 1);
};

const TUTTI_PRODOTTI = Object.keys(MENU).reduce((acc, cat) => {
  (MENU[cat] || []).forEach(p => acc.push({ ...p, categoria: cat }));
  return acc;
}, []);

const normalizza = (s) => (s || '')
  .toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const NUMERI_PAROLA = { uno: 1, una: 1, un: 1, due: 2, tre: 3, quattro: 4, cinque: 5, sei: 6, sette: 7, otto: 8, nove: 9, dieci: 10 };

const GIORNI_SETTIMANA = { domenica: 0, lunedi: 1, martedi: 2, mercoledi: 3, giovedi: 4, venerdi: 5, sabato: 6 };

const CATEGORIE_CON_AGGIUNTE = ['Pizze Rosse', 'Pizze Bianche', 'Pizze Speciali', 'Limited Edition', 'Focacce', 'Calzoni', 'Panuozzi', 'Hamburger', 'Farinata'];

const IMPASTO_INTEGRALE = { nome: 'Impasto integrale', prezzo: 1.00 };

const AGGIUNTE = [
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
  { nome: 'Bufala', prezzo: 2.50 },
  { nome: 'Crudo', prezzo: 2.50 },
  { nome: 'Speck', prezzo: 2.50 },
  { nome: 'Burrata', prezzo: 4.00 },
];

const ORARI_APERTURA = {
  pranzo: { apre: '12:00', chiude: '14:30' },
  cena: { apre: '18:15', chiude: '22:45' },
};

const aMinuti = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const statoApertura = (adesso = new Date()) => {
  const oraMin = adesso.getHours() * 60 + adesso.getMinutes();
  const inPranzo = oraMin >= aMinuti(ORARI_APERTURA.pranzo.apre) && oraMin < aMinuti(ORARI_APERTURA.pranzo.chiude);
  const inCena = oraMin >= aMinuti(ORARI_APERTURA.cena.apre) && oraMin < aMinuti(ORARI_APERTURA.cena.chiude);
  if (inPranzo || inCena) return { aperto: true, prossimaApertura: null };
  let prossima;
  if (oraMin < aMinuti(ORARI_APERTURA.pranzo.apre)) prossima = ORARI_APERTURA.pranzo.apre;
  else if (oraMin < aMinuti(ORARI_APERTURA.cena.apre)) prossima = ORARI_APERTURA.cena.apre;
  else prossima = ORARI_APERTURA.pranzo.apre;
  return { aperto: false, prossimaApertura: prossima };
};

const STATO_INFO = {
  nuovo: { label: 'In attesa di conferma', colore: '#8B7355', step: 0 },
  in_lavorazione: { label: 'Accettato, in preparazione', colore: '#C8961E', step: 1 },
  pronto: { label: 'In consegna', colore: '#2C5A2E', step: 2 },
  consegnato: { label: 'Consegnato', colore: '#2C5A2E', step: 3 },
  rifiutato: { label: 'Rifiutato', colore: '#8B1A1A', step: -1 },
};
const STATO_STEPS = ['nuovo', 'in_lavorazione', 'pronto', 'consegnato'];

// ANALISI ORDINE VOCALE — prodotti, aggiunte, rimozioni, orario, giorno, combo, note
const analizzaOrdineVocale = (testoParlato) => {
  let testo = normalizza(testoParlato);
  const risultato = {
    prodotti: [], tipo: null, orario: null, giornoSettimana: null,
    combo: false, note: '', testoOriginale: testoParlato,
  };

  // 0. COMBO
  if (/\b(combo famiglia|combo|menu famiglia|offerta famiglia)\b/.test(testo)) {
    risultato.combo = true;
    testo = testo.replace(/\b(combo famiglia|combo|menu famiglia|offerta famiglia)\b/g, ' ');
  }

  // 1. DOMICILIO / ASPORTO
  if (/\b(domicilio|a casa|consegna|consegnare|consegnata|consegnato)\b/.test(testo)) {
    risultato.tipo = 'domicilio';
    testo = testo.replace(/\b(a domicilio|domicilio|a casa|con consegna|consegna a casa)\b/g, ' ');
  } else if (/\b(asporto|ritiro|ritirare|da ritirare|porto via|portar via|prendo io|passo io|vengo a prendere)\b/.test(testo)) {
    risultato.tipo = 'asporto';
    testo = testo.replace(/\b(d asporto|da asporto|asporto|da ritirare|ritiro|porto via|portar via)\b/g, ' ');
  }

  // 1b. GIORNO
  for (const [nomeGiorno, idx] of Object.entries(GIORNI_SETTIMANA)) {
    const re = new RegExp('\\b' + nomeGiorno + '\\b');
    if (re.test(testo)) { risultato.giornoSettimana = idx; testo = testo.replace(re, ' '); break; }
  }
  if (risultato.giornoSettimana === null) {
    if (/\bdopodomani\b/.test(testo)) {
      const d = new Date(); d.setDate(d.getDate() + 2);
      risultato.giornoSettimana = d.getDay(); testo = testo.replace(/\bdopodomani\b/, ' ');
    } else if (/\bdomani\b/.test(testo)) {
      const d = new Date(); d.setDate(d.getDate() + 1);
      risultato.giornoSettimana = d.getDay(); testo = testo.replace(/\bdomani\b/, ' ');
    }
  }

  // 2. ORARIO
  const oraAdesso = new Date();
  let minutiTarget = null;
  const matchTraOre = testo.match(/tra (un|uno|una|due|tre|\d+) ?or[ae]( e mezza| e mezzo| e un quarto)?/);
  const matchTraMin = testo.match(/tra (\d+|dieci|quindici|venti|trenta|quaranta|quarantacinque|cinquanta) ?minut/);
  if (matchTraOre) {
    let ore = NUMERI_PAROLA[matchTraOre[1]] || parseInt(matchTraOre[1]) || 1;
    let minAgg = ore * 60;
    if (matchTraOre[2]) { if (matchTraOre[2].includes('mezz')) minAgg += 30; else if (matchTraOre[2].includes('quarto')) minAgg += 15; }
    minutiTarget = oraAdesso.getHours() * 60 + oraAdesso.getMinutes() + minAgg;
    testo = testo.replace(matchTraOre[0], ' ');
  } else if (matchTraMin) {
    const mappaMin = { dieci: 10, quindici: 15, venti: 20, trenta: 30, quaranta: 40, quarantacinque: 45, cinquanta: 50 };
    let m = mappaMin[matchTraMin[1]] || parseInt(matchTraMin[1]) || 0;
    minutiTarget = oraAdesso.getHours() * 60 + oraAdesso.getMinutes() + m;
    testo = testo.replace(matchTraMin[0], ' ');
  } else {
    let matchOra = testo.match(/(?:alle|all|per le|per l|verso le|verso l)\s*(\d{1,2})\s*(?::|\.)?\s*(\d{2})\b/);
    let oraDettaH = null, oraDettaM = 0;
    if (matchOra) {
      oraDettaH = parseInt(matchOra[1]); oraDettaM = parseInt(matchOra[2]) || 0;
      testo = testo.replace(matchOra[0], ' ');
    } else {
      const matchOra2 = testo.match(/(?:alle|all|per le|per l|verso le|verso l)\s*(\d{1,2})(?:\s+e\s+(mezza|mezzo|un quarto|tre quarti|\d{1,2}))?/);
      if (matchOra2) {
        oraDettaH = parseInt(matchOra2[1]);
        if (matchOra2[2]) {
          if (matchOra2[2] === 'mezza' || matchOra2[2] === 'mezzo') oraDettaM = 30;
          else if (matchOra2[2] === 'un quarto') oraDettaM = 15;
          else if (matchOra2[2] === 'tre quarti') oraDettaM = 45;
          else oraDettaM = parseInt(matchOra2[2]) || 0;
        }
        testo = testo.replace(matchOra2[0], ' ');
      }
    }
    if (oraDettaH !== null) {
      let h = oraDettaH;
      if (h >= 1 && h <= 11 && oraAdesso.getHours() >= 12) h += 12;
      minutiTarget = h * 60 + oraDettaM;
    }
  }
  if (minutiTarget !== null) {
    minutiTarget = ((minutiTarget % 1440) + 1440) % 1440;
    const hh = String(Math.floor(minutiTarget / 60)).padStart(2, '0');
    const mm = String(minutiTarget % 60).padStart(2, '0');
    risultato.orario = `${hh}:${mm}`;
  }

  // 3. RIMOZIONI ("senza X", "niente X")
  const rimozioniGlobali = [];
  const reSenza = /\b(senza|niente|no|togli|togliete|leva|levate)\s+([a-z]+(?:\s+[a-z]+)?)/g;
  let mSenza;
  while ((mSenza = reSenza.exec(testo)) !== null) {
    const ing = mSenza[2].trim();
    if (ing.length < 3) continue;
    rimozioniGlobali.push({ ingrediente: ing, pos: mSenza.index });
  }
  testo = testo.replace(/\b(senza|niente|no|togli|togliete|leva|levate)\s+[a-z]+(?:\s+[a-z]+)?/g, ' ');

  // 4. NOTE
  const noteTrovate = [];
  const matchIntoll = testo.match(/(intollerante?|allergico|allergica|allergia) (a |al |alla |ai |agli |alle )?([a-z]+)/);
  if (matchIntoll) { noteTrovate.push(matchIntoll[0]); testo = testo.replace(matchIntoll[0], ' '); }
  const frasiNota = ['tagliata','tagliato','tagliate','non tagliata','ben cotta','ben cotto','ben cotte','molto cotta','cottura alta','poco cotta','poco cotto','morbida','morbido','non bruciata','non bruciato','bruciata','bruciacchiata','senza sale','poco sale','poco olio','senza olio','ben calda','molto calda','a parte'];
  frasiNota.forEach(f => {
    if (testo.includes(' ' + f + ' ') || testo.includes(' ' + f) || testo.endsWith(f)) { noteTrovate.push(f); testo = testo.replace(f, ' '); }
  });
  risultato.note = noteTrovate.join(', ');

  // 5. PRODOTTI + AGGIUNTE
  const prodottiOrdinati = [...TUTTI_PRODOTTI].sort((a, b) => normalizza(b.name).length - normalizza(a.name).length);
  const variantiDi = (nomeNorm) => {
    const v = [nomeNorm];
    if (nomeNorm.endsWith('a')) v.push(nomeNorm.slice(0, -1) + 'e');
    if (nomeNorm.endsWith('o')) v.push(nomeNorm.slice(0, -1) + 'i');
    if (nomeNorm.endsWith('e')) v.push(nomeNorm.slice(0, -1) + 'i');
    return v;
  };
  const occorrenze = [];
  let testoMarcato = ' ' + testo + ' ';
  prodottiOrdinati.forEach(prod => {
    const nomeNorm = normalizza(prod.name);
    if (nomeNorm.length < 3) return;
    for (const v of variantiDi(nomeNorm)) {
      let pos = testoMarcato.indexOf(' ' + v + ' ');
      if (pos !== -1) {
        const contestoPrima = testoMarcato.slice(Math.max(0, pos - 12), pos).trim();
        const preceduto = /\b(piu|con|aggiungi|aggiunta)$/.test(contestoPrima);
        const esisteComeAggiunta = AGGIUNTE.some(a => {
          const an = normalizza(a.nome);
          return an === nomeNorm || an.includes(nomeNorm) || nomeNorm.includes(an);
        });
        if (preceduto && esisteComeAggiunta && occorrenze.length > 0) break;
        occorrenze.push({ prod, pos, lunghezza: v.length, variante: v });
        testoMarcato = testoMarcato.slice(0, pos) + ' '.repeat(v.length + 2) + testoMarcato.slice(pos + v.length + 2);
        break;
      }
    }
  });
  occorrenze.sort((a, b) => a.pos - b.pos);

  const testoPerSegmenti = ' ' + testo + ' ';
  occorrenze.forEach((occ, i) => {
    const prima = testoPerSegmenti.slice(0, occ.pos).trim().split(' ');
    const ultimaParola = prima[prima.length - 1] || '';
    let qty = 1;
    if (/^\d+$/.test(ultimaParola)) qty = parseInt(ultimaParola);
    else if (NUMERI_PAROLA[ultimaParola]) qty = NUMERI_PAROLA[ultimaParola];

    const inizioSegmento = occ.pos + occ.lunghezza;
    const fineSegmento = (i + 1 < occorrenze.length) ? occorrenze[i + 1].pos : testoPerSegmenti.length;
    const segmento = testoPerSegmenti.slice(inizioSegmento, fineSegmento);

    const aggiunteTrovate = [];
    let integrale = false;
    if (/\bintegrale\b/.test(segmento) || /\bintegrale\b/.test(testoPerSegmenti.slice(Math.max(0, occ.pos - 15), occ.pos))) integrale = true;
    AGGIUNTE.forEach(agg => {
      const aggNorm = normalizza(agg.nome);
      const variantiAgg = [aggNorm];
      if (aggNorm === 'gorgonzola') variantiAgg.push('gorgo');
      if (aggNorm === 'prosciutto cotto') variantiAgg.push('cotto', 'prosciutto');
      if (aggNorm === 'rinforzo mozzarella') variantiAgg.push('mozzarella');
      if (aggNorm === 'salamino') variantiAgg.push('salame', 'salamino');
      for (const va of variantiAgg) {
        if (segmento.includes(' ' + va + ' ') || segmento.includes(' ' + va) || segmento.endsWith(va)) {
          if (!aggiunteTrovate.find(a => a.nome === agg.nome)) aggiunteTrovate.push(agg);
          break;
        }
      }
    });
    risultato.prodotti.push({ prodotto: occ.prod, qty, aggiunte: aggiunteTrovate, rimozioni: [], integrale });
  });

  // Assegna rimozioni
  if (rimozioniGlobali.length > 0 && risultato.prodotti.length > 0) {
    if (risultato.prodotti.length === 1) {
      risultato.prodotti[0].rimozioni = rimozioniGlobali.map(r => r.ingrediente);
    } else {
      rimozioniGlobali.forEach(r => {
        let best = 0;
        for (let k = 0; k < occorrenze.length; k++) { if (occorrenze[k].pos <= r.pos) best = k; }
        if (risultato.prodotti[best]) risultato.prodotti[best].rimozioni.push(r.ingrediente);
      });
    }
  }

  return risultato;
};

const ORARI_SERA_FULL = ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '22:45'];
const ORARI_PRANZO_FULL = ['12:30', '13:00', '13:30', '14:00'];
const ORARI_PANE = ['Mattina (9:00-12:00)', 'Sera (18:15-22:45)'];

const getOrariDisponibili = (isOggi) => {
  if (!isOggi) return [...ORARI_PRANZO_FULL, ...ORARI_SERA_FULL];
  const ora = new Date().getHours();
  const minuti = new Date().getMinutes();
  const oraDecimale = ora + minuti / 60;
  if (oraDecimale < 14.5) {
    const pranziFiltrati = ORARI_PRANZO_FULL.filter(o => { const [h, m] = o.split(':').map(Number); return (h + m / 60) > oraDecimale + 0.3; });
    return [...pranziFiltrati, ...ORARI_SERA_FULL];
  }
  if (oraDecimale < 18.5) return ORARI_SERA_FULL;
  return ORARI_SERA_FULL.filter(o => { const [h, m] = o.split(':').map(Number); return (h + m / 60) > oraDecimale + 0.3; });
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
      dayOfWeek: d.getDay(),
      isPranzo: true, isSera: true,
    });
  }
  return giorni;
};

const indiceGiornoNelCalendario = (dayOfWeek, haPane) => {
  const cal = getCalendario();
  const start = haPane ? 1 : 0;
  for (let i = start; i < cal.length; i++) { if (cal[i].dayOfWeek === dayOfWeek) return i; }
  return start;
};

// LOGIN SCREEN — con compleanno nel sign-up
function LoginScreen({ onLogin }) {
  const [tel, setTel] = useState('');
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [indirizzo, setIndirizzo] = useState('');
  const [allergie, setAllergie] = useState('');
  const [compleanno, setCompleanno] = useState('');
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
      let premioFinale = data.premio_attivo || '';
      if (data.compleanno && data.compleanno.trim()) {
        const oggi = new Date();
        const [, mese, giorno] = data.compleanno.split('-').map(Number);
        const eCompleannoOggi = (oggi.getMonth() + 1 === mese && oggi.getDate() === giorno);
        const annoOggi = oggi.getFullYear();
        const giaUsatoQuestAnno = data.compleanno_usato === String(annoOggi);
        if (eCompleannoOggi && !giaUsatoQuestAnno && !premioFinale) {
          premioFinale = 'compleanno';
          try { supabase.from('clienti').update({ premio_attivo: 'compleanno', compleanno_usato: String(annoOggi) }).eq('telefono', clean); } catch (e) {}
        }
      }
      onLogin({ telefono: clean, nome: data.nome, cognome: data.cognome || '', email: data.email || '', indirizzo: data.indirizzo || '', pagamento: data.pagamento || 'contanti', allergie: data.allergie || '', premio: premioFinale, compleanno: data.compleanno || '' });
    } else {
      setStep(2); setErrore('');
    }
  };

  const registra = async () => {
    if (!nome.trim()) { setErrore('Inserisci il tuo nome'); return; }
    if (!cognome.trim()) { setErrore('Inserisci il tuo cognome'); return; }
    const clean = tel.replace(/\s/g, '');
    setLoading(true);
    const datiCliente = {
      telefono: clean, nome: nome.trim(), cognome: cognome.trim(),
      email: email.trim(), indirizzo: indirizzo.trim(),
      pagamento: 'contanti', allergie: allergie.trim(),
    };
    if (compleanno) datiCliente.compleanno = compleanno;
    const { error } = await supabase.from('clienti').insert([datiCliente]);
    setLoading(false);
    if (error) { setErrore('Errore: ' + error.message); return; }
    onLogin(datiCliente);
  };

  return (
    <View style={S.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.rosso} />
      <View style={[S.loginHeader, { background: 'radial-gradient(circle at 80% -10%, rgba(232,184,75,0.4), transparent 55%), linear-gradient(135deg, #8B1A1A 0%, #5C0F0F 100%)' }]}>
        <svg width="120" height="120" viewBox="0 0 200 200" fill="none" style={{ position: 'absolute', right: -20, bottom: -30, opacity: 0.55 }}>
          <path d="M100 10 L190 170 Q100 200 10 170 Z" fill="#E8B84B"/>
          <path d="M100 30 L175 165 Q100 190 25 165 Z" fill="#C0392B" opacity="0.85"/>
          <circle cx="80" cy="120" r="11" fill="#F2E8D5"/>
          <circle cx="115" cy="100" r="9" fill="#F2E8D5"/>
          <circle cx="75" cy="155" r="7" fill="#2C5A2E"/>
        </svg>
        <Text style={S.loginLogo}>Pizzicata</Text>
        <Text style={S.loginSub}>— TORINO —</Text>
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
            <input style={inputStyle} placeholder="333 1234567" value={tel} onChange={(e) => setTel(e.target.value)} type="tel" />
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
            <View style={{ height: 12 }} />
            <Text style={S.formLabel}>🎂 DATA DI COMPLEANNO</Text>
            <input style={inputStyle} value={compleanno} onChange={(e) => setCompleanno(e.target.value)} type="date" />
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

function CartScreen({ cart, setCart, cartTotal, cartTotalRaw, scontoCombo, scontoPremio, premioLabel, bibitaOmaggioId, setBibitaOmaggioId, bibitaOmaggioId2, setBibitaOmaggioId2, mancia, setMancia, manciaConfermata, setManciaConfermata, apertura, combo, ordered, setOrdered, setTab, setCat, handleOrder, utente, precompilaVocale, setPrecompilaVocale, aggiornaRimozioni }) {
  const [indirizzo, setIndirizzo] = useState(utente.indirizzo || '');
  const [note, setNote] = useState(utente.allergie && utente.allergie.trim() ? `Allergie/intolleranze: ${utente.allergie.trim()}` : '');
  const [tipoOrdine, setTipoOrdine] = useState('domicilio');
  const [pagamento, setPagamento] = useState(utente.pagamento || 'contanti');
  const [giornoSelezionato, setGiornoSelezionato] = useState(0);
  const [errore, setErrore] = useState('');
  const [prodRimozione, setProdRimozione] = useState(null);

  const haPane = cart.some(i => i.id >= 200);
  const calendario = getCalendario().filter((_, i) => !haPane || i > 0);

  const isOggi = giornoSelezionato === 0 && !haPane;
  const ORARI = getOrariDisponibili(isOggi);
  const [orario, setOrario] = useState(() => getOrariDisponibili(true)[0] || '18:30');
  const [oraCustom, setOraCustom] = useState('19');
  const [minCustom, setMinCustom] = useState('00');
  const [manciaCustomAttiva, setManciaCustomAttiva] = useState(false);
  const [manciaCustomVal, setManciaCustomVal] = useState('');

  useEffect(() => {
    if (!precompilaVocale) return;
    if (precompilaVocale.tipo) setTipoOrdine(precompilaVocale.tipo);
    if (precompilaVocale.note) {
      setNote(prev => { const base = prev && prev.trim() ? prev.trim() + '. ' : ''; return base + precompilaVocale.note; });
    }
    if (precompilaVocale.giornoSettimana !== null && precompilaVocale.giornoSettimana !== undefined) {
      const idx = indiceGiornoNelCalendario(precompilaVocale.giornoSettimana, haPane);
      const idxFiltrato = haPane ? Math.max(0, idx - 1) : idx;
      setGiornoSelezionato(idxFiltrato);
    }
    if (precompilaVocale.orario) {
      const [h, m] = precompilaVocale.orario.split(':');
      setOraCustom(String(parseInt(h))); setMinCustom(m); setOrario('custom');
    }
    setPrecompilaVocale(null);
  }, [precompilaVocale]);

  useEffect(() => {
    const nuovi = getOrariDisponibili(giornoSelezionato === 0 && !haPane);
    if (orario !== 'custom' && !nuovi.includes(orario)) setOrario(nuovi[0] || '18:30');
  }, [giornoSelezionato, haPane]);

  const spedizioneExtra = tipoOrdine === 'domicilio' ? 2.5 : 0;

  const addQty = (cartKey) => setCart(prev => prev.map(c => c.cartKey === cartKey ? { ...c, qty: c.qty + 1 } : c));
  const removeQty = (cartKey) => setCart(prev => prev.map(c => c.cartKey === cartKey ? { ...c, qty: c.qty - 1 } : c).filter(c => c.qty > 0));

  const doOrder = () => {
    if (combo) { setErrore('Hai una Combo Famiglia non confermata. Completala e premi "Conferma combo", oppure annullala dal menù.'); return; }
    if (tipoOrdine === 'domicilio' && !indirizzo.trim()) { setErrore('Inserisci il tuo indirizzo!'); return; }
    const orarioFinale = orario === 'custom' ? `${oraCustom}:${minCustom}` : orario;
    const vuoleSubito = orarioFinale === 'Appena possibile';
    if (apertura && !apertura.aperto && isOggi && vuoleSubito) {
      setErrore(`Siamo chiusi in questo momento${apertura.prossimaApertura ? `, riapriamo alle ${apertura.prossimaApertura}` : ''}. Per ordinare adesso aspetta l'apertura, oppure scegli un orario specifico più avanti per preordinare.`);
      return;
    }
    if (isOggi && !vuoleSubito) {
      const match = orarioFinale.match(/^(\d{1,2}):(\d{2})$/);
      if (match) {
        const minutiScelti = Number(match[1]) * 60 + Number(match[2]);
        const adesso = new Date();
        const minutiOra = adesso.getHours() * 60 + adesso.getMinutes();
        const MARGINE = 20;
        const nottePrima = minutiOra < aMinuti(ORARI_APERTURA.pranzo.apre);
        if (!nottePrima && minutiScelti < minutiOra + MARGINE) {
          setErrore(`L'orario scelto è già passato o troppo vicino. Scegli un orario almeno ${MARGINE} minuti più avanti, oppure "Appena possibile".`);
          return;
        }
        const dentroPranzo = minutiScelti >= aMinuti(ORARI_APERTURA.pranzo.apre) && minutiScelti <= aMinuti(ORARI_APERTURA.pranzo.chiude);
        const dentroCena = minutiScelti >= aMinuti(ORARI_APERTURA.cena.apre) && minutiScelti <= aMinuti(ORARI_APERTURA.cena.chiude);
        if (!dentroPranzo && !dentroCena) { setErrore("L'orario scelto è fuori dagli orari di apertura (12:00-14:30 / 18:15-22:45)."); return; }
      }
    }
    setErrore('');
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
      {prodRimozione && (
        <PannelloRimozione
          item={prodRimozione}
          onChiudi={() => setProdRimozione(null)}
          onSalva={(rimozioni) => { aggiornaRimozioni(prodRimozione.cartKey, rimozioni); setProdRimozione(null); }}
        />
      )}
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
          <Text style={{ fontFamily: FONT_TITOLO, fontSize: 26, fontWeight: '900', color: C.marrone, marginTop: 6, marginBottom: 4 }}>Il tuo ordine</Text>
          <Text style={{ fontFamily: FONT_TESTO, fontSize: 13, color: C.grigio, marginBottom: 16 }}>Rivedi e completa il tuo ordine</Text>
          {cart.map(item => {
            const rimovibile = CATEGORIE_RIMOVIBILI.includes(item.categoria) && ingredientiDi(item).length > 0;
            return (
            <View key={item.cartKey} style={S.cartCard}>
              <View style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(160deg, #A82020 0%, #6E1212 100%)', backgroundColor: '#8B1A1A', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 22 }}>{item.id >= 200 ? '🍞' : '🍕'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={S.cartName}>{item.name}</Text>
                {item.integrale && <Text style={S.cartExtra}>+ Impasto integrale</Text>}
                {item.aggiunte && item.aggiunte.length > 0 && (
                  <Text style={S.cartExtra}>+ {item.aggiunte.map(a => a.nome).join(', ')}</Text>
                )}
                {item.rimozioni && item.rimozioni.length > 0 && (
                  <Text style={[S.cartExtra, { color: '#C0392B' }]}>− senza {item.rimozioni.join(', ')}</Text>
                )}
                <Text style={S.cartPrice}>€ {(item.price * item.qty).toFixed(2)}</Text>
                {rimovibile && (
                  <TouchableOpacity onPress={() => setProdRimozione(item)} style={{ marginTop: 4 }}>
                    <Text style={{ fontFamily: FONT_TESTO, fontSize: 12, color: C.rosso, fontWeight: '700' }}>
                      {item.rimozioni && item.rimozioni.length > 0 ? '✏️ Modifica ingredienti' : '➖ Vuoi rimuovere un ingrediente?'}
                    </Text>
                  </TouchableOpacity>
                )}
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
            );
          })}

          {(() => {
            const haBibita = cart.some(i => isBibitaCombo(i.id));
            const haCibo = cart.some(i => i.id < 114 || i.id >= 200);
            if (haBibita || !haCibo) return null;
            return (
              <TouchableOpacity activeOpacity={0.85} onPress={() => { setCat('Bevande'); setTab('menu'); }}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FBF4E6', borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#EBDCC0', borderStyle: 'dashed' }}>
                <Text style={{ fontSize: 28 }}>🥤</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: FONT_TESTO, fontSize: 14, fontWeight: '800', color: C.marrone }}>Vuoi aggiungere una bibita?</Text>
                  <Text style={{ fontFamily: FONT_TESTO, fontSize: 12, color: C.grigio }}>Completa l'ordine con qualcosa da bere</Text>
                </View>
                <Text style={{ fontFamily: FONT_TESTO, fontSize: 13, color: C.rosso, fontWeight: '800' }}>Aggiungi →</Text>
              </TouchableOpacity>
            );
          })()}
          {haPane && (
            <View style={{ backgroundColor: '#FFF8E7', borderRadius: 12, padding: 12, borderLeftWidth: 4, borderLeftColor: C.oro, marginBottom: 12 }}>
              <Text style={{ fontSize: 12, color: '#8B6914', fontWeight: '700' }}>🍞 Ordine con pane del forno</Text>
              <Text style={{ fontSize: 11, color: C.grigio, marginTop: 3 }}>Il pane viene preparato il giorno prima — scegli la data di domani o successiva.</Text>
            </View>
          )}

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

          {tipoOrdine === 'domicilio' && (
            <View style={S.formBox}>
              <Text style={S.formLabel}>INDIRIZZO DI CONSEGNA *</Text>
              <input style={inputStyle} placeholder="Via, numero civico..." value={indirizzo} onChange={(e) => setIndirizzo(e.target.value)} />
              <Text style={{ fontSize: 10, color: C.grigio, marginTop: 6, fontStyle: 'italic' }}>Consegniamo entro 5km da Corso Giambone 8/b</Text>
            </View>
          )}

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

          <View style={S.formBox}>
            <Text style={S.formLabel}>NOTE E ALLERGIE</Text>
            <textarea style={textareaStyle} placeholder="Allergie, intolleranze, richieste speciali..." value={note} onChange={(e) => setNote(e.target.value)} />
          </View>

          {(utente.premio === 'bibita' || utente.premio === 'bibita2') && (
            <View style={{ backgroundColor: '#FFF8E8', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 2, borderColor: C.oro }}>
              <Text style={{ fontSize: 15, fontWeight: '800', color: C.marrone, marginBottom: 4 }}>
                {utente.premio === 'bibita2' ? '🥤 Hai 2 bibite in omaggio!' : '🥤 Hai una bibita in omaggio!'}
              </Text>
              <Text style={{ fontSize: 12, color: C.grigio, marginBottom: 10 }}>
                {utente.premio === 'bibita2' ? 'Premio della ruota potenziata. Scegli 2 bibite gratis (le altre le paghi normalmente).' : 'Premio della ruota. Scegli quale bibita vuoi gratis (le altre le paghi normalmente).'}
              </Text>
              {(() => {
                const bibiteCarrello = cart.filter(c => isBibitaCombo(c.id));
                if (bibiteCarrello.length === 0) return <Text style={{ fontSize: 13, color: C.rosso }}>Aggiungi una bibita dal menù per usare l'omaggio.</Text>;
                return (
                  <>
                    <select value={bibitaOmaggioId || ''} onChange={(e) => setBibitaOmaggioId(e.target.value ? Number(e.target.value) : null)} style={{ ...inputStyle, height: 44 }}>
                      <option value="">— Scegli la {utente.premio === 'bibita2' ? '1ª ' : ''}bibita omaggio —</option>
                      {bibiteCarrello.map(b => <option key={b.id} value={b.id}>{b.name} (€ {b.price.toFixed(2)})</option>)}
                    </select>
                    {utente.premio === 'bibita2' && (
                      <select value={bibitaOmaggioId2 || ''} onChange={(e) => setBibitaOmaggioId2(e.target.value ? Number(e.target.value) : null)} style={{ ...inputStyle, height: 44, marginTop: 8 }}>
                        <option value="">— Scegli la 2ª bibita omaggio —</option>
                        {bibiteCarrello.map(b => <option key={b.id} value={b.id}>{b.name} (€ {b.price.toFixed(2)})</option>)}
                      </select>
                    )}
                  </>
                );
              })()}
            </View>
          )}

          {errore ? <Text style={S.errore}>{errore}</Text> : null}

          {(() => {
            const totalePreMancia = cartTotal + spedizioneExtra;
            const arrotonda = Math.max(0, Math.ceil(totalePreMancia) - totalePreMancia);
            const arrotondaVal = Math.round(arrotonda * 100) / 100;
            const opzioni = [
              { label: '1 €', val: 1 }, { label: '2 €', val: 2 }, { label: '5 €', val: 5 },
              { label: arrotondaVal > 0 ? `Arrotonda (+€ ${arrotondaVal.toFixed(2)})` : 'Arrotonda', val: arrotondaVal },
            ];
            return (
              <View style={{ backgroundColor: '#FBF4E6', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E8D5B0' }}>
                <Text style={{ fontSize: 15, fontWeight: '800', color: C.marrone }}>💛 Offri una mancia</Text>
                <Text style={{ fontSize: 12, color: C.grigio, marginTop: 2, marginBottom: 10 }}>Un piccolo gesto per il nostro staff. Del tutto facoltativo.</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {opzioni.map((o, i) => {
                    const attiva = mancia === o.val && o.val > 0 && !manciaCustomAttiva;
                    return (
                      <TouchableOpacity key={i} onPress={() => { setManciaCustomAttiva(false); setManciaCustomVal(''); setMancia(attiva ? 0 : o.val); }}
                        style={{ paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, borderWidth: 2, borderColor: attiva ? C.oro : '#E8D5B0', backgroundColor: attiva ? '#FFF3D6' : '#FBF4E6' }}>
                        <Text style={{ fontSize: 13, fontWeight: '700', color: attiva ? '#8B6914' : C.grigio }}>{o.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                  <TouchableOpacity onPress={() => { if (manciaCustomAttiva) { setManciaCustomAttiva(false); setManciaCustomVal(''); setMancia(0); } else { setManciaCustomAttiva(true); setMancia(0); } }}
                    style={{ paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, borderWidth: 2, borderColor: manciaCustomAttiva ? C.oro : '#E8D5B0', backgroundColor: manciaCustomAttiva ? '#FFF3D6' : '#FBF4E6' }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: manciaCustomAttiva ? '#8B6914' : C.grigio }}>✏️ Personalizzata</Text>
                  </TouchableOpacity>
                </View>
                {manciaCustomAttiva && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '800', color: C.marrone }}>€</Text>
                    <input type="number" min="0" step="0.50" inputMode="decimal" placeholder="Importo a tua scelta" value={manciaCustomVal}
                      onChange={(e) => { const v = e.target.value; setManciaCustomVal(v); const n = parseFloat(v); setMancia(!isNaN(n) && n > 0 ? Math.round(n * 100) / 100 : 0); }}
                      style={{ ...inputStyle, flex: 1, height: 44 }} />
                  </View>
                )}
                {mancia > 0 && (
                  <TouchableOpacity onPress={() => setManciaConfermata(!manciaConfermata)} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 8 }}>
                    <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: manciaConfermata ? '#2C5A2E' : '#C0AE90', backgroundColor: manciaConfermata ? '#2C5A2E' : '#FFFCF6', alignItems: 'center', justifyContent: 'center' }}>
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
            <Text style={S.checkoutText}>
              {(apertura && !apertura.aperto) ? '📅 Preordina (siamo chiusi ora)' : 'Conferma Ordine'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

// Pannello rimozione ingredienti
function PannelloRimozione({ item, onChiudi, onSalva }) {
  const ingredienti = ingredientiDi(item);
  const [rimossi, setRimossi] = useState(item.rimozioni || []);
  const toggle = (ing) => { setRimossi(prev => prev.includes(ing) ? prev.filter(x => x !== ing) : [...prev, ing]); };
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 99998, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onChiudi}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#FBF6EC', width: '100%', maxWidth: 520, maxHeight: '80vh', borderTopLeftRadius: 22, borderTopRightRadius: 22, display: 'flex', flexDirection: 'column', boxShadow: '0 -8px 30px rgba(0,0,0,0.3)' }}>
        <div style={{ padding: '18px 20px 12px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 19, fontWeight: 900, color: '#5A2D0C', fontFamily: FONT_TITOLO }}>{item.name}</div>
              <div style={{ fontSize: 13, color: '#8B7355', marginTop: 4, fontFamily: FONT_TESTO }}>Tocca un ingrediente per toglierlo. Verrà segnalato alla cucina.</div>
            </div>
            <div onClick={onChiudi} style={{ fontSize: 22, color: '#8B7355', cursor: 'pointer', padding: 4, lineHeight: 1 }}>✕</div>
          </div>
        </div>
        <div style={{ overflowY: 'auto', padding: '14px 20px', flex: 1 }}>
          {ingredienti.map(ing => {
            const tolto = rimossi.includes(ing);
            return (
              <div key={ing} onClick={() => toggle(ing)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', marginBottom: 8, borderRadius: 12, cursor: 'pointer', background: tolto ? 'rgba(192,57,43,0.12)' : '#FBF4E6', border: `2px solid ${tolto ? '#C0392B' : 'rgba(0,0,0,0.08)'}` }}>
                <span style={{ fontSize: 15, fontWeight: 600, fontFamily: FONT_TESTO, color: tolto ? '#C0392B' : '#5A2D0C', textDecoration: tolto ? 'line-through' : 'none' }}>{ing}</span>
                <span style={{ fontSize: 13, fontWeight: 800, fontFamily: FONT_TESTO, color: tolto ? '#C0392B' : '#8B7355' }}>{tolto ? '✕ Tolto' : 'Togli'}</span>
              </div>
            );
          })}
        </div>
        <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(0,0,0,0.08)', background: '#FBF6EC' }}>
          <button onClick={() => onSalva(rimossi)} style={{ width: '100%', background: '#8B1A1A', color: 'white', border: 'none', borderRadius: 14, padding: 15, fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: FONT_TESTO }}>
            {rimossi.length > 0 ? `Conferma (senza ${rimossi.length} ingrediente${rimossi.length > 1 ? 'i' : ''})` : 'Lascia tutto'}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  border: '1.5px solid #E8D5B0', borderRadius: 10, padding: 12,
  fontSize: 14, color: '#3D1A00', width: '100%', outline: 'none',
  fontFamily: 'inherit', backgroundColor: '#FFFCF6', boxSizing: 'border-box',
};
const textareaStyle = {
  border: '1.5px solid #E8D5B0', borderRadius: 10, padding: 12,
  fontSize: 14, color: '#3D1A00', width: '100%', minHeight: 80,
  outline: 'none', fontFamily: 'inherit', resize: 'none',
  backgroundColor: '#FFFCF6', boxSizing: 'border-box',
};

function RuotaFortuna({ girando, premio, rotazione, potenziata, onGira, onChiudi }) {
  const N = 6;
  const gradiPerSpicchio = 360 / N;
  const labelBibita = potenziata ? ['2 bibite', 'omaggio'] : ['Bibita', 'omaggio'];
  const labelSconto = potenziata ? ['Sconto', '15%'] : ['Sconto', '10%'];
  const spicchi = [
    { tipo: 'bibita', colore: '#C8961E' }, { tipo: 'sconto', colore: '#8B1A1A' },
    { tipo: 'bibita', colore: '#2C5A2E' }, { tipo: 'sconto', colore: '#C8961E' },
    { tipo: 'bibita', colore: '#8B1A1A' }, { tipo: 'sconto', colore: '#2C5A2E' },
  ];
  const conic = spicchi.map((s, i) => `${s.colore} ${i * gradiPerSpicchio}deg ${(i + 1) * gradiPerSpicchio}deg`).join(', ');
  const premioBibita = premio === 'bibita' || premio === 'bibita2';
  let premioTitolo = '';
  if (premio === 'bibita') premioTitolo = 'Bibita in omaggio!';
  else if (premio === 'bibita2') premioTitolo = '2 bibite in omaggio!';
  else if (premio === 'sconto10') premioTitolo = 'Sconto 10%!';
  else if (premio === 'compleanno') premioTitolo = 'Buon compleanno! Sconto 10%';
  else if (premio === 'sconto15') premioTitolo = 'Sconto 15%!';
  const bordoColore = potenziata ? '#E0B84A' : '#C8961E';
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: 20 }}>
      {potenziata && (
        <div style={{ fontSize: 13, fontWeight: 900, color: '#3D1A00', background: 'linear-gradient(90deg,#E0B84A,#FFD86B)', padding: '4px 16px', borderRadius: 20, marginBottom: 10, letterSpacing: 1 }}>⭐ RUOTA POTENZIATA ⭐</div>
      )}
      <div style={{ fontSize: 26, fontWeight: 900, color: '#F2E8D5', marginBottom: 4, textAlign: 'center' }}>Ruota della Fortuna!</div>
      <div style={{ fontSize: 14, color: 'rgba(242,232,213,0.85)', marginBottom: 24, textAlign: 'center' }}>
        {premio ? 'Complimenti!' : (potenziata ? 'Hai speso piu di 50 euro: premi raddoppiati!' : 'Hai speso piu di 15 euro: gira e vinci!')}
      </div>
      <div style={{ position: 'relative', width: 280, height: 300 }}>
        <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderTop: '26px solid #fff', zIndex: 5, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))' }} />
        <div style={{ position: 'absolute', top: 20, left: '50%', marginLeft: -130, width: 260, height: 260, borderRadius: '50%', background: `conic-gradient(${conic})`, border: `8px solid ${bordoColore}`, boxSizing: 'border-box', boxShadow: potenziata ? '0 0 40px rgba(224,184,74,0.8)' : '0 0 30px rgba(200,150,30,0.5)', transform: `rotate(${rotazione}deg)`, transition: 'transform 4.2s cubic-bezier(0.15, 0.7, 0.1, 1)' }}>
          {spicchi.map((s, i) => {
            const centro = i * gradiPerSpicchio + gradiPerSpicchio / 2;
            const lbl = s.tipo === 'bibita' ? labelBibita : labelSconto;
            return (
              <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, transform: `rotate(${centro}deg) translateY(-85px)` }}>
                <div style={{ transform: 'translate(-50%, -50%)', color: 'white', fontSize: 12, fontWeight: 800, textAlign: 'center', lineHeight: 1.15, width: 64, textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}>
                  <div>{lbl[0]}</div><div>{lbl[1]}</div>
                </div>
              </div>
            );
          })}
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: 22, height: 22, marginTop: -11, marginLeft: -11, background: '#fff', borderRadius: '50%', border: `3px solid ${bordoColore}`, zIndex: 2 }} />
        </div>
      </div>
      {!premio ? (
        <button onClick={onGira} disabled={girando} style={{ background: girando ? '#8B7355' : bordoColore, color: '#3D1A00', fontWeight: 900, fontSize: 18, border: 'none', borderRadius: 16, padding: '16px 50px', marginTop: 24, cursor: girando ? 'default' : 'pointer', fontFamily: 'inherit' }}>
          {girando ? 'Gira...' : 'GIRA!'}
        </button>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 24 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 20, textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 40 }}>{premioBibita ? '🥤' : '🎟️'}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#3D1A00', marginTop: 8 }}>{premioTitolo}</div>
            <div style={{ fontSize: 13, color: '#8B7355', marginTop: 4 }}>Lo userai al tuo prossimo ordine</div>
          </div>
          <button onClick={onChiudi} style={{ background: '#8B1A1A', color: 'white', fontWeight: 800, fontSize: 16, border: 'none', borderRadius: 16, padding: '14px 40px', cursor: 'pointer', fontFamily: 'inherit' }}>Fantastico!</button>
        </div>
      )}
    </div>
  );
}

function PannelloAggiunte({ prodotto, onConferma, onChiudi }) {
  const [sel, setSel] = useState([]);
  const [integrale, setIntegrale] = useState(false);
  if (!prodotto) return null;
  const toggle = (agg) => { setSel(prev => prev.find(a => a.nome === agg.nome) ? prev.filter(a => a.nome !== agg.nome) : [...prev, agg]); };
  const costoExtra = sel.reduce((s, a) => s + a.prezzo, 0) + (integrale ? IMPASTO_INTEGRALE.prezzo : 0);
  const totale = prodotto.price + costoExtra;
  const farinata = prodotto.id >= 79 && prodotto.id <= 89;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 99998, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onChiudi}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#FBF6EC', width: '100%', maxWidth: 520, maxHeight: '85vh', borderTopLeftRadius: 22, borderTopRightRadius: 22, display: 'flex', flexDirection: 'column', boxShadow: '0 -8px 30px rgba(0,0,0,0.3)' }}>
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
        <div style={{ overflowY: 'auto', padding: '14px 20px', flex: 1 }}>
          {!farinata && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#8B7355', textTransform: 'uppercase', marginBottom: 8 }}>Impasto</div>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: integrale ? '#FFF3D6' : '#FBF4E6', border: `2px solid ${integrale ? '#C8961E' : 'rgba(0,0,0,0.08)'}`, borderRadius: 12, cursor: 'pointer' }}>
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
              <label key={agg.nome} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', marginBottom: 7, background: attiva ? '#FFF3D6' : '#FBF4E6', border: `2px solid ${attiva ? '#C8961E' : 'rgba(0,0,0,0.08)'}`, borderRadius: 12, cursor: 'pointer' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" checked={attiva} onChange={() => toggle(agg)} style={{ width: 18, height: 18, accentColor: '#C8961E' }} />
                  <span style={{ fontSize: 14, color: '#5A2D0C', fontWeight: 600 }}>{agg.nome}</span>
                </span>
                <span style={{ fontSize: 14, color: '#8B1A1A', fontWeight: 700 }}>+€ {agg.prezzo.toFixed(2).replace('.', ',')}</span>
              </label>
            );
          })}
        </div>
        <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(0,0,0,0.08)', background: '#FBF6EC' }}>
          <button onClick={() => onConferma(prodotto, sel, integrale)} style={{ width: '100%', background: '#8B1A1A', color: 'white', border: 'none', borderRadius: 14, padding: '15px', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
            <span>Aggiungi al carrello</span>
            <span>€ {totale.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function RotellaGira({ size = 46 }) {
  const [deg, setDeg] = useState(0);
  useEffect(() => {
    let raf; let start = null;
    const tick = (t) => { if (start === null) start = t; const elapsed = t - start; setDeg((elapsed / 6000) * 360 % 360); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0, background: 'conic-gradient(#C8961E 0deg 60deg, #8B1A1A 60deg 120deg, #2C5A2E 120deg 180deg, #C8961E 180deg 240deg, #8B1A1A 240deg 300deg, #2C5A2E 300deg 360deg)', border: '3px solid #E8B84B', boxShadow: '0 0 16px rgba(232,184,75,0.6)', transform: `rotate(${deg}deg)` }} />
  );
}

function SecLabel({ testo }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 22, marginBottom: 12, marginHorizontal: 4 }}>
      <Text style={{ color: C.oro, fontSize: 13 }}>◆</Text>
      <Text style={{ fontFamily: FONT_TESTO, fontSize: 12, fontWeight: '800', letterSpacing: 2, color: C.grigio, textTransform: 'uppercase' }}>{testo}</Text>
      <View style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #E8D5B0, transparent)' }} />
    </View>
  );
}

function OrdineVocale({ onChiudi, onConferma }) {
  const [stato, setStato] = useState('pronto');
  const [testoParlato, setTestoParlato] = useState('');
  const [analisi, setAnalisi] = useState(null);
  const [messaggioErrore, setMessaggioErrore] = useState('');
  const recognitionRef = useRef(null);

  const iniziaAscolto = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessaggioErrore('Il tuo browser non supporta il microfono. Prova con Chrome su Android, oppure ordina dal menù.');
      setStato('errore'); return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'it-IT';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const testo = event.results[0][0].transcript;
      setTestoParlato(testo);
      const ris = analizzaOrdineVocale(testo);
      setAnalisi(ris); setStato('risultato');
    };
    recognition.onerror = (event) => {
      setMessaggioErrore(event.error === 'not-allowed' ? "Devi permettere l'uso del microfono nel browser." : 'Non ho sentito bene, riprova.');
      setStato('errore');
    };
    recognition.onend = () => { if (stato === 'ascolto') setStato(s => s === 'ascolto' ? 'pronto' : s); };
    recognitionRef.current = recognition;
    setTestoParlato(''); setAnalisi(null); setStato('ascolto');
    recognition.start();
  };

  const prezzoConAggiunte = (p) => (p.prodotto.price + (p.aggiunte || []).reduce((s, a) => s + a.prezzo, 0) + (p.integrale ? 1 : 0)) * p.qty;
  const totaleStimato = analisi ? analisi.prodotti.reduce((s, p) => s + prezzoConAggiunte(p), 0) : 0;
  const nomeGiornoVocale = (idx) => ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'][idx];

  return (
    <div onClick={onChiudi} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 99999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#F7EFDF', borderTopLeftRadius: 26, borderTopRightRadius: 26, width: '100%', maxWidth: 480, padding: 24, maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 -10px 40px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontFamily: FONT_TITOLO, fontSize: 22, fontWeight: 900, color: C.marrone }}>🎤 Ordina a voce</span>
          <span onClick={onChiudi} style={{ fontSize: 24, color: C.grigio, cursor: 'pointer' }}>✕</span>
        </div>
        {stato === 'pronto' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontFamily: FONT_TESTO, fontSize: 14, color: C.grigio, marginBottom: 20, lineHeight: 1.5 }}>
              Premi il microfono e dì cosa vuoi.<br />Esempio: <i>"una margherita senza basilico e due coca cola per venerdì"</i>
            </div>
            <button onClick={iniziaAscolto} style={{ width: 100, height: 100, borderRadius: '50%', border: 'none', background: 'linear-gradient(135deg, #A82020, #6E1212)', color: '#fff', fontSize: 44, cursor: 'pointer', boxShadow: '0 8px 24px rgba(140,20,20,0.4)' }}>🎤</button>
          </div>
        )}
        {stato === 'ascolto' && (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #C0392B, #8B1A1A)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44 }}>👂</div>
            <div style={{ fontFamily: FONT_TESTO, fontSize: 16, fontWeight: 700, color: C.rosso, marginTop: 16 }}>Ti ascolto... parla ora</div>
          </div>
        )}
        {stato === 'errore' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>😕</div>
            <div style={{ fontFamily: FONT_TESTO, fontSize: 14, color: C.marrone, marginBottom: 20 }}>{messaggioErrore}</div>
            <button onClick={() => setStato('pronto')} style={{ background: C.rosso, color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontFamily: FONT_TESTO }}>Riprova</button>
          </div>
        )}
        {stato === 'risultato' && (
          <div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 12, marginBottom: 16, border: '1px solid #E8D5B0' }}>
              <div style={{ fontFamily: FONT_TESTO, fontSize: 11, color: C.grigio, fontWeight: 700 }}>HO CAPITO:</div>
              <div style={{ fontFamily: FONT_TESTO, fontSize: 14, color: C.marrone, fontStyle: 'italic', marginTop: 4 }}>"{testoParlato}"</div>
            </div>
            {(!analisi || (analisi.prodotti.length === 0 && !analisi.combo)) ? (
              <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
                <div style={{ fontFamily: FONT_TESTO, fontSize: 14, color: C.marrone, marginBottom: 16 }}>Non ho riconosciuto prodotti del menù. Riprova dicendo il nome di una pizza, dolce, bibita...</div>
                <button onClick={() => setStato('pronto')} style={{ background: C.rosso, color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontFamily: FONT_TESTO }}>🎤 Riprova</button>
              </div>
            ) : (
              <div>
                {analisi.combo && (
                  <div style={{ background: 'linear-gradient(135deg, #8B1A1A, #5C0F0F)', borderRadius: 12, padding: 14, marginBottom: 10 }}>
                    <div style={{ fontFamily: FONT_TITOLO, fontSize: 16, fontWeight: 900, color: '#F2E8D5' }}>🎁 Combo Famiglia attivata</div>
                    <div style={{ fontFamily: FONT_TESTO, fontSize: 12, color: 'rgba(242,232,213,0.85)', marginTop: 2 }}>Completa 4 pizze, 4 dolci e 4 bibite nel menù</div>
                  </div>
                )}
                {analisi.prodotti.length > 0 && <div style={{ fontFamily: FONT_TESTO, fontSize: 12, color: C.grigio, marginBottom: 8, fontWeight: 700 }}>Aggiungo al carrello:</div>}
                {analisi.prodotti.map((p, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: 10, padding: 12, marginBottom: 8, border: '1px solid #E8D5B0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: FONT_TESTO, fontSize: 15, color: C.marrone, fontWeight: 700 }}>{p.qty}× {p.prodotto.name}</span>
                      <span style={{ fontFamily: FONT_TITOLO, fontSize: 15, fontWeight: 900, color: C.rosso }}>€ {prezzoConAggiunte(p).toFixed(2)}</span>
                    </div>
                    {p.integrale && <div style={{ fontFamily: FONT_TESTO, fontSize: 12, color: C.oro, marginTop: 3 }}>+ Impasto integrale</div>}
                    {p.aggiunte && p.aggiunte.length > 0 && (
                      <div style={{ fontFamily: FONT_TESTO, fontSize: 12, color: C.oro, marginTop: 3 }}>+ {p.aggiunte.map(a => a.nome).join(', ')}</div>
                    )}
                    {p.rimozioni && p.rimozioni.length > 0 && (
                      <div style={{ fontFamily: FONT_TESTO, fontSize: 12, color: '#C0392B', marginTop: 3 }}>− senza {p.rimozioni.join(', ')}</div>
                    )}
                  </div>
                ))}
                {(analisi.tipo || analisi.orario || analisi.note || analisi.giornoSettimana !== null) && (
                  <div style={{ background: '#FBF4E6', borderRadius: 10, padding: 12, marginTop: 4, marginBottom: 10, border: '1px solid #EBDCC0' }}>
                    {analisi.tipo && <div style={{ fontFamily: FONT_TESTO, fontSize: 13, color: C.marrone, marginBottom: 3 }}>{analisi.tipo === 'domicilio' ? '🛵 Consegna a domicilio' : '🥡 Asporto'}</div>}
                    {analisi.giornoSettimana !== null && analisi.giornoSettimana !== undefined && <div style={{ fontFamily: FONT_TESTO, fontSize: 13, color: C.marrone, marginBottom: 3 }}>📅 Giorno: {nomeGiornoVocale(analisi.giornoSettimana)}</div>}
                    {analisi.orario && <div style={{ fontFamily: FONT_TESTO, fontSize: 13, color: C.marrone, marginBottom: 3 }}>🕐 Orario: {analisi.orario}</div>}
                    {analisi.note && <div style={{ fontFamily: FONT_TESTO, fontSize: 13, color: C.marrone }}>📝 Note: {analisi.note}</div>}
                  </div>
                )}
                {analisi.prodotti.length > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 4px', marginBottom: 12 }}>
                    <span style={{ fontFamily: FONT_TESTO, fontWeight: 800, color: C.marrone }}>Totale stimato</span>
                    <span style={{ fontFamily: FONT_TITOLO, fontSize: 18, fontWeight: 900, color: C.rosso }}>€ {totaleStimato.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ fontFamily: FONT_TESTO, fontSize: 11, color: C.grigio, textAlign: 'center', marginBottom: 14 }}>Controlla e modifica tutto prima di confermare l'ordine</div>
                <button onClick={() => onConferma(analisi)} style={{ width: '100%', background: 'linear-gradient(135deg, #2C5A2E, #1c3a1d)', color: '#fff', border: 'none', borderRadius: 14, padding: 16, fontWeight: 800, fontSize: 16, cursor: 'pointer', fontFamily: FONT_TESTO, marginBottom: 8 }}>✓ Aggiungi e vai al carrello</button>
                <button onClick={() => setStato('pronto')} style={{ width: '100%', background: 'transparent', color: C.grigio, border: 'none', padding: 10, fontWeight: 600, cursor: 'pointer', fontFamily: FONT_TESTO }}>🎤 Ridì l'ordine</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [utente, setUtenteRaw] = useState(() => {
    try { const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('pizzicata_utente') : null; return saved ? JSON.parse(saved) : null; } catch { return null; }
  });
  const setUtente = (u) => { setUtenteRaw(u); try { if (u) localStorage.setItem('pizzicata_utente', JSON.stringify(u)); else localStorage.removeItem('pizzicata_utente'); } catch {} };
  const [tab, setTab] = useState('home');
  const [cat, setCat] = useState('Pizze Rosse');
  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);
  const [ora, setOra] = useState(new Date());
  const [combo, setCombo] = useState(null);
  const [combosConfermate, setCombosConfermate] = useState(0);
  const [bibitaOmaggioId, setBibitaOmaggioId] = useState(null);
  const [bibitaOmaggioId2, setBibitaOmaggioId2] = useState(null);
  const [prodottoAggiunte, setProdottoAggiunte] = useState(null);
  const [mostraOrari, setMostraOrari] = useState(false);
  const [traffico, setTraffico] = useState(null);
  const [mostraVocale, setMostraVocale] = useState(false);
  const [precompilaVocale, setPrecompilaVocale] = useState(null);
  const [mancia, setMancia] = useState(0);
  const [manciaConfermata, setManciaConfermata] = useState(false);
  const [ruotaVisibile, setRuotaVisibile] = useState(false);
  const [ruotaPotenziata, setRuotaPotenziata] = useState(false);
  const [ruotaGirando, setRuotaGirando] = useState(false);
  const [ruotaPremio, setRuotaPremio] = useState(null);
  const [ruotaRotazione, setRuotaRotazione] = useState(0);

  const giraRuota = () => {
    if (ruotaGirando || ruotaPremio) return;
    setRuotaGirando(true);
    const N = 6; const gradiPerSpicchio = 360 / N;
    const premioBibita = ruotaPotenziata ? 'bibita2' : 'bibita';
    const premioSconto = ruotaPotenziata ? 'sconto15' : 'sconto10';
    const vincente = Math.random() < 0.5 ? premioBibita : premioSconto;
    const indiciValidi = (vincente === premioBibita) ? [0, 2, 4] : [1, 3, 5];
    const idx = indiciValidi[Math.floor(Math.random() * indiciValidi.length)];
    const centroSpicchio = idx * gradiPerSpicchio + gradiPerSpicchio / 2;
    const target = 6 * 360 + (360 - centroSpicchio);
    setRuotaRotazione(target);
    setTimeout(() => {
      setRuotaPremio(vincente); setRuotaGirando(false);
      try { supabase.from('clienti').update({ premio_attivo: vincente }).eq('telefono', utente.telefono); } catch (e) {}
      setUtente({ ...utente, premio: vincente });
    }, 4300);
  };

  const chiudiRuota = () => {
    setRuotaVisibile(false); setRuotaPotenziata(false); setRuotaGirando(false);
    setRuotaPremio(null); setRuotaRotazione(0); setCart([]); setOrdered(false); setTab('home');
  };

  useEffect(() => { const t = setInterval(() => setOra(new Date()), 30000); return () => clearInterval(t); }, []);

  useEffect(() => {
    const caricaTraffico = async () => {
      try { const { data } = await supabase.from('stato_locale').select('traffico').eq('id', 1).single(); if (data?.traffico) setTraffico(data.traffico); } catch (e) {}
    };
    caricaTraffico();
    const t = setInterval(caricaTraffico, 60000);
    return () => clearInterval(t);
  }, []);

  const apertura = statoApertura(ora);

  if (!utente) return <LoginScreen onLogin={setUtente} />;

  const add = (item) => {
    if (combo) {
      const tot = (pred) => cart.filter(c => pred(c.id)).reduce((s, c) => s + c.qty, 0);
      const base = combosConfermate * 4;
      if (isPizzaCombo(item.id) && tot(isPizzaCombo) >= base + combo.pizze) { alert('Hai già 4 pizze in questa combo. Conferma la combo per aggiungere altro.'); return; }
      if (isDolceCombo(item.id) && tot(isDolceCombo) >= base + combo.dolci) { alert('Hai già 4 dolci in questa combo. Conferma la combo per aggiungere altro.'); return; }
      if (isBibitaCombo(item.id) && tot(isBibitaCombo) >= base + combo.bibite) { alert('Hai già 4 bibite in questa combo. Conferma la combo per aggiungere altro.'); return; }
    }
    setCart(prev => {
      const key = String(item.id);
      const ex = prev.find(c => c.cartKey === key);
      if (ex) return prev.map(c => c.cartKey === key ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, cartKey: key, qty: 1, aggiunte: [], rimozioni: [], integrale: false, prezzoBase: item.price }];
    });
  };

  const confermaVocale = (analisi) => {
    if (analisi.combo) setCombo({ pizze: 4, dolci: 4, bibite: 4 });
    setCart(prev => {
      const nuovo = [...prev];
      analisi.prodotti.forEach(({ prodotto, qty, aggiunte, rimozioni, integrale }) => {
        const agg = aggiunte || []; const rim = rimozioni || [];
        const costoAggiunte = agg.reduce((s, a) => s + a.prezzo, 0) + (integrale ? 1 : 0);
        const firma = [...agg.map(a => a.nome).sort(), ...rim.map(r => 'NO_' + r).sort(), integrale ? 'INT' : ''].join('|');
        const key = prodotto.id + '::' + firma;
        const ex = nuovo.find(c => c.cartKey === key);
        if (ex) ex.qty += qty;
        else nuovo.push({ ...prodotto, cartKey: key, qty, price: prodotto.price + costoAggiunte, prezzoBase: prodotto.price, aggiunte: agg, rimozioni: rim, integrale: !!integrale });
      });
      return nuovo;
    });
    setPrecompilaVocale({ tipo: analisi.tipo, orario: analisi.orario, note: analisi.note, giornoSettimana: analisi.giornoSettimana });
    setMostraVocale(false); setTab('cart');
  };

  const aggiungiConAggiunte = (item, aggiunteSel, integrale) => {
    if (combo) {
      const tot = (pred) => cart.filter(c => pred(c.id)).reduce((s, c) => s + c.qty, 0);
      const base = combosConfermate * 4;
      if (isPizzaCombo(item.id) && tot(isPizzaCombo) >= base + combo.pizze) { alert('Hai già 4 pizze in questa combo. Conferma la combo per aggiungere altro.'); return; }
      if (isDolceCombo(item.id) && tot(isDolceCombo) >= base + combo.dolci) { alert('Hai già 4 dolci in questa combo. Conferma la combo per aggiungere altro.'); return; }
    }
    const costoAggiunte = aggiunteSel.reduce((s, a) => s + a.prezzo, 0) + (integrale ? IMPASTO_INTEGRALE.prezzo : 0);
    const prezzoFinale = item.price + costoAggiunte;
    const firma = [...aggiunteSel.map(a => a.nome).sort(), integrale ? 'INT' : ''].join('|');
    const key = item.id + '::' + firma;
    setCart(prev => {
      const ex = prev.find(c => c.cartKey === key);
      if (ex) return prev.map(c => c.cartKey === key ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, cartKey: key, qty: 1, price: prezzoFinale, prezzoBase: item.price, aggiunte: aggiunteSel, rimozioni: [], integrale }];
    });
  };

  const aggiornaRimozioni = (cartKey, rimozioni) => {
    setCart(prev => prev.map(c => {
      if (c.cartKey !== cartKey) return c;
      const agg = c.aggiunte || [];
      const firma = [...agg.map(a => a.nome).sort(), ...rimozioni.map(r => 'NO_' + r).sort(), c.integrale ? 'INT' : ''].join('|');
      return { ...c, rimozioni, cartKey: c.id + '::' + firma };
    }));
  };

  const confermaCombo = () => { setCombosConfermate(n => n + 1); setCombo(null); };

  const remove = (cartKey) => setCart(prev => prev.map(c => c.cartKey === cartKey ? { ...c, qty: c.qty - 1 } : c).filter(c => c.qty > 0));

  const cartN = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotalRaw = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const bibiteGratisTotali = combosConfermate * 4;
  let scontoCombo = 0;
  if (bibiteGratisTotali > 0) {
    let contate = 0;
    for (const c of cart) { if (isBibitaCombo(c.id)) { for (let k = 0; k < c.qty; k++) { if (contate < bibiteGratisTotali) { scontoCombo += c.price; contate++; } } } }
  }
  const cartTotalDopoCombo = Math.max(0, cartTotalRaw - scontoCombo);
  let scontoPremio = 0; let premioLabel = '';
  const tuttiProd = Object.values(MENU).flat();
  if ((utente.premio === 'sconto10' || utente.premio === 'compleanno') && cartTotalDopoCombo > 0) {
    scontoPremio = cartTotalDopoCombo * 0.10; premioLabel = 'Sconto 10% (premio ruota)';
  } else if (utente.premio === 'sconto15' && cartTotalDopoCombo > 0) {
    scontoPremio = cartTotalDopoCombo * 0.15; premioLabel = 'Sconto 15% (premio ruota potenziata)';
  } else if (utente.premio === 'bibita' && bibitaOmaggioId) {
    const bevandaScelta = tuttiProd.find(p => p.id === bibitaOmaggioId);
    const nelCarrello = cart.find(c => c.id === bibitaOmaggioId);
    if (bevandaScelta && nelCarrello) { scontoPremio = bevandaScelta.price; premioLabel = 'Bibita omaggio (premio ruota)'; }
  } else if (utente.premio === 'bibita2') {
    const b1 = bibitaOmaggioId ? tuttiProd.find(p => p.id === bibitaOmaggioId) : null;
    const b2 = bibitaOmaggioId2 ? tuttiProd.find(p => p.id === bibitaOmaggioId2) : null;
    let tot = 0;
    if (b1 && cart.find(c => c.id === bibitaOmaggioId)) tot += b1.price;
    if (b2 && cart.find(c => c.id === bibitaOmaggioId2)) tot += b2.price;
    if (tot > 0) { scontoPremio = tot; premioLabel = '2 bibite omaggio (premio ruota potenziata)'; }
  }
  const cartTotal = Math.max(0, cartTotalDopoCombo - scontoPremio);

  const handleOrder = async ({ indirizzo, note, tipoOrdine, orario, pagamento, giorno }) => {
    const spedizione = tipoOrdine === 'domicilio' ? 2.5 : 0;
    const tuttiProdK = Object.values(MENU).flat();
    const nomeBibitaOmaggio = bibitaOmaggioId ? (tuttiProdK.find(p => p.id === bibitaOmaggioId)?.name || '') : '';
    const nomeBibitaOmaggio2 = bibitaOmaggioId2 ? (tuttiProdK.find(p => p.id === bibitaOmaggioId2)?.name || '') : '';
    const righeRiepilogo = [];
    righeRiepilogo.push(`Subtotale: € ${cartTotalRaw.toFixed(2)}`);
    if (scontoCombo > 0) righeRiepilogo.push(`Sconto combo (bibite omaggio): -€ ${scontoCombo.toFixed(2)}`);
    if (scontoPremio > 0 && utente.premio === 'sconto10') righeRiepilogo.push(`Sconto 10% (premio ruota): -€ ${scontoPremio.toFixed(2)}`);
    if (scontoPremio > 0 && utente.premio === 'compleanno') righeRiepilogo.push(`Sconto 10% compleanno: -€ ${scontoPremio.toFixed(2)}`);
    if (scontoPremio > 0 && utente.premio === 'sconto15') righeRiepilogo.push(`Sconto 15% (premio ruota potenziata): -€ ${scontoPremio.toFixed(2)}`);
    if (scontoPremio > 0 && utente.premio === 'bibita') righeRiepilogo.push(`Bibita OMAGGIO (premio ruota): ${nomeBibitaOmaggio} -€ ${scontoPremio.toFixed(2)}`);
    if (scontoPremio > 0 && utente.premio === 'bibita2') righeRiepilogo.push(`2 bibite OMAGGIO (ruota potenziata): ${[nomeBibitaOmaggio, nomeBibitaOmaggio2].filter(Boolean).join(' + ')} -€ ${scontoPremio.toFixed(2)}`);
    if (spedizione > 0) righeRiepilogo.push(`Consegna a domicilio: +€ ${spedizione.toFixed(2)}`);
    const manciaEffettiva = manciaConfermata && mancia > 0 ? mancia : 0;
    if (manciaEffettiva > 0) righeRiepilogo.push(`Mancia al locale: +€ ${manciaEffettiva.toFixed(2)}`);
    if (combosConfermate > 0) righeRiepilogo.push(`${combosConfermate}x COMBO FAMIGLIA (4 pizze + 4 dolci + 4 bibite omaggio ciascuna)`);
    const righeRimozioni = cart.filter(i => i.rimozioni && i.rimozioni.length > 0).map(i => `${i.name}: SENZA ${i.rimozioni.join(', ')}`);
    const noteCliente = (note || '').trim();
    const noteComplete = [
      noteCliente ? `NOTE CLIENTE: ${noteCliente}` : '',
      righeRimozioni.length ? 'MODIFICHE: ' + righeRimozioni.join(' | ') : '',
      '--- RIEPILOGO ---',
      ...righeRiepilogo,
    ].filter(Boolean).join('\n');

    const { error } = await supabase.from('ordini').insert([{
      cliente: utente.nome, telefono: utente.telefono,
      items: JSON.stringify(cart.map(i => ({ name: i.name, qty: i.qty, price: i.price, aggiunte: (i.aggiunte || []).map(a => a.nome), rimozioni: i.rimozioni || [], integrale: !!i.integrale }))),
      totale: cartTotal + spedizione + manciaEffettiva,
      stato: 'nuovo', note: noteComplete,
      indirizzo: tipoOrdine === 'domicilio' ? indirizzo : 'Asporto',
      tipo: tipoOrdine, orario_consegna: giorno + ' - ' + orario, pagamento: pagamento,
    }]);
    if (error) { alert('Errore: ' + error.message); return; }
    if (indirizzo && utente.indirizzo !== indirizzo) {
      await supabase.from('clienti').update({ indirizzo }).eq('telefono', utente.telefono);
    }
    const premioInSospeso = !!utente.premio;
    if (premioInSospeso) {
      await supabase.from('clienti').update({ premio_attivo: '' }).eq('telefono', utente.telefono);
      setUtente({ ...utente, premio: '', indirizzo: indirizzo || utente.indirizzo });
    }
    const totaleOrdine = cartTotal + spedizione + manciaEffettiva;
    setCombo(null); setCombosConfermate(0); setBibitaOmaggioId(null); setBibitaOmaggioId2(null);
    setMancia(0); setManciaConfermata(false); setOrdered(true);
    if (totaleOrdine >= 50) { setRuotaPotenziata(true); setTimeout(() => setRuotaVisibile(true), 800); }
    else if (totaleOrdine >= 15) { setRuotaPotenziata(false); setTimeout(() => setRuotaVisibile(true), 800); }
  };

  const oraStr = ora.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

  const Home = () => (
    <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={S.profiloMini} activeOpacity={0.85} onPress={() => setTab('profilo')}>
        <View style={[S.profiloMiniIcon, { background: 'radial-gradient(circle at 30% 30%, #fff, #F2E8D5)' }]}><Text style={{ fontSize: 20 }}>👤</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={S.profiloMiniNome}>Ciao {utente.nome}{utente.cognome ? ' ' + utente.cognome : ''}!</Text>
          <Text style={S.profiloMiniSub}>Tocca per i tuoi dati e premi →</Text>
        </View>
        <Text style={{ fontSize: 13, color: C.oro, fontWeight: '800' }}>{oraStr}</Text>
      </TouchableOpacity>

      {traffico && TRAFFICO_INFO[traffico] && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: TRAFFICO_INFO[traffico].color, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, marginTop: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}>
          <Text style={{ fontSize: 20 }}>{TRAFFICO_INFO[traffico].emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FONT_TESTO, fontSize: 13, fontWeight: '800', color: '#fff' }}>Attesa stimata: {TRAFFICO_INFO[traffico].tempo}</Text>
            <Text style={{ fontFamily: FONT_TESTO, fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>{TRAFFICO_INFO[traffico].label}</Text>
          </View>
        </View>
      )}

      <View style={[S.hero, { background: 'radial-gradient(circle at 85% 15%, rgba(232,184,75,0.45), transparent 45%), radial-gradient(circle at 10% 90%, rgba(140,20,20,0.5), transparent 50%), linear-gradient(150deg, #234023 0%, #16301a 100%)' }]}>
        <View style={[S.ember, { width: 60, height: 60, top: -10, right: 30, opacity: 0.5, background: 'radial-gradient(circle, rgba(232,184,75,0.9), rgba(232,184,75,0))' }]} />
        <View style={[S.ember, { width: 30, height: 30, bottom: 24, right: 90, opacity: 0.35, background: 'radial-gradient(circle, rgba(232,184,75,0.9), rgba(232,184,75,0))' }]} />
        <View style={[S.ember, { width: 14, height: 14, top: 70, right: 22, opacity: 0.6, background: 'radial-gradient(circle, rgba(232,184,75,0.9), rgba(232,184,75,0))' }]} />
        <svg width="170" height="170" viewBox="0 0 200 200" fill="none" style={{ position: 'absolute', right: -28, bottom: -38, opacity: 0.92 }}>
          <path d="M100 10 L190 170 Q100 200 10 170 Z" fill="#E8B84B"/>
          <path d="M100 30 L175 165 Q100 190 25 165 Z" fill="#C0392B" opacity="0.85"/>
          <circle cx="80" cy="120" r="11" fill="#F2E8D5"/>
          <circle cx="115" cy="100" r="9" fill="#F2E8D5"/>
          <circle cx="120" cy="145" r="10" fill="#F2E8D5"/>
          <circle cx="75" cy="155" r="7" fill="#2C5A2E"/>
          <circle cx="100" cy="125" r="6" fill="#2C5A2E"/>
        </svg>
        <Text style={S.heroTag}>La nostra passione, la tua pizza</Text>
        <Text style={S.heroBig}>Ordina ora</Text>
        <Text style={S.heroSub}>Domicilio o asporto</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity style={[S.ctaOrdina, { background: 'linear-gradient(135deg, #E8B84B 0%, #C8961E 100%)' }]} activeOpacity={0.85} onPress={() => setTab('menu')}>
            <Text style={S.ctaOrdinaText}>Inizia l'ordine</Text>
            <View style={S.ctaArrow}><Text style={{ color: C.oroChiaro, fontSize: 16, fontWeight: '900' }}>→</Text></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} onPress={() => setMostraVocale(true)} style={{ width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.15)', borderWidth: 1.5, borderColor: 'rgba(232,184,75,0.5)' }}>
            <Text style={{ fontSize: 24 }}>🎤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.85} onPress={() => setMostraVocale(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FBF4E6', borderRadius: 14, padding: 14, marginBottom: 4, borderWidth: 1, borderColor: '#E8D5B0' }}>
        <View style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #A82020, #6E1212)' }}>
          <Text style={{ fontSize: 20 }}>🎤</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: FONT_TESTO, fontSize: 14, fontWeight: '800', color: C.marrone }}>Nuovo: ordina parlando</Text>
          <Text style={{ fontFamily: FONT_TESTO, fontSize: 12, color: C.grigio }}>Dì la tua pizza al microfono, pensiamo a tutto noi</Text>
        </View>
        <Text style={{ fontFamily: FONT_TESTO, fontSize: 13, color: C.rosso, fontWeight: '800' }}>Prova →</Text>
      </TouchableOpacity>

      <SecLabel testo="Offerte" />
      <TouchableOpacity style={[S.comboCard, { background: 'radial-gradient(circle at 90% 10%, rgba(232,184,75,0.3), transparent 50%), linear-gradient(145deg, #8B1A1A 0%, #5C0F0F 100%)' }]} activeOpacity={0.9} onPress={() => setTab('offers')}>
        <Text style={S.comboGift}>🎁</Text>
        <Text style={S.comboTitle}>Combo Famiglia</Text>
        <View style={{ marginTop: 4 }}>
          <Text style={S.comboLi}>✓  4 pizze a scelta</Text>
          <Text style={S.comboLi}>✓  4 dolci a scelta</Text>
          <Text style={S.comboLi}>✓  4 bibite in omaggio</Text>
        </View>
        <Text style={S.comboCta}>Scopri l'offerta →</Text>
      </TouchableOpacity>

      <SecLabel testo="Dal forno a legna" />
      <View style={S.paneCardNew}>
        <Text style={{ fontSize: 30 }}>🍞</Text>
        <View style={{ flex: 1 }}>
          <Text style={S.paneTitoloNew}>Pane del Forno a Legna</Text>
          <Text style={S.paneSubNew}>Fresco ogni mattina, solo su preordine</Text>
        </View>
        <TouchableOpacity style={S.paneBtnNew} onPress={() => { setCat('Pane del Forno'); setTab('menu'); }}>
          <Text style={S.paneBtnTextNew}>Prenota →</Text>
        </TouchableOpacity>
      </View>

      <SecLabel testo="Gira e vinci" />
      <View style={[S.rewards, { background: 'linear-gradient(160deg, #2f5e30 0%, #1c3a1d 100%)' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <RotellaGira size={46} />
          <View style={{ flex: 1 }}>
            <Text style={S.rewardsTitle}>Gira e vinci premi!</Text>
            <Text style={S.rewardsSub}>Ad ogni ordine puoi vincere</Text>
          </View>
        </View>
        <View style={[S.tier, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
          <Text style={{ fontSize: 22 }}>🥤</Text>
          <View style={{ flex: 1 }}>
            <Text style={S.tierTitle}>Ordini sopra 15€</Text>
            <Text style={S.tierSub}>Bibita omaggio o sconto 10%</Text>
          </View>
        </View>
        <View style={[S.tier, { backgroundColor: 'rgba(232,184,75,0.18)', borderWidth: 1, borderColor: 'rgba(232,184,75,0.4)', marginTop: 8 }]}>
          <Text style={{ fontSize: 22 }}>⭐</Text>
          <View style={{ flex: 1 }}>
            <Text style={[S.tierTitle, { color: '#FFE9A8' }]}>Ordini sopra 50€</Text>
            <Text style={[S.tierSub, { color: 'rgba(255,233,168,0.85)' }]}>Ruota potenziata: 2 bibite o sconto 15%</Text>
          </View>
        </View>
      </View>

      <SecLabel testo="🔥 Dal forno" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
        {VIDEO_DAL_FORNO.map((video, i) => {
          const isTT = video.piattaforma === 'tiktok';
          return (
            <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => window.open(video.url, '_blank')} style={{ width: 150, height: 230, borderRadius: 18, overflow: 'hidden', position: 'relative' }}>
              <View style={{ position: 'absolute', inset: 0, background: isTT ? 'linear-gradient(160deg, #2b2b2b 0%, #000 100%)' : 'linear-gradient(160deg, #FEDA75 0%, #FA7E1E 25%, #D62976 60%, #962FBF 100%)', backgroundColor: isTT ? '#000' : '#D62976' }} />
              <Text style={{ position: 'absolute', right: -10, top: -6, fontSize: 70, opacity: 0.18 }}>🍕</Text>
              <View style={{ position: 'absolute', top: '38%', left: 0, right: 0, alignItems: 'center' }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}>
                  <Text style={{ fontSize: 20, marginLeft: 3 }}>▶️</Text>
                </View>
              </View>
              <View style={{ position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: '800', fontFamily: FONT_TESTO }}>{isTT ? 'TikTok' : 'Instagram'}</Text>
              </View>
              <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, background: 'linear-gradient(0deg, rgba(0,0,0,0.7), transparent)' }}>
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '800', fontFamily: FONT_TITOLO }}>{video.titolo}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontFamily: FONT_TESTO }}>Guarda il video →</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <SecLabel testo="Dove trovarci" />
      <View style={S.tilesRow}>
        <TouchableOpacity style={[S.tileNew, { background: 'linear-gradient(160deg, #fff, #FBF3E4)' }]} activeOpacity={0.7} onPress={() => window.open('https://www.google.com/maps/search/?api=1&query=La+Pizzicata+Corso+Giambone+Torino', '_blank')}>
          <View style={[S.tileIconCircle, { background: 'radial-gradient(circle at 30% 30%, #fff, #F2E8D5)' }]}><Text style={{ fontSize: 17 }}>📍</Text></View>
          <Text style={S.tileTitleNew}>Dove siamo</Text>
          <Text style={S.tileValNew}>C.so Giambone 8/b{'\n'}Torino</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[S.tileNew, { background: 'linear-gradient(160deg, #fff, #FBF3E4)' }]} activeOpacity={0.7} onPress={() => { const scelta = window.confirm('Chiama 331 5695959?\n\nOK = 331 5695959\nAnnulla = 011 0362310'); window.location.href = scelta ? 'tel:3315695959' : 'tel:0110362310'; }}>
          <View style={[S.tileIconCircle, { background: 'radial-gradient(circle at 30% 30%, #fff, #F2E8D5)' }]}><Text style={{ fontSize: 17 }}>📞</Text></View>
          <Text style={S.tileTitleNew}>Telefono</Text>
          <Text style={S.tileValNew}>331 5695959{'\n'}011 0362310</Text>
        </TouchableOpacity>
      </View>

      <SecLabel testo="Seguici" />
      <View style={{ flexDirection: 'row', gap: 20, marginBottom: 28, justifyContent: 'center' }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => window.open('https://www.instagram.com/pizzicata_pizzeria', '_blank')} style={{ width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 30% 110%, #FEDA75 0%, #FA7E1E 25%, #D62976 50%, #962FBF 75%, #4F5BD5 100%)', boxShadow: '0 4px 12px rgba(214,41,118,0.4)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => window.open('https://www.tiktok.com/@pizzicatapizzeria', '_blank')} style={{ width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000', boxShadow: '0 4px 12px rgba(0,0,0,0.35)' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const Menu = () => {
    const prodotti = MENU[cat] || [];
    const conAggiunte = CATEGORIE_CON_AGGIUNTE.includes(cat);
    const totCombo = (pred) => cart.filter(c => pred(c.id)).reduce((s, c) => s + c.qty, 0);
    const base = combosConfermate * 4;
    const pizzeCombo = combo ? Math.max(0, totCombo(isPizzaCombo) - base) : 0;
    const dolciCombo = combo ? Math.max(0, totCombo(isDolceCombo) - base) : 0;
    const bibiteCombo = combo ? Math.max(0, totCombo(isBibitaCombo) - base) : 0;
    const comboCompleta = combo && pizzeCombo >= combo.pizze && dolciCombo >= combo.dolci && bibiteCombo >= combo.bibite;
    return (
      <View style={{ flex: 1 }}>
        {combo && (
          <View style={{ backgroundColor: C.rosso, paddingHorizontal: 16, paddingVertical: 10 }}>
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 13, fontFamily: FONT_TESTO, marginBottom: 6 }}>🎁 Combo Famiglia in corso</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ flex: 1, backgroundColor: pizzeCombo >= combo.pizze ? C.verde : 'rgba(255,255,255,0.2)', borderRadius: 8, padding: 6, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>🍕 {pizzeCombo}/{combo.pizze}</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: dolciCombo >= combo.dolci ? C.verde : 'rgba(255,255,255,0.2)', borderRadius: 8, padding: 6, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>🍰 {dolciCombo}/{combo.dolci}</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: bibiteCombo >= combo.bibite ? C.verde : 'rgba(255,255,255,0.2)', borderRadius: 8, padding: 6, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>🥤 {bibiteCombo}/{combo.bibite}</Text>
              </View>
            </View>
            {comboCompleta && (
              <TouchableOpacity onPress={confermaCombo} style={{ backgroundColor: '#fff', borderRadius: 8, padding: 8, marginTop: 8, alignItems: 'center' }}>
                <Text style={{ color: C.verde, fontWeight: '900', fontSize: 13 }}>✓ Conferma combo</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={S.catBar} contentContainerStyle={{ paddingHorizontal: 12, gap: 8, alignItems: 'center' }}>
          {Object.keys(MENU).map(c => (
            <TouchableOpacity key={c} onPress={() => setCat(c)} style={[S.catPill, cat === c && S.catPillActive]}>
              <Text style={{ fontSize: 15 }}>{CAT_EMOJI[c]}</Text>
              <Text style={[S.catPillText, cat === c && S.catPillTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
          <Text style={S.catTitolo}>{CAT_EMOJI[cat]} {cat}</Text>
          {cat === 'Pane del Forno' && (
            <View style={{ backgroundColor: '#FFF8E7', borderRadius: 12, padding: 12, borderLeftWidth: 4, borderLeftColor: C.oro, marginBottom: 14 }}>
              <Text style={{ fontSize: 12, color: '#8B6914', fontWeight: '700' }}>🍞 Solo su preordine</Text>
              <Text style={{ fontSize: 11, color: C.grigio, marginTop: 3 }}>Il pane va prenotato per il giorno dopo. Ritiro in pizzeria al mattino o la sera.</Text>
            </View>
          )}
          {prodotti.map(p => (
            <View key={p.id} style={S.card}>
              <View style={S.cardLeft}>
                <View style={{ width: 46, height: 46, borderRadius: 12, background: 'linear-gradient(160deg, #A82020 0%, #6E1212 100%)', backgroundColor: '#8B1A1A', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 22 }}>{CAT_EMOJI[cat]}</Text>
                </View>
              </View>
              <View style={S.cardBody}>
                <Text style={S.cardName}>{p.name}</Text>
                {p.desc ? <Text style={S.cardDesc}>{p.desc}</Text> : null}
                <Text style={S.cardPrice}>€ {p.price.toFixed(2)}</Text>
              </View>
              {conAggiunte ? (
                <TouchableOpacity style={S.addBtn} onPress={() => setProdottoAggiunte(p)}>
                  <Text style={S.addBtnText}>+</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={S.addBtn} onPress={() => add(p)}>
                  <Text style={S.addBtnText}>+</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    );
  };

  const Offers = () => (
    <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
      <Text style={{ fontFamily: FONT_TITOLO, fontSize: 28, fontWeight: '900', color: C.marrone, marginTop: 8, marginBottom: 4 }}>Offerte</Text>
      <Text style={{ fontFamily: FONT_TESTO, fontSize: 13, color: C.grigio, marginBottom: 18 }}>Approfitta delle nostre promozioni</Text>
      <View style={[S.comboCard, { background: 'radial-gradient(circle at 90% 10%, rgba(232,184,75,0.3), transparent 50%), linear-gradient(145deg, #8B1A1A 0%, #5C0F0F 100%)', marginBottom: 16 }]}>
        <Text style={S.comboGift}>🎁</Text>
        <Text style={S.comboTitle}>Combo Famiglia</Text>
        <Text style={{ fontFamily: FONT_TESTO, fontSize: 13, color: 'rgba(242,232,213,0.9)', marginTop: 6, marginBottom: 4 }}>Il modo perfetto per una serata in famiglia:</Text>
        <View style={{ marginTop: 4 }}>
          <Text style={S.comboLi}>✓  4 pizze a scelta</Text>
          <Text style={S.comboLi}>✓  4 dolci a scelta</Text>
          <Text style={S.comboLi}>✓  4 bibite in omaggio (le paghiamo noi!)</Text>
        </View>
        {combo ? (
          <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 12, marginTop: 14 }}>
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 13, textAlign: 'center' }}>Combo già attiva! Vai al menù 🍕</Text>
          </View>
        ) : (
          <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 12, padding: 14, marginTop: 16, alignItems: 'center' }} onPress={() => { setCombo({ pizze: 4, dolci: 4, bibite: 4 }); setCat('Pizze Rosse'); setTab('menu'); }}>
            <Text style={{ color: C.rosso, fontWeight: '900', fontSize: 15 }}>Attiva la Combo Famiglia</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={[S.rewards, { background: 'linear-gradient(160deg, #2f5e30 0%, #1c3a1d 100%)', marginBottom: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <RotellaGira size={46} />
          <View style={{ flex: 1 }}>
            <Text style={S.rewardsTitle}>Ruota della Fortuna</Text>
            <Text style={S.rewardsSub}>Gira ad ogni ordine e vinci</Text>
          </View>
        </View>
        <View style={[S.tier, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
          <Text style={{ fontSize: 22 }}>🥤</Text>
          <View style={{ flex: 1 }}>
            <Text style={S.tierTitle}>Ordini sopra 15€</Text>
            <Text style={S.tierSub}>Bibita omaggio o sconto 10%</Text>
          </View>
        </View>
        <View style={[S.tier, { backgroundColor: 'rgba(232,184,75,0.18)', borderWidth: 1, borderColor: 'rgba(232,184,75,0.4)', marginTop: 8 }]}>
          <Text style={{ fontSize: 22 }}>⭐</Text>
          <View style={{ flex: 1 }}>
            <Text style={[S.tierTitle, { color: '#FFE9A8' }]}>Ordini sopra 50€</Text>
            <Text style={[S.tierSub, { color: 'rgba(255,233,168,0.85)' }]}>Ruota potenziata: 2 bibite o sconto 15%</Text>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: '#FFF8E7', borderRadius: 16, padding: 16, borderLeftWidth: 4, borderLeftColor: C.oro, marginBottom: 24 }}>
        <Text style={{ fontSize: 30, marginBottom: 6 }}>🎂</Text>
        <Text style={{ fontFamily: FONT_TITOLO, fontSize: 18, fontWeight: '900', color: C.marrone }}>Sconto Compleanno</Text>
        <Text style={{ fontFamily: FONT_TESTO, fontSize: 13, color: C.grigio, marginTop: 4 }}>Nel giorno del tuo compleanno hai uno sconto del 10% sul tuo ordine. Assicurati di aver inserito la data nel tuo profilo!</Text>
      </View>
    </ScrollView>
  );

  const Profilo = () => {
    const [nome, setNome] = useState(utente.nome || '');
    const [cognome, setCognome] = useState(utente.cognome || '');
    const [email, setEmail] = useState(utente.email || '');
    const [indirizzo, setIndirizzo] = useState(utente.indirizzo || '');
    const [allergie, setAllergie] = useState(utente.allergie || '');
    const [compleanno, setCompleanno] = useState(utente.compleanno || '');
    const [salvato, setSalvato] = useState(false);
    const [salvando, setSalvando] = useState(false);

    const compleannoBloccato = !!(utente.compleanno && utente.compleanno.trim());

    const salva = async () => {
      setSalvando(true);
      const update = { nome: nome.trim(), cognome: cognome.trim(), email: email.trim(), indirizzo: indirizzo.trim(), allergie: allergie.trim() };
      if (!compleannoBloccato && compleanno) update.compleanno = compleanno;
      const { error } = await supabase.from('clienti').update(update).eq('telefono', utente.telefono);
      setSalvando(false);
      if (error) { alert('Errore: ' + error.message); return; }
      setUtente({ ...utente, ...update, compleanno: compleannoBloccato ? utente.compleanno : (compleanno || '') });
      setSalvato(true); setTimeout(() => setSalvato(false), 2000);
    };

    return (
      <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', marginTop: 12, marginBottom: 20 }}>
          <View style={{ width: 80, height: 80, borderRadius: 40, background: 'radial-gradient(circle at 30% 30%, #fff, #F2E8D5)', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 38 }}>👤</Text>
          </View>
          <Text style={{ fontFamily: FONT_TITOLO, fontSize: 22, fontWeight: '900', color: C.marrone }}>{utente.nome} {utente.cognome}</Text>
          <Text style={{ fontFamily: FONT_TESTO, fontSize: 13, color: C.grigio }}>{utente.telefono}</Text>
        </View>

        {utente.premio ? (
          <View style={{ backgroundColor: '#FFF8E8', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 2, borderColor: C.oro, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text style={{ fontSize: 32 }}>🎁</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: FONT_TESTO, fontSize: 14, fontWeight: '800', color: C.marrone }}>Hai un premio attivo!</Text>
              <Text style={{ fontFamily: FONT_TESTO, fontSize: 12, color: C.grigio }}>
                {utente.premio === 'bibita' ? 'Bibita in omaggio' : utente.premio === 'bibita2' ? '2 bibite in omaggio' : utente.premio === 'sconto15' ? 'Sconto 15%' : utente.premio === 'compleanno' ? 'Sconto compleanno 10%' : 'Sconto 10%'} — lo userai al prossimo ordine
              </Text>
            </View>
          </View>
        ) : null}

        <View style={S.formBox}>
          <Text style={S.formLabel}>NOME</Text>
          <input style={inputStyle} value={nome} onChange={(e) => setNome(e.target.value)} />
          <View style={{ height: 12 }} />
          <Text style={S.formLabel}>COGNOME</Text>
          <input style={inputStyle} value={cognome} onChange={(e) => setCognome(e.target.value)} />
          <View style={{ height: 12 }} />
          <Text style={S.formLabel}>EMAIL</Text>
          <input style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <View style={{ height: 12 }} />
          <Text style={S.formLabel}>INDIRIZZO</Text>
          <input style={inputStyle} value={indirizzo} onChange={(e) => setIndirizzo(e.target.value)} />
          <View style={{ height: 12 }} />
          <Text style={S.formLabel}>ALLERGIE / INTOLLERANZE</Text>
          <input style={inputStyle} value={allergie} onChange={(e) => setAllergie(e.target.value)} placeholder="Es. glutine, lattosio..." />
          <View style={{ height: 12 }} />
          <Text style={S.formLabel}>🎂 DATA DI COMPLEANNO</Text>
          {compleannoBloccato ? (
            <>
              <input style={{ ...inputStyle, backgroundColor: '#F0E8D8', color: C.grigio }} value={utente.compleanno} disabled readOnly />
              <Text style={{ fontSize: 11, color: '#2C5A2E', marginTop: 6, fontWeight: '700' }}>🎉 Data salvata! Avrai uno sconto del 10% nel giorno del tuo compleanno.</Text>
            </>
          ) : (
            <>
              <input style={inputStyle} value={compleanno} onChange={(e) => setCompleanno(e.target.value)} type="date" />
              <Text style={{ fontSize: 11, color: C.grigio, marginTop: 6 }}>Inseriscila per ricevere uno sconto nel giorno del tuo compleanno. Una volta salvata non potrà più essere modificata.</Text>
            </>
          )}
        </View>

        <TouchableOpacity style={S.checkoutBtn} onPress={salva}>
          <Text style={S.checkoutText}>{salvando ? 'Salvataggio...' : salvato ? '✓ Salvato!' : 'Salva modifiche'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTab('ordini')} style={{ backgroundColor: '#fff', borderRadius: 14, padding: 16, marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: '#E8D5B0' }}>
          <Text style={{ fontSize: 24 }}>📋</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FONT_TESTO, fontSize: 14, fontWeight: '800', color: C.marrone }}>I miei ordini</Text>
            <Text style={{ fontFamily: FONT_TESTO, fontSize: 12, color: C.grigio }}>Rivedi gli ordini passati</Text>
          </View>
          <Text style={{ fontSize: 18, color: C.oro }}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setUtente(null); setCart([]); setTab('home'); }} style={{ marginTop: 16, marginBottom: 30, alignItems: 'center', padding: 14 }}>
          <Text style={{ fontFamily: FONT_TESTO, fontSize: 14, color: C.rosso, fontWeight: '700' }}>Esci dall'account</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const Ordini = () => {
    const [ordini, setOrdini] = useState([]);
    const [caricamento, setCaricamento] = useState(true);

    useEffect(() => {
      const carica = async () => {
        const { data } = await supabase.from('ordini').select('*').eq('telefono', utente.telefono).order('created_at', { ascending: false }).limit(20);
        setOrdini(data || []); setCaricamento(false);
      };
      carica();
    }, []);

    const riordina = (ord) => {
      try {
        const items = JSON.parse(ord.items);
        const nuovoCart = [];
        items.forEach(it => {
          const prod = Object.values(MENU).flat().find(p => p.name === it.name);
          if (prod) {
            const agg = (it.aggiunte || []).map(nome => AGGIUNTE.find(a => a.nome === nome)).filter(Boolean);
            const rim = it.rimozioni || [];
            const costoAgg = agg.reduce((s, a) => s + a.prezzo, 0) + (it.integrale ? 1 : 0);
            const firma = [...agg.map(a => a.nome).sort(), ...rim.map(r => 'NO_' + r).sort(), it.integrale ? 'INT' : ''].join('|');
            nuovoCart.push({ ...prod, cartKey: prod.id + '::' + firma, qty: it.qty, price: prod.price + costoAgg, prezzoBase: prod.price, aggiunte: agg, rimozioni: rim, integrale: !!it.integrale });
          }
        });
        setCart(nuovoCart); setTab('cart');
      } catch (e) { alert('Impossibile riordinare questo ordine.'); }
    };

    return (
      <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8, marginBottom: 16 }}>
          <TouchableOpacity onPress={() => setTab('profilo')}><Text style={{ fontSize: 22, color: C.marrone }}>←</Text></TouchableOpacity>
          <Text style={{ fontFamily: FONT_TITOLO, fontSize: 24, fontWeight: '900', color: C.marrone }}>I miei ordini</Text>
        </View>
        {caricamento ? (
          <Text style={{ textAlign: 'center', color: C.grigio, marginTop: 40 }}>Caricamento...</Text>
        ) : ordini.length === 0 ? (
          <View style={S.empty}>
            <Text style={{ fontSize: 56 }}>📋</Text>
            <Text style={S.emptyTitle}>Nessun ordine</Text>
            <Text style={S.emptySub}>I tuoi ordini appariranno qui</Text>
          </View>
        ) : (
          ordini.map(ord => {
            let items = [];
            try { items = JSON.parse(ord.items); } catch (e) {}
            const info = STATO_INFO[ord.stato] || STATO_INFO.nuovo;
            const dataOrd = ord.created_at ? new Date(ord.created_at).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }) : '';
            return (
              <View key={ord.id} style={{ backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E8D5B0' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ fontFamily: FONT_TESTO, fontSize: 12, color: C.grigio }}>{dataOrd} · {ord.orario_consegna || ''}</Text>
                  <View style={{ backgroundColor: info.colore, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
                    <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>{info.label}</Text>
                  </View>
                </View>
                {items.map((it, i) => (
                  <Text key={i} style={{ fontFamily: FONT_TESTO, fontSize: 13, color: C.marrone }}>{it.qty}× {it.name}{it.rimozioni && it.rimozioni.length ? ` (senza ${it.rimozioni.join(', ')})` : ''}</Text>
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F0E8D8' }}>
                  <Text style={{ fontFamily: FONT_TITOLO, fontSize: 16, fontWeight: '900', color: C.rosso }}>€ {Number(ord.totale).toFixed(2)}</Text>
                  <TouchableOpacity onPress={() => riordina(ord)} style={{ backgroundColor: C.rosso, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 }}>
                    <Text style={{ color: '#fff', fontSize: 13, fontWeight: '800' }}>🔁 Riordina</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    );
  };

  const screens = {
    home: <Home />,
    menu: <Menu />,
    offers: <Offers />,
    profilo: <Profilo />,
    ordini: <Ordini />,
    cart: (
      <CartScreen
        cart={cart} setCart={setCart} cartTotal={cartTotal} cartTotalRaw={cartTotalRaw}
        scontoCombo={scontoCombo} scontoPremio={scontoPremio} premioLabel={premioLabel}
        bibitaOmaggioId={bibitaOmaggioId} setBibitaOmaggioId={setBibitaOmaggioId}
        bibitaOmaggioId2={bibitaOmaggioId2} setBibitaOmaggioId2={setBibitaOmaggioId2}
        mancia={mancia} setMancia={setMancia} manciaConfermata={manciaConfermata} setManciaConfermata={setManciaConfermata}
        apertura={apertura} combo={combo} ordered={ordered} setOrdered={setOrdered}
        setTab={setTab} setCat={setCat} handleOrder={handleOrder} utente={utente}
        precompilaVocale={precompilaVocale} setPrecompilaVocale={setPrecompilaVocale}
        aggiornaRimozioni={aggiornaRimozioni}
      />
    ),
  };

  return (
    <View style={S.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.rosso} />

      <View style={[S.header, { background: 'radial-gradient(circle at 100% 0%, rgba(232,184,75,0.35), transparent 50%), linear-gradient(135deg, #8B1A1A 0%, #5C0F0F 100%)' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 22 }}>🍕</Text>
          </View>
          <View>
            <Text style={S.headerTitle}>Pizzicata</Text>
            <Text style={S.headerSub}>{apertura.aperto ? '🟢 Aperto ora' : '🔴 Chiuso · preordina'}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setMostraOrari(true)} style={{ padding: 8 }}>
          <Text style={{ fontSize: 22 }}>🕐</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {screens[tab]}
      </View>

      {ruotaVisibile && (
        <RuotaFortuna girando={ruotaGirando} premio={ruotaPremio} rotazione={ruotaRotazione} potenziata={ruotaPotenziata} onGira={giraRuota} onChiudi={chiudiRuota} />
      )}
      {prodottoAggiunte && (
        <PannelloAggiunte prodotto={prodottoAggiunte} onConferma={(p, agg, integ) => { aggiungiConAggiunte(p, agg, integ); setProdottoAggiunte(null); }} onChiudi={() => setProdottoAggiunte(null)} />
      )}
      {mostraVocale && (
        <OrdineVocale onChiudi={() => setMostraVocale(false)} onConferma={confermaVocale} />
      )}
      {mostraOrari && (
        <div onClick={() => setMostraOrari(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#F7EFDF', borderRadius: 22, padding: 24, maxWidth: 360, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontFamily: FONT_TITOLO, fontSize: 20, fontWeight: 900, color: C.marrone }}>🕐 Orari di apertura</span>
              <span onClick={() => setMostraOrari(false)} style={{ fontSize: 24, color: C.grigio, cursor: 'pointer' }}>✕</span>
            </div>
            {[
              { g: 'Lunedì', o: 'Chiuso', chiuso: true },
              { g: 'Martedì', o: '12:00–14:30 · 18:15–22:45' },
              { g: 'Mercoledì', o: '12:00–14:30 · 18:15–22:45' },
              { g: 'Giovedì', o: '12:00–14:30 · 18:15–22:45' },
              { g: 'Venerdì', o: '12:00–14:30 · 18:15–22:45' },
              { g: 'Sabato', o: '12:00–14:30 · 18:15–22:45' },
              { g: 'Domenica', o: '12:00–14:30 · 18:15–22:45' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 6 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                <span style={{ fontFamily: FONT_TESTO, fontSize: 14, fontWeight: 700, color: r.chiuso ? '#C0392B' : C.marrone }}>{r.g}</span>
                <span style={{ fontFamily: FONT_TESTO, fontSize: 13, color: r.chiuso ? '#C0392B' : C.grigio }}>{r.o}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <View style={S.navbar}>
        {[
          { key: 'home', icon: '🏠', label: 'Home' },
          { key: 'menu', icon: '🍕', label: 'Menu' },
          { key: 'offers', icon: '🎁', label: 'Offerte' },
          { key: 'cart', icon: '🛒', label: 'Carrello' },
          { key: 'profilo', icon: '👤', label: 'Profilo' },
        ].map(n => {
          const attivo = tab === n.key || (n.key === 'profilo' && tab === 'ordini');
          return (
            <TouchableOpacity key={n.key} style={S.navItem} onPress={() => setTab(n.key)}>
              <View style={{ position: 'relative' }}>
                <Text style={[S.navIcon, attivo && { transform: [{ scale: 1.15 }] }]}>{n.icon}</Text>
                {n.key === 'cart' && cartN > 0 && (
                  <View style={S.navBadge}><Text style={S.navBadgeText}>{cartN}</Text></View>
                )}
              </View>
              <Text style={[S.navLabel, attivo && { color: C.rosso, fontWeight: '800' }]}>{n.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2E8D5', maxWidth: 520, marginHorizontal: 'auto', width: '100%' },
  scroll: { flex: 1, paddingHorizontal: 16 },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 14, paddingBottom: 14 },
  headerTitle: { fontFamily: FONT_TITOLO, fontSize: 20, fontWeight: '900', color: '#F2E8D5' },
  headerSub: { fontFamily: FONT_TESTO, fontSize: 11, color: 'rgba(242,232,213,0.85)' },

  profiloMini: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 14, padding: 12, marginTop: 14, borderWidth: 1, borderColor: '#E8D5B0' },
  profiloMiniIcon: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  profiloMiniNome: { fontFamily: FONT_TESTO, fontSize: 15, fontWeight: '800', color: C.marrone },
  profiloMiniSub: { fontFamily: FONT_TESTO, fontSize: 12, color: C.grigio },

  hero: { borderRadius: 22, padding: 22, marginTop: 14, marginBottom: 16, overflow: 'hidden', position: 'relative', minHeight: 200 },
  ember: { position: 'absolute', borderRadius: 100 },
  heroTag: { fontFamily: FONT_TESTO, fontSize: 12, fontWeight: '700', color: 'rgba(242,232,213,0.9)', marginBottom: 6 },
  heroBig: { fontFamily: FONT_TITOLO, fontSize: 34, fontWeight: '900', color: '#F2E8D5', lineHeight: 38 },
  heroSub: { fontFamily: FONT_TESTO, fontSize: 14, color: 'rgba(242,232,213,0.85)', marginBottom: 18 },
  ctaOrdina: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 14, alignSelf: 'flex-start' },
  ctaOrdinaText: { fontFamily: FONT_TESTO, fontSize: 15, fontWeight: '900', color: '#3D1A00' },
  ctaArrow: { width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(61,26,0,0.15)', alignItems: 'center', justifyContent: 'center' },

  comboCard: { borderRadius: 20, padding: 20, overflow: 'hidden', position: 'relative' },
  comboGift: { fontSize: 38, marginBottom: 6 },
  comboTitle: { fontFamily: FONT_TITOLO, fontSize: 24, fontWeight: '900', color: '#F2E8D5' },
  comboLi: { fontFamily: FONT_TESTO, fontSize: 14, color: 'rgba(242,232,213,0.92)', lineHeight: 24 },
  comboCta: { fontFamily: FONT_TESTO, fontSize: 14, fontWeight: '800', color: C.oroChiaro, marginTop: 14 },

  paneCardNew: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E8D5B0' },
  paneTitoloNew: { fontFamily: FONT_TITOLO, fontSize: 16, fontWeight: '900', color: C.marrone },
  paneSubNew: { fontFamily: FONT_TESTO, fontSize: 12, color: C.grigio },
  paneBtnNew: { backgroundColor: C.oro, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 },
  paneBtnTextNew: { fontFamily: FONT_TESTO, fontSize: 13, fontWeight: '800', color: '#3D1A00' },

  rewards: { borderRadius: 20, padding: 18 },
  rewardsTitle: { fontFamily: FONT_TITOLO, fontSize: 19, fontWeight: '900', color: '#F2E8D5' },
  rewardsSub: { fontFamily: FONT_TESTO, fontSize: 12, color: 'rgba(242,232,213,0.8)' },
  tier: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 14, padding: 12 },
  tierTitle: { fontFamily: FONT_TESTO, fontSize: 14, fontWeight: '800', color: '#F2E8D5' },
  tierSub: { fontFamily: FONT_TESTO, fontSize: 12, color: 'rgba(242,232,213,0.8)' },

  tilesRow: { flexDirection: 'row', gap: 12 },
  tileNew: { flex: 1, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#E8D5B0' },
  tileIconCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  tileTitleNew: { fontFamily: FONT_TESTO, fontSize: 13, fontWeight: '800', color: C.marrone },
  tileValNew: { fontFamily: FONT_TESTO, fontSize: 12, color: C.grigio, marginTop: 2 },

  catBar: { backgroundColor: C.rosso, paddingVertical: 10, maxHeight: 58, flexGrow: 0, borderBottomWidth: 1, borderBottomColor: C.rossoScuro },
  catPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E8D5B0' },
  catPillActive: { backgroundColor: C.rosso, borderColor: C.rosso },
  catPillText: { fontFamily: FONT_TESTO, fontSize: 13, fontWeight: '700', color: C.grigio },
  catPillTextActive: { color: '#fff' },
  catTitolo: { fontFamily: FONT_TITOLO, fontSize: 22, fontWeight: '900', color: C.marrone, marginTop: 14, marginBottom: 12 },

  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#EFE3CC' },
  cardLeft: { marginRight: 12 },
  cardBody: { flex: 1 },
  cardName: { fontFamily: FONT_TESTO, fontSize: 15, fontWeight: '800', color: C.marrone },
  cardDesc: { fontFamily: FONT_TESTO, fontSize: 12, color: C.grigio, marginTop: 2, lineHeight: 16 },
  cardPrice: { fontFamily: FONT_TITOLO, fontSize: 16, fontWeight: '900', color: C.rosso, marginTop: 4 },
  addBtn: { width: 38, height: 38, borderRadius: 12, backgroundColor: C.rosso, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  addBtnText: { color: '#fff', fontSize: 22, fontWeight: '900', lineHeight: 24 },

  cartCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 14, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#EFE3CC' },
  cartName: { fontFamily: FONT_TESTO, fontSize: 15, fontWeight: '800', color: C.marrone },
  cartExtra: { fontFamily: FONT_TESTO, fontSize: 12, color: C.oro, marginTop: 1 },
  cartPrice: { fontFamily: FONT_TITOLO, fontSize: 15, fontWeight: '900', color: C.rosso, marginTop: 3 },
  qtyCtrl: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyMinus: { width: 30, height: 30, borderRadius: 9, backgroundColor: '#F0E4CE', alignItems: 'center', justifyContent: 'center' },
  qtyMinusText: { fontSize: 20, fontWeight: '900', color: C.marrone, lineHeight: 22 },
  qtyN: { fontFamily: FONT_TESTO, fontSize: 15, fontWeight: '800', color: C.marrone, minWidth: 18, textAlign: 'center' },
  qtyPlus: { width: 30, height: 30, borderRadius: 9, backgroundColor: C.rosso, alignItems: 'center', justifyContent: 'center' },
  qtyPlusText: { fontSize: 20, fontWeight: '900', color: '#fff', lineHeight: 22 },

  formBox: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E8D5B0' },
  formLabel: { fontFamily: FONT_TESTO, fontSize: 11, fontWeight: '800', letterSpacing: 1, color: C.grigio, marginBottom: 8, textTransform: 'uppercase' },
  typeBtn: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: 12, borderRadius: 12, backgroundColor: '#FBF4E6', borderWidth: 2, borderColor: '#E8D5B0' },
  typeBtnActive: { backgroundColor: C.rosso, borderColor: C.rosso },
  typeBtnText: { fontFamily: FONT_TESTO, fontSize: 13, fontWeight: '700', color: C.grigio },
  typeBtnTextActive: { color: '#fff' },

  calBtn: { alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, backgroundColor: '#FBF4E6', borderWidth: 2, borderColor: '#E8D5B0', minWidth: 64 },
  calBtnActive: { backgroundColor: C.rosso, borderColor: C.rosso },
  calGiorno: { fontFamily: FONT_TESTO, fontSize: 13, fontWeight: '800', color: C.marrone },
  calData: { fontFamily: FONT_TESTO, fontSize: 11, color: C.grigio, marginTop: 2 },

  pagBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, backgroundColor: '#FBF4E6', borderWidth: 2, borderColor: '#E8D5B0' },
  pagBtnActive: { backgroundColor: C.rosso, borderColor: C.rosso },
  pagLabel: { fontFamily: FONT_TESTO, fontSize: 14, fontWeight: '800', color: C.marrone },
  pagSub: { fontFamily: FONT_TESTO, fontSize: 11, color: C.grigio },

  totalCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E8D5B0' },
  totalRow: { fontFamily: FONT_TESTO, fontSize: 14, color: C.grigio },
  totalBig: { fontFamily: FONT_TITOLO, fontSize: 20, fontWeight: '900', color: C.marrone },

  checkoutBtn: { backgroundColor: C.rosso, borderRadius: 16, padding: 17, alignItems: 'center', marginBottom: 8, boxShadow: '0 6px 18px rgba(139,26,26,0.3)' },
  checkoutText: { fontFamily: FONT_TESTO, fontSize: 16, fontWeight: '900', color: '#fff' },
  checkoutBtnAlt: { backgroundColor: C.rosso, borderRadius: 16, padding: 17, alignItems: 'center' },

  empty: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyTitle: { fontFamily: FONT_TITOLO, fontSize: 22, fontWeight: '900', color: C.marrone, marginTop: 12 },
  emptySub: { fontFamily: FONT_TESTO, fontSize: 14, color: C.grigio, marginTop: 4, marginBottom: 20 },
  emptyBtn: { backgroundColor: C.rosso, borderRadius: 14, paddingVertical: 12, paddingHorizontal: 28 },
  emptyBtnText: { fontFamily: FONT_TESTO, fontSize: 15, fontWeight: '800', color: '#fff' },

  errore: { fontFamily: FONT_TESTO, fontSize: 13, color: '#C0392B', fontWeight: '700', marginVertical: 8, textAlign: 'center' },

  loginHeader: { paddingTop: 50, paddingBottom: 36, paddingHorizontal: 24, alignItems: 'center', position: 'relative', overflow: 'hidden' },
  loginLogo: { fontFamily: FONT_TITOLO, fontSize: 40, fontWeight: '900', color: '#F2E8D5' },
  loginSub: { fontFamily: FONT_TESTO, fontSize: 13, fontWeight: '700', letterSpacing: 3, color: C.oroChiaro, marginTop: 2 },
  loginBody: { flex: 1 },
  loginBodyContent: { padding: 24, alignItems: 'center' },
  loginEmoji: { fontSize: 50, marginTop: 10, marginBottom: 6 },
  loginTitle: { fontFamily: FONT_TITOLO, fontSize: 26, fontWeight: '900', color: C.marrone },
  loginDesc: { fontFamily: FONT_TESTO, fontSize: 14, color: C.grigio, textAlign: 'center', marginTop: 6, marginBottom: 24, lineHeight: 20 },
  loginBox: { width: '100%' },

  navbar: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E8D5B0', paddingTop: 8, paddingBottom: 10, paddingHorizontal: 4 },
  navItem: { flex: 1, alignItems: 'center', gap: 3 },
  navIcon: { fontSize: 22 },
  navLabel: { fontFamily: FONT_TESTO, fontSize: 10, fontWeight: '600', color: C.grigio },
  navBadge: { position: 'absolute', top: -6, right: -10, backgroundColor: C.oro, borderRadius: 9, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  navBadgeText: { color: '#fff', fontSize: 10, fontWeight: '900' },
});