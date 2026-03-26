import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cars } from '../lib/data';
import { useState } from 'react';

export default function TopDealsScreen() {
  const [active, setActive] = useState('All');
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const filters = ['All', 'Mercedes', 'Tesla', 'BMW'];

  return (
    <View style={[styles.container, { paddingTop: topPad + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Top Deals</Text>
        <View style={{ width: 22 }} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {filters.map(f => (
          <TouchableOpacity key={f} style={[styles.filterChip, active === f && styles.filterActive]} onPress={() => setActive(f)}>
            <Text style={[styles.filterText, active === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={cars}
        numColumns={2}
        keyExtractor={c => c.id}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        columnWrapperStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.carCard} onPress={() => router.push({ pathname: '/car/[id]', params: { id: item.id } })}>
            <View style={styles.imageWrap}>
              <Image source={{ uri: item.image }} style={styles.carImage} resizeMode="cover" />
              <TouchableOpacity style={styles.heartBtn}><Ionicons name="heart-outline" size={16} color="#888" /></TouchableOpacity>
            </View>
            <View style={styles.carInfo}>
              <Text style={styles.carName} numberOfLines={1}>{item.name}</Text>
              <View style={styles.ratingRow}><Ionicons name="star" size={11} color="#FFB800" /><Text style={styles.rating}>{item.rating}</Text></View>
              <Text style={styles.price}>${item.price.toLocaleString()}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12, justifyContent: 'space-between' },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  filters: { paddingHorizontal: 16, marginBottom: 8 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f5f5f5', marginRight: 8 },
  filterActive: { backgroundColor: '#000' },
  filterText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#888' },
  filterTextActive: { color: '#fff' },
  carCard: { flex: 1, backgroundColor: '#fff', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  imageWrap: { borderRadius: 12, overflow: 'hidden', position: 'relative' },
  carImage: { width: '100%', height: 110 },
  heartBtn: { position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  carInfo: { padding: 10 },
  carName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 4 },
  rating: { fontSize: 12, fontFamily: 'Inter_500Medium', color: '#000' },
  price: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000' },
});
