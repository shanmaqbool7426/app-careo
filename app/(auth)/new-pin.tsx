import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NewPinScreen() {
  const [pin, setPin] = useState('');
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const handleKey = (key: string) => {
    if (key === 'del') { setPin(p => p.slice(0, -1)); return; }
    if (pin.length < 6) setPin(p => p + key);
    if (pin.length === 5) setTimeout(() => router.push('/(auth)/fill-profile'), 300);
  };

  const keys = ['1','2','3','4','5','6','7','8','9','*','0','del'];

  return (
    <View style={[styles.container, { paddingTop: topPad + 10, paddingBottom: botPad + 20 }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Create New PIN</Text>
      <Text style={styles.subtitle}>Add a PIN number to make your account more secure.</Text>
      <View style={styles.dots}>
        {[0,1,2,3,4,5].map(i => (
          <View key={i} style={[styles.dot, i < pin.length && styles.dotFilled]} />
        ))}
      </View>
      <View style={styles.keypad}>
        {keys.map(k => (
          <TouchableOpacity key={k} style={styles.key} onPress={() => handleKey(k)}>
            {k === 'del' ? <Ionicons name="backspace-outline" size={24} color="#000" /> : <Text style={styles.keyText}>{k}</Text>}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => router.push('/(auth)/fill-profile')}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24 },
  back: { marginBottom: 24 },
  title: { fontSize: 26, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 12 },
  subtitle: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#666', marginBottom: 40 },
  dots: { flexDirection: 'row', gap: 16, justifyContent: 'center', marginBottom: 40 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#000', backgroundColor: 'transparent' },
  dotFilled: { backgroundColor: '#000' },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 32 },
  key: { width: '30%', aspectRatio: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', borderRadius: 12 },
  keyText: { fontSize: 22, fontFamily: 'Inter_500Medium', color: '#000' },
  btn: { backgroundColor: '#000', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  btnText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#fff' },
});
