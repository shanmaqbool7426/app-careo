import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const addresses = [
  { id: '1', label: 'Home', address: '25A Faisal Town, Block C, Lahore, Pakistan' },
  { id: '2', label: 'Office', address: 'Blue Area, Plot 12, Islamabad, Pakistan' },
  { id: '3', label: "Parent's House", address: 'DHA Phase 5, Karachi, Pakistan' },
  { id: '4', label: 'Town Square', address: 'Gulberg III, Main Boulevard, Lahore' },
];

export default function AddressScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.container, { paddingTop: topPad + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Address</Text>
        <View style={{ width: 22 }} />
      </View>
      <FlatList
        data={addresses}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 20, gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.addressCard}>
            <View style={styles.addrIcon}><Ionicons name="location" size={20} color="#000" /></View>
            <View style={styles.addrContent}>
              <Text style={styles.addrLabel}>{item.label}</Text>
              <Text style={styles.addrText}>{item.address}</Text>
            </View>
            <TouchableOpacity><Ionicons name="pencil" size={18} color="#888" /></TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add-circle" size={20} color="#000" />
            <Text style={styles.addBtnText}>Add New Address</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 8 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  addressCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: '#f8f8f8', borderRadius: 14, padding: 14 },
  addrIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  addrContent: { flex: 1 },
  addrLabel: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 4 },
  addrText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888', lineHeight: 17 },
  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 14, paddingVertical: 14, marginTop: 8 },
  addBtnText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#000' },
});
