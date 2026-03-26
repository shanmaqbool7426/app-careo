import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { blogPosts, blogCategories } from '../../lib/data';

export default function BlogScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const filtered = blogPosts.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Blog & Articles</Text>
        <View style={{ width: 38 }} />
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={16} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#aaa"
        />
        {search ? <TouchableOpacity onPress={() => setSearch('')}><Ionicons name="close-circle" size={16} color="#888" /></TouchableOpacity> : null}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
        {blogCategories.map(cat => (
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
          <TouchableOpacity style={styles.featuredCard} onPress={() => router.push({ pathname: '/blog/[id]', params: { id: featured.id } })}>
            <Image source={{ uri: featured.image }} style={styles.featuredImage} resizeMode="cover" />
            <View style={styles.featuredOverlay}>
              <View style={styles.catBadge}><Text style={styles.catBadgeText}>{featured.category}</Text></View>
              <Text style={styles.featuredTitle} numberOfLines={2}>{featured.title}</Text>
              <View style={styles.featuredMeta}>
                <Image source={{ uri: featured.authorAvatar }} style={styles.authorAvatarSm} />
                <Text style={styles.featuredAuthor}>{featured.author}</Text>
                <Text style={styles.featuredDot}>•</Text>
                <Text style={styles.featuredDate}>{featured.date}</Text>
                <Text style={styles.featuredDot}>•</Text>
                <Text style={styles.featuredDate}>{featured.readTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {rest.map(post => (
          <TouchableOpacity key={post.id} style={styles.postCard} onPress={() => router.push({ pathname: '/blog/[id]', params: { id: post.id } })}>
            <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
            <View style={styles.postInfo}>
              <View style={styles.postCatRow}>
                <Text style={styles.postCat}>{post.category}</Text>
                <Text style={styles.postReadTime}>{post.readTime}</Text>
              </View>
              <Text style={styles.postTitle} numberOfLines={2}>{post.title}</Text>
              <Text style={styles.postExcerpt} numberOfLines={2}>{post.excerpt}</Text>
              <View style={styles.postMeta}>
                <Image source={{ uri: post.authorAvatar }} style={styles.authorAvatarTiny} />
                <Text style={styles.postAuthor}>{post.author}</Text>
                <View style={styles.viewsRow}>
                  <Ionicons name="eye-outline" size={12} color="#aaa" />
                  <Text style={styles.viewsText}>{(post.views / 1000).toFixed(1)}K</Text>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsRow}>
                {post.tags.map(tag => (
                  <View key={tag} style={styles.tag}><Text style={styles.tagText}>#{tag}</Text></View>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        ))}

        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="document-text-outline" size={48} color="#ddd" />
            <Text style={styles.emptyText}>No articles found</Text>
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
  searchBar: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 14, backgroundColor: '#f5f5f5', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 11, gap: 8 },
  searchInput: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular', color: '#000' },
  categoriesRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 16 },
  catChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#eee' },
  catChipActive: { backgroundColor: '#000', borderColor: '#000' },
  catChipText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: '#555' },
  catChipTextActive: { color: '#fff' },
  scroll: { paddingHorizontal: 20 },
  featuredCard: { borderRadius: 20, overflow: 'hidden', marginBottom: 20, height: 230 },
  featuredImage: { width: '100%', height: '100%', position: 'absolute' },
  featuredOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', padding: 16, justifyContent: 'flex-end' },
  catBadge: { alignSelf: 'flex-start', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 8 },
  catBadgeText: { fontSize: 11, fontFamily: 'Inter_600SemiBold', color: '#000' },
  featuredTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#fff', marginBottom: 10, lineHeight: 24 },
  featuredMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  authorAvatarSm: { width: 22, height: 22, borderRadius: 11 },
  featuredAuthor: { fontSize: 12, fontFamily: 'Inter_500Medium', color: 'rgba(255,255,255,0.85)' },
  featuredDot: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  featuredDate: { fontSize: 12, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.7)' },
  postCard: { flexDirection: 'row', marginBottom: 18, gap: 14 },
  postImage: { width: 100, height: 105, borderRadius: 14 },
  postInfo: { flex: 1 },
  postCatRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  postCat: { fontSize: 11, fontFamily: 'Inter_600SemiBold', color: '#555', textTransform: 'uppercase', letterSpacing: 0.5 },
  postReadTime: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#aaa' },
  postTitle: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#000', lineHeight: 20, marginBottom: 4 },
  postExcerpt: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#666', lineHeight: 17, marginBottom: 6 },
  postMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  authorAvatarTiny: { width: 18, height: 18, borderRadius: 9 },
  postAuthor: { fontSize: 11, fontFamily: 'Inter_500Medium', color: '#555', flex: 1 },
  viewsRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  viewsText: { fontSize: 11, fontFamily: 'Inter_400Regular', color: '#aaa' },
  tagsRow: { flexGrow: 0 },
  tag: { backgroundColor: '#f0f0f0', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, marginRight: 6 },
  tagText: { fontSize: 10, fontFamily: 'Inter_500Medium', color: '#555' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { fontSize: 15, fontFamily: 'Inter_500Medium', color: '#bbb' },
});
