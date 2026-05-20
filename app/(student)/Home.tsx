import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useLanguage } from "../../src/context/LanguageContext";
import { useUser } from "../../src/context/UserContext";

export default function StudentHome() {
  const { t } = useLanguage();
  const { user } = useUser();
  const themeColor = "#6200EA";
  const gradientColors = ["#6200EA", "#B388FF"] as const;

  const [notes, setNotes] = useState([
    { id: "1", title: "Cardiovascular System", content: "Focus on SA node vs AV node regulation...", date: "24 Mar, 2026", color: "#6200EA" },
    { id: "2", title: "Neurology Exam Prep", content: "Reflex arcs and cranial nerves summary...", date: "22 Mar, 2026", color: "#00BFA5" },
  ]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  const handleAddNote = () => {
    if (!newNoteTitle.trim()) return;
    const newNote = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent,
      date: "Just now",
      color: themeColor,
    };
    setNotes([newNote, ...notes]);
    setNewNoteTitle("");
    setNewNoteContent("");
    setShowAddNote(false);
  };

  return (
    <View style={styles.root}>
      {/* Texture Background Background */}
      <ImageBackground 
        source={{ uri: "https://www.transparenttextures.com/patterns/cubes.png" }}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.05, tintColor: themeColor }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={gradientColors} style={styles.header}>
          <View style={styles.headerTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.welcome}>Learning is a journey,</Text>
              <Text style={styles.username}>{user.name.split(' ')[0]}!</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/(student)/profile")} style={styles.miniProfileWrap}>
              <View style={styles.miniProfile}>
                {user.avatar ? (
                  <Image source={{ uri: user.avatar }} style={styles.miniProfileImg} />
                ) : (
                  <Ionicons name="person" size={24} color={themeColor} />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <BlurView intensity={20} tint="light" style={styles.statsGlass}>
            <StatBox label="Courses" value="4" icon="book" />
            <View style={styles.statDivider} />
            <StatBox label="Watch Time" value="12h" icon="time" />
            <View style={styles.statDivider} />
            <StatBox label="Rank" value="#12" icon="trophy" />
          </BlurView>
        </LinearGradient>

        <View style={styles.body}>
          <Text style={styles.sectionTitle}>Next Live Class</Text>
          <TouchableOpacity 
            style={styles.liveCard} 
            onPress={() => {
              if (user.purchasedClasses.includes("l1")) {
                router.push("/(student)/live-class");
              } else {
                router.push({
                  pathname: "/(modals)/payment",
                  params: { type: "class", id: "l1", title: "Advanced Cardiology: Heart Failure", price: "49" }
                });
              }
            }}
          >
            <ImageBackground 
               source={{ uri: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=800" }} 
               style={styles.liveBg}
            >
              <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]} style={styles.liveOverlay}>
                <View style={styles.liveBadge}>
                   <View style={styles.liveDot} />
                   <Text style={styles.liveText}>LIVE NOW</Text>
                </View>
                {!user.purchasedClasses.includes("l1") && (
                  <View style={styles.lockBadge}>
                    <Ionicons name="lock-closed" size={14} color="#fff" />
                    <Text style={styles.lockBadgeText}>$49 to Join</Text>
                  </View>
                )}
                <View style={styles.liveContent}>
                   <Text style={styles.liveTitle}>Advanced Cardiology: Heart Failure Management</Text>
                   <Text style={styles.liveDoctor}>Dr. Akshat Sharma</Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Quick Notes</Text>
            <TouchableOpacity onPress={() => setShowAddNote(true)}>
               <Text style={[styles.seeAll, { color: themeColor }]}>+ Add Note</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.notesContainer}>
            {notes.map(note => (
              <View key={note.id} style={styles.noteItem}>
                <BlurView intensity={40} tint="light" style={styles.noteGlass}>
                  <View style={[styles.noteTag, { backgroundColor: note.color }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.noteTitle}>{note.title}</Text>
                    <Text style={styles.noteSnippet} numberOfLines={1}>{note.content}</Text>
                  </View>
                </BlurView>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickGrid}>
            <QuickAction icon="bulb" title="Quizzes" color="#FF4081" onPress={() => router.push("/(student)/quizzes")} />
            <QuickAction icon="library" title="E-Library" color="#00BFA5" onPress={() => router.push("/(student)/library")} />
            <QuickAction icon="play-circle" title="Classes" color="#7C4DFF" onPress={() => router.push("/(student)/classes")} />
            <QuickAction icon="briefcase" title="Jobs" color="#FF6D00" onPress={() => router.push("/(student)/jobs")} />
            <QuickAction icon="people" title="Community" color="#2979FF" onPress={() => router.push("/(student)/feed")} />
            <QuickAction icon="list-circle" title="Topics" color="#6200EA" onPress={() => router.push("/(student)/topics")} />
          </View>

          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentView}>
            <BlurCard title="Neurology Basics" image="https://images.unsplash.com/photo-1559757175-0eb30cd8c0ef?q=80&w=400" progress={0.8} />
            <BlurCard title="Surgical Ethics" image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400" progress={0.3} />
          </ScrollView>
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Add Note Modal */}
      <Modal visible={showAddNote} animationType="slide" transparent={true}>
         <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.modalOverlay}
         >
            <View style={styles.modalContent}>
               <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>New Note</Text>
                  <TouchableOpacity onPress={() => setShowAddNote(false)}>
                     <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
               </View>
               <TextInput 
                  placeholder="Note Title" 
                  style={styles.modalTitleInput} 
                  value={newNoteTitle}
                  onChangeText={setNewNoteTitle}
                  autoFocus={true}
               />
               <TextInput 
                  placeholder="Start writing..." 
                  style={styles.modalContentInput} 
                  multiline 
                  value={newNoteContent}
                  onChangeText={setNewNoteContent}
               />
               <TouchableOpacity style={styles.saveBtn} onPress={handleAddNote}>
                  <LinearGradient colors={["#6200EA", "#B388FF"]} style={styles.saveGradient}>
                     <Text style={styles.saveText}>Save to Dashboard</Text>
                  </LinearGradient>
               </TouchableOpacity>
            </View>
         </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

function StatBox({ label, value, icon }: any) {
  return (
    <View style={styles.statBox}>
      <Ionicons name={icon} size={16} color="#fff" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function QuickAction({ icon, title, color, onPress }: any) {
  return (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <BlurView intensity={60} tint="light" style={styles.glassInner}>
        <View style={[styles.actionIcon, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text style={styles.actionTitle}>{title}</Text>
      </BlurView>
    </TouchableOpacity>
  );
}

function BlurCard({ title, image, progress }: any) {
  return (
    <TouchableOpacity style={styles.blurCard}>
      <Image source={{ uri: image }} style={styles.blurCardImg} />
      <BlurView intensity={90} tint="light" style={styles.blurCardInfo}>
        <Text style={styles.blurCardTitle} numberOfLines={1}>{title}</Text>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F9FAFF" },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTop: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  welcome: { color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: "600" },
  username: { color: "#fff", fontSize: 26, fontWeight: "800" },
  miniProfileWrap: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 3, borderRadius: 25 },
  miniProfile: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  miniProfileImg: { width: 44, height: 44, borderRadius: 22 },
  statsGlass: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  statBox: { alignItems: "center", flex: 1 },
  statValue: { color: "#fff", fontSize: 18, fontWeight: "700", marginTop: 4 },
  statLabel: { color: "rgba(255,255,255,0.7)", fontSize: 11 },
  statDivider: { width: 1, height: "100%", backgroundColor: "rgba(255,255,255,0.2)" },
  body: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#333", marginBottom: 15, marginTop: 10 },
  liveCard: {
    height: 180,
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  liveBg: { flex: 1 },
  liveOverlay: { flex: 1, justifyContent: "space-between", padding: 15 },
  liveBadge: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,64,129,0.9)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  lockBadge: { position: "absolute", top: 15, right: 15, flexDirection: "row", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  lockBadgeText: { color: "#fff", fontSize: 10, fontWeight: "800", marginLeft: 5 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#fff", marginRight: 6 },
  liveText: { color: "#fff", fontSize: 10, fontWeight: "900" },
  liveContent: { padding: 5 },
  liveTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 4 },
  liveDoctor: { color: "rgba(255,255,255,0.8)", fontSize: 13 },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  actionCard: {
    width: "48%",
    height: 110,
    borderRadius: 22,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  glassInner: { flex: 1, padding: 15, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.6)" },
  actionIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  actionTitle: { fontSize: 14, fontWeight: "700", color: "#333" },
  recentView: { flexDirection: "row", paddingVertical: 10 },
  blurCard: { width: 160, height: 160, borderRadius: 25, marginRight: 15, overflow: "hidden", backgroundColor: "#fff", elevation: 4 },
  blurCardImg: { width: "100%", height: "100%" },
  blurCardInfo: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, backgroundColor: "rgba(255,255,255,0.7)" },
  blurCardTitle: { fontSize: 13, fontWeight: "700", color: "#333", marginBottom: 8 },
  progressBg: { height: 4, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 2 },
  progressFill: { height: "100%", backgroundColor: "#6200EA", borderRadius: 2 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15, marginTop: 10 },
  seeAll: { fontSize: 13, fontWeight: "700" },
  notesContainer: { marginBottom: 20 },
  noteItem: { marginBottom: 10, borderRadius: 16, overflow: "hidden" },
  noteGlass: { flexDirection: "row", padding: 12, alignItems: "center", backgroundColor: "rgba(255,255,255,0.4)" },
  noteTag: { width: 3, height: 30, borderRadius: 2, marginRight: 12 },
  noteTitle: { fontSize: 14, fontWeight: "700", color: "#333" },
  noteSnippet: { fontSize: 12, color: "#666", marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#fff", borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 50 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 },
  modalTitle: { fontSize: 20, fontWeight: "700", color: "#333" },
  modalTitleInput: { fontSize: 18, fontWeight: "700", color: "#333", marginBottom: 15, borderBottomWidth: 1, borderBottomColor: "#EEE", paddingBottom: 10 },
  modalContentInput: { fontSize: 15, color: "#555", minHeight: 120, textAlignVertical: "top" },
  saveBtn: { marginTop: 20, borderRadius: 25, overflow: "hidden" },
  saveGradient: { height: 50, justifyContent: "center", alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
