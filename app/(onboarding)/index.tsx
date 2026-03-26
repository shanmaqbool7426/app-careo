import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(onboarding)/welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Ionicons name="car-sport" size={64} color="#000" />
      </View>
      <Text style={styles.appName}>Carea</Text>
      <ActivityIndicator style={styles.loader} color="#000" size="small" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  logo: { width: 100, height: 100, borderRadius: 24, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  appName: { fontSize: 32, fontFamily: 'Inter_700Bold', color: '#000', letterSpacing: -0.5 },
  loader: { position: 'absolute', bottom: 60 },
});
