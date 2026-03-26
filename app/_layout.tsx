import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { queryClient } from '../lib/query-client';
import { ErrorBoundary } from '../components/ErrorBoundary';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(onboarding)" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="car/[id]" options={{ presentation: 'card' }} />
              <Stack.Screen name="notifications" options={{ presentation: 'card' }} />
              <Stack.Screen name="wishlist" options={{ presentation: 'card' }} />
              <Stack.Screen name="settings/index" options={{ presentation: 'card' }} />
              <Stack.Screen name="settings/edit-profile" options={{ presentation: 'card' }} />
              <Stack.Screen name="settings/address" options={{ presentation: 'card' }} />
              <Stack.Screen name="settings/notifications" options={{ presentation: 'card' }} />
              <Stack.Screen name="settings/payment" options={{ presentation: 'card' }} />
              <Stack.Screen name="settings/security" options={{ presentation: 'card' }} />
              <Stack.Screen name="settings/language" options={{ presentation: 'card' }} />
              <Stack.Screen name="settings/privacy" options={{ presentation: 'card' }} />
              <Stack.Screen name="settings/invite" options={{ presentation: 'card' }} />
              <Stack.Screen name="settings/help" options={{ presentation: 'card' }} />
              <Stack.Screen name="chat/[id]" options={{ presentation: 'card' }} />
              <Stack.Screen name="offers" options={{ presentation: 'card' }} />
              <Stack.Screen name="top-deals" options={{ presentation: 'card' }} />
              <Stack.Screen name="orders/index" options={{ presentation: 'card' }} />
              <Stack.Screen name="orders/track" options={{ presentation: 'card' }} />
              <Stack.Screen name="new-cars/index" options={{ presentation: 'card' }} />
              <Stack.Screen name="used-cars/index" options={{ presentation: 'card' }} />
              <Stack.Screen name="comparison/index" options={{ presentation: 'card' }} />
              <Stack.Screen name="reviews/index" options={{ presentation: 'card' }} />
              <Stack.Screen name="reviews/[id]" options={{ presentation: 'card' }} />
              <Stack.Screen name="dealers/index" options={{ presentation: 'card' }} />
              <Stack.Screen name="dealers/[id]" options={{ presentation: 'card' }} />
            </Stack>
          </ErrorBoundary>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
