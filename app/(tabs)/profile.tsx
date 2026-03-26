import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const accountItems = [
  { icon: 'car-outline', label: 'My Ads', route: '/orders', badge: '3' },
  { icon: 'receipt-outline', label: 'My Orders', route: '/orders' },
  { icon: 'chatbubbles-outline', label: 'Inbox', route: '/(tabs)/inbox' },
  { icon: 'wallet-outline', label: 'Wallet', route: '/(tabs)/wallet' },
  { icon: 'business-outline', label: 'Dealers', route: '/dealers' },
  { icon: 'star-outline', label: 'Reviews', route: '/reviews' },
  { icon: 'git-compare-outline', label: 'Compare', route: '/comparison' },
  { icon: 'trophy-outline', label: 'Top Deals', route: '/top-deals' },
  { icon: 'newspaper-outline', label: 'Blog', route: '/blog' },
  { icon: 'play-circle-outline', label: 'Videos', route: '/videos' },
];

const menuItems = [
  { icon: 'person-outline', label: 'Edit Profile', route: '/settings/edit-profile' },
  { icon: 'location-outline', label: 'Address', route: '/settings/address' },
  { icon: 'notifications-outline', label: 'Notification', route: '/settings/notifications' },
  { icon: 'card-outline', label: 'Payment', route: '/settings/payment' },
  { icon: 'shield-outline', label: 'Security', route: '/settings/security' },
  { icon: 'language-outline', label: 'Language', route: '/settings/language', extra: 'English (US)' },
  { icon: 'moon-outline', label: 'Dark Mode', route: '', toggle: true },
  { icon: 'help-circle-outline', label: 'Help Center', route: '/settings/help' },
  { icon: 'lock-closed-outline', label: 'Privacy Policy', route: '/settings/privacy' },
  { icon: 'people-outline', label: 'Invite Friends', route: '/settings/invite' },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.iconBtn}><Ionicons name="ellipsis-horizontal-circle" size={22} color="#000" /></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.profileCard}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }} style={styles.profileAvatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Andrew Ainsley</Text>
          <Text style={styles.profileEmail}>andrew_ainsley@yourdomain.com</Text>
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={() => router.push('/settings/edit-profile')}>
          <Ionicons name="pencil" size={16} color="#000" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Account Quick Links */}
      <View style={styles.accountSection}>
        <Text style={styles.sectionLabel}>My Account</Text>
        <View style={styles.accountGrid}>
          {accountItems.map((item, i) => (
            <TouchableOpacity key={i} style={styles.accountItem} onPress={() => router.push(item.route as any)}>
              <View style={styles.accountIcon}>
                <Ionicons name={item.icon as any} size={22} color="#000" />
                {item.badge && <View style={styles.badge}><Text style={styles.badgeText}>{item.badge}</Text></View>}
              </View>
              <Text style={styles.accountItemLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.menuItem, i < menuItems.length - 1 && styles.menuItemBorder]}
            onPress={() => item.route ? router.push(item.route as any) : null}
          >
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon as any} size={20} color="#000" />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <View style={styles.menuRight}>
              {item.extra && <Text style={styles.menuExtra}>{item.extra}</Text>}
              {item.toggle ? (
                <View style={styles.toggle}><View style={styles.toggleKnob} /></View>
              ) : (
                <Ionicons name="chevron-forward" size={16} color="#ccc" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  title: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#000' },
  iconBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  profileCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 24, gap: 14 },
  profileAvatar: { width: 80, height: 80, borderRadius: 40 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 4 },
  profileEmail: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888' },
  editBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  menu: { marginHorizontal: 20, backgroundColor: '#fff', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 2, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, gap: 14 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  menuIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 15, fontFamily: 'Inter_400Regular', color: '#000' },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  menuExtra: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888' },
  toggle: { width: 44, height: 24, borderRadius: 12, backgroundColor: '#e0e0e0', padding: 2 },
  toggleKnob: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 20, marginTop: 24, paddingVertical: 16, borderRadius: 14, borderWidth: 1.5, borderColor: '#ffe5e5' },
  logoutText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#FF3B30' },
  accountSection: { paddingHorizontal: 20, marginBottom: 20 },
  sectionLabel: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 14 },
  accountGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  accountItem: { flex: 1, minWidth: '28%', alignItems: 'center', gap: 8 },
  accountIcon: { width: 54, height: 54, borderRadius: 16, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  accountItemLabel: { fontSize: 11, fontFamily: 'Inter_500Medium', color: '#333', textAlign: 'center' },
  badge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#FF3B30', borderRadius: 8, minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
  badgeText: { fontSize: 9, fontFamily: 'Inter_700Bold', color: '#fff' },
});
