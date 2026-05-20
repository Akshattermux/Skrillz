import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import { BlurView } from "expo-blur";
import { useLanguage } from "../context/LanguageContext";
import { useUser } from "../context/UserContext";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const CATEGORIES = ["All", "Cardiology", "Neurology", "Pediatrics", "Surgery", "Research"];

const DUMMY_BOOKS = [
  {
    id: "1",
    title: "The Heart: A Modern Guide",
    author: "Dr. Akshat Sharma",
    category: "Cardiology",
    image: "https://images.unsplash.com/photo-1505751172107-1678148bca32?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    title: "Neuroscience 2024",
    author: "Brain Institute",
    category: "Neurology",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c0ef?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "3",
    title: "Pediatric Care Fundamentals",
    author: "Global Health",
    category: "Pediatrics",
    image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    reviews: 56,
  },
  {
    id: "4",
    title: "Surgical Techniques",
    author: "Dr. Michael Chen",
    category: "Surgery",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    reviews: 210,
  },
];

interface SharedLibraryProps {
    themeColor?: string;
    gradientColors?: string[];
    bgColor?: string;
    glassmorphism?: boolean;
}

export default function SharedLibrary({ 
  themeColor = "#2E86E4", 
  gradientColors = ["#2E86E4", "#8DA7F7"], 
  bgColor = "#F5F8FF", 
  glassmorphism 
}: SharedLibraryProps) {
  const { t } = useLanguage();
  const { user } = useUser();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = DUMMY_BOOKS.filter(book => {
    const matchesCategory = activeCategory === "All" || book.category === activeCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderBookItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.bookCard, glassmorphism && styles.glassCard]}>
      <Image source={{ uri: item.image }} style={styles.bookCover} />
      <BlurView intensity={glassmorphism ? 80 : 0} tint="light" style={styles.bookInfo}>
        <Text style={[styles.categoryLabel, { color: themeColor }]}>{item.category}</Text>
        <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.authorName}>{item.author}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating} ({item.reviews})</Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.root, { backgroundColor: bgColor }]}>
      <LinearGradient colors={gradientColors || ["#2E86E4", "#8DA7F7"]} style={styles.header}>
        <Text style={styles.headerTitle}>{t('medical_library') || 'Medical E-Library'}</Text>
        <View style={[styles.searchContainer, glassmorphism && styles.glassSearch]}>
          {glassmorphism && <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />}
          <Ionicons name="search" size={20} color={glassmorphism ? "#fff" : "#999"} style={styles.searchIcon} />
          <TextInput
            placeholder={t('search_books') || "Search medical books, journals..."}
            style={[styles.searchInput, { color: glassmorphism ? "#fff" : "#333" }]}
            placeholderTextColor={glassmorphism ? "rgba(255,255,255,0.6)" : "#999"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      {glassmorphism && (
        <ImageBackground 
            source={{ uri: "https://www.transparenttextures.com/patterns/cubes.png" }}
            style={StyleSheet.absoluteFill}
            imageStyle={{ opacity: 0.05, tintColor: themeColor }}
        />
      )}

      <View style={{ height: 60, marginTop: 10 }}>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15, alignItems: 'center' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setActiveCategory(item)}
              style={[
                styles.categoryChip,
                activeCategory === item && { backgroundColor: themeColor }
              ]}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === item && { color: "#fff" }
              ]}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>

      {glassmorphism && user.subscriptionStatus === "none" ? (
        <View style={styles.subContainer}>
           <BlurView intensity={80} tint="dark" style={styles.subBlur}>
              <Ionicons name="lock-closed" size={50} color="#fff" />
              <Text style={styles.subTitle}>Subscription Required</Text>
              <Text style={styles.subDesc}>Get unlimited access to thousands of medical books, journals, and research papers.</Text>
              
              <TouchableOpacity 
                style={styles.planCard} 
                onPress={() => router.push({
                   pathname: "/(modals)/payment",
                   params: { type: "subscription", id: "monthly", title: "Monthly Pro Plan", price: "29" }
                })}
              >
                 <View style={styles.planInfo}>
                    <Text style={styles.planTitle}>Monthly Pro</Text>
                    <Text style={styles.planPrice}>$29 / month</Text>
                 </View>
                 <View style={styles.planBadge}>
                    <Text style={styles.planBadgeText}>SELECT</Text>
                 </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.planCard, styles.planCardActive]} 
                onPress={() => router.push({
                   pathname: "/(modals)/payment",
                   params: { type: "subscription", id: "yearly", title: "Yearly Mastery Plan", price: "199" }
                })}
              >
                 <View style={styles.planInfo}>
                    <Text style={[styles.planTitle, { color: "#fff" }]}>Yearly Mastery</Text>
                    <Text style={[styles.planPrice, { color: "rgba(255,255,255,0.7)" }]}>$199 / year</Text>
                 </View>
                 <View style={[styles.planBadge, { backgroundColor: "#fff" }]}>
                    <Text style={[styles.planBadgeText, { color: themeColor }]}>BEST VALUE</Text>
                 </View>
              </TouchableOpacity>
           </BlurView>
        </View>
      ) : (
        <FlatList
          data={filteredBooks}
          numColumns={2}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Ionicons name="book-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>No books found matching your criteria.</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 15 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 46,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: "100%", color: "#333", fontSize: 14 },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E1E8F5",
  },
  categoryText: { fontSize: 13, fontWeight: "600", color: "#666" },
  listContent: { padding: 10, paddingBottom: 100 },
  bookCard: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E1E8F5",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  bookCover: { width: "100%", height: 160 },
  bookInfo: { padding: 12 },
  categoryLabel: { fontSize: 10, fontWeight: "700", color: "#2E86E4", textTransform: "uppercase", marginBottom: 4 },
  bookTitle: { fontSize: 14, fontWeight: "700", color: "#333", marginBottom: 4 },
  authorName: { fontSize: 12, color: "#777", marginBottom: 8 },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  ratingText: { fontSize: 11, fontWeight: "600", color: "#666", marginLeft: 4 },
  emptyContainer: { alignItems: "center", marginTop: 100 },
  emptyText: { color: "#999", marginTop: 15, fontSize: 14, textAlign: "center", paddingHorizontal: 40 },
  glassCard: {
    backgroundColor: "rgba(255,255,255,0.4)",
    borderColor: "rgba(255,255,255,0.3)",
    elevation: 4,
  },
  glassSearch: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
  },
  subContainer: { flex: 1, padding: 20, justifyContent: "center" },
  subBlur: { padding: 30, borderRadius: 30, alignItems: "center", overflow: "hidden" },
  subTitle: { color: "#fff", fontSize: 24, fontWeight: "800", marginTop: 20 },
  subDesc: { color: "rgba(255,255,255,0.7)", fontSize: 14, textAlign: "center", marginTop: 10, marginHorizontal: 10, marginBottom: 30 },
  planCard: { width: "100%", flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 18, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  planCardActive: { backgroundColor: "#6200EA", borderColor: "#B388FF", borderWidth: 2 },
  planInfo: { flex: 1 },
  planTitle: { fontSize: 16, fontWeight: "700", color: "#fff" },
  planPrice: { fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 2 },
  planBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.2)" },
  planBadgeText: { fontSize: 10, fontWeight: "800", color: "#fff" },
});
