import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { videos } from '../../lib/data';

export default function VideoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const video = videos.find(v => v.id === id);
  const related = videos.filter(v => v.id !== id && (v.category === video?.category || v.tags.some(t => video?.tags.includes(t)))).slice(0, 4);

  if (!video) {
    return (
      <View style={[styles.center, { paddingTop: topPad }]}>
        <Text style={styles.notFound}>Video not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={styles.player}>
        <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
        <View style={styles.playerOverlay}>
          <TouchableOpacity onPress={() => router.back()} style={[styles.headerBtn, { position: 'absolute', top: topPad + 8, left: 16 }]}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.playCircle}>
            <Ionicons name="play" size={40} color="#fff" />
          </View>
          <View style={styles.playerControls}>
            <Text style={styles.playerDuration}>{video.duration}</Text>
            <View style={styles.controlBtns}>
              <TouchableOpacity style={styles.ctrlBtn}><Ionicons name="volume-high" size={20} color="#fff" /></TouchableOpacity>
              <TouchableOpacity style={styles.ctrlBtn}><Ionicons name="expand" size={20} color="#fff" /></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.infoScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
          <View style={styles.catRow}>
            <View style={styles.catBadge}><Text style={styles.catBadgeText}>{video.category}</Text></View>
            <View style={styles.viewsBadge}>
              <Ionicons name="eye-outline" size={13} color="#aaa" />
              <Text style={styles.viewsText}>{(video.views / 1000).toFixed(0)}K views</Text>
            </View>
          </View>

          <Text style={styles.title}>{video.title}</Text>

          <View style={styles.channelRow}>
            <Image source={{ uri: video.channelAvatar }} style={styles.channelAvatar} />
            <View style={styles.channelInfo}>
              <Text style={styles.channelName}>{video.channel}</Text>
              <Text style={styles.publishedAt}>{video.publishedAt}</Text>
            </View>
            <TouchableOpacity style={styles.subscribeBtn}>
              <Text style={styles.subscribeBtnText}>Follow</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="thumbs-up-outline" size={20} color="#fff" />
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="share-social-outline" size={20} color="#fff" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="bookmark-outline" size={20} color="#fff" />
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.descLabel}>Description</Text>
          <Text style={styles.description}>{video.description}</Text>

          <View style={styles.tagsRow}>
            {video.tags.map(tag => (
              <View key={tag} style={styles.tag}><Text style={styles.tagText}>#{tag}</Text></View>
            ))}
          </View>

          {related.length > 0 && (
            <>
              <Text style={styles.relatedLabel}>Up Next</Text>
              {related.map(v => (
                <TouchableOpacity key={v.id} style={styles.relatedRow} onPress={() => router.replace({ pathname: '/videos/[id]', params: { id: v.id } })}>
                  <View style={styles.relThumbWrap}>
                    <Image source={{ uri: v.thumbnail }} style={styles.relThumb} resizeMode="cover" />
                    <View style={styles.relDuration}><Text style={styles.relDurationText}>{v.duration}</Text></View>
                  </View>
                  <View style={styles.relInfo}>
                    <Text style={styles.relTitle} numberOfLines={2}>{v.title}</Text>
                    <Text style={styles.relChannel}>{v.channel}</Text>
                    <View style={styles.relMeta}>
                      <Ionicons name="eye-outline" size={11} color="#666" />
                      <Text style={styles.relViews}>{(v.views / 1000).toFixed(0)}K</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  notFound: { fontSize: 18, fontFamily: 'Inter_600SemiBold', color: '#fff', marginBottom: 12 },
  backLink: { padding: 12 },
  backLinkText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#aaa' },
  player: { width: '100%', height: 240, position: 'relative', backgroundColor: '#111' },
  thumbnail: { width: '100%', height: '100%' },
  playerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  headerBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  playCircle: { width: 68, height: 68, borderRadius: 34, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', paddingLeft: 4 },
  playerControls: { position: 'absolute', bottom: 12, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  playerDuration: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  controlBtns: { flexDirection: 'row', gap: 12 },
  ctrlBtn: { padding: 4 },
  infoScroll: { flex: 1, backgroundColor: '#111' },
  infoContainer: { padding: 20 },
  catRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  catBadge: { backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  catBadgeText: { fontSize: 11, fontFamily: 'Inter_600SemiBold', color: '#000' },
  viewsBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewsText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#aaa' },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#fff', lineHeight: 26, marginBottom: 14 },
  channelRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#222' },
  channelAvatar: { width: 40, height: 40, borderRadius: 20 },
  channelInfo: { flex: 1 },
  channelName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  publishedAt: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888', marginTop: 1 },
  subscribeBtn: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 7 },
  subscribeBtnText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#000' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#222', marginBottom: 16 },
  actionBtn: { alignItems: 'center', gap: 4 },
  actionText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#aaa' },
  descLabel: { fontSize: 15, fontFamily: 'Inter_700Bold', color: '#fff', marginBottom: 8 },
  description: { fontSize: 14, fontFamily: 'Inter_400Regular', color: '#aaa', lineHeight: 22, marginBottom: 14 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  tag: { backgroundColor: '#222', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  tagText: { fontSize: 12, fontFamily: 'Inter_500Medium', color: '#aaa' },
  relatedLabel: { fontSize: 17, fontFamily: 'Inter_700Bold', color: '#fff', marginBottom: 12 },
  relatedRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  relThumbWrap: { width: 120, height: 80, borderRadius: 10, overflow: 'hidden', position: 'relative' },
  relThumb: { width: '100%', height: '100%' },
  relDuration: { position: 'absolute', bottom: 5, right: 6, backgroundColor: 'rgba(0,0,0,0.75)', borderRadius: 5, paddingHorizontal: 6, paddingVertical: 2 },
  relDurationText: { fontSize: 10, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  relInfo: { flex: 1 },
  relTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: '#fff', lineHeight: 18, marginBottom: 4 },
  relChannel: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888', marginBottom: 3 },
  relMeta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  relViews: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#666' },
});
