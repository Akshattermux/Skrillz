import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { useLanguage } from "../context/LanguageContext";
import { useUser } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");

const DUMMY_POSTS = [
  {
    id: "1",
    doctorName: "Dr. Akshat Sharma",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=1000&auto=format&fit=crop",
    caption: "Just finished a successful heart surgery. Modern medical tech is amazing! 🏥❤️ #Cardiology #Medicine",
    likes: 124,
    isLiked: false,
    comments: [
      { id: "c1", user: "Dr. Sarah", text: "Incredible work! 👏" },
      { id: "c2", user: "Dr. Mike", text: "The precision is top-notch." }
    ],
    time: "2h ago",
  },
  {
    id: "2",
    doctorName: "Dr. Sarah Wilson",
    specialty: "Neurologist",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1000&auto=format&fit=crop",
    caption: "Discussing new brain mapping techniques at the annual conference. Learning never stops. 🧠✨ #Neurology #Science",
    likes: 89,
    isLiked: true,
    comments: [],
    time: "5h ago",
  },
  {
    id: "3",
    doctorName: "Dr. Michael Chen",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop",
    caption: "A healthy child is a happy child. Remember to schedule your routine checkups! 👶🩺 #Pediatrics #HealthTip",
    likes: 256,
    isLiked: false,
    comments: [{ id: "c3", user: "Dr. Anna", text: "Preach! 🙌" }],
    time: "Yesterday",
  },
];

interface SharedFeedProps {
  themeColor?: string;
  gradientColors?: string[];
  glassmorphism?: boolean;
}

