import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { conversations } from '../../lib/data';

const calls = [
  { id: '1', name: 'Nissan Official', time: 'Dec 17, 2024', type: 'incoming', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Nissan_logo.svg/60px-Nissan_logo.svg.png' },
  { id: '2', name: 'Opel Store', time: 'Dec 17, 2024', type: 'outgoing', logo: '' },
  { id: '3', name: 'Tesla Motor', time: 'Nov 18, 2024', type: 'incoming', logo: '' },
];

export default function InboxScreen() {
  const [tab, setTab] = useState<'Chats' | 'Calls'>('Chats');
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.container, { paddingTop: topPad + 12 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Inbox</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="search" size={20} color="#000" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="ellipsis-horizontal-circle" size={20} color="#000" /></TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabs}>
        {(['Chats', 'Calls'] as const).map(t => (
          <TouchableOpacity key={t} style={[styles.tabBtn, tab === t && styles.tabBtnActive]} onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'Chats' ? (
        <FlatList
          data={conversations}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.chatItem} onPress={() => router.push({ pathname: '/chat/[id]', params: { id: item.id } })}>
              <View style={styles.avatarWrap}>
                {item.dealerLogo ? (
                  <Image source={{ uri: item.dealerLogo }} style={styles.chatAvatar} resizeMode="contain" />
                ) : (
                  <View style={[styles.chatAvatar, styles.avatarPlaceholder]}><Ionicons name="car-sport" size={22} color="#888" /></View>
                )}
                {item.isOnline && <View style={styles.onlineDot} />}
              </View>
              <View style={styles.chatContent}>
                <Text style={styles.chatName}>{item.dealerName}</Text>
                <Text style={styles.chatLastMsg} numberOfLines={1}>{item.lastMessage}</Text>
              </View>
              <View style={styles.chatMeta}>
                <Text style={styles.chatTime}>{item.time}</Text>
                {item.unread > 0 && <View style={styles.unreadBadge}><Text style={styles.unreadText}>{item.unread}</Text></View>}
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={calls}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <View style={styles.chatItem}>
              <View style={[styles.chatAvatar, styles.avatarPlaceholder]}><Ionicons name="car-sport" size={22} color="#888" /></View>
              <View style={styles.chatContent}>
                <Text style={styles.chatName}>{item.name}</Text>
                <View style={styles.callType}>
                  <Ionicons name={item.type === 'incoming' ? 'call-outline' : 'arrow-up-outline'} size={13} color={item.type === 'incoming' ? '#34C759' : '#888'} />
                  <Text style={styles.callTypeText}>{item.type === 'incoming' ? 'Incoming Call' : 'Outgoing Call'}</Text>
                </View>
              </View>
              <View style={styles.chatMeta}>
                <Text style={styles.chatTime}>{item.time}</Text>
                <TouchableOpacity style={styles.callBtn}><Ionicons name="call" size={16} color="#000" /></TouchableOpacity>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  title: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#000' },
  headerIcons: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  tabs: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 8, gap: 24 },
  tabBtn: { paddingBottom: 10 },
  tabBtnActive: { borderBottomWidth: 2, borderBottomColor: '#000' },
  tabText: { fontSize: 15, fontFamily: 'Inter_500Medium', color: '#aaa' },
  tabTextActive: { color: '#000', fontFamily: 'Inter_600SemiBold' },
  chatItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, gap: 12 },
  avatarWrap: { position: 'relative' },
  chatAvatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#f5f5f5' },
  avatarPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  onlineDot: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#34C759', borderWidth: 2, borderColor: '#fff' },
  chatContent: { flex: 1 },
  chatName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 3 },
  chatLastMsg: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888' },
  chatMeta: { alignItems: 'flex-end', gap: 6 },
  chatTime: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#aaa' },
  unreadBadge: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  unreadText: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  callType: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  callTypeText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  callBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
});
