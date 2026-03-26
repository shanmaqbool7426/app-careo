import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function SecurityScreen() {
  const [rememberMe, setRememberMe] = useState(true);
  const [faceId, setFaceId] = useState(false);
  const [biometrics, setBiometrics] = useState(true);
  const [google, setGoogle] = useState(false);
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView style={[styles.container, { paddingTop: topPad + 10 }]} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Security</Text>
        <View style={{ width: 22 }} />
      </View>
      <View style={styles.list}>
        {[
          { label: 'Remember Me', val: rememberMe, set: setRememberMe },
          { label: 'Face ID', val: faceId, set: setFaceId },
          { label: 'Biometrics ID', val: biometrics, set: setBiometrics },
          { label: 'Google Authenticator', val: google, set: setGoogle },
        ].map(({ label, val, set }) => (
          <View key={label} style={styles.item}>
            <Text style={styles.itemLabel}>{label}</Text>
            <Switch value={val} onValueChange={set} trackColor={{ false: '#e0e0e0', true: '#000' }} thumbColor="#fff" />
          </View>
        ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.pinSection}>
        <TouchableOpacity style={styles.actionRow}>
          <Ionicons name="keypad" size={20} color="#000" />
          <Text style={styles.actionText}>Change PIN</Text>
          <Ionicons name="chevron-forward" size={16} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionRow}>
          <Ionicons name="lock-closed" size={20} color="#000" />
          <Text style={styles.actionText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={16} color="#ccc" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 16 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  list: { paddingHorizontal: 20 },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  itemLabel: { fontSize: 15, fontFamily: 'Inter_400Regular', color: '#000' },
  divider: { height: 8, backgroundColor: '#f5f5f5', marginVertical: 8 },
  pinSection: { paddingHorizontal: 20 },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  actionText: { flex: 1, fontSize: 15, fontFamily: 'Inter_400Regular', color: '#000' },
});