export default function SharedFeed({ 
  themeColor = "#6200EA", 
  gradientColors = ["#6200EA", "#7C4DFF"], 
  glassmorphism 
}: SharedFeedProps) {
  const { t } = useLanguage();
  const { user } = useUser();
  const [posts, setPosts] = useState(DUMMY_POSTS);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPostForComments, setSelectedPostForComments] = useState<any>(null);
  const [newPostText, setNewPostText] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        const isLiked = !post.isLiked;
        return { 
          ...post, 
          isLiked, 
          likes: isLiked ? post.likes + 1 : post.likes - 1 
        };
      }
      return post;
    }));
  };

  const handlePickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!res.canceled) {
      setPickedImage(res.assets[0].uri);
    }
  };

  const handleDeletePost = (id: string) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => {
        setPosts(prev => prev.filter(p => p.id !== id));
      }},
    ]);
  };

  const handleShare = () => {
    Alert.alert("Share", "Post link copied to clipboard!");
  };

  const handleAddPost = () => {
    if (!newPostText.trim()) return;
    const newPost = {
      id: Date.now().toString(),
      doctorName: user.name,
      specialty: user.specialty || "Specialist",
      image: pickedImage || "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop",
      caption: newPostText,
      likes: 0,
      isLiked: false,
      comments: [],
      time: "Just now",
      isOwn: true,
    };
    setPosts([newPost, ...posts]);
    setNewPostText("");
    setPickedImage(null);
    setShowCreatePost(false);
  };

  const handleAddComment = () => {
    if (!newCommentText.trim() || !selectedPostForComments) return;
    const updatedPosts = posts.map(post => {
      if (post.id === selectedPostForComments.id) {
        return {
          ...post,
          comments: [...post.comments, { id: Date.now().toString(), user: "You", text: newCommentText }]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    setSelectedPostForComments({
      ...selectedPostForComments,
      comments: [...selectedPostForComments.comments, { id: Date.now().toString(), user: "You", text: newCommentText }]
    });
    setNewCommentText("");
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.postCard, glassmorphism && styles.glassCard]}>
      {glassmorphism && (
        <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />
      )}
      <View style={styles.postHeader}>
        <View style={[styles.avatar, { backgroundColor: themeColor }]}>
          <Text style={styles.avatarText}>{item.doctorName[0] + item.doctorName.split(' ')[1]?.[0]}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.doctorName}>{item.doctorName}</Text>
          <Text style={styles.specialty}>{item.specialty} • {item.time}</Text>
        </View>
        <TouchableOpacity onPress={() => (item.id === "1" || item.isOwn) && handleDeletePost(item.id)}>
          <Ionicons name="trash-outline" size={20} color={(item.id === "1" || item.isOwn) ? "#D32F2F" : "#ccc"} />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: item.image }} style={styles.postImage} />

      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => toggleLike(item.id)}>
            <Ionicons name={item.isLiked ? "heart" : "heart-outline"} size={26} color={item.isLiked ? "#E0245E" : "#333"} />
            <Text style={[styles.actionText, item.isLiked && { color: "#E0245E" }]}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => setSelectedPostForComments(item)}>
            <Ionicons name="chatbubble-outline" size={24} color="#333" />
            <Text style={styles.actionText}>{item.comments.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.captionContainer}>
        <Text style={styles.caption}>
          <Text style={styles.captionName}>{item.doctorName} </Text>
          {item.caption}
        </Text>
        {item.comments.length > 0 && (
          <TouchableOpacity onPress={() => setSelectedPostForComments(item)}>
            <Text style={styles.viewComments}>View all {item.comments.length} comments</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      <LinearGradient colors={gradientColors || ["#00897B", "#4DB6AC"]} style={styles.header}>
        <Text style={styles.headerTitle}>{t('community_feed') || 'Community Feed'}</Text>
        <TouchableOpacity style={styles.createBtn} onPress={() => setShowCreatePost(true)}>
          <Ionicons name="add-circle" size={32} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={[styles.searchBar, glassmorphism && styles.glassSearch]}>
            {glassmorphism && (
              <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
            )}
            <Ionicons name="search" size={20} color={glassmorphism ? themeColor : "#999"} />
            <TextInput 
              placeholder={t('search_posts') || 'Search medical community...'} 
              style={styles.searchInput}
              placeholderTextColor={glassmorphism ? themeColor + '80' : "#999"}
            />
          </View>
        )}
      />

      {/* CREATE POST MODAL */}
      <Modal visible={showCreatePost} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowCreatePost(false)}>
                <Text style={styles.modalCancel}>{t('cancel') || 'Cancel'}</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{t('new_post') || 'New Post'}</Text>
              <TouchableOpacity onPress={handleAddPost}>
                <Text style={[styles.modalPost, { color: themeColor }]}>{t('post') || 'Post'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrap}>
              <TouchableOpacity onPress={handlePickImage} style={styles.pickImageWrap}>
                {pickedImage ? (
                  <Image source={{ uri: pickedImage }} style={styles.previewImg} />
                ) : (
                  <View style={[styles.previewImg, styles.placeholderImg]}>
                    <Ionicons name="camera" size={24} color="#999" />
                  </View>
                )}
              </TouchableOpacity>
              <TextInput
                placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
                multiline
                style={styles.postInput}
                autoFocus
                value={newPostText}
                onChangeText={setNewPostText}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* COMMENTS MODAL */}
      <Modal visible={!!selectedPostForComments} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { height: '80%' }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedPostForComments(null)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Comments</Text>
              <View style={{ width: 24 }} />
            </View>
            
            <FlatList
              data={selectedPostForComments?.comments}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: 15 }}
              renderItem={({ item }) => (
                <View style={styles.commentRow}>
                  <View style={[styles.avatar, { width: 30, height: 30, backgroundColor: themeColor }]}>
                    <Text style={[styles.avatarText, { fontSize: 10 }]}>{item.user[0]}</Text>
                  </View>
                  <View style={styles.commentInfo}>
                    <Text style={styles.commentUser}>{item.user}</Text>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                </View>
              )}
              ListEmptyComponent={() => (
                 <Text style={styles.noComments}>No comments yet. Be the first!</Text>
              )}
            />

            <View style={styles.commentInputWrap}>
              <TextInput
                placeholder="Add a comment..."
                style={styles.commentInput}
                value={newCommentText}
                onChangeText={setNewCommentText}
              />
              <TouchableOpacity onPress={handleAddComment}>
                <Text style={[styles.modalPost, { color: themeColor, opacity: newCommentText.trim() ? 1 : 0.5 }]}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F5F8FF" },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },
  createBtn: { padding: 4 },
  listContent: { paddingBottom: 100 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 46,
    borderWidth: 1,
    borderColor: "#E1E8F5",
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: "#333" },
  postCard: {
    backgroundColor: "#fff",
    marginBottom: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E1E8F5",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  headerInfo: { flex: 1 },
  doctorName: { fontWeight: "700", fontSize: 15, color: "#333" },
  specialty: { fontSize: 12, color: "#777", marginTop: 2 },
  postImage: { width: "100%", height: width, backgroundColor: "#EEE" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  leftActions: { flexDirection: "row", alignItems: "center" },
  actionBtn: { flexDirection: "row", alignItems: "center", marginRight: 18 },
  actionText: { marginLeft: 6, fontWeight: "600", color: "#333", fontSize: 14 },
  captionContainer: { paddingHorizontal: 12, paddingBottom: 15 },
  captionName: { fontWeight: "700" },
  caption: { fontSize: 14, color: "#333", lineHeight: 20 },
  viewComments: { fontSize: 13, color: "#777", marginTop: 8 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: 40 },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#EEE' 
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  modalCancel: { color: '#666', fontSize: 16 },
  modalPost: { fontSize: 16, fontWeight: '700' },
  inputWrap: { padding: 20, flexDirection: 'row' },
  pickImageWrap: { alignSelf: 'flex-start' },
  previewImg: { width: 60, height: 60, borderRadius: 10 },
  placeholderImg: { backgroundColor: '#F0F2F5', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc' },
  postInput: { flex: 1, marginLeft: 15, fontSize: 16, textAlignVertical: 'top', minHeight: 100 },
  
  commentRow: { flexDirection: 'row', marginBottom: 15 },
  commentInfo: { flex: 1, marginLeft: 12, backgroundColor: '#F5F8FF', padding: 10, borderRadius: 12 },
  commentUser: { fontWeight: '700', fontSize: 13, color: '#333' },
  commentText: { fontSize: 13, color: '#555', marginTop: 2 },
  noComments: { textAlign: 'center', color: '#999', marginTop: 40 },
  commentInputWrap: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderTopWidth: 1, 
    borderTopColor: '#EEE',
    backgroundColor: '#fff'
  },
  commentInput: { flex: 1, backgroundColor: '#F5F8FF', borderRadius: 20, paddingHorizontal: 15, height: 40, marginRight: 10 },
  glassCard: {
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 20,
    marginHorizontal: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
  },
  glassSearch: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderColor: "rgba(255,255,255,0.5)",
    overflow: "hidden",
  },
});
