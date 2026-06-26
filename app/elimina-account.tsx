import { ScrollView, Text, View } from 'react-native';

const C = {
  rosso: '#8B1A1A', rossoScuro: '#5C0F0F', crema: '#F2E8D5',
  oro: '#C8961E', oroChiaro: '#E8B84B', marrone: '#3D1A00', grigio: '#8B7355',
};
const FONT_TITOLO = "'Fraunces', Georgia, serif";
const FONT_TESTO = "'Inter', -apple-system, sans-serif";

export default function EliminaAccount() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F2E8D5', maxWidth: 600, marginHorizontal: 'auto', width: '100%' }}>
      <View style={{ background: 'radial-gradient(circle at 80% -10%, rgba(232,184,75,0.4), transparent 55%), linear-gradient(135deg, #8B1A1A 0%, #5C0F0F 100%)', paddingTop: 50, paddingBottom: 36, paddingHorizontal: 24, alignItems: 'center' }}>
        <Text style={{ fontFamily: FONT_TITOLO, fontSize: 36, fontWeight: '900', color: '#F2E8D5' }}>Pizzicata</Text>
        <Text style={{ fontFamily: FONT_TESTO, fontSize: 13, fontWeight: '700', letterSpacing: 3, color: C.oroChiaro, marginTop: 2 }}>— TORINO —</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }}>
        <Text style={{ fontFamily: FONT_TITOLO, fontSize: 26, fontWeight: '900', color: C.marrone, marginBottom: 16 }}>Eliminazione account</Text>

        <Text style={{ fontFamily: FONT_TESTO, fontSize: 15, color: C.marrone, lineHeight: 24, marginBottom: 16 }}>
          Puoi eliminare il tuo account Pizzicata e tutti i dati associati direttamente dall'app, in qualsiasi momento.
        </Text>

        <View style={{ backgroundColor: '#fff', borderRadius: 14, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: '#E8D5B0' }}>
          <Text style={{ fontFamily: FONT_TESTO, fontSize: 14, fontWeight: '800', color: C.marrone, marginBottom: 10 }}>Come eliminare il tuo account:</Text>
          <Text style={{ fontFamily: FONT_TESTO, fontSize: 14, color: C.marrone, lineHeight: 26 }}>
            1. Apri l'app Pizzicata{'\n'}
            2. Accedi con il tuo account{'\n'}
            3. Vai nella sezione <Text style={{ fontWeight: '800' }}>Profilo</Text>{'\n'}
            4. In fondo, premi <Text style={{ fontWeight: '800' }}>"Elimina account"</Text>{'\n'}
            5. Conferma l'eliminazione
          </Text>
        </View>

        <View style={{ backgroundColor: '#FFF8E7', borderRadius: 14, padding: 18, borderLeftWidth: 4, borderLeftColor: C.oro, marginBottom: 16 }}>
          <Text style={{ fontFamily: FONT_TESTO, fontSize: 14, fontWeight: '800', color: C.marrone, marginBottom: 6 }}>Quali dati vengono eliminati</Text>
          <Text style={{ fontFamily: FONT_TESTO, fontSize: 13, color: C.grigio, lineHeight: 20 }}>
            Nome, cognome, email, numero di telefono, indirizzo, eventuali preferenze e lo storico degli ordini collegati al tuo account. L'eliminazione è immediata e definitiva.
          </Text>
        </View>

        <Text style={{ fontFamily: FONT_TESTO, fontSize: 14, color: C.marrone, lineHeight: 24, marginBottom: 8 }}>
          Se non riesci ad accedere all'app o hai bisogno di assistenza, puoi richiedere l'eliminazione contattandoci:
        </Text>
        <Text style={{ fontFamily: FONT_TESTO, fontSize: 14, color: C.rosso, fontWeight: '800', lineHeight: 24, marginBottom: 40 }}>
          📞 331 5695959{'\n'}📧 (pizzeriapizzicataapplicazione@gmail.com)
        </Text>
      </ScrollView>
    </View>
  );
}