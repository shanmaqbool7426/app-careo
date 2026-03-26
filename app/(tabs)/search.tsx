import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Platform, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cars } from '../../lib/data';

const recentSearches = ['McLaren', 'Mustang', 'Camaro', 'Audi Sports', 'BMW', 'Tesla', 'Mercedes Benz', 'Toyota'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const results = query ? cars.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.brand.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <View style={[styles.container, { paddingTop: topPad + 10 }]}>
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={query}
            onChangeText={t => { setQuery(t); setShowResults(!!t); }}
            autoFocus
          />
          {query ? <TouchableOpacity onPress={() => { setQuery(''); setShowResults(false); }}><Ionicons name="close-circle" size={18} color="#888" /></TouchableOpacity> : null}
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={() => {}}>
          <Ionicons name="options" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {!showResults ? (
        <ScrollView style={styles.scroll}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent</Text>
            <TouchableOpacity><Text style={styles.clearAll}>Clear All</Text></TouchableOpacity>
          </View>
          {recentSearches.map((s, i) => (
            <TouchableOpacity key={i} style={styles.recentItem} onPress={() => { setQuery(s); setShowResults(true); }}>
              <Text style={styles.recentText}>{s}</Text>
              <Ionicons name="search" size={16} color="#ccc" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : results.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}><Ionicons name="search-outline" size={48} color="#ccc" /></View>
          <Text style={styles.emptyTitle}>Not Found</Text>
          <Text style={styles.emptyText}>Sorry, the keyword you entered cannot be found. Please check again or search with another keyword.</Text>
        </View>
      ) : (
        <ScrollView style={styles.scroll}>
          <Text style={styles.resultCount}>Results for "{query}" — {results.length} found</Text>
          <View style={styles.carGrid}>
            {results.map(car => (
              <TouchableOpacity key={car.id} style={styles.carCard} onPress={() => router.push({ pathname: '/car/[id]', params: { id: car.id } })}>
                <View style={styles.carImageWrap}>
                  <Image source={{ uri: car.image }} style={styles.carImage} resizeMode="cover" />
                  <TouchableOpacity style={styles.heartBtn}><Ionicons name="heart-outline" size={18} color="#888" /></TouchableOpacity>
                </View>
                <View style={styles.carInfo}>
                  <Text style={styles.carName} numberOfLines={1}>{car.name}</Text>
                  <View style={styles.carRating}>
                    <Ionicons name="star" size={11} color="#FFB800" />
                    <Text style={styles.carRatingText}>{car.rating}</Text>
                  </View>
                  <Text style={styles.carPrice}>${car.price.toLocaleString()}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20, gap: 10 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  searchInput: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular', color: '#000' },
  filterBtn: { width: 46, height: 46, borderRadius: 14, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  scroll: { flex: 1, paddingHorizontal: 20 },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  recentTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#000' },
  clearAll: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#888' },
  recentItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  recentText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#000' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyIcon: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  emptyTitle: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 12 },
  emptyText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#888', textAlign: 'center', lineHeight: 22 },
  resultCount: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888', marginBottom: 16 },
  carGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  carCard: { width: '47%', backgroundColor: '#fff', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, marginBottom: 4 },
  carImageWrap: { borderRadius: 12, overflow: 'hidden', position: 'relative' },
  carImage: { width: '100%', height: 110 },
  heartBtn: { position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  carInfo: { padding: 10 },
  carName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 3 },
  carRating: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 3 },
  carRatingText: { fontSize: 12, fontFamily: 'Inter_500Medium', color: '#000' },
  carPrice: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000' },
});
