import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: topPad + 10, paddingBottom: 40 }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.logoWrap}>
        <Ionicons name="car-sport" size={40} color="#000" />
      </View>
      <Text style={styles.title}>Login to Your Account</Text>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <View style={styles.passwordRow}>
          <TextInput style={[styles.input, { flex: 1, borderWidth: 0 }]} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.forgotBtn} onPress={() => router.push('/(auth)/forgot-password')}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.btnText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.orRow}><View style={styles.line} /><Text style={styles.orText}>or continue with</Text><View style={styles.line} /></View>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn}><Ionicons name="logo-google" size={22} color="#000" /></TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}><Ionicons name="finger-print" size={22} color="#000" /></TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}><Ionicons name="logo-facebook" size={22} color="#000" /></TouchableOpacity>
      </View>

      <View style={styles.signupRow}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { paddingHorizontal: 24 },
  back: { marginBottom: 12 },
  logoWrap: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 26, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 28 },
  form: { gap: 14, marginBottom: 12 },
  input: { backgroundColor: '#f8f8f8', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, fontFamily: 'Inter_400Regular', color: '#000' },
  passwordRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f8f8', borderRadius: 12 },
  eyeBtn: { padding: 14 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#000' },
  btn: { backgroundColor: '#000', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 24 },
  btnText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  orRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#e8e8e8' },
  orText: { paddingHorizontal: 12, fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888' },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 32 },
  socialBtn: { width: 56, height: 56, borderRadius: 14, borderWidth: 1.5, borderColor: '#e8e8e8', alignItems: 'center', justifyContent: 'center' },
  signupRow: { flexDirection: 'row', justifyContent: 'center' },
  signupText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#888' },
  signupLink: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000' },
});
