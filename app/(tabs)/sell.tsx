import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MAKES = ['Toyota', 'Honda', 'Suzuki', 'Hyundai', 'Kia', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Nissan'];
const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Multan', 'Faisalabad', 'Peshawar', 'Quetta'];
const CURRENT_YEAR = 2024;
const YEARS = Array.from({ length: 20 }, (_, i) => String(CURRENT_YEAR - i));

type Step = 1 | 2 | 3 | 4;

export default function SellScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [condition, setCondition] = useState<'new' | 'used'>('used');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [desc, setDesc] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [imageCount] = useState(0);

  const steps = [
    { id: 1, label: 'Photos' },
    { id: 2, label: 'Car Details' },
    { id: 3, label: 'Pricing' },
    { id: 4, label: 'Contact' },
  ];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={[styles.successContainer, { paddingTop: topPad }]}>
        <View style={styles.successIcon}><Ionicons name="checkmark-circle" size={72} color="#34C759" /></View>
        <Text style={styles.successTitle}>Ad Posted!</Text>
        <Text style={styles.successSub}>Your car listing has been submitted for review. It will go live within 24 hours.</Text>
        <TouchableOpacity style={styles.successBtn} onPress={() => { setSubmitted(false); setStep(1); }}>
          <Text style={styles.successBtnText}>Post Another Car</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <Text style={styles.pageTitle}>Sell Your Car</Text>

      {/* Step Progress */}
      <View style={styles.stepper}>
        {steps.map((s, i) => (
          <View key={s.id} style={styles.stepperItem}>
            <View style={[styles.stepCircle, step >= s.id && styles.stepCircleActive, step > s.id && styles.stepCircleDone]}>
              {step > s.id ? <Ionicons name="checkmark" size={14} color="#fff" /> : <Text style={[styles.stepNum, step >= s.id && styles.stepNumActive]}>{s.id}</Text>}
            </View>
            <Text style={[styles.stepLabel, step >= s.id && styles.stepLabelActive]}>{s.label}</Text>
            {i < steps.length - 1 && <View style={[styles.stepLine, step > s.id && styles.stepLineDone]} />}
          </View>
        ))}
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: botPad + 100 }]} showsVerticalScrollIndicator={false}>
        {/* Step 1: Photos */}
        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Upload Car Photos</Text>
            <Text style={styles.stepSub}>Add up to 10 photos. Clear, well-lit photos get more inquiries.</Text>
            <TouchableOpacity style={styles.uploadArea}>
              <Ionicons name="camera" size={40} color="#ccc" />
              <Text style={styles.uploadTitle}>Tap to add photos</Text>
              <Text style={styles.uploadSub}>JPG, PNG • Max 5MB each</Text>
            </TouchableOpacity>
            <View style={styles.tipCard}>
              <Ionicons name="bulb-outline" size={18} color="#FF9500" />
              <Text style={styles.tipText}>Tip: Include exterior front/back/side and interior shots for best results.</Text>
            </View>
          </View>
        )}

        {/* Step 2: Car Details */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Car Details</Text>
            <View style={styles.row}>
              <View style={[styles.field, { flex: 1 }]}>
                <Text style={styles.label}>Make *</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 8 }}>
                  {MAKES.map(m => (
                    <TouchableOpacity key={m} style={[styles.chip, make === m && styles.chipActive]} onPress={() => setMake(m)}>
                      <Text style={[styles.chipText, make === m && styles.chipTextActive]}>{m}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.field, { flex: 1 }]}>
                <Text style={styles.label}>Model *</Text>
                <TextInput style={styles.input} value={model} onChangeText={setModel} placeholder="e.g. Corolla, Civic, Alto" placeholderTextColor="#bbb" />
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.field, { flex: 1 }]}>
                <Text style={styles.label}>Year *</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 8 }}>
                  {YEARS.slice(0, 10).map(y => (
                    <TouchableOpacity key={y} style={[styles.chip, year === y && styles.chipActive]} onPress={() => setYear(y)}>
                      <Text style={[styles.chipText, year === y && styles.chipTextActive]}>{y}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.field, { flex: 1 }]}>
                <Text style={styles.label}>Condition</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  {(['new', 'used'] as const).map(c => (
                    <TouchableOpacity key={c} style={[styles.condBtn, condition === c && styles.condBtnActive]} onPress={() => setCondition(c)}>
                      <Text style={[styles.condBtnText, condition === c && styles.condBtnTextActive]}>{c.charAt(0).toUpperCase() + c.slice(1)}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.field, { flex: 1 }]}>
                <Text style={styles.label}>Mileage (km)</Text>
                <TextInput style={styles.input} value={mileage} onChangeText={setMileage} placeholder="e.g. 45000" keyboardType="numeric" placeholderTextColor="#bbb" />
              </View>
              <View style={[styles.field, { flex: 1 }]}>
                <Text style={styles.label}>Color</Text>
                <TextInput style={styles.input} value={color} onChangeText={setColor} placeholder="e.g. White" placeholderTextColor="#bbb" />
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Description</Text>
              <TextInput style={[styles.input, styles.textarea]} value={desc} onChangeText={setDesc} placeholder="Describe your car's condition, features, reason for selling..." multiline numberOfLines={4} placeholderTextColor="#bbb" />
            </View>
          </View>
        )}

        {/* Step 3: Pricing */}
        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Set Your Price</Text>
            <View style={styles.field}>
              <Text style={styles.label}>Asking Price (USD) *</Text>
              <View style={styles.priceInput}>
                <Text style={styles.priceCurrency}>$</Text>
                <TextInput style={styles.priceField} value={price} onChangeText={setPrice} placeholder="0" keyboardType="numeric" placeholderTextColor="#bbb" />
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>City *</Text>
              <View style={styles.cityGrid}>
                {CITIES.map(c => (
                  <TouchableOpacity key={c} style={[styles.cityChip, city === c && styles.chipActive]} onPress={() => setCity(c)}>
                    <Text style={[styles.chipText, city === c && styles.chipTextActive]}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.tipCard}>
              <Ionicons name="trending-up-outline" size={18} color="#007AFF" />
              <Text style={styles.tipText}>Research similar listings to price your car competitively and sell faster.</Text>
            </View>
          </View>
        )}

        {/* Step 4: Contact Info */}
        {step === 4 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Your Contact Info</Text>
            <View style={styles.field}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput style={styles.input} value={sellerName} onChangeText={setSellerName} placeholder="Your full name" placeholderTextColor="#bbb" />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Phone Number *</Text>
              <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="+92-300-0000000" keyboardType="phone-pad" placeholderTextColor="#bbb" />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Email (optional)</Text>
              <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="your@email.com" keyboardType="email-address" placeholderTextColor="#bbb" />
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Listing Summary</Text>
              <View style={styles.summaryRow}><Text style={styles.summaryKey}>Car</Text><Text style={styles.summaryVal}>{make} {model} {year || '—'}</Text></View>
              <View style={styles.summaryRow}><Text style={styles.summaryKey}>Price</Text><Text style={styles.summaryVal}>{price ? `$${parseInt(price).toLocaleString()}` : '—'}</Text></View>
              <View style={styles.summaryRow}><Text style={styles.summaryKey}>Condition</Text><Text style={styles.summaryVal}>{condition}</Text></View>
              <View style={styles.summaryRow}><Text style={styles.summaryKey}>City</Text><Text style={styles.summaryVal}>{city || '—'}</Text></View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={[styles.navBtns, { paddingBottom: botPad + 12 }]}>
        {step > 1 && (
          <TouchableOpacity style={styles.backBtn} onPress={() => setStep((step - 1) as Step)}>
            <Ionicons name="arrow-back" size={20} color="#000" />
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.nextBtn, step === 1 && { flex: 1 }]}
          onPress={() => step < 4 ? setStep((step + 1) as Step) : handleSubmit()}
        >
          <Text style={styles.nextBtnText}>{step === 4 ? 'Submit Ad' : 'Continue'}</Text>
          {step < 4 && <Ionicons name="arrow-forward" size={20} color="#fff" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  pageTitle: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#000', paddingHorizontal: 20, paddingBottom: 16 },
  stepper: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 4, alignItems: 'flex-start' },
  stepperItem: { flex: 1, alignItems: 'center', position: 'relative' },
  stepCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  stepCircleActive: { backgroundColor: '#000' },
  stepCircleDone: { backgroundColor: '#34C759' },
  stepNum: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#aaa' },
  stepNumActive: { color: '#fff' },
  stepLabel: { fontSize: 10, fontFamily: 'Inter_400Regular', color: '#aaa', textAlign: 'center' },
  stepLabelActive: { color: '#000', fontFamily: 'Inter_600SemiBold' },
  stepLine: { position: 'absolute', top: 14, left: '55%', right: '-45%', height: 2, backgroundColor: '#f0f0f0' },
  stepLineDone: { backgroundColor: '#34C759' },
  scroll: { paddingHorizontal: 20 },
  stepContent: { paddingTop: 16 },
  stepTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 6 },
  stepSub: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888', marginBottom: 20, lineHeight: 19 },
  uploadArea: { borderWidth: 2, borderColor: '#e0e0e0', borderStyle: 'dashed', borderRadius: 16, paddingVertical: 48, alignItems: 'center', gap: 8, marginBottom: 16 },
  uploadTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#555' },
  uploadSub: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#aaa' },
  tipCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: '#FFF8E7', borderRadius: 12, padding: 14 },
  tipText: { flex: 1, fontSize: 13, fontFamily: 'Inter_400Regular', color: '#666', lineHeight: 19 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 0 },
  field: { marginBottom: 16 },
  label: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#555', marginBottom: 8 },
  input: { backgroundColor: '#f5f5f5', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 14, fontFamily: 'Inter_400Regular', color: '#000' },
  textarea: { height: 100, textAlignVertical: 'top', paddingTop: 12 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f5f5f5', borderWidth: 1.5, borderColor: 'transparent' },
  chipActive: { backgroundColor: '#000', borderColor: '#000' },
  chipText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#555' },
  chipTextActive: { color: '#fff' },
  condBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: '#f5f5f5', alignItems: 'center', borderWidth: 1.5, borderColor: 'transparent' },
  condBtnActive: { backgroundColor: '#000' },
  condBtnText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#555' },
  condBtnTextActive: { color: '#fff' },
  priceInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 12, paddingHorizontal: 14 },
  priceCurrency: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#888', marginRight: 4 },
  priceField: { flex: 1, fontSize: 24, fontFamily: 'Inter_700Bold', color: '#000', paddingVertical: 14 },
  cityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  cityChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f5f5f5', borderWidth: 1.5, borderColor: 'transparent' },
  summaryCard: { backgroundColor: '#f8f8f8', borderRadius: 14, padding: 16, marginTop: 8, gap: 10 },
  summaryTitle: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 4 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryKey: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888' },
  summaryVal: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#000' },
  navBtns: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0', backgroundColor: '#fff' },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 20 },
  backBtnText: { fontSize: 15, fontFamily: 'Inter_500Medium', color: '#000' },
  nextBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#000', borderRadius: 14, paddingVertical: 14 },
  nextBtnText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  successContainer: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  successIcon: { marginBottom: 20 },
  successTitle: { fontSize: 26, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 12 },
  successSub: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#888', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  successBtn: { backgroundColor: '#000', borderRadius: 14, paddingVertical: 15, paddingHorizontal: 40 },
  successBtnText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#fff' },
});
