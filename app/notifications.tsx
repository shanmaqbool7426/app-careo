import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { notifications } from '../lib/data';

const iconMap: Record<string, any> = {
  offer: { name: 'checkmark-circle', color: '#34C759', bg: '#e8f5e9' },
  info: { name: 'information-circle', color: '#007AFF', bg: '#e3f2fd' },
  payment: { name: 'card', color: '#FF9500', bg: '#fff3e0' },
  account: { name: 'person-circle', color: '#9C27B0', bg: '#f3e5f5' },
};

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.container, { paddingTop: topPad + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Notification</Text>
        <TouchableOpacity><Ionicons name="ellipsis-horizontal-circle" size={22} color="#000" /></TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={i => i.id}
        renderItem={({ item }) => {
          const icon = iconMap[item.type] || iconMap.info;
          return (
            <TouchableOpacity style={[styles.notifItem, !item.isRead && styles.notifUnread]}>
              <View style={[styles.notifIcon, { backgroundColor: icon.bg }]}>
                <Ionicons name={icon.name} size={22} color={icon.color} />
              </View>
              <View style={styles.notifContent}>
                <Text style={styles.notifTitle}>{item.title}</Text>
                <Text style={styles.notifBody} numberOfLines={2}>{item.body}</Text>
                <Text style={styles.notifTime}>{item.time}</Text>
              </View>
              {!item.isRead && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16, justifyContent: 'space-between' },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  notifItem: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 20, paddingVertical: 14, gap: 12 },
  notifUnread: { backgroundColor: '#fafafa' },
  notifIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  notifContent: { flex: 1 },
  notifTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 4 },
  notifBody: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#666', lineHeight: 19, marginBottom: 6 },
  notifTime: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#aaa' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#000', marginTop: 4 },
});
