import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cars } from '../lib/data';
import { useState } from 'react';

export default function WishlistScreen() {
  const [wishlist, setWishlist] = useState(cars.slice(0, 4));
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const remove = (id: string) => setWishlist(w => w.filter(c => c.id !== id));

  return (
    <View style={[styles.container, { paddingTop: topPad + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>My Wishlist</Text>
        <View style={{ width: 22 }} />
      </View>
      <FlatList
        data={wishlist}
        numColumns={2}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        columnWrapperStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.carCard} onPress={() => router.push({ pathname: '/car/[id]', params: { id: item.id } })}>
            <View style={styles.cardImageWrap}>
              <Image source={{ uri: item.image }} style={styles.carImage} resizeMode="cover" />
              <TouchableOpacity style={styles.heartBtn} onPress={() => remove(item.id)}>
                <Ionicons name="heart" size={18} color="#FF3B30" />
              </TouchableOpacity>
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
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 8, justifyContent: 'space-between' },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  carCard: { flex: 1, backgroundColor: '#fff', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  cardImageWrap: { borderRadius: 12, overflow: 'hidden', position: 'relative' },
  carImage: { width: '100%', height: 110 },
  heartBtn: { position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  carInfo: { padding: 10 },
  carName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 4 },
  rating: { fontSize: 12, fontFamily: 'Inter_500Medium', color: '#000' },
  price: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000' },
});
