import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { specialOffers, cars } from '../lib/data';

export default function OffersScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.container, { paddingTop: topPad + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Special Offers</Text>
        <View style={{ width: 22 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 16 }}>
        {specialOffers.map((offer, i) => (
          <View key={offer.id} style={[styles.offerCard, { backgroundColor: offer.color }]}>
            <View style={styles.offerLeft}>
              <Text style={styles.offerPercent}>{offer.discount}%</Text>
              <Text style={styles.offerType}>{offer.type}</Text>
              <Text style={styles.offerDesc}>{offer.description}</Text>
            </View>
            <Image source={{ uri: cars[i % cars.length].image }} style={styles.offerImage} resizeMode="contain" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 8, justifyContent: 'space-between' },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  offerCard: { borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', height: 140 },
  offerLeft: { flex: 1 },
  offerPercent: { fontSize: 48, fontFamily: 'Inter_700Bold', color: '#fff' },
  offerType: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#fff', marginBottom: 4 },
  offerDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.7)', lineHeight: 17 },
  offerImage: { width: 150, height: 100 },
});
