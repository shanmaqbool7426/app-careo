import { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { conversations } from '../../lib/data';

const initialMessages = [
  { id: '1', text: 'Hello, welcome to BMW Official Store, is there anything we can do to help you?', isMe: false, time: '9:25 AM' },
  { id: '2', text: 'Hi Good Morning, I want to buy a BMW M5 Series', isMe: true, time: '9:41 AM' },
  { id: '3', text: 'My previous BMW was too old', isMe: true, time: '9:41 AM' },
  { id: '4', text: 'Is there anything we can do to help you?', isMe: false, time: '9:41 AM' },
  { id: '5', text: 'Can I make an offer?', isMe: true, time: '9:41 AM' },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conv = conversations.find(c => c.id === id) || conversations[0];
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: input, isMe: true, time: 'Now' }]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerAvatar}><Ionicons name="car-sport" size={20} color="#888" /></View>
          <View>
            <Text style={styles.headerName}>{conv.dealerName}</Text>
            <View style={styles.onlineRow}><View style={styles.onlineDot} /><Text style={styles.onlineText}>Online</Text></View>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="call-outline" size={20} color="#000" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="videocam-outline" size={20} color="#000" /></TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.isMe ? styles.bubbleMe : styles.bubbleThem]}>
            <Text style={[styles.bubbleText, item.isMe && styles.bubbleTextMe]}>{item.text}</Text>
            <Text style={[styles.bubbleTime, item.isMe && styles.bubbleTimeMe]}>{item.time}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        inverted={false}
      />

      <View style={[styles.inputRow, { paddingBottom: botPad + 8 }]}>
        <TextInput style={styles.input} placeholder="Message..." value={input} onChangeText={setInput} multiline />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', gap: 12 },
  headerCenter: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerAvatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  headerName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#000' },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#34C759' },
  onlineText: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#34C759' },
  headerActions: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  bubble: { maxWidth: '75%', borderRadius: 18, padding: 12 },
  bubbleMe: { alignSelf: 'flex-end', backgroundColor: '#000', borderBottomRightRadius: 4 },
  bubbleThem: { alignSelf: 'flex-start', backgroundColor: '#f5f5f5', borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#000', lineHeight: 20 },
  bubbleTextMe: { color: '#fff' },
  bubbleTime: { fontSize: 10, fontFamily: 'Inter_400Regular', color: '#aaa', marginTop: 4, alignSelf: 'flex-end' },
  bubbleTimeMe: { color: 'rgba(255,255,255,0.5)' },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 16, paddingTop: 8, gap: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  input: { flex: 1, backgroundColor: '#f5f5f5', borderRadius: 22, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, fontFamily: 'Inter_400Regular', maxHeight: 100 },
  sendBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
});
