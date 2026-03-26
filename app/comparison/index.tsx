import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, FlatList, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cars } from '../../lib/data';

const MAX_COMPARE = 3;

const SPEC_KEYS: { label: string; key: string; sub?: string }[] = [
  { label: 'Price', key: 'price', sub: 'direct' },
  { label: 'Year', key: 'year', sub: 'direct' },
  { label: 'Engine', key: 'engine', sub: 'specs' },
  { label: 'Power', key: 'power', sub: 'specs' },
  { label: 'Torque', key: 'torque', sub: 'specs' },
  { label: 'Transmission', key: 'transmission', sub: 'specs' },
  { label: '0–60 mph', key: 'acceleration', sub: 'specs' },
  { label: 'Top Speed', key: 'topSpeed', sub: 'specs' },
  { label: 'Fuel Type', key: 'fuelType', sub: 'specs' },
  { label: 'Seats', key: 'seats', sub: 'specs' },
  { label: 'Rating', key: 'rating', sub: 'direct' },
  { label: 'Location', key: 'location', sub: 'direct' },
];

export default function ComparisonScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const [selected, setSelected] = useState<typeof cars>([]);
  const [showPicker, setShowPicker] = useState(false);

  const addCar = (car: typeof cars[0]) => {
    if (selected.find(c => c.id === car.id)) return;
    if (selected.length >= MAX_COMPARE) return;
    setSelected(prev => [...prev, car]);
    setShowPicker(false);
  };

  const removeCar = (id: string) => setSelected(prev => prev.filter(c => c.id !== id));

  const getVal = (car: typeof cars[0], key: string, sub?: string): string => {
    if (sub === 'specs') return String((car.specs as any)[key] ?? '—');
    if (key === 'price') return `$${car.price.toLocaleString()}`;
    return String((car as any)[key] ?? '—');
  };

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Compare Cars</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          {/* Car selector row */}
          <View style={styles.carRow}>
            <View style={styles.labelCol} />
            {selected.map(car => (
              <View key={car.id} style={styles.carCol}>
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeCar(car.id)}>
                  <Ionicons name="close-circle" size={22} color="#FF3B30" />
                </TouchableOpacity>
                <Image source={{ uri: car.image }} style={styles.carImg} resizeMode="cover" />
                <Text style={styles.carName} numberOfLines={2}>{car.name}</Text>
                <Text style={styles.carPrice}>${car.price.toLocaleString()}</Text>
              </View>
            ))}
            {selected.length < MAX_COMPARE && (
              <TouchableOpacity style={styles.addCarBtn} onPress={() => setShowPicker(true)}>
                <Ionicons name="add-circle" size={36} color="#ddd" />
                <Text style={styles.addCarText}>Add Car</Text>
              </TouchableOpacity>
            )}
          </View>

          {selected.length > 0 && (
            <View>
              {SPEC_KEYS.map((spec, i) => (
                <View key={spec.key} style={[styles.specRow, i % 2 === 0 && styles.specRowAlt]}>
                  <View style={styles.labelCol}><Text style={styles.specLabel}>{spec.label}</Text></View>
                  {selected.map(car => (
                    <View key={car.id} style={styles.specVal}>
                      <Text style={styles.specValText}>{getVal(car, spec.key, spec.sub)}</Text>
                    </View>
                  ))}
                  {selected.length < MAX_COMPARE && <View style={styles.specVal} />}
                </View>
              ))}
            </View>
          )}

          {selected.length === 0 && (
            <View style={styles.empty}>
              <Ionicons name="car-sport" size={64} color="#e0e0e0" />
              <Text style={styles.emptyTitle}>Select Cars to Compare</Text>
              <Text style={styles.emptySub}>Add up to 3 cars to see them side-by-side</Text>
              <TouchableOpacity style={styles.emptyBtn} onPress={() => setShowPicker(true)}>
                <Ionicons name="add" size={18} color="#fff" />
                <Text style={styles.emptyBtnText}>Add Car</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </ScrollView>

      {/* Car Picker Modal */}
      <Modal visible={showPicker} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select a Car</Text>
            <TouchableOpacity onPress={() => setShowPicker(false)}><Ionicons name="close" size={24} color="#000" /></TouchableOpacity>
          </View>
          <FlatList
            data={cars.filter(c => !selected.find(s => s.id === c.id))}
            keyExtractor={c => c.id}
            contentContainerStyle={{ padding: 16, gap: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.pickerItem} onPress={() => addCar(item)}>
                <Image source={{ uri: item.image }} style={styles.pickerImg} resizeMode="cover" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.pickerName}>{item.name}</Text>
                  <Text style={styles.pickerMeta}>{item.year}  •  {item.condition}  •  {item.city}</Text>
                  <Text style={styles.pickerPrice}>${item.price.toLocaleString()}</Text>
                </View>
                <Ionicons name="add-circle-outline" size={24} color="#000" />
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  carRow: { flexDirection: 'row', padding: 16, borderBottomWidth: 2, borderBottomColor: '#f0f0f0' },
  labelCol: { width: 110 },
  carCol: { width: 140, alignItems: 'center', paddingHorizontal: 4, position: 'relative' },
  removeBtn: { position: 'absolute', top: -4, right: 0, zIndex: 10 },
  carImg: { width: 120, height: 80, borderRadius: 10, marginBottom: 8 },
  carName: { fontSize: 12, fontFamily: 'Inter_600SemiBold', color: '#000', textAlign: 'center', marginBottom: 4 },
  carPrice: { fontSize: 13, fontFamily: 'Inter_700Bold', color: '#000' },
  addCarBtn: { width: 130, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#e8e8e8', borderStyle: 'dashed', borderRadius: 12, paddingVertical: 20 },
  addCarText: { fontSize: 12, fontFamily: 'Inter_500Medium', color: '#aaa', marginTop: 6 },
  specRow: { flexDirection: 'row', paddingVertical: 14, paddingHorizontal: 16, alignItems: 'center' },
  specRowAlt: { backgroundColor: '#fafafa' },
  specLabel: { fontSize: 12, fontFamily: 'Inter_500Medium', color: '#555', width: 110 },
  specVal: { width: 140, alignItems: 'center' },
  specValText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#000', textAlign: 'center' },
  empty: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 32 },
  emptyTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000', marginTop: 16, marginBottom: 8 },
  emptySub: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888', textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  emptyBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#000', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 24 },
  emptyBtnText: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  modalContainer: { flex: 1, backgroundColor: '#fff' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  modalTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  pickerItem: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#f8f8f8', borderRadius: 14, padding: 12 },
  pickerImg: { width: 80, height: 60, borderRadius: 10 },
  pickerName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 3 },
  pickerMeta: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888', marginBottom: 4 },
  pickerPrice: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000' },
});
