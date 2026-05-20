import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { BlurView } from "expo-blur";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Modal,
} from "react-native";
import { router } from "expo-router";

const DUMMY_NOTES = [
  { id: "1", title: "Cardiovascular System", content: "Focus on SA node vs AV node regulation...", date: "24 Mar, 2026", color: "#6200EA" },
  { id: "2", title: "Neurology Exam Prep", content: "Reflex arcs and cranial nerves summary...", date: "22 Mar, 2026", color: "#00BFA5" },
  { id: "3", title: "Surgical Ethics", content: "Key principles of informed consent...", date: "20 Mar, 2026", color: "#FF6D00" },
];

export default function NotesScreen() {
  const [notes, setNotes] = useState(DUMMY_NOTES);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const themeColor = "#6200EA";

  const handleAddNote = () => {
    if (!newTitle.trim()) return;
    const newNote = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      date: "Just now",
      color: themeColor,
    };
    setNotes([newNote, ...notes]);
    setNewTitle("");
    setNewContent("");
    setShowAdd(false);
  };

  const renderNote = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.noteCard}>
      <BlurView intensity={20} tint="light" style={styles.noteGlass}>
        <View style={[styles.noteTag, { backgroundColor: item.color }]} />
        <View style={styles.noteBody}>
          <Text style={styles.noteTitle}>{item.title}</Text>
          <Text style={styles.noteSnippet} numberOfLines={2}>{item.content}</Text>
          <Text style={styles.noteDate}>{item.date}</Text>
        </View>
        <TouchableOpacity onPress={() => setNotes(prev => prev.filter(n => n.id !== item.id))}>
          <Ionicons name="trash-outline" size={18} color="#999" />
        </TouchableOpacity>
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
      
      <LinearGradient colors={["#6200EA", "#B388FF"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>My Study Notes</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
             <Ionicons name="add" size={24} color="#6200EA" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
           <View style={styles.empty}>
              <Ionicons name="document-text-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>Start adding your medical notes!</Text>
           </View>
        )}
      />

      <Modal visible={showAdd} animationType="slide" transparent={true}>
         <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
               <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>New Note</Text>
                  <TouchableOpacity onPress={() => setShowAdd(false)}>
                     <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
               </View>
               <TextInput 
                  placeholder="Note Title" 
                  style={styles.titleInput} 
                  value={newTitle}
                  onChangeText={setNewTitle}
               />
               <TextInput 
                  placeholder="Start writing..." 
                  style={styles.contentInput} 
                  multiline 
                  value={newContent}
                  onChangeText={setNewContent}
               />
               <TouchableOpacity style={styles.saveBtn} onPress={handleAddNote}>
                  <LinearGradient colors={["#6200EA", "#B388FF"]} style={styles.saveGradient}>
                     <Text style={styles.saveText}>Save Note</Text>
                  </LinearGradient>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F9F5FF" },
  header: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15 },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#fff" },
  addBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", elevation: 4 },
  list: { padding: 20, paddingBottom: 150 },
  noteCard: { marginBottom: 15, borderRadius: 22, overflow: "hidden", elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, backgroundColor: "#fff" },
  noteGlass: { flexDirection: "row", padding: 15, alignItems: "center", backgroundColor: "rgba(255,255,255,0.6)" },
  noteTag: { width: 4, height: 40, borderRadius: 2, marginRight: 15 },
  noteBody: { flex: 1 },
  noteTitle: { fontSize: 16, fontWeight: "700", color: "#333", marginBottom: 4 },
  noteSnippet: { fontSize: 13, color: "#666", lineHeight: 18 },
  noteDate: { fontSize: 11, color: "#999", marginTop: 8 },
  empty: { alignItems: "center", marginTop: 100 },
  emptyText: { color: "#999", marginTop: 15, fontSize: 15 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#fff", borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 50 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 },
  modalTitle: { fontSize: 20, fontWeight: "700", color: "#333" },
  titleInput: { fontSize: 18, fontWeight: "700", color: "#333", marginBottom: 15, borderBottomWidth: 1, borderBottomColor: "#EEE", paddingBottom: 10 },
  contentInput: { fontSize: 15, color: "#555", minHeight: 150, textAlignVertical: "top" },
  saveBtn: { marginTop: 30, borderRadius: 25, overflow: "hidden" },
  saveGradient: { height: 50, justifyContent: "center", alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
