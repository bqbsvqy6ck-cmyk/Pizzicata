import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Pizzicata</Text>
        <Text style={styles.logoSub}>Torino · Dal forno a legna</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.scroll}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🍕</Text>
          <Text style={styles.heroTitle}>Benvenuto da Pizzicata!</Text>
          <Text style={styles.heroSub}>Ordina online, ritira o ricevi a casa</Text>
        </View>

        {/* Info */}
        <View style={styles.infoRow}>
          <View style={styles.infoTile}>
            <Text style={styles.infoLabel}>📍 Dove siamo</Text>
            <Text style={styles.infoValue}>C.so Giambone 8/b{'\n'}Torino</Text>
          </View>
          <View style={styles.infoTile}>
            <Text style={styles.infoLabel}>🕐 Orari</Text>
            <Text style={styles.infoValue}>12–14:30{'\n'}18–23:00</Text>
          </View>
        </View>

        {/* Quick actions */}
        <Text style={styles.sectionTitle}>COSA VUOI FARE?</Text>
        <View style={styles.actionsRow}>
          {[
            { emoji: '🛵', label: 'Delivery' },
            { emoji: '🛍️', label: 'Asporto' },
            { emoji: '🎁', label: 'Offerte' },
            { emoji: '⭐', label: 'Fidelity' },
          ].map(item => (
            <TouchableOpacity key={item.label} style={styles.actionBtn}>
              <Text style={styles.actionEmoji}>{item.emoji}</Text>
              <Text style={styles.actionLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Offer */}
        <Text style={styles.sectionTitle}>OFFERTA DEL GIORNO</Text>
        <View style={styles.offerCard}>
          <Text style={styles.offerTitle}>Lunch Express 🍕</Text>
          <Text style={styles.offerDesc}>Pizza + bibita a pranzo ogni giorno</Text>
          <View style={styles.offerPriceRow}>
            <Text style={styles.offerPrice}>€9,50</Text>
            <Text style={styles.offerOld}>€13,00</Text>
          </View>
          <TouchableOpacity style={styles.offerBtn}>
            <Text style={styles.offerBtnText}>Ordina ora →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.navbar}>
        {[
          { key: 'home', emoji: '🏠', label: 'Home' },
          { key: 'menu', emoji: '🍕', label: 'Menu' },
          { key: 'cart', emoji: '🛒', label: 'Ordine' },
          { key: 'offers', emoji: '🎁', label: 'Offerte' },
          { key: 'fidelity', emoji: '⭐', label: 'Fidelity' },
        ].map(item => (
          <TouchableOpacity key={item.key} style={styles.navItem}
            onPress={() => setActiveTab(item.key)}>
            <Text style={styles.navEmoji}>{item.emoji}</Text>
            <Text style={[styles.navLabel, activeTab === item.key && styles.navLabelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF6EE' },
  header: { backgroundColor: '#1A1208', padding: 20, paddingTop: 50, alignItems: 'center' },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#FAF6EE' },
  logoSub: { fontSize: 11, color: '#D4A843', letterSpacing: 2, marginTop: 2 },
  scroll: { flex: 1 },
  hero: { backgroundColor: '#C0392B', margin: 16, borderRadius: 20, padding: 24, alignItems: 'center' },
  heroEmoji: { fontSize: 48, marginBottom: 8 },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' },
  heroSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4, textAlign: 'center' },
  infoRow: { flexDirection: 'row', gap: 10, marginHorizontal: 16, marginBottom: 8 },
  infoTile: { flex: 1, backgroundColor: 'white', borderRadius: 14, padding: 14 },
  infoLabel: { fontSize: 10, color: '#8B7355', marginBottom: 4 },
  infoValue: { fontSize: 12, fontWeight: 'bold', color: '#1A1208', lineHeight: 18 },
  sectionTitle: { fontSize: 10, letterSpacing: 3, color: '#8B6914', marginHorizontal: 16, marginTop: 16, marginBottom: 10 },
  actionsRow: { flexDirection: 'row', marginHorizontal: 16, gap: 8 },
  actionBtn: { flex: 1, backgroundColor: 'white', borderRadius: 14, padding: 12, alignItems: 'center', gap: 4 },
  actionEmoji: { fontSize: 22 },
  actionLabel: { fontSize: 10, color: '#1A1208' },
  offerCard: { backgroundColor: '#8B6914', margin: 16, borderRadius: 20, padding: 20 },
  offerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  offerDesc: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  offerPriceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginTop: 12 },
  offerPrice: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  offerOld: { fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecorationLine: 'line-through', paddingBottom: 4 },
  offerBtn: { backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 10, padding: 10, marginTop: 12, alignItems: 'center' },
  offerBtnText: { fontWeight: 'bold', color: '#8B6914' },
  navbar: { backgroundColor: '#1A1208', flexDirection: 'row', paddingBottom: 20, paddingTop: 8, borderTopWidth: 2, borderTopColor: '#C0392B' },
  navItem: { flex: 1, alignItems: 'center', gap: 2 },
  navEmoji: { fontSize: 20 },
  navLabel: { fontSize: 9, color: 'rgba(250,246,238,0.4)', letterSpacing: 1 },
  navLabelActive: { color: '#D4A843' },
});