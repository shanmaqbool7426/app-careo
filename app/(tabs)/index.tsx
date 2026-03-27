import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Platform, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cars, brands, specialOffers, blogPosts, videos, nearbyLocations } from '../../lib/data';

const budgetCategories = [
  { id: '1', label: 'Under $15K', max: 15000, icon: 'car-outline', color: '#e8f5e9', iconColor: '#4CAF50' },
  { id: '2', label: '$15K–$30K', max: 30000, icon: 'car', color: '#e3f2fd', iconColor: '#2196F3' },
  { id: '3', label: '$30K–$60K', max: 60000, icon: 'speedometer', color: '#fff3e0', iconColor: '#FF9800' },
  { id: '4', label: '$60K+', max: 9999999, icon: 'diamond', color: '#fce4ec', iconColor: '#E91E63' },
];

export default function HomeScreen() {
  const [aiQuery, setAiQuery] = useState('');
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 0 : insets.top;
  const newCars = cars.filter(c => c.condition === 'new');
  const usedCars = cars.filter(c => c.condition === 'used');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ===== PREMIUM HERO BANNER ===== */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200' }}
        style={styles.heroBanner}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.45)', 'rgba(0,0,0,0.72)', 'rgba(0,0,0,0.92)']}
          style={[styles.heroGradient, { paddingTop: topPad + 18 }]}
        >
          {/* Profile Row */}
          <View style={styles.profileRow}>
            <TouchableOpacity style={styles.profileLeft} onPress={() => router.push('/(tabs)/profile')}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' }} style={styles.avatar} />
              <View>
                <Text style={styles.greeting}>Good Morning 👋</Text>
                <Text style={styles.username}>Andrew Ainsley</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn} onPress={() => router.push('/notifications')}>
              <Ionicons name="notifications-outline" size={20} color="#fff" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>

          {/* Hero Text + Search */}
          <View style={styles.heroInner}>
            <Text style={styles.heroSubtitle}>Premium marketplace for new & used vehicles. Use AI to search in plain English — just say what you need.</Text>
            <View style={styles.aiSearchRow}>
              <View style={styles.aiInputWrap}>
                <Ionicons name="search-outline" size={15} color="rgba(255,255,255,0.5)" style={{ marginRight: 8 }} />
                <TextInput
                  style={styles.aiInput}
                  placeholder="e.g. family SUV under $40K"
                  placeholderTextColor="rgba(255,255,255,0.38)"
                  value={aiQuery}
                  onChangeText={setAiQuery}
                />
              </View>
              <TouchableOpacity
                style={styles.aiSearchBtn}
                onPress={() => router.push({ pathname: '/(tabs)/search', params: { q: aiQuery } })}
              >
                <Text style={styles.aiSearchBtnText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

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

      {/* Near You */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Near You</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/search')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
          {nearbyLocations.map(loc => (
            <TouchableOpacity key={loc.id} style={styles.locationCard}
              onPress={() => router.push({ pathname: '/(tabs)/search', params: { city: loc.name } })}>
              <Image source={{ uri: loc.image }} style={styles.locationImage} resizeMode="cover" />
              <View style={styles.locationOverlay}>
                <View style={styles.locationPinRow}>
                  <Ionicons name="location" size={12} color="#fff" />
                  <Text style={styles.locationName}>{loc.name}</Text>
                </View>
                <Text style={styles.locationCount}>{loc.count} cars</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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

      {/* Explore Quick Links */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore</Text>
        </View>
        <View style={styles.quickLinksGrid}>
          <TouchableOpacity style={[styles.quickCard, { backgroundColor: '#1a1a2e' }]} onPress={() => router.push('/comparison')}>
            <Ionicons name="git-compare" size={26} color="#fff" />
            <Text style={styles.quickLabel}>Compare Cars</Text>
            <Text style={styles.quickSub}>Side-by-side specs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickCard, { backgroundColor: '#16213e' }]} onPress={() => router.push('/reviews')}>
            <Ionicons name="star" size={26} color="#FFD700" />
            <Text style={styles.quickLabel}>Car Reviews</Text>
            <Text style={styles.quickSub}>Owner experiences</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickCard, { backgroundColor: '#0f3460' }]} onPress={() => router.push('/dealers')}>
            <Ionicons name="business" size={26} color="#fff" />
            <Text style={styles.quickLabel}>Dealers</Text>
            <Text style={styles.quickSub}>Verified showrooms</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickCard, { backgroundColor: '#1a1a1a' }]} onPress={() => router.push('/top-deals')}>
            <Ionicons name="pricetag" size={26} color="#fff" />
            <Text style={styles.quickLabel}>Top Deals</Text>
            <Text style={styles.quickSub}>Best offers today</Text>
          </TouchableOpacity>
        </View>
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

      {/* ===== BLOG SECTION ===== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="newspaper-outline" size={18} color="#000" />
            <Text style={styles.sectionTitle}>Latest Articles</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/blog')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
          {blogPosts.slice(0, 4).map(post => (
            <TouchableOpacity key={post.id} style={styles.blogCard} onPress={() => router.push({ pathname: '/blog/[id]', params: { id: post.id } })}>
              <Image source={{ uri: post.image }} style={styles.blogImage} resizeMode="cover" />
              <View style={styles.blogOverlay}>
                <View style={styles.blogCatBadge}><Text style={styles.blogCatText}>{post.category}</Text></View>
              </View>
              <View style={styles.blogInfo}>
                <Text style={styles.blogTitle} numberOfLines={2}>{post.title}</Text>
                <View style={styles.blogMeta}>
                  <Text style={styles.blogAuthor}>{post.author}</Text>
                  <Text style={styles.blogDot}>•</Text>
                  <Text style={styles.blogReadTime}>{post.readTime}</Text>
                </View>
                <View style={styles.tagsRow}>
                  {post.tags.slice(0, 2).map(tag => (
                    <View key={tag} style={styles.tagChip}><Text style={styles.tagChipText}>#{tag}</Text></View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ===== VIDEOS SECTION ===== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="play-circle-outline" size={18} color="#000" />
            <Text style={styles.sectionTitle}>Watch & Learn</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/videos')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
          {videos.slice(0, 4).map(video => (
            <TouchableOpacity key={video.id} style={styles.videoCard} onPress={() => router.push({ pathname: '/videos/[id]', params: { id: video.id } })}>
              <View style={styles.videoThumbWrap}>
                <Image source={{ uri: video.thumbnail }} style={styles.videoThumb} resizeMode="cover" />
                <View style={styles.videoPlayOverlay}>
                  <View style={styles.videoPlayBtn}>
                    <Ionicons name="play" size={20} color="#fff" />
                  </View>
                  <View style={styles.videoDuration}>
                    <Text style={styles.videoDurationText}>{video.duration}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoCat}>{video.category}</Text>
                <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
                <View style={styles.videoMeta}>
                  <Text style={styles.videoChannel}>{video.channel}</Text>
                  <Text style={styles.videoDot}>•</Text>
                  <Ionicons name="eye-outline" size={11} color="#aaa" />
                  <Text style={styles.videoViews}>{(video.views / 1000).toFixed(0)}K</Text>
                </View>
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

  heroBanner: { width: '100%', height: 280 },
  heroGradient: { flex: 1, justifyContent: 'space-between', paddingBottom: 24 },
  profileRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 0 },
  profileLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 42, height: 42, borderRadius: 21, borderWidth: 2, borderColor: 'rgba(255,255,255,0.35)' },
  greeting: { fontSize: 12, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.7)', marginBottom: 1 },
  username: { fontSize: 15, fontFamily: 'Inter_700Bold', color: '#fff' },
  headerBtn: { position: 'relative', width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  notifDot: { position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: 4, backgroundColor: '#FF3B30', borderWidth: 1.5, borderColor: 'transparent' },
  heroInner: { paddingHorizontal: 20 },
  heroSubtitle: { fontSize: 13, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.75)', lineHeight: 20, marginBottom: 16 },
  aiSearchRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  aiInputWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
  aiInput: { flex: 1, paddingVertical: 12, fontSize: 13, fontFamily: 'Inter_400Regular', color: '#fff' },
  aiSearchBtn: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 18, paddingVertical: 13 },
  aiSearchBtnText: { fontSize: 13, fontFamily: 'Inter_700Bold', color: '#111' },
  offerCard: { width: 200, borderRadius: 16, padding: 16 },
  offerDiscount: { fontSize: 13, fontFamily: 'Inter_500Medium', color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  offerPct: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#fff' },
  offerType: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#fff', marginBottom: 6 },
  offerDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.7)', lineHeight: 17 },
  section: { marginTop: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 14 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter_700Bold', color: '#000' },
  seeAll: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#888' },

  locationCard: { width: 140, height: 100, borderRadius: 16, overflow: 'hidden' },
  locationImage: { width: '100%', height: '100%' },
  locationOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.38)', justifyContent: 'flex-end', padding: 10 },
  locationPinRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  locationName: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#fff' },
  locationCount: { fontSize: 11, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.8)', marginTop: 1 },

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
  quickLinksGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12 },
  quickCard: { flex: 1, minWidth: '45%', borderRadius: 16, padding: 16, gap: 6 },
  quickLabel: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#fff', marginTop: 4 },
  quickSub: { fontSize: 11, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.7)' },

  blogCard: { width: 200, borderRadius: 16, overflow: 'hidden', backgroundColor: '#f8f8f8' },
  blogImage: { width: '100%', height: 120 },
  blogOverlay: { position: 'absolute', top: 8, left: 8 },
  blogCatBadge: { backgroundColor: '#000', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  blogCatText: { fontSize: 9, fontFamily: 'Inter_600SemiBold', color: '#fff', textTransform: 'uppercase', letterSpacing: 0.5 },
  blogInfo: { padding: 10 },
  blogTitle: { fontSize: 13, fontFamily: 'Inter_700Bold', color: '#000', lineHeight: 18, marginBottom: 6 },
  blogMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  blogAuthor: { fontSize: 11, fontFamily: 'Inter_500Medium', color: '#888' },
  blogDot: { color: '#ccc', fontSize: 10 },
  blogReadTime: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#aaa' },
  tagsRow: { flexDirection: 'row', gap: 4 },
  tagChip: { backgroundColor: '#f0f0f0', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  tagChipText: { fontSize: 10, fontFamily: 'Inter_500Medium', color: '#555' },

  videoCard: { width: 200, borderRadius: 16, overflow: 'hidden', backgroundColor: '#f8f8f8' },
  videoThumbWrap: { position: 'relative', width: '100%', height: 120 },
  videoThumb: { width: '100%', height: '100%' },
  videoPlayOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  videoPlayBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', paddingLeft: 3 },
  videoDuration: { position: 'absolute', bottom: 7, right: 8, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 5, paddingHorizontal: 7, paddingVertical: 2 },
  videoDurationText: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  videoInfo: { padding: 10 },
  videoCat: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 },
  videoTitle: { fontSize: 13, fontFamily: 'Inter_700Bold', color: '#000', lineHeight: 18, marginBottom: 5 },
  videoMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  videoChannel: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888', flex: 1 },
  videoDot: { color: '#ccc', fontSize: 10 },
  videoViews: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#aaa' },

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
