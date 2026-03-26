import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Platform, Modal } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cars, provinces, cities } from '../../lib/data';

const recentSearches = ['McLaren', 'Mustang', 'Camaro', 'Audi Sports', 'BMW', 'Tesla', 'Mercedes Benz', 'Toyota'];
const conditionOptions = ['All', 'New', 'Used'];
const sortOptions = ['Newest', 'Price: Low–High', 'Price: High–Low', 'Top Rated'];

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string; city?: string }>();
  const [query, setQuery] = useState(params.q || '');
  const [showResults, setShowResults] = useState(!!(params.q || params.city));
  const [showFilter, setShowFilter] = useState(false);

  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [selectedProvince, setSelectedProvince] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');

  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const cityOptions = cities[selectedProvince] || cities['All'];

  const results = cars.filter(c => {
    const matchQuery = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.brand.toLowerCase().includes(query.toLowerCase());
    const matchCondition = selectedCondition === 'All' || c.condition === selectedCondition.toLowerCase();
    const matchCity = selectedCity === 'All Cities' || !selectedCity.startsWith('All') ? (selectedCity === 'All Cities' || c.city === selectedCity) : true;
    return matchQuery && matchCondition && matchCity;
  }).sort((a, b) => {
    if (selectedSort === 'Price: Low–High') return a.price - b.price;
    if (selectedSort === 'Price: High–Low') return b.price - a.price;
    if (selectedSort === 'Top Rated') return b.rating - a.rating;
    return parseInt(b.id) - parseInt(a.id);
  });

  const hasActiveFilters = selectedCondition !== 'All' || selectedProvince !== 'All' || selectedCity !== 'All Cities';

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
            autoFocus={!params.city}
          />
          {query ? <TouchableOpacity onPress={() => { setQuery(''); setShowResults(false); }}><Ionicons name="close-circle" size={18} color="#888" /></TouchableOpacity> : null}
        </View>
        <TouchableOpacity
          style={[styles.filterBtn, hasActiveFilters && styles.filterBtnActive]}
          onPress={() => setShowFilter(true)}
        >
          <Ionicons name="options" size={20} color={hasActiveFilters ? '#fff' : '#000'} />
          {hasActiveFilters && <View style={styles.filterDot} />}
        </TouchableOpacity>
      </View>

      {/* Location bar */}
      {(showResults || params.city) && (
        <View style={styles.locationBar}>
          <TouchableOpacity
            style={[styles.locationChip, selectedProvince === 'All' && styles.locationChipActive]}
            onPress={() => { setSelectedProvince('All'); setSelectedCity('All Cities'); }}
          >
            <Ionicons name="location-outline" size={13} color={selectedProvince === 'All' ? '#fff' : '#555'} />
            <Text style={[styles.locationChipText, selectedProvince === 'All' && styles.locationChipTextActive]}>All Pakistan</Text>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.locationScroll}>
            {provinces.filter(p => p !== 'All').map(prov => (
              <TouchableOpacity
                key={prov}
                style={[styles.locationChip, selectedProvince === prov && styles.locationChipActive]}
                onPress={() => { setSelectedProvince(prov); setSelectedCity(cities[prov]?.[0] || 'All'); setShowResults(true); }}
              >
                <Text style={[styles.locationChipText, selectedProvince === prov && styles.locationChipTextActive]}>{prov}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* City sub-filter */}
      {selectedProvince !== 'All' && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cityRow}>
          {cityOptions.map(city => (
            <TouchableOpacity
              key={city}
              style={[styles.cityChip, selectedCity === city && styles.cityChipActive]}
              onPress={() => setSelectedCity(city)}
            >
              <Text style={[styles.cityChipText, selectedCity === city && styles.cityChipTextActive]}>{city}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {!showResults && !params.city ? (
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
          <Text style={styles.emptyText}>Sorry, no cars match your search. Try different keywords or filters.</Text>
          <TouchableOpacity style={styles.clearFiltersBtn} onPress={() => { setSelectedCondition('All'); setSelectedProvince('All'); setSelectedCity('All Cities'); }}>
            <Text style={styles.clearFiltersText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scroll}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultCount}>{results.length} cars found{query ? ` for "${query}"` : ''}{selectedCity !== 'All Cities' && !selectedCity.startsWith('All') ? ` in ${selectedCity}` : ''}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortRow}>
              {sortOptions.map(s => (
                <TouchableOpacity key={s} style={[styles.sortChip, selectedSort === s && styles.sortChipActive]} onPress={() => setSelectedSort(s)}>
                  <Text style={[styles.sortChipText, selectedSort === s && styles.sortChipTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.carGrid}>
            {results.map(car => (
              <TouchableOpacity key={car.id} style={styles.carCard} onPress={() => router.push({ pathname: '/car/[id]', params: { id: car.id } })}>
                <View style={styles.carImageWrap}>
                  <Image source={{ uri: car.image }} style={styles.carImage} resizeMode="cover" />
                  <TouchableOpacity style={styles.heartBtn}><Ionicons name="heart-outline" size={18} color="#888" /></TouchableOpacity>
                  <View style={[styles.condBadge, { backgroundColor: car.condition === 'new' ? '#000' : '#666' }]}>
                    <Text style={styles.condBadgeText}>{car.condition === 'new' ? 'New' : 'Used'}</Text>
                  </View>
                </View>
                <View style={styles.carInfo}>
                  <Text style={styles.carName} numberOfLines={1}>{car.name}</Text>
                  <View style={styles.carRating}>
                    <Ionicons name="star" size={11} color="#FFB800" />
                    <Text style={styles.carRatingText}>{car.rating}</Text>
                    <Text style={styles.carCity}> • {car.city}</Text>
                  </View>
                  <Text style={styles.carPrice}>${car.price.toLocaleString()}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ height: 80 }} />
        </ScrollView>
      )}

      {/* Filter Modal */}
      <Modal visible={showFilter} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowFilter(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setShowFilter(false)} style={styles.modalClose}>
              <Ionicons name="close" size={22} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.modalScroll}>
            <Text style={styles.filterLabel}>Condition</Text>
            <View style={styles.optionRow}>
              {conditionOptions.map(opt => (
                <TouchableOpacity key={opt} style={[styles.optionChip, selectedCondition === opt && styles.optionChipActive]} onPress={() => setSelectedCondition(opt)}>
                  <Text style={[styles.optionChipText, selectedCondition === opt && styles.optionChipTextActive]}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterLabel}>Province</Text>
            <View style={styles.optionRow}>
              {provinces.map(prov => (
                <TouchableOpacity key={prov} style={[styles.optionChip, selectedProvince === prov && styles.optionChipActive]} onPress={() => { setSelectedProvince(prov); setSelectedCity(cities[prov]?.[0] || 'All Cities'); }}>
                  <Text style={[styles.optionChipText, selectedProvince === prov && styles.optionChipTextActive]}>{prov}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterLabel}>City</Text>
            <View style={styles.optionRow}>
              {cityOptions.map(city => (
                <TouchableOpacity key={city} style={[styles.optionChip, selectedCity === city && styles.optionChipActive]} onPress={() => setSelectedCity(city)}>
                  <Text style={[styles.optionChipText, selectedCity === city && styles.optionChipTextActive]}>{city}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterLabel}>Sort By</Text>
            <View style={styles.optionRow}>
              {sortOptions.map(s => (
                <TouchableOpacity key={s} style={[styles.optionChip, selectedSort === s && styles.optionChipActive]} onPress={() => setSelectedSort(s)}>
                  <Text style={[styles.optionChipText, selectedSort === s && styles.optionChipTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.resetBtn} onPress={() => { setSelectedCondition('All'); setSelectedProvince('All'); setSelectedCity('All Cities'); setSelectedSort('Newest'); }}>
              <Text style={styles.resetBtnText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={() => { setShowFilter(false); setShowResults(true); }}>
              <Text style={styles.applyBtnText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12, gap: 10 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  searchInput: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular', color: '#000' },
  filterBtn: { width: 46, height: 46, borderRadius: 14, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  filterBtnActive: { backgroundColor: '#000' },
  filterDot: { position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#FF3B30', borderWidth: 1, borderColor: '#fff' },

  locationBar: { flexDirection: 'row', alignItems: 'center', paddingLeft: 20, marginBottom: 8, gap: 8 },
  locationScroll: { flexGrow: 0 },
  locationChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#eee', marginRight: 8 },
  locationChipActive: { backgroundColor: '#000', borderColor: '#000' },
  locationChipText: { fontSize: 12, fontFamily: 'Inter_500Medium', color: '#555' },
  locationChipTextActive: { color: '#fff' },

  cityRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 10, paddingTop: 2 },
  cityChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#eee' },
  cityChipActive: { backgroundColor: '#333', borderColor: '#333' },
  cityChipText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#555' },
  cityChipTextActive: { color: '#fff' },

  scroll: { flex: 1, paddingHorizontal: 20 },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 4 },
  recentTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#000' },
  clearAll: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#888' },
  recentItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  recentText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#000' },

  resultsHeader: { marginBottom: 12 },
  resultCount: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888', marginBottom: 8 },
  sortRow: { flexGrow: 0 },
  sortChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#f5f5f5', marginRight: 8, borderWidth: 1, borderColor: '#eee' },
  sortChipActive: { backgroundColor: '#000', borderColor: '#000' },
  sortChipText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#555' },
  sortChipTextActive: { color: '#fff', fontFamily: 'Inter_500Medium' },

  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyIcon: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  emptyTitle: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 12 },
  emptyText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#888', textAlign: 'center', lineHeight: 22, marginBottom: 16 },
  clearFiltersBtn: { backgroundColor: '#000', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12 },
  clearFiltersText: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#fff' },

  carGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  carCard: { width: '47%', backgroundColor: '#fff', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, marginBottom: 4 },
  carImageWrap: { borderRadius: 12, overflow: 'hidden', position: 'relative' },
  carImage: { width: '100%', height: 110 },
  heartBtn: { position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  condBadge: { position: 'absolute', top: 8, left: 8, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  condBadgeText: { fontSize: 9, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  carInfo: { padding: 10 },
  carName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 3 },
  carRating: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 3 },
  carRatingText: { fontSize: 12, fontFamily: 'Inter_500Medium', color: '#000' },
  carCity: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888' },
  carPrice: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000' },

  modalContainer: { flex: 1, backgroundColor: '#fff' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  modalTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  modalClose: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  modalScroll: { padding: 20, paddingBottom: 0 },
  filterLabel: { fontSize: 15, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 10, marginTop: 16 },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#eee' },
  optionChipActive: { backgroundColor: '#000', borderColor: '#000' },
  optionChipText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#555' },
  optionChipTextActive: { color: '#fff' },
  modalFooter: { flexDirection: 'row', gap: 12, padding: 20, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  resetBtn: { flex: 1, borderWidth: 1.5, borderColor: '#ddd', borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingVertical: 14 },
  resetBtnText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#555' },
  applyBtn: { flex: 2, backgroundColor: '#000', borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingVertical: 14 },
  applyBtnText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#fff' },
});
