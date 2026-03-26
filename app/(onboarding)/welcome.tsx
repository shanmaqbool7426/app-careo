import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Welcome to\nCarea',
    subtitle: 'Find your perfect car for your lifestyle and transportation needs',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
  },
  {
    id: 2,
    title: 'The best car in\nyour hands with\nCarea',
    subtitle: 'Browse thousands of new and used cars from top dealers across Pakistan',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    hasButton: true,
  },
  {
    id: 3,
    title: "Let's you in",
    subtitle: 'Sign in to access exclusive deals and manage your car journey',
    isAuth: true,
  },
];

export default function WelcomeScreen() {
  const [current, setCurrent] = useState(0);
  const insets = useSafeAreaInsets();
  const slide = slides[current];
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  if (slide.isAuth) {
    return (
      <View style={[styles.authContainer, { paddingTop: topPad + 20, paddingBottom: botPad + 20 }]}>
        <View style={styles.authLogo}>
          <Ionicons name="car-sport" size={48} color="#000" />
        </View>
        <Text style={styles.authTitle}>Let's you in</Text>
        <View style={styles.authButtons}>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>Continue with Apple</Text>
          </TouchableOpacity>
          <View style={styles.divider}><View style={styles.divLine} /><Text style={styles.divText}>or</Text><View style={styles.divLine} /></View>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.primaryBtnText}>Sign in with password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: topPad, paddingBottom: botPad }]}>
      {slide.image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: slide.image }} style={styles.heroImage} resizeMode="cover" />
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={styles.gradient} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
        <View style={styles.dots}>
          {slides.slice(0, 2).map((_, i) => (
            <View key={i} style={[styles.dot, current === i && styles.dotActive]} />
          ))}
        </View>
        {slide.hasButton ? (
          <TouchableOpacity style={styles.getStartedBtn} onPress={() => setCurrent(2)}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextBtn} onPress={() => setCurrent(1)}>
            <Ionicons name="arrow-forward" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: { flex: 1, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  gradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 200 },
  content: { position: 'absolute', bottom: 60, left: 24, right: 24 },
  title: { fontSize: 32, fontFamily: 'Inter_700Bold', color: '#fff', lineHeight: 40, marginBottom: 12 },
  subtitle: { fontSize: 15, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.8)', lineHeight: 22, marginBottom: 24 },
  dots: { flexDirection: 'row', gap: 8, marginBottom: 32 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { width: 24, backgroundColor: '#fff' },
  getStartedBtn: { backgroundColor: '#fff', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  getStartedText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#000' },
  nextBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
  authContainer: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24 },
  authLogo: { width: 80, height: 80, borderRadius: 20, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 32 },
  authTitle: { fontSize: 28, fontFamily: 'Inter_700Bold', color: '#000', textAlign: 'center', marginBottom: 40 },
  authButtons: { gap: 12 },
  socialBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 14, paddingVertical: 15, gap: 10 },
  socialBtnText: { fontSize: 15, fontFamily: 'Inter_500Medium', color: '#000' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  divLine: { flex: 1, height: 1, backgroundColor: '#e0e0e0' },
  divText: { paddingHorizontal: 12, color: '#888', fontSize: 14, fontFamily: 'Inter_400Regular' },
  primaryBtn: { backgroundColor: '#000', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  signupText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#888' },
  signupLink: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000' },
});
