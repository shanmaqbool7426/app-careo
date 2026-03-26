import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PrivacyScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView style={[styles.container, { paddingTop: topPad + 10 }]} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
        <View style={{ width: 22 }} />
      </View>
      <View style={styles.content}>
        {[
          { title: '1. Types of Data We Collect', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut egestas, risus a commodo dictum, est arcu condimentum ipsum, vitae molestie risus dui id turpis. Nam ac mollis risus. Sed at ex porta, facilisis risus vel, viverra dui. Aliquam a velit vel neque tristique pulvinar a vitae sapien. Nunc blandit dui ligula.' },
          { title: '2. Use of Your Personal Data', body: 'Aliquam erat volutpat. Integer cursus libero in odio commodo, a consequat lectus finibus. Mauris laoreet nisi at libero malesuada, vel gravida lorem semper. Quisque condimentum ipsum eget turpis molestie.' },
          { title: '3. Disclosure of Your Personal Data', body: 'Donec gravida libero a fringilla bibendum. Fusce ut nibh gravida, vestibulum nisi ut, dictum turpis. Integer non sapien finibus, gravida lectus a, facilisis augue.' },
        ].map(s => (
          <View key={s.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{s.title}</Text>
            <Text style={styles.sectionBody}>{s.body}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 16 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  content: { paddingHorizontal: 20, gap: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 15, fontFamily: 'Inter_700Bold', color: '#000' },
  sectionBody: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#666', lineHeight: 21 },
});
