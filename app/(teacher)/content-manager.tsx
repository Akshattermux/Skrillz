import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function ContentManager() {
  const themeColor = "#00897B";

  const TOOLS = [
    { title: "Personal Notes", icon: "document-text", color: "#6200EA", count: "42 Files" },
    { title: "Important Topics", icon: "bookmarks", color: "#FF9100", count: "18 High-Yield" },
    { title: "Resource Library", icon: "folder", color: "#00B0FF", count: "128 MB Used" },
    { title: "Draft Lectures", icon: "time", color: "#9E9E9E", count: "3 Pending" },
  ];

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Content Studio</Text>
        <Text style={styles.headerDesc}>Organize medical resources and student materials</Text>
      </View>

      <View style={styles.grid}>
         {TOOLS.map((tool, idx) => (
           <TouchableOpacity key={idx} style={styles.toolCard}>
              <View style={[styles.iconBox, { backgroundColor: tool.color + "15" }]}>
                 <Ionicons name={tool.icon as any} size={24} color={tool.color} />
              </View>
              <Text style={styles.toolTitle}>{tool.title}</Text>
              <Text style={styles.toolCount}>{tool.count}</Text>
           </TouchableOpacity>
         ))}
      </View>

      {/* RECENTLY ADDED */}
      <View style={styles.section}>
         <Text style={styles.sectionTitle}>Recently Modified</Text>
         <View style={styles.fileList}>
            <FileItem name="Brain_Structure_Notes.v2.pdf" type="pdf" size="2.4 MB" date="Today" />
            <FileItem name="Heart_Failure_Topics.json" type="config" size="12 KB" date="Yesterday" />
         </View>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
         <LinearGradient colors={["#00897B", "#4DB6AC"]} style={styles.fabGrad}>
            <Ionicons name="add" size={32} color="#fff" />
         </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

function FileItem({ name, type, size, date }: any) {
  return (
    <View style={styles.fileRow}>
       <Ionicons 
         name={type === "pdf" ? "document-outline" : "code-working-outline"} 
         size={24} color="#666" 
       />
       <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.fileName}>{name}</Text>
          <Text style={styles.fileInfo}>{size} • {date}</Text>
       </View>
       <TouchableOpacity><Ionicons name="download-outline" size={20} color="#999" /></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F9FBFA" },
  header: { padding: 25, paddingTop: 60, backgroundColor: "#fff" },
  headerTitle: { fontSize: 28, fontWeight: "800", color: "#333" },
  headerDesc: { fontSize: 14, color: "#666", marginTop: 5 },
  grid: { flexDirection: "row", flexWrap: "wrap", padding: 15, justifyContent: "space-between" },
  toolCard: { backgroundColor: "#fff", width: (width - 45) / 2, padding: 20, borderRadius: 24, marginBottom: 15, elevation: 1 },
  iconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: "center", alignItems: "center", marginBottom: 15 },
  toolTitle: { fontSize: 15, fontWeight: "700", color: "#333" },
  toolCount: { fontSize: 12, color: "#999", marginTop: 4 },
  section: { padding: 25 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#333", marginBottom: 20 },
  fileList: { gap: 10 },
  fileRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 15, borderRadius: 18, elevation: 1 },
  fileName: { fontSize: 14, fontWeight: "600", color: "#333" },
  fileInfo: { fontSize: 12, color: "#999", marginTop: 2 },
  fab: { position: "absolute", bottom: 100, right: 25, borderRadius: 30, elevation: 5 },
  fabGrad: { width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center" },
});
