import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const supabase = createClient(
  'https://wjbmcqzyismcmxbcndtw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqYm1jcXp5aXNtY214YmNuZHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzgzMjEsImV4cCI6MjA5NzIxNDMyMX0.P8iSPh72J9mJwFbDzAIuaFb5Ouq4Z1xGMvR8I5fvOFw'
);

export default function Cucina() {
  const [ordini, setOrdini] = useState([]);

  const caricaOrdini = async () => {
    const { data } = await supabase
      .from('ordini')
      .select('*')
      .eq('stato', 'nuovo')
      .order('created_at', { ascending: false });
    if (data) setOrdini(data);
  };

  const completaOrdine = async (id) => {
    await supabase.from('ordini').update({ stato: 'completato' }).eq('id', id);
    caricaOrdini();
  };

  useEffect(() => {
    caricaOrdini();
    const interval = setInterval(caricaOrdini, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={S.root}>
      <View style={S.header}>
        <Text style={S.headerTitle}>🍕 Cucina Pizzicata</Text>
        <Text style={S.headerSub}>Ordini in arrivo — aggiornamento automatico</Text>
      </View>
      <ScrollView style={S.scroll}>
        {ordini.length === 0 ? (
          <View style={S.empty}>
            <Text style={S.emptyEmoji}>✅</Text>
            <Text style={S.emptyTitle}>Nessun ordine in attesa</Text>
          </View>
        ) : (
          ordini.map(ordine => {
            const items = JSON.parse(ordine.items || '[]');
            return (
              <View key={ordine.id} style={S.card}>
                <View style={S.cardHeader}>
                  <View>
                    <Text style={S.ordineN}>Ordine #{ordine.id}</Text>
                    <Text style={S.ordineTime}>
                      {new Date(ordine.created_at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                  <Text style={S.totaleBadge}>€ {Number(ordine.totale).toFixed(2)}</Text>
                </View>
                <View style={S.itemsList}>
                  {items.map((item, i) => (
                    <View key={i} style={S.itemRow}>
                      <Text style={S.itemQty}>{item.qty}x</Text>
                      <Text style={S.itemName}>{item.name}</Text>
                      <Text style={S.itemPrice}>€ {(item.price * item.qty).toFixed(2)}</Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity style={S.completeBtn} onPress={() => completaOrdine(ordine.id)}>
                  <Text style={S.completeBtnText}>Ordine Completato</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#1A1208' },
  header: { backgroundColor: '#8B1A1A', padding: 20, paddingTop: 50, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '900', color: '#F2E8D5' },
  headerSub: { fontSize: 11, color: 'rgba(242,232,213,0.6)', marginTop: 4, letterSpacing: 1 },
  scroll: { flex: 1, padding: 16 },
  empty: { alignItems: 'center', paddingTop: 100, gap: 12 },
  emptyEmoji: { fontSize: 64 },
  emptyTitle: { fontSize: 18, color: '#F2E8D5', fontWeight: '600' },
  card: { backgroundColor: '#2D1F0E', borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 2, borderColor: '#8B1A1A' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  ordineN: { fontSize: 22, fontWeight: '900', color: '#F2E8D5' },
  ordineTime: { fontSize: 13, color: '#C8961E', marginTop: 2 },
  totaleBadge: { backgroundColor: '#C8961E', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 6, fontSize: 16, fontWeight: '900', color: '#1A1208' },
  itemsList: { borderTopWidth: 1, borderTopColor: 'rgba(242,232,213,0.1)', paddingTop: 12, marginBottom: 16 },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, gap: 10 },
  itemQty: { fontSize: 18, fontWeight: '900', color: '#8B1A1A', width: 30 },
  itemName: { flex: 1, fontSize: 16, fontWeight: '600', color: '#F2E8D5' },
  itemPrice: { fontSize: 14, color: '#C8961E' },
  completeBtn: { backgroundColor: '#2C5A2E', borderRadius: 14, padding: 16, alignItems: 'center' },
  completeBtnText: { color: 'white', fontSize: 16, fontWeight: '800' },
});