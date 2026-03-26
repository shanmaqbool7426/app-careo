import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const [name, setName] = useState('Andrew Ainsley');
  const [email, setEmail] = useState('andrew_ainsley@yourdomain.com');
  const [phone, setPhone] = useState('+1 111-467-3987 06');

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: topPad + 10, paddingBottom: 40 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#000" /></TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <View style={{ width: 22 }} />
      </View>
      <View style={styles.avatarWrap}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }} style={styles.avatar} />
        <TouchableOpacity style={styles.editBtn}><Ionicons name="pencil" size={14} color="#fff" /></TouchableOpacity>
      </View>
      {[{ label: 'Full Name', val: name, setter: setName }, { label: 'Email', val: email, setter: setEmail }, { label: 'Phone', val: phone, setter: setPhone }].map(f => (
        <View key={f.label} style={styles.field}>
          <Text style={styles.label}>{f.label}</Text>
          <TextInput style={styles.input} value={f.val} onChangeText={f.setter} />
        </View>
      ))}
      <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
        <Text style={styles.btnText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { paddingHorizontal: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000' },
  avatarWrap: { alignSelf: 'center', marginBottom: 32, position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  editBtn: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  field: { gap: 8, marginBottom: 16 },
  label: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#888' },
  input: { backgroundColor: '#f8f8f8', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, fontFamily: 'Inter_400Regular' },
  btn: { backgroundColor: '#000', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  btnText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#fff' },
});
