import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { orders } from '../../lib/data';

const statusColor: Record<string, string> = { delivered: '#34C759', shipped: '#007AFF', processing: '#FF9500', pending: '#888', cancelled: '#FF3B30' };
const statusLabel: Record<string, string> = { delivered: 'Delivered', shipped: 'Shipped', processing: 'Processing', pending: 'Pending', cancelled: 'Cancelled' };

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.container, { paddingTop: topPad + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>My Orders</Text>
        <View style={{ width: 22 }} />
      </View>
      <FlatList
        data={orders}
        keyExtractor={o => o.id}
        contentContainerStyle={{ padding: 20, gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.orderCard} onPress={() => router.push({ pathname: '/orders/track', params: { id: item.id } })}>
            <Image source={{ uri: item.carImage }} style={styles.carImage} resizeMode="cover" />
            <View style={styles.orderInfo}>
              <Text style={styles.carName}>{item.carName}</Text>
              <Text style={styles.orderDate}>{item.date}</Text>
              <Text style={styles.orderPrice}>${item.price.toLocaleString()}</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusColor[item.status] + '20' }]}>
                <Text style={[styles.statusText, { color: statusColor[item.status] }]}>{statusLabel[item.status]}</Text>
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 8 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  orderCard: { flexDirection: 'row', gap: 14, backgroundColor: '#f8f8f8', borderRadius: 16, padding: 12 },
  carImage: { width: 90, height: 70, borderRadius: 12 },
  orderInfo: { flex: 1 },
  carName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 4 },
  orderDate: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888', marginBottom: 4 },
  orderPrice: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 6 },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
});
