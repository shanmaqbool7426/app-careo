import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cars } from '../../lib/data';

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const [saved, setSaved] = useState(cars.slice(0, 5));

  const remove = (id: string) => setSaved(prev => prev.filter(c => c.id !== id));

  if (saved.length === 0) {
    return (
      <View style={[styles.emptyContainer, { paddingTop: topPad }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Favorites</Text>
        </View>
        <View style={styles.emptyBody}>
          <Ionicons name="heart-outline" size={72} color="#e0e0e0" />
          <Text style={styles.emptyTitle}>No Saved Cars</Text>
          <Text style={styles.emptySub}>Cars you save will appear here. Start browsing and tap the heart icon.</Text>
          <TouchableOpacity style={styles.browseBtn} onPress={() => router.push('/used-cars')}>
            <Text style={styles.browseBtnText}>Browse Cars</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.count}>{saved.length} saved</Text>
      </View>
      <FlatList
        data={saved}
        keyExtractor={c => c.id}
        contentContainerStyle={{ padding: 20, gap: 14, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: '/car/[id]', params: { id: item.id } })}>
            <Image source={{ uri: item.image }} style={styles.carImage} resizeMode="cover" />
            <View style={styles.cardInfo}>
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.carName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.meta}>
                    <View style={[styles.badge, { backgroundColor: item.condition === 'new' ? '#e8f5e9' : '#fff3e0' }]}>
                      <Text style={[styles.badgeText, { color: item.condition === 'new' ? '#4CAF50' : '#FF9800' }]}>
                        {item.condition === 'new' ? 'New' : 'Used'}
                      </Text>
                    </View>
                    <Ionicons name="location-outline" size={12} color="#888" />
                    <Text style={styles.location}>{item.city}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.removeBtn} onPress={() => remove(item.id)}>
                  <Ionicons name="heart" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
              <View style={styles.specRow}>
                <View style={styles.spec}>
                  <Ionicons name="calendar-outline" size={12} color="#888" />
                  <Text style={styles.specText}>{item.year}</Text>
                </View>
                {item.mileage && (
                  <View style={styles.spec}>
                    <Ionicons name="speedometer-outline" size={12} color="#888" />
                    <Text style={styles.specText}>{item.mileage.toLocaleString()} km</Text>
                  </View>
                )}
                <View style={styles.spec}>
                  <Ionicons name="flash-outline" size={12} color="#888" />
                  <Text style={styles.specText}>{item.specs.fuelType}</Text>
                </View>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.price}>${item.price.toLocaleString()}</Text>
                <TouchableOpacity style={styles.viewBtn} onPress={() => router.push({ pathname: '/car/[id]', params: { id: item.id } })}>
                  <Text style={styles.viewBtnText}>View</Text>
                </TouchableOpacity>
              </View>
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
  emptyContainer: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#000' },
  count: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888' },
  emptyBody: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emptyTitle: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#000', marginTop: 16, marginBottom: 8 },
  emptySub: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#888', textAlign: 'center', lineHeight: 21, marginBottom: 28 },
  browseBtn: { backgroundColor: '#000', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 32 },
  browseBtnText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  card: { backgroundColor: '#f8f8f8', borderRadius: 16, overflow: 'hidden' },
  carImage: { width: '100%', height: 160 },
  cardInfo: { padding: 14 },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  carName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 6 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  badgeText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  location: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  removeBtn: { padding: 4 },
  specRow: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  spec: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  specText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#666' },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  viewBtn: { backgroundColor: '#000', paddingHorizontal: 20, paddingVertical: 9, borderRadius: 10 },
  viewBtnText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#fff' },
});
