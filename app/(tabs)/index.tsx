import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Platform, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cars, brands, specialOffers } from '../../lib/data';

const budgetCategories = [
  { id: '1', label: 'Under $15K', max: 15000, icon: 'car-outline', color: '#e8f5e9', iconColor: '#4CAF50' },
  { id: '2', label: '$15K–$30K', max: 30000, icon: 'car', color: '#e3f2fd', iconColor: '#2196F3' },
  { id: '3', label: '$30K–$60K', max: 60000, icon: 'speedometer', color: '#fff3e0', iconColor: '#FF9800' },
  { id: '4', label: '$60K+', max: 9999999, icon: 'diamond', color: '#fce4ec', iconColor: '#E91E63' },
];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const newCars = cars.filter(c => c.condition === 'new');
  const usedCars = cars.filter(c => c.condition === 'used');

  return (
    <ScrollView style={[styles.container, { paddingTop: topPad }]} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.username}>Andrew Ainsley</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => router.push('/notifications')}>
            <Ionicons name="notifications-outline" size={22} color="#000" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/(tabs)/search')}>
        <Ionicons name="search" size={18} color="#888" />
        <Text style={styles.searchPlaceholder}>Search make, model, year...</Text>
        <Ionicons name="options" size={18} color="#888" />
      </TouchableOpacity>

      {/* Promo Banner */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
        {specialOffers.map(offer => (
          <TouchableOpacity key={offer.id} style={[styles.offerCard, { backgroundColor: offer.color }]} onPress={() => router.push('/offers')}>
            <Text style={styles.offerDiscount}><Text style={styles.offerPct}>{offer.discount}%</Text> {offer.title}</Text>
            <Text style={styles.offerType}>{offer.type}</Text>
            <Text style={styles.offerDesc} numberOfLines={2}>{offer.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Popular Brands */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Brands</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}>
          {brands.map(brand => (
            <TouchableOpacity key={brand.id} style={styles.brandItem}
              onPress={() => router.push({ pathname: '/new-cars', params: { brand: brand.name } })}>
              <View style={styles.brandLogo}>
                {brand.logo ? <Image source={{ uri: brand.logo }} style={styles.brandImg} resizeMode="contain" /> : <Ionicons name="add" size={20} color="#888" />}
              </View>
              <Text style={styles.brandName}>{brand.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Budget Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Budget Categories</Text>
        </View>
        <View style={styles.budgetGrid}>
          {budgetCategories.map(b => (
            <TouchableOpacity key={b.id} style={[styles.budgetCard, { backgroundColor: b.color }]}
              onPress={() => router.push({ pathname: '/used-cars', params: { maxPrice: b.max } })}>
              <View style={[styles.budgetIcon, { backgroundColor: b.iconColor + '22' }]}>
                <Ionicons name={b.icon as any} size={22} color={b.iconColor} />
              </View>
              <Text style={styles.budgetLabel}>{b.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* New Cars */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Cars</Text>
          <TouchableOpacity onPress={() => router.push('/new-cars')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
          {newCars.slice(0, 6).map(car => (
            <TouchableOpacity key={car.id} style={styles.carCard} onPress={() => router.push({ pathname: '/car/[id]', params: { id: car.id } })}>
              <Image source={{ uri: car.image }} style={styles.carImage} resizeMode="cover" />
              {car.isNew && <View style={styles.newBadge}><Text style={styles.newBadgeText}>New</Text></View>}
              <TouchableOpacity style={styles.heartBtn}><Ionicons name="heart-outline" size={16} color="#fff" /></TouchableOpacity>
              <View style={styles.carInfo}>
                <Text style={styles.carName} numberOfLines={1}>{car.name}</Text>
                <View style={styles.carMeta}>
                  <Ionicons name="location-outline" size={11} color="#888" />
                  <Text style={styles.carLocation}>{car.city}</Text>
                </View>
                <Text style={styles.carPrice}>${car.price.toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Used Cars */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Used Cars</Text>
          <TouchableOpacity onPress={() => router.push('/used-cars')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
          {usedCars.map(car => (
            <TouchableOpacity key={car.id} style={styles.carCard} onPress={() => router.push({ pathname: '/car/[id]', params: { id: car.id } })}>
              <Image source={{ uri: car.image }} style={styles.carImage} resizeMode="cover" />
              <View style={[styles.newBadge, { backgroundColor: '#888' }]}><Text style={styles.newBadgeText}>Used</Text></View>
              <View style={styles.carInfo}>
                <Text style={styles.carName} numberOfLines={1}>{car.name}</Text>
                <View style={styles.carMeta}>
                  <Ionicons name="location-outline" size={11} color="#888" />
                  <Text style={styles.carLocation}>{car.city}</Text>
                  <Text style={styles.carMileage}>  •  {car.mileage?.toLocaleString()} km</Text>
                </View>
                <Text style={styles.carPrice}>${car.price.toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Ads */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Ads</Text>
          <TouchableOpacity onPress={() => router.push('/used-cars')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        {[...usedCars, ...newCars.slice(0, 2)].slice(0, 5).map(car => (
          <TouchableOpacity key={car.id} style={styles.adRow} onPress={() => router.push({ pathname: '/car/[id]', params: { id: car.id } })}>
            <Image source={{ uri: car.image }} style={styles.adImage} resizeMode="cover" />
            <View style={styles.adInfo}>
              <Text style={styles.adName} numberOfLines={1}>{car.name}</Text>
              <View style={styles.adMeta}>
                <Text style={styles.adYear}>{car.year}</Text>
                {car.mileage && <Text style={styles.adMileage}>  •  {car.mileage.toLocaleString()} km</Text>}
                <Text style={styles.adCity}>  •  {car.city}</Text>
              </View>
              <Text style={styles.adPrice}>${car.price.toLocaleString()}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16 },
  greeting: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888' },
  username: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerBtn: { position: 'relative', padding: 4 },
  notifDot: { position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF3B30' },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 20, backgroundColor: '#f5f5f5', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 13, gap: 8 },
  searchPlaceholder: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular', color: '#999' },
  offerCard: { width: 200, borderRadius: 16, padding: 16 },
  offerDiscount: { fontSize: 13, fontFamily: 'Inter_500Medium', color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  offerPct: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#fff' },
  offerType: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#fff', marginBottom: 6 },
  offerDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.7)', lineHeight: 17 },
  section: { marginTop: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter_700Bold', color: '#000' },
  seeAll: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#888' },
  brandItem: { alignItems: 'center', gap: 8 },
  brandLogo: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  brandImg: { width: 36, height: 36 },
  brandName: { fontSize: 11, fontFamily: 'Inter_500Medium', color: '#444' },
  budgetGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12 },
  budgetCard: { flex: 1, minWidth: '45%', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  budgetIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  budgetLabel: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#222' },
  carCard: { width: 170, borderRadius: 16, overflow: 'hidden', backgroundColor: '#f8f8f8' },
  carImage: { width: '100%', height: 115 },
  newBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: '#000', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  newBadgeText: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  heartBtn: { position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  carInfo: { padding: 10 },
  carName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 4 },
  carMeta: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  carLocation: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888' },
  carMileage: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888' },
  carPrice: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000' },
  adRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, gap: 12, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  adImage: { width: 72, height: 56, borderRadius: 10 },
  adInfo: { flex: 1 },
  adName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 4 },
  adMeta: { flexDirection: 'row', marginBottom: 4 },
  adYear: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  adMileage: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  adCity: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  adPrice: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000' },
});
