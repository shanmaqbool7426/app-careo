import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dealers } from '../../lib/data';

const CITIES = ['All', 'Karachi', 'Lahore', 'Islamabad'];
import { useState } from 'react';

export default function DealersScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const [city, setCity] = useState('All');

  const filtered = city === 'All' ? dealers : dealers.filter(d => d.city === city);

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Dealers</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cityRow}>
        {CITIES.map(c => (
          <TouchableOpacity key={c} style={[styles.cityChip, city === c && styles.cityChipActive]} onPress={() => setCity(c)}>
            <Text style={[styles.cityChipText, city === c && styles.cityChipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={d => d.id}
        contentContainerStyle={{ padding: 20, gap: 14, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.dealerCard} onPress={() => router.push({ pathname: '/dealers/[id]', params: { id: item.id } })}>
            <View style={styles.cardTop}>
              <View style={styles.logoWrap}>
                <Image source={{ uri: item.logo }} style={styles.logo} resizeMode="contain" />
              </View>
              <View style={styles.info}>
                <View style={styles.nameRow}>
                  <Text style={styles.dealerName}>{item.name}</Text>
                  {item.verified && <View style={styles.verBadge}><Ionicons name="checkmark-circle" size={14} color="#007AFF" /><Text style={styles.verText}>Verified</Text></View>}
                </View>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={13} color="#888" />
                  <Text style={styles.locationText}>{item.city}</Text>
                  <Text style={styles.sinceText}>  •  Est. {item.since}</Text>
                </View>
                <View style={styles.statsRow}>
                  <View style={styles.stat}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.statText}>{item.rating}</Text>
                  </View>
                  <Text style={styles.statDot}>·</Text>
                  <Text style={styles.statText}>{item.totalReviews} reviews</Text>
                  <Text style={styles.statDot}>·</Text>
                  <Text style={styles.statText}>{item.totalListings} listings</Text>
                </View>
              </View>
            </View>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
            <View style={styles.cardFooter}>
              <TouchableOpacity style={styles.callBtn}>
                <Ionicons name="call-outline" size={16} color="#000" />
                <Text style={styles.callBtnText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewBtn} onPress={() => router.push({ pathname: '/dealers/[id]', params: { id: item.id } })}>
                <Text style={styles.viewBtnText}>View Inventory</Text>
                <Ionicons name="arrow-forward" size={15} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  cityRow: { paddingHorizontal: 20, gap: 10, paddingBottom: 12 },
  cityChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f5f5f5' },
  cityChipActive: { backgroundColor: '#000' },
  cityChipText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#555' },
  cityChipTextActive: { color: '#fff' },
  dealerCard: { backgroundColor: '#f8f8f8', borderRadius: 16, padding: 14 },
  cardTop: { flexDirection: 'row', gap: 12, marginBottom: 10 },
  logoWrap: { width: 56, height: 56, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  logo: { width: 40, height: 40 },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  dealerName: { fontSize: 15, fontFamily: 'Inter_700Bold', color: '#000', flex: 1 },
  verBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: '#EAF4FF', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  verText: { fontSize: 11, fontFamily: 'Inter_500Medium', color: '#007AFF' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  locationText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  sinceText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  statText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#555' },
  statDot: { fontSize: 14, color: '#ccc' },
  description: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#666', lineHeight: 19, marginBottom: 12 },
  cardFooter: { flexDirection: 'row', gap: 10 },
  callBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 9 },
  callBtnText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#000' },
  viewBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#000', borderRadius: 10, paddingVertical: 9 },
  viewBtnText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#fff' },
});
