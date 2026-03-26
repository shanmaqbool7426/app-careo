import { Tabs } from 'expo-router';
import { Platform, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function SellIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <View style={[styles.sellBtn, focused && styles.sellBtnActive]}>
      <Ionicons name="add" size={26} color={focused ? '#fff' : '#fff'} />
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = Platform.OS === 'web' ? 84 : 60 + insets.bottom;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          height: tabBarHeight,
          paddingBottom: Platform.OS === 'web' ? 34 : insets.bottom,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#bbb',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen name="index" options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
      <Tabs.Screen name="search" options={{ tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} /> }} />
      <Tabs.Screen name="sell" options={{ tabBarIcon: ({ color, focused }) => <SellIcon color={color} focused={focused} /> }} />
      <Tabs.Screen name="favorites" options={{ tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  sellBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  sellBtnActive: {
    backgroundColor: '#000',
  },
});
