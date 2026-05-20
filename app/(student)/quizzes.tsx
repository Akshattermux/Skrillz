import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

const QUIZ_CATEGORIES = [
  { id: "1", title: "Cardiology", questions: 25, icon: "heart", color: "#FF4081" },
  { id: "2", title: "Neurology", questions: 30, icon: "brain", color: "#7C4DFF" },
  { id: "3", title: "Pediatrics", questions: 20, icon: "baby", color: "#00BFA5" },
  { id: "4", title: "Surgery", questions: 15, icon: "cut", color: "#FF6D00" },
  { id: "5", title: "Radiology", questions: 18, icon: "scan", color: "#2979FF" },
  { id: "6", title: "Ethics", questions: 12, icon: "shield-checkmark", color: "#00E676" },
];

export default function QuizzesScreen() {
  const themeColor = "#6200EA";
  const gradientColors = ["#6200EA", "#B388FF"] as const;

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.categoryCard} 
      onPress={() => router.push({ pathname: "/(student)/quiz-session", params: { subject: item.title } })}
    >
      <BlurView intensity={20} tint="light" style={styles.cardGlass}>
        <View style={[styles.iconWrap, { backgroundColor: item.color + '20' }]}>
          <Ionicons name={item.icon as any} size={28} color={item.color} />
        </View>
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Text style={styles.categoryInfo}>{item.questions} MCQs • 15 mins</Text>
        <View style={styles.startBtn}>
          <Text style={[styles.startText, { color: item.color }]}>Start Quiz</Text>
          <Ionicons name="arrow-forward" size={16} color={item.color} />
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <ImageBackground 
        source={{ uri: "https://www.transparenttextures.com/patterns/cubes.png" }}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.05, tintColor: themeColor }}
      />
      
      <LinearGradient colors={gradientColors} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Quizzes</Text>
        <Text style={styles.headerSubtitle}>Test your knowledge with daily MCQs</Text>
      </LinearGradient>

      <FlatList
        data={QUIZ_CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F9F5FF" },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  backBtn: { marginBottom: 15 },
  headerTitle: { fontSize: 26, fontWeight: "800", color: "#fff" },
  headerSubtitle: { fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4 },
  list: { padding: 15, paddingBottom: 120 },
  categoryCard: {
    flex: 1,
    margin: 8,
    borderRadius: 25,
    overflow: "hidden",
    height: 180,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: "#fff",
  },
  cardGlass: { flex: 1, padding: 15, alignItems: "center", justifyContent: "center" },
  iconWrap: { width: 56, height: 56, borderRadius: 18, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  categoryTitle: { fontSize: 16, fontWeight: "700", color: "#333", marginBottom: 4 },
  categoryInfo: { fontSize: 11, color: "#777", marginBottom: 12 },
  startBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
  startText: { fontSize: 13, fontWeight: "700" },
});
