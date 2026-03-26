import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dealers, cars } from '../../lib/data';

export default function DealerProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const dealer = dealers.find(d => d.id === id) || dealers[0];
  const inventory = cars.filter(c => dealer.inventoryIds.includes(c.id));

  return (
    <ScrollView style={[styles.container, { paddingTop: topPad }]} contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Dealer Profile</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Dealer Hero */}
      <View style={styles.heroCard}>
        <View style={styles.logoWrap}>
          <Image source={{ uri: dealer.logo }} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.heroInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.dealerName}>{dealer.name}</Text>
            {dealer.verified && <View style={styles.verBadge}><Ionicons name="checkmark-circle" size={13} color="#007AFF" /><Text style={styles.verText}>Verified</Text></View>}
          </View>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={13} color="#888" />
            <Text style={styles.locationText}>{dealer.address}</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.statVal}>{dealer.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Ionicons name="chatbubble-outline" size={20} color="#007AFF" />
          <Text style={styles.statVal}>{dealer.totalReviews}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Ionicons name="car-outline" size={20} color="#34C759" />
          <Text style={styles.statVal}>{dealer.totalListings}</Text>
          <Text style={styles.statLabel}>Listings</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Ionicons name="calendar-outline" size={20} color="#FF9500" />
          <Text style={styles.statVal}>{dealer.since}</Text>
          <Text style={styles.statLabel}>Since</Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.about}>{dealer.description}</Text>
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactBtn}>
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.contactBtnText}>Call Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contactBtn, styles.contactBtnOutline]}>
            <Ionicons name="chatbubble-ellipses" size={20} color="#000" />
            <Text style={styles.contactBtnOutlineText}>Message</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactInfo}>
          <View style={styles.contactInfoRow}>
            <Ionicons name="call-outline" size={16} color="#888" />
            <Text style={styles.contactInfoText}>{dealer.phone}</Text>
          </View>
          <View style={styles.contactInfoRow}>
            <Ionicons name="mail-outline" size={16} color="#888" />
            <Text style={styles.contactInfoText}>{dealer.email}</Text>
          </View>
          <View style={styles.contactInfoRow}>
            <Ionicons name="location-outline" size={16} color="#888" />
            <Text style={styles.contactInfoText}>{dealer.address}</Text>
          </View>
        </View>
      </View>

      {/* Inventory */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inventory ({inventory.length} cars)</Text>
        {inventory.map(car => (
          <TouchableOpacity key={car.id} style={styles.invRow} onPress={() => router.push({ pathname: '/car/[id]', params: { id: car.id } })}>
            <Image source={{ uri: car.image }} style={styles.invImg} resizeMode="cover" />
            <View style={styles.invInfo}>
              <Text style={styles.invName}>{car.name}</Text>
              <Text style={styles.invMeta}>{car.year}  •  {car.condition}  •  {car.color}</Text>
              <Text style={styles.invPrice}>${car.price.toLocaleString()}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  heroCard: { flexDirection: 'row', alignItems: 'center', gap: 14, marginHorizontal: 20, marginBottom: 16, backgroundColor: '#f8f8f8', borderRadius: 16, padding: 14 },
  logoWrap: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  logo: { width: 48, height: 48 },
  heroInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' },
  dealerName: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#000' },
  verBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: '#EAF4FF', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  verText: { fontSize: 11, fontFamily: 'Inter_500Medium', color: '#007AFF' },
  locationRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 4 },
  locationText: { flex: 1, fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888', lineHeight: 17 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, backgroundColor: '#f8f8f8', borderRadius: 16, padding: 14, marginBottom: 16 },
  statBox: { flex: 1, alignItems: 'center', gap: 4 },
  statDivider: { width: 1, height: 40, backgroundColor: '#e0e0e0' },
  statVal: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#000' },
  statLabel: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888' },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 10 },
  about: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#555', lineHeight: 22 },
  contactRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  contactBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#000', borderRadius: 12, paddingVertical: 12 },
  contactBtnText: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  contactBtnOutline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#e0e0e0' },
  contactBtnOutlineText: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000' },
  contactInfo: { gap: 10 },
  contactInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  contactInfoText: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#555' },
  invRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  invImg: { width: 80, height: 60, borderRadius: 10 },
  invInfo: { flex: 1 },
  invName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 3 },
  invMeta: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888', marginBottom: 4 },
  invPrice: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000' },
});
