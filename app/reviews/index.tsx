import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { reviews } from '../../lib/data';

const BRANDS = ['All', 'Toyota', 'Honda', 'BMW', 'Mercedes', 'Suzuki', 'Hyundai'];

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Ionicons key={i} name={i <= rating ? 'star' : 'star-outline'} size={size} color="#FFD700" />
      ))}
    </View>
  );
}

export default function ReviewsScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const [brand, setBrand] = useState('All');

  const filtered = brand === 'All' ? reviews : reviews.filter(r => r.brand === brand);

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Car Reviews</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryLeft}>
          <Text style={styles.summaryScore}>4.5</Text>
          <Stars rating={5} size={16} />
          <Text style={styles.summaryCount}>{reviews.length} Reviews</Text>
        </View>
        <View style={styles.summaryBars}>
          {[5, 4, 3, 2, 1].map(n => {
            const count = reviews.filter(r => Math.round(r.rating) === n).length;
            const pct = reviews.length ? (count / reviews.length) * 100 : 0;
            return (
              <View key={n} style={styles.barRow}>
                <Text style={styles.barLabel}>{n}</Text>
                <View style={styles.barBg}><View style={[styles.barFill, { width: `${pct}%` as any }]} /></View>
                <Text style={styles.barCount}>{count}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.brandRow}>
        {BRANDS.map(b => (
          <TouchableOpacity key={b} style={[styles.brandChip, brand === b && styles.brandChipActive]} onPress={() => setBrand(b)}>
            <Text style={[styles.brandChipText, brand === b && styles.brandChipTextActive]}>{b}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={r => r.id}
        contentContainerStyle={{ padding: 20, gap: 14, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.reviewCard} onPress={() => router.push({ pathname: '/reviews/[id]', params: { id: item.id } })}>
            <View style={styles.reviewCarRow}>
              <Image source={{ uri: item.carImage }} style={styles.reviewCarImg} resizeMode="cover" />
              <View style={{ flex: 1 }}>
                <Text style={styles.reviewCarName}>{item.carName}</Text>
                <Stars rating={item.rating} />
              </View>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </View>
            <Text style={styles.reviewTitle}>{item.title}</Text>
            <Text style={styles.reviewBody} numberOfLines={3}>{item.body}</Text>
            <View style={styles.reviewerRow}>
              <Image source={{ uri: item.reviewerAvatar }} style={styles.reviewerAvatar} />
              <Text style={styles.reviewerName}>{item.reviewerName}</Text>
              <Text style={styles.reviewDate}>{item.date}</Text>
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
  summaryCard: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 16, backgroundColor: '#f8f8f8', borderRadius: 16, padding: 16, gap: 16 },
  summaryLeft: { alignItems: 'center', justifyContent: 'center', width: 80 },
  summaryScore: { fontSize: 40, fontFamily: 'Inter_700Bold', color: '#000', lineHeight: 44 },
  summaryCount: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888', marginTop: 4 },
  summaryBars: { flex: 1, gap: 4 },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  barLabel: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888', width: 8 },
  barBg: { flex: 1, height: 6, backgroundColor: '#e0e0e0', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#FFD700', borderRadius: 3 },
  barCount: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888', width: 14, textAlign: 'right' },
  brandRow: { paddingHorizontal: 20, gap: 10, paddingBottom: 12 },
  brandChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f5f5f5' },
  brandChipActive: { backgroundColor: '#000' },
  brandChipText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#555' },
  brandChipTextActive: { color: '#fff' },
  reviewCard: { backgroundColor: '#f8f8f8', borderRadius: 16, padding: 14 },
  reviewCarRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  reviewCarImg: { width: 60, height: 44, borderRadius: 8 },
  reviewCarName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 4 },
  reviewTitle: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 6 },
  reviewBody: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#666', lineHeight: 20, marginBottom: 10 },
  reviewerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  reviewerAvatar: { width: 28, height: 28, borderRadius: 14 },
  reviewerName: { flex: 1, fontSize: 12, fontFamily: 'Inter_600SemiBold', color: '#000' },
  reviewDate: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888' },
});
