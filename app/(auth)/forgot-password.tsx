import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { paddingTop: topPad + 10, paddingBottom: botPad + 20 }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter the email address you used when you joined and we'll send you instructions to reset your password.</Text>
      <TextInput style={styles.input} placeholder="Email address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TouchableOpacity style={styles.btn} onPress={() => router.push('/(auth)/otp')}>
        <Text style={styles.btnText}>Send Recovery Email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24 },
  back: { marginBottom: 24 },
  title: { fontSize: 26, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 12 },
  subtitle: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#666', lineHeight: 22, marginBottom: 32 },
  input: { backgroundColor: '#f8f8f8', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, fontFamily: 'Inter_400Regular', marginBottom: 24 },
  btn: { backgroundColor: '#000', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  btnText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#fff' },
});
