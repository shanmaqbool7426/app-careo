import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const methods = [
  { id: '1', name: 'PayPal', icon: 'logo-paypal', connected: true },
  { id: '2', name: 'Google Pay', icon: 'logo-google', connected: true },
  { id: '3', name: 'Apple Pay', icon: 'logo-apple', connected: true },
  { id: '4', name: 'Mastercard •••• 4679', icon: 'card', connected: true },
];

export default function PaymentScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView style={[styles.container, { paddingTop: topPad + 10 }]} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Payment</Text>
        <View style={{ width: 22 }} />
      </View>
      <View style={styles.list}>
        {methods.map(m => (
          <View key={m.id} style={styles.payItem}>
            <View style={styles.payIcon}><Ionicons name={m.icon as any} size={22} color="#000" /></View>
            <Text style={styles.payName}>{m.name}</Text>
            <Text style={[styles.status, { color: m.connected ? '#34C759' : '#888' }]}>{m.connected ? 'Connected' : 'Connect'}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Ionicons name="add-circle" size={20} color="#000" />
        <Text style={styles.addBtnText}>Add New Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 16 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  list: { paddingHorizontal: 20, marginBottom: 16 },
  payItem: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  payIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  payName: { flex: 1, fontSize: 15, fontFamily: 'Inter_500Medium', color: '#000' },
  status: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 20, borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 14, paddingVertical: 14 },
  addBtnText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#000' },
});
