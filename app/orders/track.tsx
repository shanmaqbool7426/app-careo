import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const steps = [
  { id: 1, label: 'Order Placed', done: true, time: 'Dec 15, 2024 · 10:00 AM' },
  { id: 2, label: 'Processing', done: true, time: 'Dec 15, 2024 · 11:00 AM' },
  { id: 3, label: 'Shipped', done: true, time: 'Dec 16, 2024 · 09:00 AM' },
  { id: 4, label: 'Out for Delivery', done: true, time: 'Dec 17, 2024 · 08:00 AM' },
  { id: 5, label: 'Delivered', done: true, time: 'Dec 17, 2024 · 03:00 PM' },
];

export default function TrackOrderScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { paddingTop: topPad + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Track Order</Text>
        <View style={{ width: 22 }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: botPad + 20 }}>
        <View style={styles.carCard}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=200' }} style={styles.carImage} resizeMode="cover" />
          <View style={styles.carInfo}>
            <Text style={styles.carName}>BMW M5 Series</Text>
            <Text style={styles.carId}>Order #TRK-001234</Text>
            <Text style={styles.carPrice}>$171,250</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Order Status</Text>
        <View style={styles.timeline}>
          {steps.map((step, i) => (
            <View key={step.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.dot, step.done && styles.dotDone]}>{step.done && <Ionicons name="checkmark" size={12} color="#fff" />}</View>
                {i < steps.length - 1 && <View style={[styles.line, steps[i + 1].done && styles.lineDone]} />}
              </View>
              <View style={styles.timelineContent}>
                <Text style={[styles.stepLabel, step.done && styles.stepLabelDone]}>{step.label}</Text>
                <Text style={styles.stepTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 8 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  carCard: { flexDirection: 'row', gap: 14, backgroundColor: '#f8f8f8', borderRadius: 16, padding: 14, marginBottom: 24 },
  carImage: { width: 80, height: 64, borderRadius: 12 },
  carInfo: { flex: 1, justifyContent: 'center' },
  carName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 4 },
  carId: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888', marginBottom: 4 },
  carPrice: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000' },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 16 },
  timeline: { gap: 0 },
  timelineItem: { flexDirection: 'row', gap: 16 },
  timelineLeft: { alignItems: 'center', width: 24 },
  dot: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#e0e0e0' },
  dotDone: { backgroundColor: '#000', borderColor: '#000' },
  line: { width: 2, flex: 1, backgroundColor: '#e0e0e0', marginVertical: 2 },
  lineDone: { backgroundColor: '#000' },
  timelineContent: { flex: 1, paddingBottom: 24 },
  stepLabel: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#aaa', marginBottom: 4 },
  stepLabelDone: { color: '#000', fontFamily: 'Inter_600SemiBold' },
  stepTime: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
});
