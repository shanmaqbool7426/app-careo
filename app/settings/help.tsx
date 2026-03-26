import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

const faqs = [
  { q: 'What is Carea?', a: 'Carea is a car marketplace app that helps you browse, buy, and sell cars easily across Pakistan.' },
  { q: 'Why did my shipment settings differ?', a: 'Shipping settings may vary based on your location, selected dealer, and delivery preferences.' },
  { q: 'How do I get a promo code?', a: 'Promo codes are available through special offers, referral programs, and promotional emails.' },
  { q: "Why didn't I get a refund of the payment?", a: 'Refunds are processed within 5-7 business days after approval. Contact support if it takes longer.' },
  { q: 'How to use Carea?', a: 'Browse cars on the home screen, filter by brand/price, view details, and contact the seller to purchase.' },
  { q: 'How do I increase my balance?', a: 'Go to the Wallet tab and tap "Top Up" to add funds via PayPal, Google Pay, or credit card.' },
  { q: "Why can't I make a payment?", a: 'Ensure your payment method is connected and has sufficient funds. Check your internet connection.' },
];

const tabs = ['General', 'Account', 'Service', 'Payment'];

export default function HelpScreen() {
  const [tab, setTab] = useState('General');
  const [search, setSearch] = useState('');
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <ScrollView style={[styles.container, { paddingTop: topPad + 10 }]} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Help Center</Text>
        <View style={{ width: 22 }} />
      </View>
      <View style={styles.tabRow}>
        {tabs.map(t => (
          <TouchableOpacity key={t} style={[styles.tabBtn, tab === t && styles.tabBtnActive]} onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={16} color="#888" />
        <TextInput style={styles.searchInput} placeholder="Search..." value={search} onChangeText={setSearch} />
      </View>
      <View style={styles.faqList}>
        {faqs.filter(f => !search || f.q.toLowerCase().includes(search.toLowerCase())).map((f, i) => (
          <TouchableOpacity key={i} style={styles.faqItem} onPress={() => setExpanded(expanded === f.q ? null : f.q)}>
            <View style={styles.faqHeader}>
              <Text style={styles.faqQ}>{f.q}</Text>
              <Ionicons name={expanded === f.q ? 'chevron-up' : 'chevron-down'} size={16} color="#888" />
            </View>
            {expanded === f.q && <Text style={styles.faqA}>{f.a}</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 16 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  tabRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  tabBtn: { paddingVertical: 10, paddingHorizontal: 14 },
  tabBtnActive: { borderBottomWidth: 2, borderBottomColor: '#000' },
  tabText: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#aaa' },
  tabTextActive: { color: '#000', fontFamily: 'Inter_600SemiBold' },
  searchBar: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 16, backgroundColor: '#f5f5f5', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  searchInput: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular' },
  faqList: { paddingHorizontal: 20 },
  faqItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  faqHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  faqQ: { flex: 1, fontSize: 14, fontFamily: 'Inter_500Medium', color: '#000', marginRight: 8 },
  faqA: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#666', marginTop: 8, lineHeight: 20 },
});
