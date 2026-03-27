import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cars, blogPosts, videos, nearbyLocations } from '../../lib/data';

const FIGMA_BRANDS = [
  { id: '1', name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/120px-Mercedes-Logo.svg.png' },
  { id: '2', name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/120px-Tesla_T_symbol.svg.png' },
  { id: '3', name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/120px-BMW.svg.png' },
  { id: '4', name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/120px-Toyota_carlogo.svg.png' },
  { id: '5', name: 'Volvo', logo: null },
  { id: '6', name: 'Bugatti', logo: null },
  { id: '7', name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/120px-Honda_Logo.svg.png' },
  { id: '8', name: 'More', logo: null, isMore: true },
];

const TOP_FILTERS = ['All', 'Mercedes', 'Tesla', 'BMW', 'Toyota'];

const budgetCategories = [
  { id: '1', label: 'Under $15K', max: 15000, icon: 'car-outline' as const, color: '#F0FAF1', iconColor: '#34C759' },
  { id: '2', label: '$15K–$30K', max: 30000, icon: 'car' as const, color: '#EFF6FF', iconColor: '#3B82F6' },
  { id: '3', label: '$30K–$60K', max: 60000, icon: 'speedometer' as const, color: '#FFF7ED', iconColor: '#F97316' },
  { id: '4', label: '$60K+', max: 9999999, icon: 'diamond' as const, color: '#FDF2F8', iconColor: '#EC4899' },
];

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 0 : insets.top;
  const newCars = cars.filter(c => c.condition === 'new');
  const usedCars = cars.filter(c => c.condition === 'used');
  const filteredDeals = activeFilter === 'All' ? cars.slice(0, 8) : cars.filter(c => c.brand === activeFilter);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ===== HEADER ===== */}
      <View style={[styles.header, { paddingTop: topPad + 16 }]}>
        <TouchableOpacity style={styles.profileLeft} onPress={() => router.push('/(tabs)/profile')}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Good Morning 👋</Text>
            <Text style={styles.username}>Andrew Ainsley</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/notifications')}>
            <Ionicons name="notifications-outline" size={20} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(tabs)/favorites')}>
            <Ionicons name="heart-outline" size={20} color="#222" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== SEARCH BAR ===== */}
      <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/(tabs)/search')}>
        <Ionicons name="search" size={18} color="#bbb" />
        <Text style={styles.searchPlaceholder}>Search</Text>
        <View style={styles.filterIconWrap}>
          <Ionicons name="options-outline" size={16} color="#222" />
        </View>
      </TouchableOpacity>

      {/* ===== SPECIAL OFFERS ===== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <TouchableOpacity onPress={() => router.push('/offers')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.offerCard}>
          <View style={styles.offerTextBlock}>
            <Text style={styles.offerPct}>20%</Text>
            <Text style={styles.offerTitle}>Week Deals!</Text>
            <Text style={styles.offerSub}>Get a new car discount,{'\n'}only valid this week</Text>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&auto=format&fit=crop' }}
            style={styles.offerCarImg}
            resizeMode="cover"
          />
        </View>

        <View style={styles.dotsRow}>
          {[0, 1, 2, 3].map(i => (
            <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
          ))}
        </View>
      </View>

      {/* ===== BRANDS GRID ===== */}
      <View style={styles.section}>
        <View style={styles.brandsGrid}>
          {FIGMA_BRANDS.map(brand => (
            <TouchableOpacity
              key={brand.id}
              style={styles.brandItem}
              onPress={() => !brand.isMore && router.push({ pathname: '/new-cars', params: { brand: brand.name } })}
            >
              <View style={styles.brandCircle}>
                {brand.isMore ? (
                  <Ionicons name="ellipsis-horizontal" size={22} color="#888" />
                ) : brand.logo ? (
                  <Image source={{ uri: brand.logo }} style={styles.brandImg} resizeMode="contain" />
                ) : (
                  <Text style={styles.brandInitial}>{brand.name[0]}</Text>
                )}
              </View>
              <Text style={styles.brandName}>{brand.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ===== TOP DEALS ===== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Deals</Text>
          <TouchableOpacity onPress={() => router.push('/top-deals')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8, marginBottom: 16 }}>
          {TOP_FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.chip, activeFilter === f && styles.chipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
          {filteredDeals.map(car => (
            <TouchableOpacity key={car.id} style={styles.carCard} onPress={() => router.push({ pathname: '/car/[id]', params: { id: car.id } })}>
              <View style={{ position: 'relative' }}>
                <Image source={{ uri: car.image }} style={styles.carImg} resizeMode="cover" />
                <TouchableOpacity style={styles.heartBtn}>
                  <Ionicons name="heart-outline" size={15} color="#888" />
                </TouchableOpacity>
              </View>
              <View style={styles.carInfo}>
                <Text style={styles.carName} numberOfLines={1}>{car.name}</Text>
                <View style={styles.carMeta}>
                  <Ionicons name="location-outline" size={11} color="#bbb" />
                  <Text style={styles.carCity}>{car.city}</Text>
                </View>
                <Text style={styles.carPrice}>${car.price.toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ===== NEW CARS ===== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Cars</Text>
          <TouchableOpacity onPress={() => router.push('/new-cars')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
          {newCars.slice(0, 6).map(car => (
            <TouchableOpacity key={car.id} style={styles.carCard} onPress={() => router.push({ pathname: '/car/[id]', params: { id: car.id } })}>
              <View style={{ position: 'relative' }}>
                <Image source={{ uri: car.image }} style={styles.carImg} resizeMode="cover" />
                <View style={styles.newBadge}><Text style={styles.newBadgeText}>New</Text></View>
                <TouchableOpacity style={styles.heartBtn}>
                  <Ionicons name="heart-outline" size={15} color="#888" />
                </TouchableOpacity>
              </View>
              <View style={styles.carInfo}>
                <Text style={styles.carName} numberOfLines={1}>{car.name}</Text>
                <View style={styles.carMeta}>
                  <Ionicons name="location-outline" size={11} color="#bbb" />
                  <Text style={styles.carCity}>{car.city}</Text>
                </View>
                <Text style={styles.carPrice}>${car.price.toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ===== NEAR YOU ===== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Near You</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
          {nearbyLocations.map(loc => (
            <TouchableOpacity key={loc.id} style={styles.locationCard}
              onPress={() => router.push({ pathname: '/(tabs)/search', params: { city: loc.name } })}>
              <Image source={{ uri: loc.image }} style={styles.locationImg} resizeMode="cover" />
              <View style={styles.locationOverlay}>
                <View style={styles.locationPinRow}>
                  <Ionicons name="location" size={11} color="#fff" />
                  <Text style={styles.locationName}>{loc.name}</Text>
                </View>
                <Text style={styles.locationCount}>{loc.count} cars</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ===== BUDGET CATEGORIES ===== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Budget Categories</Text>
        </View>
        <View style={styles.budgetGrid}>
          {budgetCategories.map(b => (
            <TouchableOpacity key={b.id} style={[styles.budgetCard, { backgroundColor: b.color }]}
              onPress={() => router.push({ pathname: '/used-cars', params: { maxPrice: b.max } })}>
              <View style={[styles.budgetIcon, { backgroundColor: b.iconColor + '22' }]}>
                <Ionicons name={b.icon} size={20} color={b.iconColor} />
              </View>
              <Text style={styles.budgetLabel}>{b.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ===== USED CARS ===== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Used Cars</Text>
          <TouchableOpacity onPress={() => router.push('/used-cars')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
          {usedCars.map(car => (
            <TouchableOpacity key={car.id} style={styles.carCard} onPress={() => router.push({ pathname: '/car/[id]', params: { id: car.id } })}>
              <View style={{ position: 'relative' }}>
                <Image source={{ uri: car.image }} style={styles.carImg} resizeMode="cover" />
                <View style={[styles.newBadge, { backgroundColor: '#888' }]}><Text style={styles.newBadgeText}>Used</Text></View>
              </View>
              <View style={styles.carInfo}>
                <Text style={styles.carName} numberOfLines={1}>{car.name}</Text>
                <View style={styles.carMeta}>
                  <Ionicons name="location-outline" size={11} color="#bbb" />
                  <Text style={styles.carCity}>{car.city}</Text>
                  {car.mileage ? <Text style={styles.carMileage}> · {car.mileage.toLocaleString()} km</Text> : null}
                </View>
                <Text style={styles.carPrice}>${car.price.toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ===== EXPLORE ===== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore</Text>
        </View>
        <View style={styles.exploreGrid}>
          {[
            { label: 'Compare Cars', sub: 'Side-by-side specs', icon: 'git-compare', color: '#1a1a2e', route: '/comparison' },
            { label: 'Car Reviews', sub: 'Owner experiences', icon: 'star', color: '#16213e', route: '/reviews' },
            { label: 'Dealers', sub: 'Verified showrooms', icon: 'business', color: '#0f3460', route: '/dealers' },
            { label: 'Top Deals', sub: 'Best offers today', icon: 'pricetag', color: '#1a1a1a', route: '/top-deals' },
          ].map(item => (
            <TouchableOpacity key={item.label} style={[styles.exploreCard, { backgroundColor: item.color }]} onPress={() => router.push(item.route as any)}>
              <Ionicons name={item.icon as any} size={24} color="#fff" />
              <Text style={styles.exploreLabel}>{item.label}</Text>
              <Text style={styles.exploreSub}>{item.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ===== LATEST ARTICLES ===== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Articles</Text>
          <TouchableOpacity onPress={() => router.push('/blog')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
          {blogPosts.slice(0, 4).map(post => (
            <TouchableOpacity key={post.id} style={styles.blogCard} onPress={() => router.push({ pathname: '/blog/[id]', params: { id: post.id } })}>
              <Image source={{ uri: post.image }} style={styles.blogImg} resizeMode="cover" />
              <View style={styles.blogOverlay}>
                <View style={styles.blogBadge}><Text style={styles.blogBadgeText}>{post.category}</Text></View>
              </View>
              <View style={styles.blogInfo}>
                <Text style={styles.blogTitle} numberOfLines={2}>{post.title}</Text>
                <View style={styles.blogMeta}>
                  <Text style={styles.blogAuthor}>{post.author}</Text>
                  <Text style={styles.blogDot}>·</Text>
                  <Text style={styles.blogTime}>{post.readTime}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ===== WATCH & LEARN ===== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Watch & Learn</Text>
          <TouchableOpacity onPress={() => router.push('/videos')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
          {videos.slice(0, 4).map(video => (
            <TouchableOpacity key={video.id} style={styles.videoCard} onPress={() => router.push({ pathname: '/videos/[id]', params: { id: video.id } })}>
              <View style={{ position: 'relative' }}>
                <Image source={{ uri: video.thumbnail }} style={styles.videoThumb} resizeMode="cover" />
                <View style={styles.videoOverlay}>
                  <View style={styles.videoPlay}><Ionicons name="play" size={18} color="#fff" /></View>
                  <View style={styles.videoDurBadge}><Text style={styles.videoDurText}>{video.duration}</Text></View>
                </View>
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoCat}>{video.category}</Text>
                <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
                <Text style={styles.videoChannel}>{video.channel}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ===== RECENT ADS ===== */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Ads</Text>
          <TouchableOpacity onPress={() => router.push('/used-cars')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {[...usedCars, ...newCars.slice(0, 2)].slice(0, 5).map(car => (
          <TouchableOpacity key={car.id} style={styles.adRow} onPress={() => router.push({ pathname: '/car/[id]', params: { id: car.id } })}>
            <Image source={{ uri: car.image }} style={styles.adImg} resizeMode="cover" />
            <View style={styles.adInfo}>
              <Text style={styles.adName} numberOfLines={1}>{car.name}</Text>
              <View style={styles.adMeta}>
                <Text style={styles.adYear}>{car.year}</Text>
                {car.mileage ? <Text style={styles.adMileage}> · {car.mileage.toLocaleString()} km</Text> : null}
                <Text style={styles.adCity}> · {car.city}</Text>
              </View>
              <Text style={styles.adPrice}>${car.price.toLocaleString()}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ddd" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 18 },
  profileLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  greeting: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#aaa', marginBottom: 2 },
  username: { fontSize: 17, fontFamily: 'Inter_700Bold', color: '#111' },
  headerIcons: { flexDirection: 'row', gap: 10 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: '#EBEBEB', alignItems: 'center', justifyContent: 'center' },

  // Search
  searchBar: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 24, backgroundColor: '#F5F5F5', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 13, gap: 10 },
  searchPlaceholder: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular', color: '#ccc' },
  filterIconWrap: { width: 34, height: 34, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },

  // Section
  section: { marginBottom: 30 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#111' },
  seeAll: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#aaa' },

  // Special Offer card
  offerCard: { marginHorizontal: 20, backgroundColor: '#F2F2F7', borderRadius: 20, paddingLeft: 20, paddingTop: 20, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },
  offerTextBlock: { flex: 1 },
  offerPct: { fontSize: 38, fontFamily: 'Inter_700Bold', color: '#111', lineHeight: 44 },
  offerTitle: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#111', marginBottom: 8 },
  offerSub: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888', lineHeight: 18 },
  offerCarImg: { width: 170, height: 115, marginRight: -4 },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 14 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ddd' },
  dotActive: { width: 22, height: 6, borderRadius: 3, backgroundColor: '#111' },

  // Brands grid 2x4
  brandsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, justifyContent: 'space-between' },
  brandItem: { width: '22%', alignItems: 'center', marginBottom: 18 },
  brandCircle: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', marginBottom: 7 },
  brandImg: { width: 38, height: 38 },
  brandInitial: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#888' },
  brandName: { fontSize: 11, fontFamily: 'Inter_500Medium', color: '#555', textAlign: 'center' },

  // Filter chips
  chip: { borderWidth: 1.5, borderColor: '#EBEBEB', borderRadius: 25, paddingHorizontal: 18, paddingVertical: 9 },
  chipActive: { backgroundColor: '#111', borderColor: '#111' },
  chipText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#777' },
  chipTextActive: { color: '#fff' },

  // Car cards
  carCard: { width: 172, borderRadius: 16, overflow: 'hidden', backgroundColor: '#F8F8F8' },
  carImg: { width: '100%', height: 118 },
  newBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: '#111', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  newBadgeText: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  heartBtn: { position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  carInfo: { padding: 11 },
  carName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#111', marginBottom: 4 },
  carMeta: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  carCity: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#bbb', marginLeft: 2 },
  carMileage: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#bbb' },
  carPrice: { fontSize: 15, fontFamily: 'Inter_700Bold', color: '#111' },

  // Near You
  locationCard: { width: 140, height: 100, borderRadius: 16, overflow: 'hidden' },
  locationImg: { width: '100%', height: '100%' },
  locationOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end', padding: 10 },
  locationPinRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  locationName: { fontSize: 13, fontFamily: 'Inter_700Bold', color: '#fff' },
  locationCount: { fontSize: 11, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.8)', marginTop: 1 },

  // Budget
  budgetGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12 },
  budgetCard: { flex: 1, minWidth: '45%', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  budgetIcon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  budgetLabel: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#222' },

  // Explore grid
  exploreGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12 },
  exploreCard: { flex: 1, minWidth: '45%', borderRadius: 16, padding: 16, gap: 4 },
  exploreLabel: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#fff', marginTop: 8 },
  exploreSub: { fontSize: 11, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.65)' },

  // Blog
  blogCard: { width: 210, borderRadius: 16, overflow: 'hidden', backgroundColor: '#F8F8F8' },
  blogImg: { width: '100%', height: 120 },
  blogOverlay: { position: 'absolute', top: 8, left: 8 },
  blogBadge: { backgroundColor: '#111', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  blogBadgeText: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  blogInfo: { padding: 12 },
  blogTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#111', lineHeight: 19, marginBottom: 8 },
  blogMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  blogAuthor: { fontSize: 11, fontFamily: 'Inter_500Medium', color: '#aaa' },
  blogDot: { fontSize: 11, color: '#ccc' },
  blogTime: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#aaa' },

  // Video
  videoCard: { width: 210, borderRadius: 16, overflow: 'hidden', backgroundColor: '#F8F8F8' },
  videoThumb: { width: '100%', height: 120 },
  videoOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
  videoPlay: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center' },
  videoDurBadge: { position: 'absolute', bottom: 6, right: 6, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  videoDurText: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  videoInfo: { padding: 12 },
  videoCat: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: '#aaa', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
  videoTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#111', lineHeight: 18, marginBottom: 6 },
  videoChannel: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#bbb' },

  // Recent Ads
  adRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', gap: 12 },
  adImg: { width: 72, height: 56, borderRadius: 10 },
  adInfo: { flex: 1 },
  adName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#111', marginBottom: 3 },
  adMeta: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  adYear: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#bbb' },
  adMileage: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#bbb' },
  adCity: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#bbb' },
  adPrice: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#111' },
});
