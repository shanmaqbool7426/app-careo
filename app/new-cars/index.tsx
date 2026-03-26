import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cars, brands } from '../../lib/data';

const SORT_OPTIONS = ['Relevance', 'Price: Low', 'Price: High', 'Newest'];

export default function NewCarsScreen() {
  const { brand: paramBrand } = useLocalSearchParams<{ brand?: string }>();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const [selectedBrand, setSelectedBrand] = useState(paramBrand || 'All');
  const [sortBy, setSortBy] = useState('Relevance');
  const [showSort, setShowSort] = useState(false);

  const allBrands = ['All', ...brands.map(b => b.name).filter(n => n !== 'More')];
  let filtered = cars.filter(c => c.condition === 'new');
  if (selectedBrand !== 'All') filtered = filtered.filter(c => c.brand === selectedBrand);
  if (sortBy === 'Price: Low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'Price: High') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'Newest') filtered = [...filtered].sort((a, b) => b.year - a.year);

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>New Cars</Text>
        <TouchableOpacity onPress={() => setShowSort(!showSort)}>
          <Ionicons name="options-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Sort dropdown */}
      {showSort && (
        <View style={styles.sortDropdown}>
          {SORT_OPTIONS.map(s => (
            <TouchableOpacity key={s} style={styles.sortOption} onPress={() => { setSortBy(s); setShowSort(false); }}>
              <Text style={[styles.sortOptionText, sortBy === s && styles.sortOptionActive]}>{s}</Text>
              {sortBy === s && <Ionicons name="checkmark" size={16} color="#000" />}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Brand Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.brandRow}>
        {allBrands.map(b => (
          <TouchableOpacity key={b} style={[styles.brandChip, selectedBrand === b && styles.brandChipActive]} onPress={() => setSelectedBrand(b)}>
            <Text style={[styles.brandChipText, selectedBrand === b && styles.brandChipTextActive]}>{b}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.resultCount}>{filtered.length} cars found</Text>

      <FlatList
        data={filtered}
        keyExtractor={c => c.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: '/car/[id]', params: { id: item.id } })}>
            <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
            {item.isNew && <View style={styles.newBadge}><Text style={styles.newBadgeText}>New</Text></View>}
            {item.discount && <View style={styles.discBadge}><Text style={styles.discBadgeText}>-{item.discount}%</Text></View>}
            <TouchableOpacity style={styles.heartBtn}><Ionicons name="heart-outline" size={15} color="#fff" /></TouchableOpacity>
            <View style={styles.cardBody}>
              <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
              <View style={styles.cardMeta}>
                <Ionicons name="location-outline" size={11} color="#888" />
                <Text style={styles.cardCity}>{item.city}</Text>
                <Text style={styles.cardYear}>  •  {item.year}</Text>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.cardPrice}>${item.price.toLocaleString()}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={11} color="#FFD700" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
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
  sortDropdown: { position: 'absolute', top: 80, right: 20, backgroundColor: '#fff', borderRadius: 12, padding: 8, zIndex: 100, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 12, elevation: 8 },
  sortOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 11, minWidth: 160 },
  sortOptionText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#555' },
  sortOptionActive: { fontFamily: 'Inter_600SemiBold', color: '#000' },
  brandRow: { paddingHorizontal: 20, gap: 10, paddingBottom: 12 },
  brandChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f5f5f5', borderWidth: 1.5, borderColor: 'transparent' },
  brandChipActive: { backgroundColor: '#000' },
  brandChipText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#555' },
  brandChipTextActive: { color: '#fff' },
  resultCount: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888', paddingHorizontal: 20, paddingBottom: 12 },
  grid: { paddingHorizontal: 20, paddingBottom: 100, gap: 12 },
  card: { flex: 1, backgroundColor: '#f8f8f8', borderRadius: 16, overflow: 'hidden' },
  cardImage: { width: '100%', height: 120 },
  newBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: '#34C759', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  newBadgeText: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  discBadge: { position: 'absolute', top: 8, right: 30, backgroundColor: '#FF3B30', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  discBadgeText: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  heartBtn: { position: 'absolute', top: 8, right: 8, width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  cardBody: { padding: 10 },
  cardName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 4 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  cardCity: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888' },
  cardYear: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888' },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardPrice: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: 11, fontFamily: 'Inter_500Medium', color: '#555' },
});
