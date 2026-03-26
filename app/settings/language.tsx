import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

const languages = [
  { id: 'en-us', name: 'English (US)', suggested: true },
  { id: 'en-uk', name: 'English (UK)', suggested: true },
  { id: 'mandarin', name: 'Mandarin' },
  { id: 'hindi', name: 'Hindi' },
  { id: 'spanish', name: 'Spanish' },
  { id: 'french', name: 'French' },
  { id: 'arabic', name: 'Arabic' },
  { id: 'bengali', name: 'Bengali' },
  { id: 'russian', name: 'Russian' },
  { id: 'indonesian', name: 'Indonesian' },
  { id: 'urdu', name: 'Urdu' },
];

export default function LanguageScreen() {
  const [selected, setSelected] = useState('en-us');
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const suggested = languages.filter(l => l.suggested);
  const others = languages.filter(l => !l.suggested);

  return (
    <ScrollView style={[styles.container, { paddingTop: topPad + 10 }]} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Language</Text>
        <View style={{ width: 22 }} />
      </View>
      <Text style={styles.sectionLabel}>Suggested</Text>
      {suggested.map(l => (
        <TouchableOpacity key={l.id} style={styles.langItem} onPress={() => setSelected(l.id)}>
          <Text style={styles.langName}>{l.name}</Text>
          {selected === l.id && <Ionicons name="checkmark-circle" size={22} color="#000" />}
        </TouchableOpacity>
      ))}
      <Text style={[styles.sectionLabel, { marginTop: 16 }]}>Language</Text>
      {others.map(l => (
        <TouchableOpacity key={l.id} style={styles.langItem} onPress={() => setSelected(l.id)}>
          <Text style={styles.langName}>{l.name}</Text>
          {selected === l.id && <Ionicons name="checkmark-circle" size={22} color="#000" />}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 16 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  sectionLabel: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#888', paddingHorizontal: 20, marginBottom: 8 },
  langItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  langName: { fontSize: 15, fontFamily: 'Inter_400Regular', color: '#000' },
});
