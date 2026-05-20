import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function TeacherStudio() {
  const themeColor = "#00897B";

  const ACTIONS = [
    { id: "live", title: "Go Live Now", desc: "Start a real-time lecture", icon: "videocam", color: "#FF5252" },
    { id: "schedule", title: "Schedule Class", desc: "Plan a future session", icon: "calendar", color: "#00897B" },
    { id: "record", title: "Record Lesson", desc: "Save for E-Library", icon: "mic", color: "#7C4DFF" },
    { id: "upload", title: "Upload Video", desc: "Import from gallery", icon: "cloud-upload", color: "#03A9F4" },
  ];

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Teacher Studio</Text>
        <Text style={styles.headerDesc}>Manage your live streams and recorded lectures</Text>
      </View>

      {/* PRIMARY ACTIONS */}
      <View style={styles.grid}>
        {ACTIONS.map((action) => (
          <TouchableOpacity 
            key={action.id} 
            style={styles.actionCard}
            onPress={() => {
              if (action.id === "schedule") router.push("/(teacher)/schedule");
            }}
          >
            <View style={[styles.iconBox, { backgroundColor: action.color + "15" }]}>
              <Ionicons name={action.icon as any} size={28} color={action.color} />
            </View>
            <Text style={styles.actionTitle}>{action.title}</Text>
            <Text style={styles.actionDesc}>{action.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* STREAMING STATS (Mini Insights) */}
      <View style={styles.statsPanel}>
         <Text style={styles.panelTitle}>Studio Analytics</Text>
         <View style={styles.statsRow}>
            <View style={styles.statCenter}>
               <Text style={styles.statVal}>8.2k</Text>
               <Text style={styles.statLab}>Total Views</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCenter}>
               <Text style={styles.statVal}>94%</Text>
               <Text style={styles.statLab}>Retention</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCenter}>
               <Text style={styles.statVal}>$42k</Text>
               <Text style={styles.statLab}>Rev. Projection</Text>
            </View>
         </View>
      </View>

      {/* SCHEDULED CLASSES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
        <View style={styles.scheduleList}>
           <ScheduleItem 
             title="Neuroanatomy Basics" 
             time="Today, 6:00 PM" 
             thumbnail="https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000" 
           />
           <ScheduleItem 
             title="Cardiology Advanced" 
             time="Tomorrow, 10:00 AM" 
             thumbnail="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=1000" 
           />
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

function ScheduleItem({ title, time, thumbnail }: any) {
  return (
    <View style={styles.scheduleRow}>
       <Image source={{ uri: thumbnail }} style={styles.thumb} />
       <View style={styles.scheduleInfo}>
          <Text style={styles.scheduleTitle}>{title}</Text>
          <Text style={styles.scheduleTime}>{time}</Text>
       </View>
       <TouchableOpacity style={styles.editBtn}>
          <Ionicons name="ellipsis-vertical" size={20} color="#999" />
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F9FBFA" },
  header: { padding: 25, paddingTop: 60, backgroundColor: "#fff" },
  headerTitle: { fontSize: 28, fontWeight: "800", color: "#333" },
  headerDesc: { fontSize: 14, color: "#666", marginTop: 5 },
  grid: { flexDirection: "row", flexWrap: "wrap", padding: 15, justifyContent: "space-between" },
  actionCard: { backgroundColor: "#fff", width: (width - 45) / 2, padding: 20, borderRadius: 24, marginBottom: 15, elevation: 2 },
  iconBox: { width: 56, height: 56, borderRadius: 18, justifyContent: "center", alignItems: "center", marginBottom: 15 },
  actionTitle: { fontSize: 16, fontWeight: "700", color: "#333" },
  actionDesc: { fontSize: 12, color: "#999", marginTop: 4 },
  statsPanel: { margin: 25, backgroundColor: "#004D40", borderRadius: 25, padding: 25 },
  panelTitle: { color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: "600", marginBottom: 20 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  statCenter: { alignItems: "center" },
  statVal: { color: "#fff", fontSize: 20, fontWeight: "800" },
  statLab: { color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 4 },
  statDivider: { width: 1, height: 30, backgroundColor: "rgba(255,255,255,0.1)" },
  section: { padding: 25 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#333", marginBottom: 20 },
  scheduleList: { gap: 15 },
  scheduleRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 18, elevation: 1 },
  thumb: { width: 70, height: 50, borderRadius: 10 },
  scheduleInfo: { flex: 1, marginLeft: 15 },
  scheduleTitle: { fontSize: 14, fontWeight: "700", color: "#333" },
  scheduleTime: { fontSize: 12, color: "#999", marginTop: 2 },
  editBtn: { padding: 10 },
});
