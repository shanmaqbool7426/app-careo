import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: topPad + 10, paddingBottom: 40 }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>Fill in your details to get started</Text>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Enter your email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput style={[styles.input, { flex: 1 }]} placeholder="Enter password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput style={styles.input} placeholder="Re-enter password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
        </View>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/(auth)/fill-profile')}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.loginRow}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.loginLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { paddingHorizontal: 24 },
  back: { marginBottom: 24 },
  title: { fontSize: 26, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 8 },
  subtitle: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#888', marginBottom: 32 },
  form: { gap: 20, marginBottom: 32 },
  field: { gap: 8 },
  label: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#000' },
  input: { backgroundColor: '#f8f8f8', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, fontFamily: 'Inter_400Regular', color: '#000' },
  passwordRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f8f8', borderRadius: 12 },
  eyeBtn: { padding: 14 },
  btn: { backgroundColor: '#000', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 24 },
  btnText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#888' },
  loginLink: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000' },
});
