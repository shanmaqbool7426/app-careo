import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { transactions } from '../../lib/data';

export default function WalletScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Text style={styles.title}>My E-Wallet</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="search" size={20} color="#000" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="ellipsis-horizontal-circle" size={20} color="#000" /></TouchableOpacity>
        </View>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View>
            <Text style={styles.cardName}>Andrew Ainsley</Text>
            <Text style={styles.cardNumber}>•••• •••• •••• 5829</Text>
          </View>
          <Text style={styles.cardBrand}>VISA</Text>
        </View>
        <View style={styles.cardBottom}>
          <View>
            <Text style={styles.balanceLabel}>Your balance</Text>
            <Text style={styles.balance}>$299,677</Text>
          </View>
          <TouchableOpacity style={styles.topUpBtn} onPress={() => {}}>
            <Ionicons name="add" size={14} color="#000" />
            <Text style={styles.topUpText}>Top Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actions}>
        {[
          { icon: 'arrow-up-outline', label: 'Send' },
          { icon: 'arrow-down-outline', label: 'Receive' },
          { icon: 'swap-horizontal-outline', label: 'Transfer' },
          { icon: 'card-outline', label: 'Top Up' },
        ].map(({ icon, label }) => (
          <TouchableOpacity key={label} style={styles.actionItem}>
            <View style={styles.actionIcon}><Ionicons name={icon as any} size={22} color="#000" /></View>
            <Text style={styles.actionLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transaction History */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        {transactions.slice(0, 6).map(tx => (
          <View key={tx.id} style={styles.txItem}>
            <View style={[styles.txIcon, { backgroundColor: tx.type === 'topup' ? '#e8f5e9' : '#fce4ec' }]}>
              <Ionicons name={tx.type === 'topup' ? 'add-circle' : 'car-sport'} size={22} color={tx.type === 'topup' ? '#34C759' : '#FF3B30'} />
            </View>
            <View style={styles.txContent}>
              <Text style={styles.txTitle}>{tx.title}</Text>
              <Text style={styles.txDate}>{tx.date}, {tx.time}</Text>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmount, { color: tx.amount > 0 ? '#34C759' : '#000' }]}>
                {tx.amount > 0 ? '+' : ''}{tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toLocaleString()}
              </Text>
              <Text style={[styles.txStatus, { color: tx.type === 'order' ? '#FF3B30' : '#34C759' }]}>{tx.type === 'order' ? 'Orders' : 'Top Up'}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  title: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#000' },
  headerIcons: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  card: { marginHorizontal: 20, backgroundColor: '#1a1a2e', borderRadius: 20, padding: 20, marginBottom: 24 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  cardName: { fontSize: 14, fontFamily: 'Inter_500Medium', color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  cardNumber: { fontSize: 14, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.6)' },
  cardBrand: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#fff', fontStyle: 'italic' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  balanceLabel: { fontSize: 12, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.6)', marginBottom: 4 },
  balance: { fontSize: 26, fontFamily: 'Inter_700Bold', color: '#fff' },
  topUpBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  topUpText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#000' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 28 },
  actionItem: { alignItems: 'center', gap: 8 },
  actionIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#666' },
  section: { paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  seeAll: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#888' },
  txItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  txIcon: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  txContent: { flex: 1 },
  txTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 3 },
  txDate: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  txRight: { alignItems: 'flex-end' },
  txAmount: { fontSize: 14, fontFamily: 'Inter_700Bold', marginBottom: 3 },
  txStatus: { fontSize: 11, fontFamily: 'Inter_400Regular' },
});
