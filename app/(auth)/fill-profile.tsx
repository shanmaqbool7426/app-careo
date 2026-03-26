import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FillProfileScreen() {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: topPad + 10, paddingBottom: 40 }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Fill Your Profile</Text>
      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#ccc" />
        </View>
        <TouchableOpacity style={styles.editAvatar}>
          <Ionicons name="pencil" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        {[
          { label: 'Full Name', value: name, setter: setName },
          { label: 'Nickname', value: nickname, setter: setNickname },
          { label: 'Date of Birth', value: dob, setter: setDob },
          { label: 'Email', value: email, setter: setEmail },
          { label: 'Phone Number', value: phone, setter: setPhone },
        ].map(({ label, value, setter }) => (
          <View key={label} style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} placeholder={label} value={value} onChangeText={setter} />
          </View>
        ))}
        <View style={styles.field}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            {['Male', 'Female'].map(g => (
              <TouchableOpacity key={g} style={[styles.genderBtn, gender === g && styles.genderBtnActive]} onPress={() => setGender(g)}>
                <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { paddingHorizontal: 24 },
  back: { marginBottom: 16 },
  title: { fontSize: 26, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 24 },
  avatarWrap: { alignSelf: 'center', marginBottom: 32, position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' },
  editAvatar: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  form: { gap: 16, marginBottom: 32 },
  field: { gap: 8 },
  label: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#888' },
  input: { backgroundColor: '#f8f8f8', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, fontFamily: 'Inter_400Regular' },
  genderRow: { flexDirection: 'row', gap: 12 },
  genderBtn: { flex: 1, paddingVertical: 13, borderRadius: 12, borderWidth: 1.5, borderColor: '#e0e0e0', alignItems: 'center' },
  genderBtnActive: { borderColor: '#000', backgroundColor: '#000' },
  genderText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#888' },
  genderTextActive: { color: '#fff' },
  btn: { backgroundColor: '#000', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  btnText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#fff' },
});
