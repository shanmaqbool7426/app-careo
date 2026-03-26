import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cars, reviews } from '../../lib/data';

const { width } = Dimensions.get('window');

function Stars({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Ionicons key={i} name={i <= rating ? 'star' : 'star-outline'} size={13} color="#FFD700" />
      ))}
    </View>
  );
}

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = cars.find(c => c.id === id) || cars[0];
  const carReviews = reviews.filter(r => r.carId === car.id);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'Details' | 'Specs' | 'Reviews'>('Details');
  const [isFavorite, setIsFavorite] = useState(false);
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View style={styles.container}>
      {/* Image Gallery */}
      <View style={styles.gallery}>
        <Image source={{ uri: car.images[currentImage] || car.image }} style={styles.mainImage} resizeMode="cover" />
        <View style={[styles.galleryTopBar, { top: topPad + 10 }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteBtn} onPress={() => setIsFavorite(!isFavorite)}>
            <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={22} color={isFavorite ? '#FF3B30' : '#000'} />
          </TouchableOpacity>
        </View>
        <View style={styles.thumbnails}>
          {car.images.map((img, i) => (
            <TouchableOpacity key={i} onPress={() => setCurrentImage(i)} style={[styles.thumbnail, currentImage === i && styles.thumbnailActive]}>
              <Image source={{ uri: img }} style={styles.thumbnailImg} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: botPad + 90 }}>
        <View style={styles.topInfo}>
          <View>
            <Text style={styles.carName}>{car.name}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FFB800" />
              <Text style={styles.rating}>{car.rating}</Text>
              <Text style={styles.reviews}>({car.reviews} reviews)</Text>
            </View>
          </View>
          <Text style={styles.price}>${car.price.toLocaleString()}</Text>
        </View>

        <View style={styles.tabs}>
          {(['Details', 'Specs', 'Reviews'] as const).map(t => (
            <TouchableOpacity key={t} style={[styles.tabBtn, activeTab === t && styles.tabBtnActive]} onPress={() => setActiveTab(t)}>
              <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'Details' && (
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <View style={styles.specGrid}>
              {[
                { label: 'Year', value: car.year.toString() },
                { label: 'Condition', value: car.condition === 'new' ? 'New' : 'Used' },
                { label: 'Fuel', value: car.specs.fuelType },
                { label: 'Seats', value: car.specs.seats.toString() },
                { label: 'Transmission', value: car.specs.transmission.split(' ')[0] },
                { label: 'Color', value: car.color },
              ].map(({ label, value }) => (
                <View key={label} style={styles.specItem}>
                  <Text style={styles.specLabel}>{label}</Text>
                  <Text style={styles.specValue}>{value}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.sectionTitle}>Features</Text>
            {car.features.map((f, i) => (
              <View key={i} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={18} color="#34C759" />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Specs' && (
          <View style={styles.detailsSection}>
            {Object.entries(car.specs).map(([key, val]) => (
              <View key={key} style={styles.specRow}>
                <Text style={styles.specRowLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
                <Text style={styles.specRowValue}>{val}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Reviews' && (
          <View style={styles.detailsSection}>
            <View style={styles.ratingOverview}>
              <Text style={styles.reviewScore}>{car.rating}</Text>
              <View style={{ alignItems: 'flex-start' }}>
                <Stars rating={Math.round(car.rating)} />
                <Text style={styles.reviewCount}>{car.reviews} reviews</Text>
              </View>
            </View>
            {carReviews.length > 0 ? carReviews.map(rev => (
              <TouchableOpacity key={rev.id} style={styles.reviewCard}
                onPress={() => router.push({ pathname: '/reviews/[id]', params: { id: rev.id } })}>
                <View style={styles.reviewerRow}>
                  <Image source={{ uri: rev.reviewerAvatar }} style={styles.reviewerAvatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewerName}>{rev.reviewerName}</Text>
                    <Text style={styles.reviewDate}>{rev.date}</Text>
                  </View>
                  <Stars rating={rev.rating} />
                </View>
                <Text style={styles.reviewTitle}>{rev.title}</Text>
                <Text style={styles.reviewBody} numberOfLines={3}>{rev.body}</Text>
              </TouchableOpacity>
            )) : (
              <View style={styles.noReviewsWrap}>
                <Ionicons name="chatbubble-outline" size={40} color="#e0e0e0" />
                <Text style={styles.noReviewsText}>No reviews yet for this car</Text>
                <TouchableOpacity onPress={() => router.push('/reviews')}>
                  <Text style={styles.allReviewsLink}>Browse all reviews →</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity style={styles.allReviewsBtn} onPress={() => router.push('/reviews')}>
              <Text style={styles.allReviewsBtnText}>All Car Reviews</Text>
              <Ionicons name="arrow-forward" size={16} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Bar */}
      <View style={[styles.bottomBar, { paddingBottom: botPad + 10 }]}>
        <TouchableOpacity style={styles.chatBtn} onPress={() => router.push({ pathname: '/chat/[id]', params: { id: '1' } })}>
          <Ionicons name="chatbubble-outline" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.compareBtn} onPress={() => router.push('/comparison')}>
          <Ionicons name="git-compare-outline" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyBtn}>
          <Text style={styles.buyBtnText}>Buy Now — ${car.price.toLocaleString()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  gallery: { height: 300, position: 'relative', backgroundColor: '#f5f5f5' },
  mainImage: { width: '100%', height: 280 },
  galleryTopBar: { position: 'absolute', left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  favoriteBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  thumbnails: { position: 'absolute', bottom: 10, left: 16, flexDirection: 'row', gap: 8 },
  thumbnail: { width: 52, height: 40, borderRadius: 8, overflow: 'hidden', borderWidth: 2, borderColor: 'transparent' },
  thumbnailActive: { borderColor: '#000' },
  thumbnailImg: { width: '100%', height: '100%' },
  content: { flex: 1 },
  topInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 20 },
  carName: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#000' },
  reviews: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  price: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#000' },
  tabs: { flexDirection: 'row', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', marginBottom: 16 },
  tabBtn: { paddingVertical: 10, marginRight: 24 },
  tabBtnActive: { borderBottomWidth: 2, borderBottomColor: '#000' },
  tabText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#aaa' },
  tabTextActive: { color: '#000', fontFamily: 'Inter_600SemiBold' },
  detailsSection: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#000', marginTop: 16, marginBottom: 12 },
  specGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 8 },
  specItem: { width: '30%', backgroundColor: '#f8f8f8', borderRadius: 12, padding: 12, alignItems: 'center' },
  specLabel: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888', marginBottom: 4 },
  specValue: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#000', textAlign: 'center' },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  featureText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#000' },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  specRowLabel: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888', textTransform: 'capitalize' },
  specRowValue: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#000' },
  reviewScore: { fontSize: 48, fontFamily: 'Inter_700Bold', color: '#000' },
  reviewCount: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888', marginTop: 4 },
  bottomBar: { flexDirection: 'row', padding: 16, gap: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  chatBtn: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  compareBtn: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  buyBtn: { flex: 1, backgroundColor: '#000', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  buyBtnText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  ratingOverview: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 16, marginBottom: 20, backgroundColor: '#f8f8f8', borderRadius: 14, padding: 16 },
  reviewCard: { backgroundColor: '#f8f8f8', borderRadius: 14, padding: 14, marginBottom: 12 },
  reviewerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  reviewerAvatar: { width: 36, height: 36, borderRadius: 18 },
  reviewerName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#000' },
  reviewDate: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888', marginTop: 2 },
  reviewTitle: { fontSize: 13, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 6 },
  reviewBody: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#666', lineHeight: 19 },
  noReviewsWrap: { alignItems: 'center', paddingVertical: 32, gap: 8 },
  noReviewsText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#aaa' },
  allReviewsLink: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#000' },
  allReviewsBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 14, paddingVertical: 13, marginTop: 8, marginBottom: 8 },
  allReviewsBtnText: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000' },
});
