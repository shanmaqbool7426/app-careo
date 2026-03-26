import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, ScrollView, Platform, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cars } from '../../lib/data';

const CITIES = ['All Cities', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Multan', 'Faisalabad'];
const BRANDS = ['All', 'Toyota', 'Honda', 'Suzuki', 'BMW', 'Audi', 'Hyundai', 'Kia'];
const YEARS_FROM = ['Any', '2022', '2021', '2020', '2019', '2018', '2015', '2010'];
const YEARS_TO = ['Any', '2024', '2023', '2022', '2021', '2020', '2019'];

export default function UsedCarsScreen() {
  const { maxPrice } = useLocalSearchParams<{ maxPrice?: string }>();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const [city, setCity] = useState('All Cities');
  const [brand, setBrand] = useState('All');
  const [yearFrom, setYearFrom] = useState('Any');
  const [yearTo, setYearTo] = useState('Any');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState(maxPrice ? String(maxPrice) : '');
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState('Newest');
  const [search, setSearch] = useState('');

  let filtered = cars.filter(c => c.condition === 'used');
  if (brand !== 'All') filtered = filtered.filter(c => c.brand === brand);
  if (city !== 'All Cities') filtered = filtered.filter(c => c.city === city);
  if (yearFrom !== 'Any') filtered = filtered.filter(c => c.year >= parseInt(yearFrom));
  if (yearTo !== 'Any') filtered = filtered.filter(c => c.year <= parseInt(yearTo));
  if (priceMin) filtered = filtered.filter(c => c.price >= parseInt(priceMin));
  if (priceMax) filtered = filtered.filter(c => c.price <= parseInt(priceMax));
  if (search) filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase()));
  if (sortBy === 'Price: Low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'Price: High') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'Newest') filtered = [...filtered].sort((a, b) => b.year - a.year);
  if (sortBy === 'Mileage') filtered = [...filtered].sort((a, b) => (a.mileage || 0) - (b.mileage || 0));

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Used Cars</Text>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilter(true)}>
          <Ionicons name="options-outline" size={18} color="#000" />
          <Text style={styles.filterBtnText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color="#888" />
          <TextInput style={styles.searchInput} placeholder="Search make, model..." value={search} onChangeText={setSearch} placeholderTextColor="#bbb" />
        </View>
      </View>

      {/* Active filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTags}>
        {city !== 'All Cities' && <View style={styles.filterTag}><Text style={styles.filterTagText}>{city}</Text><TouchableOpacity onPress={() => setCity('All Cities')}><Ionicons name="close" size={12} color="#555" /></TouchableOpacity></View>}
        {brand !== 'All' && <View style={styles.filterTag}><Text style={styles.filterTagText}>{brand}</Text><TouchableOpacity onPress={() => setBrand('All')}><Ionicons name="close" size={12} color="#555" /></TouchableOpacity></View>}
        {priceMax && <View style={styles.filterTag}><Text style={styles.filterTagText}>Max ${parseInt(priceMax).toLocaleString()}</Text><TouchableOpacity onPress={() => setPriceMax('')}><Ionicons name="close" size={12} color="#555" /></TouchableOpacity></View>}
        {['Price: Low', 'Price: High', 'Mileage'].includes(sortBy) && <View style={styles.filterTag}><Text style={styles.filterTagText}>{sortBy}</Text><TouchableOpacity onPress={() => setSortBy('Newest')}><Ionicons name="close" size={12} color="#555" /></TouchableOpacity></View>}
      </ScrollView>

      <Text style={styles.resultCount}>{filtered.length} used cars found</Text>

      <FlatList
        data={filtered}
        keyExtractor={c => c.id}
        contentContainerStyle={{ padding: 20, gap: 14, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: '/car/[id]', params: { id: item.id } })}>
            <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardBody}>
              <View style={styles.cardTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.cardMeta}>
                    <Ionicons name="location-outline" size={12} color="#888" />
                    <Text style={styles.cardCity}>{item.city}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.heartBtn}><Ionicons name="heart-outline" size={20} color="#888" /></TouchableOpacity>
              </View>
              <View style={styles.specRow}>
                <View style={styles.spec}><Ionicons name="calendar-outline" size={12} color="#888" /><Text style={styles.specText}>{item.year}</Text></View>
                <View style={styles.spec}><Ionicons name="speedometer-outline" size={12} color="#888" /><Text style={styles.specText}>{item.mileage?.toLocaleString()} km</Text></View>
                <View style={styles.spec}><Ionicons name="color-palette-outline" size={12} color="#888" /><Text style={styles.specText}>{item.color}</Text></View>
              </View>
              <View style={styles.sellerRow}>
                <Ionicons name="person-circle-outline" size={14} color="#888" />
                <Text style={styles.sellerText}>{item.sellerName || 'Private Seller'}</Text>
              </View>
              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.cardPrice}>${item.price.toLocaleString()}</Text>
                  {item.originalPrice && <Text style={styles.origPrice}>${item.originalPrice.toLocaleString()}</Text>}
                </View>
                <View style={styles.actionBtns}>
                  <TouchableOpacity style={styles.callBtn} onPress={() => {}}>
                    <Ionicons name="call" size={16} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.viewBtn} onPress={() => router.push({ pathname: '/car/[id]', params: { id: item.id } })}>
                    <Text style={styles.viewBtnText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Filter Modal */}
      <Modal visible={showFilter} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter & Sort</Text>
            <TouchableOpacity onPress={() => setShowFilter(false)}><Ionicons name="close" size={24} color="#000" /></TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ padding: 20, gap: 20, paddingBottom: 100 }}>
            <View>
              <Text style={styles.filterSectionTitle}>Sort By</Text>
              <View style={styles.chipRow}>
                {['Newest', 'Price: Low', 'Price: High', 'Mileage'].map(s => (
                  <TouchableOpacity key={s} style={[styles.chip, sortBy === s && styles.chipActive]} onPress={() => setSortBy(s)}>
                    <Text style={[styles.chipText, sortBy === s && styles.chipTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View>
              <Text style={styles.filterSectionTitle}>City</Text>
              <View style={styles.chipRow}>
                {CITIES.map(c => (
                  <TouchableOpacity key={c} style={[styles.chip, city === c && styles.chipActive]} onPress={() => setCity(c)}>
                    <Text style={[styles.chipText, city === c && styles.chipTextActive]}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View>
              <Text style={styles.filterSectionTitle}>Brand</Text>
              <View style={styles.chipRow}>
                {BRANDS.map(b => (
                  <TouchableOpacity key={b} style={[styles.chip, brand === b && styles.chipActive]} onPress={() => setBrand(b)}>
                    <Text style={[styles.chipText, brand === b && styles.chipTextActive]}>{b}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View>
              <Text style={styles.filterSectionTitle}>Year Range</Text>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.filterSubLabel}>From</Text>
                  <View style={styles.chipRow}>
                    {YEARS_FROM.map(y => (
                      <TouchableOpacity key={y} style={[styles.chip, yearFrom === y && styles.chipActive]} onPress={() => setYearFrom(y)}>
                        <Text style={[styles.chipText, yearFrom === y && styles.chipTextActive]}>{y}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.filterSectionTitle}>Price Range (USD)</Text>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={styles.priceInputWrap}>
                  <Text style={styles.filterSubLabel}>Min</Text>
                  <TextInput style={styles.priceInput} value={priceMin} onChangeText={setPriceMin} placeholder="0" keyboardType="numeric" placeholderTextColor="#bbb" />
                </View>
                <View style={styles.priceInputWrap}>
                  <Text style={styles.filterSubLabel}>Max</Text>
                  <TextInput style={styles.priceInput} value={priceMax} onChangeText={setPriceMax} placeholder="Any" keyboardType="numeric" placeholderTextColor="#bbb" />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.clearBtn} onPress={() => { setCity('All Cities'); setBrand('All'); setYearFrom('Any'); setYearTo('Any'); setPriceMin(''); setPriceMax(''); setSortBy('Newest'); }}>
              <Text style={styles.clearBtnText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={() => setShowFilter(false)}>
              <Text style={styles.applyBtnText}>Show {filtered.length} Results</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  filterBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#f5f5f5', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  filterBtnText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#000' },
  searchRow: { paddingHorizontal: 20, marginBottom: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 11, gap: 8 },
  searchInput: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular', color: '#000' },
  filterTags: { paddingHorizontal: 20, gap: 8, paddingBottom: 10 },
  filterTag: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#f0f0f0', borderRadius: 16, paddingHorizontal: 10, paddingVertical: 6 },
  filterTagText: { fontSize: 12, fontFamily: 'Inter_500Medium', color: '#555' },
  resultCount: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888', paddingHorizontal: 20, paddingBottom: 8 },
  card: { backgroundColor: '#f8f8f8', borderRadius: 16, overflow: 'hidden' },
  cardImage: { width: '100%', height: 180 },
  cardBody: { padding: 14 },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  cardName: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 4 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardCity: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  heartBtn: { padding: 4 },
  specRow: { flexDirection: 'row', gap: 14, marginBottom: 8 },
  spec: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  specText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#666' },
  sellerRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 },
  sellerText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardPrice: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  origPrice: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#aaa', textDecorationLine: 'line-through' },
  actionBtns: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  callBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' },
  viewBtn: { backgroundColor: '#000', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10 },
  viewBtnText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  modalContainer: { flex: 1, backgroundColor: '#fff' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  modalTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  filterSectionTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 12 },
  filterSubLabel: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888', marginBottom: 6 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f5f5f5' },
  chipActive: { backgroundColor: '#000' },
  chipText: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#555' },
  chipTextActive: { color: '#fff' },
  priceInputWrap: { flex: 1 },
  priceInput: { backgroundColor: '#f5f5f5', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, fontFamily: 'Inter_400Regular', color: '#000' },
  modalFooter: { flexDirection: 'row', gap: 12, padding: 20, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  clearBtn: { flex: 1, borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  clearBtnText: { fontSize: 15, fontFamily: 'Inter_500Medium', color: '#000' },
  applyBtn: { flex: 2, backgroundColor: '#000', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  applyBtnText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#fff' },
});
