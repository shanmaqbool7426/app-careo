import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Platform, Share } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { blogPosts } from '../../lib/data';

export default function BlogDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const post = blogPosts.find(p => p.id === id);
  const related = blogPosts.filter(p => p.id !== id && (p.category === post?.category || p.tags.some(t => post?.tags.includes(t)))).slice(0, 3);

  if (!post) {
    return (
      <View style={[styles.center, { paddingTop: topPad }]}>
        <Text style={styles.notFound}>Article not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const paragraphs = post.body.split('\n\n').filter(Boolean);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ position: 'relative' }}>
          <Image source={{ uri: post.image }} style={styles.heroImage} resizeMode="cover" />
          <View style={[styles.heroOverlay, { paddingTop: topPad + 8 }]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="share-social-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.categoryRow}>
            <View style={styles.catBadge}><Text style={styles.catBadgeText}>{post.category}</Text></View>
            <View style={styles.readTimeRow}>
              <Ionicons name="time-outline" size={14} color="#888" />
              <Text style={styles.readTime}>{post.readTime}</Text>
            </View>
          </View>

          <Text style={styles.title}>{post.title}</Text>

          <View style={styles.authorRow}>
            <Image source={{ uri: post.authorAvatar }} style={styles.authorAvatar} />
            <View>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.postDate}>{post.date}</Text>
            </View>
            <View style={styles.viewsChip}>
              <Ionicons name="eye-outline" size={13} color="#888" />
              <Text style={styles.viewsText}>{(post.views / 1000).toFixed(1)}K views</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.excerpt}>{post.excerpt}</Text>

          {paragraphs.map((para, i) => (
            <Text key={i} style={[styles.bodyText, para.startsWith('**') && styles.heading]}>
              {para.startsWith('**') ? para.replace(/\*\*/g, '') : para}
            </Text>
          ))}

          <View style={styles.divider} />

          <Text style={styles.tagsLabel}>Tags</Text>
          <View style={styles.tagsWrap}>
            {post.tags.map(tag => (
              <TouchableOpacity key={tag} style={styles.tag} onPress={() => router.push({ pathname: '/blog', params: { tag } })}>
                <Text style={styles.tagText}>#{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {related.length > 0 && (
            <>
              <View style={styles.divider} />
              <Text style={styles.relatedTitle}>Related Articles</Text>
              {related.map(r => (
                <TouchableOpacity key={r.id} style={styles.relatedCard} onPress={() => router.push({ pathname: '/blog/[id]', params: { id: r.id } })}>
                  <Image source={{ uri: r.image }} style={styles.relatedImage} resizeMode="cover" />
                  <View style={styles.relatedInfo}>
                    <Text style={styles.relatedCat}>{r.category}</Text>
                    <Text style={styles.relatedTitle2} numberOfLines={2}>{r.title}</Text>
                    <Text style={styles.relatedMeta}>{r.author} • {r.readTime}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { fontSize: 18, fontFamily: 'Inter_600SemiBold', color: '#000', marginBottom: 12 },
  backLink: { padding: 12 },
  backLinkText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#555' },
  heroImage: { width: '100%', height: 280 },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16 },
  headerBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  content: { padding: 20 },
  categoryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  catBadge: { backgroundColor: '#000', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5 },
  catBadgeText: { fontSize: 11, fontFamily: 'Inter_600SemiBold', color: '#fff', textTransform: 'uppercase', letterSpacing: 0.5 },
  readTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  readTime: { fontSize: 13, fontFamily: 'Inter_400Regular', color: '#888' },
  title: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#000', lineHeight: 30, marginBottom: 16 },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  authorAvatar: { width: 40, height: 40, borderRadius: 20 },
  authorName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000' },
  postDate: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888', marginTop: 1 },
  viewsChip: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#f5f5f5', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  viewsText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#888' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 20 },
  excerpt: { fontSize: 15, fontFamily: 'Inter_500Medium', color: '#333', lineHeight: 24, marginBottom: 16, fontStyle: 'italic' },
  bodyText: { fontSize: 15, fontFamily: 'Inter_400Regular', color: '#333', lineHeight: 26, marginBottom: 14 },
  heading: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#000', lineHeight: 24, marginTop: 8 },
  tagsLabel: { fontSize: 15, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 10 },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#f5f5f5', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  tagText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#555' },
  relatedTitle: { fontSize: 17, fontFamily: 'Inter_700Bold', color: '#000', marginBottom: 14 },
  relatedCard: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  relatedImage: { width: 88, height: 80, borderRadius: 12 },
  relatedInfo: { flex: 1 },
  relatedCat: { fontSize: 11, fontFamily: 'Inter_600SemiBold', color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 },
  relatedTitle2: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#000', lineHeight: 19, marginBottom: 4 },
  relatedMeta: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#aaa' },
});
