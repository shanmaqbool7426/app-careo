import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

const settings = [
  { id: 'general', label: 'General Notification', key: 'general' },
  { id: 'sound', label: 'Sound', key: 'sound' },
  { id: 'vibrate', label: 'Vibrate', key: 'vibrate' },
  { id: 'special', label: 'Special Offers', key: 'special' },
  { id: 'promo', label: 'Promo & Discount', key: 'promo' },
  { id: 'payment', label: 'Payments', key: 'payment' },
  { id: 'cashback', label: 'Cashback', key: 'cashback' },
  { id: 'app', label: 'App Updates', key: 'app' },
  { id: 'service', label: 'New Service Available', key: 'service' },
  { id: 'tips', label: 'New Tips Available', key: 'tips' },
];

export default function NotificationSettingsScreen() {
  const [toggles, setToggles] = useState({ general: true, sound: true, vibrate: false, special: true, promo: false, payment: true, cashback: false, app: true, service: true, tips: false });
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView style={[styles.container, { paddingTop: topPad + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Notification</Text>
        <View style={{ width: 22 }} />
      </View>
      <View style={styles.list}>
        {settings.map(s => (
          <View key={s.id} style={styles.item}>
            <Text style={styles.itemLabel}>{s.label}</Text>
            <Switch
              value={(toggles as any)[s.key]}
              onValueChange={v => setToggles(t => ({ ...t, [s.key]: v }))}
              trackColor={{ false: '#e0e0e0', true: '#000' }}
              thumbColor="#fff"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 16 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  list: { paddingHorizontal: 20 },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  itemLabel: { fontSize: 15, fontFamily: 'Inter_400Regular', color: '#000' },
});
