import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { videos, videoCategories } from '../../lib/data';

export default function VideosScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const filtered = selectedCategory === 'All' ? videos : videos.filter(v => v.category === selectedCategory);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Videos</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
        {videoCategories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, selectedCategory === cat && styles.catChipActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.catChipText, selectedCategory === cat && styles.catChipTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {featured && (
          <TouchableOpacity style={styles.featuredCard} onPress={() => router.push({ pathname: '/videos/[id]', params: { id: featured.id } })}>
            <Image source={{ uri: featured.thumbnail }} style={styles.featuredThumb} resizeMode="cover" />
            <View style={styles.thumbOverlay}>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={28} color="#fff" />
              </View>
              <View style={styles.durationBadge}><Text style={styles.durationText}>{featured.duration}</Text></View>
            </View>
            <View style={styles.featuredInfo}>
              <View style={styles.catBadge}><Text style={styles.catBadgeText}>{featured.category}</Text></View>
              <Text style={styles.featuredTitle}>{featured.title}</Text>
              <View style={styles.videoMeta}>
                <Image source={{ uri: featured.channelAvatar }} style={styles.channelAvatar} />
                <Text style={styles.channelName}>{featured.channel}</Text>
                <Text style={styles.dot}>•</Text>
                <Ionicons name="eye-outline" size={13} color="#888" />
                <Text style={styles.views}>{(featured.views / 1000).toFixed(0)}K</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.date}>{featured.publishedAt}</Text>
              </View>
              <Text style={styles.featuredDesc} numberOfLines={2}>{featured.description}</Text>
            </View>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionLabel}>More Videos</Text>

        {rest.map(video => (
          <TouchableOpacity key={video.id} style={styles.videoRow} onPress={() => router.push({ pathname: '/videos/[id]', params: { id: video.id } })}>
            <View style={styles.thumbWrap}>
              <Image source={{ uri: video.thumbnail }} style={styles.rowThumb} resizeMode="cover" />
              <View style={styles.rowOverlay}>
                <View style={styles.playBtnSm}><Ionicons name="play" size={16} color="#fff" /></View>
                <View style={styles.durationBadgeSm}><Text style={styles.durationTextSm}>{video.duration}</Text></View>
              </View>
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.rowCat}>{video.category}</Text>
              <Text style={styles.rowTitle} numberOfLines={2}>{video.title}</Text>
              <View style={styles.rowMeta}>
                <Text style={styles.rowChannel}>{video.channel}</Text>
                <Text style={styles.dot}>•</Text>
                <Ionicons name="eye-outline" size={11} color="#aaa" />
                <Text style={styles.rowViews}>{(video.views / 1000).toFixed(0)}K</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {video.tags.map(tag => (
                  <View key={tag} style={styles.tag}><Text style={styles.tagText}>#{tag}</Text></View>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        ))}

        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="videocam-outline" size={48} color="#ddd" />
            <Text style={styles.emptyText}>No videos found</Text>
          </View>
        )}
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 14 },
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontFamily: 'Inter_700Bold', color: '#000' },
  categoriesRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 16 },
  catChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#eee' },
  catChipActive: { backgroundColor: '#000', borderColor: '#000' },
  catChipText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#555' },
  catChipTextActive: { color: '#fff' },
  scroll: { paddingHorizontal: 20 },
  featuredCard: { backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  featuredThumb: { width: '100%', height: 200 },
  thumbOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: 200, alignItems: 'center', justifyContent: 'center' },
  playBtn: { width: 58, height: 58, borderRadius: 29, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', paddingLeft: 4 },
  durationBadge: { position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  durationText: { fontSize: 12, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  featuredInfo: { padding: 14 },
  catBadge: { alignSelf: 'flex-start', backgroundColor: '#000', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 8 },
  catBadgeText: { fontSize: 11, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  featuredTitle: { fontSize: 17, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 8, lineHeight: 23 },
  videoMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' },
  channelAvatar: { width: 20, height: 20, borderRadius: 10 },
  channelName: { fontSize: 12, fontFamily: 'Inter_500Medium', color: '#555' },
  dot: { color: '#ccc', fontSize: 12 },
  views: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  date: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  featuredDesc: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#666', lineHeight: 19 },
  sectionLabel: { fontSize: 17, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 14 },
  videoRow: { flexDirection: 'row', gap: 12, marginBottom: 18 },
  thumbWrap: { position: 'relative', width: 130, height: 90, borderRadius: 12, overflow: 'hidden' },
  rowThumb: { width: '100%', height: '100%' },
  rowOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  playBtnSm: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center', paddingLeft: 2 },
  durationBadgeSm: { position: 'absolute', bottom: 6, right: 6, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 5, paddingHorizontal: 6, paddingVertical: 2 },
  durationTextSm: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  rowInfo: { flex: 1 },
  rowCat: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 },
  rowTitle: { fontSize: 13, fontFamily: 'Inter_700Bold', color: '#000', lineHeight: 18, marginBottom: 5 },
  rowMeta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 6 },
  rowChannel: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#888' },
  rowViews: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#aaa' },
  tag: { backgroundColor: '#f0f0f0', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3, marginRight: 5 },
  tagText: { fontSize: 10, fontFamily: 'Inter_500Medium', color: '#555' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { fontSize: 15, fontFamily: 'Inter_500Medium', color: '#bbb' },
});
