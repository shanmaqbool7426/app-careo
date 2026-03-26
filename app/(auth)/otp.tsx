import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OTPScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef<TextInput[]>([]);
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const handleChange = (val: string, idx: number) => {
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 3) inputs.current[idx + 1]?.focus();
  };

  return (
    <View style={[styles.container, { paddingTop: topPad + 10, paddingBottom: botPad + 20 }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Code has been send to +62 xxxx-xxxx-xxxx</Text>
      <View style={styles.otpRow}>
        {otp.map((val, i) => (
          <TextInput
            key={i}
            ref={r => { if (r) inputs.current[i] = r; }}
            style={[styles.otpInput, val ? styles.otpFilled : null]}
            value={val}
            onChangeText={v => handleChange(v.slice(-1), i)}
            maxLength={1}
            keyboardType="numeric"
          />
        ))}
      </View>
      <Text style={styles.resend}>Resend code in <Text style={styles.timer}>55</Text></Text>
      <TouchableOpacity style={styles.btn} onPress={() => router.push('/(auth)/new-pin')}>
        <Text style={styles.btnText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24 },
  back: { marginBottom: 24 },
  title: { fontSize: 26, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 12 },
  subtitle: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#666', marginBottom: 40 },
  otpRow: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  otpInput: { flex: 1, height: 60, borderRadius: 14, backgroundColor: '#f5f5f5', textAlign: 'center', fontSize: 24, fontFamily: 'Inter_700Bold', color: '#000' },
  otpFilled: { backgroundColor: '#000', color: '#fff' },
  resend: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888', textAlign: 'center', marginBottom: 32 },
  timer: { color: '#000', fontFamily: 'Inter_600SemiBold' },
  btn: { backgroundColor: '#000', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  btnText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#fff' },
});
