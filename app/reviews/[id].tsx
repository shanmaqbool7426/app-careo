import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { reviews } from '../../lib/data';

function Stars({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 3 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Ionicons key={i} name={i <= rating ? 'star' : 'star-outline'} size={16} color="#FFD700" />
      ))}
    </View>
  );
}

export default function ReviewDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const review = reviews.find(r => r.id === id) || reviews[0];

  return (
    <ScrollView style={[styles.container, { paddingTop: topPad }]} contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Review</Text>
        <View style={{ width: 22 }} />
      </View>

      <Image source={{ uri: review.carImage }} style={styles.heroImage} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.carName}>{review.carName}</Text>
        <View style={styles.ratingRow}>
          <Stars rating={review.rating} />
          <Text style={styles.ratingNum}>{review.rating}.0 / 5.0</Text>
        </View>
        <Text style={styles.reviewTitle}>{review.title}</Text>

        <View style={styles.reviewerCard}>
          <Image source={{ uri: review.reviewerAvatar }} style={styles.avatar} />
          <View>
            <Text style={styles.reviewerName}>{review.reviewerName}</Text>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
          <View style={[styles.verifiedBadge]}>
            <Ionicons name="checkmark-circle" size={14} color="#34C759" />
            <Text style={styles.verifiedText}>Verified Owner</Text>
          </View>
        </View>

        <Text style={styles.bodyText}>{review.body}</Text>

        <View style={styles.prosConsRow}>
          <View style={[styles.prosCard, { flex: 1 }]}>
            <View style={styles.prosHeader}><Ionicons name="thumbs-up" size={16} color="#34C759" /><Text style={styles.prosTitle}>Pros</Text></View>
            {review.pros.map((p, i) => (
              <View key={i} style={styles.proItem}>
                <View style={styles.bullet} />
                <Text style={styles.proText}>{p}</Text>
              </View>
            ))}
          </View>
          <View style={[styles.consCard, { flex: 1 }]}>
            <View style={styles.prosHeader}><Ionicons name="thumbs-down" size={16} color="#FF3B30" /><Text style={styles.consTitle}>Cons</Text></View>
            {review.cons.map((c, i) => (
              <View key={i} style={styles.proItem}>
                <View style={[styles.bullet, { backgroundColor: '#FF3B30' }]} />
                <Text style={styles.proText}>{c}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.carBtn} onPress={() => router.push({ pathname: '/car/[id]', params: { id: review.carId } })}>
          <Text style={styles.carBtnText}>View This Car</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  heroImage: { width: '100%', height: 240 },
  content: { padding: 20 },
  carName: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#000', marginTop: 16, marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  ratingNum: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#888' },
  reviewTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 16 },
  reviewerCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#f8f8f8', borderRadius: 14, padding: 12, marginBottom: 16 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  reviewerName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000' },
  reviewDate: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888', marginTop: 2 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 'auto' },
  verifiedText: { fontSize: 11, fontFamily: 'Inter_500Medium', color: '#34C759' },
  bodyText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#444', lineHeight: 23, marginBottom: 20 },
  prosConsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  prosCard: { backgroundColor: '#f0fff4', borderRadius: 14, padding: 14 },
  consCard: { backgroundColor: '#fff5f5', borderRadius: 14, padding: 14 },
  prosHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  prosTitle: { fontSize: 13, fontFamily: 'Inter_700Bold', color: '#34C759' },
  consTitle: { fontSize: 13, fontFamily: 'Inter_700Bold', color: '#FF3B30' },
  proItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#34C759', marginTop: 6 },
  proText: { flex: 1, fontSize: 12, fontFamily: 'Inter_400Regular', color: '#444', lineHeight: 18 },
  carBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#000', borderRadius: 14, paddingVertical: 15 },
  carBtnText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#fff' },
});
