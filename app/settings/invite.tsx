import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const contacts = [
  { id: '1', name: 'Tyeisha Okay', phone: '+1 385-468-0022', invited: false },
  { id: '2', name: 'Florence Dorrance', phone: '+1 384-480-9021', invited: true },
  { id: '3', name: 'Chantel Shelburne', phone: '+1 383-460-8022', invited: false },
  { id: '4', name: 'Maryland Winkles', phone: '+1 382-340-6021', invited: false },
  { id: '5', name: 'Roddie Goode', phone: '+1 381-460-5022', invited: true },
  { id: '6', name: 'Benny Spainhauer', phone: '+1 380-442-7022', invited: false },
  { id: '7', name: 'Tyra Dhillon', phone: '+1 379-468-0022', invited: false },
  { id: '8', name: 'Janet Eudaimon', phone: '+1 378-468-0022', invited: false },
];

export default function InviteFriendsScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.container, { paddingTop: topPad + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Invite Friends</Text>
        <View style={{ width: 22 }} />
      </View>
      <FlatList
        data={contacts}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 0 }}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <View style={styles.avatar}><Ionicons name="person" size={22} color="#888" /></View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>
            <TouchableOpacity style={[styles.inviteBtn, item.invited && styles.invitedBtn]}>
              <Text style={[styles.inviteBtnText, item.invited && styles.invitedBtnText]}>{item.invited ? 'Invited' : 'Invite'}</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 12 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  contactItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  name: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 2 },
  phone: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  inviteBtn: { backgroundColor: '#000', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  invitedBtn: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#e0e0e0' },
  inviteBtnText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  invitedBtnText: { color: '#888' },
});
