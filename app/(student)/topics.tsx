import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

const CURRICULUM = [
  {
    id: "1",
    subject: "Cardiology",
    icon: "heart",
    color: "#FF4081",
    topics: [
      { id: "101", title: "Acute Myocardial Infarction", importance: "High", done: true },
      { id: "102", title: "Heart Failure Management", importance: "High", done: true },
      { id: "103", title: "Atrial Fibrillation", importance: "Medium", done: false },
    ]
  },
  {
    id: "2",
    subject: "Neurology",
    icon: "brain",
    color: "#7C4DFF",
    topics: [
      { id: "201", title: "Ischemic Stroke", importance: "High", done: true },
      { id: "202", title: "Multiple Sclerosis", importance: "Medium", done: false },
      { id: "203", title: "Epilepsy Syndromes", importance: "High", done: false },
    ]
  },
  {
    id: "3",
    subject: "Surgery",
    icon: "cut",
    color: "#FF6D00",
    topics: [
      { id: "301", title: "Acute Appendicitis", importance: "High", done: false },
      { id: "302", title: "Hernia Repair Techniques", importance: "Medium", done: false },
    ]
  },
];

export default function TopicsScreen() {
  const [data, setData] = useState(CURRICULUM);
  const themeColor = "#6200EA";

  const toggleDone = (subjId: string, topicId: string) => {
    setData(prev => prev.map(subj => {
      if (subj.id !== subjId) return subj;
      return {
        ...subj,
        topics: subj.topics.map(t => t.id === topicId ? { ...t, done: !t.done } : t)
      };
    }));
  };

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
        <Text style={styles.headerTitle}>Systematic Topics</Text>
        <Text style={styles.headerSubtitle}>High-yield medical subjects for quick mastery</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll}>
        {data.map(subj => (
          <View key={subj.id} style={styles.subjectSection}>
            <View style={styles.subjHeader}>
               <View style={[styles.subjIcon, { backgroundColor: subj.color + "20" }]}>
                  <Ionicons name={subj.icon as any} size={20} color={subj.color} />
               </View>
               <Text style={styles.subjTitle}>{subj.subject}</Text>
               <Text style={styles.subjProgress}>
                  {subj.topics.filter(t => t.done).length}/{subj.topics.length} Done
               </Text>
            </View>

            {subj.topics.map(topic => (
              <TouchableOpacity 
                key={topic.id} 
                style={styles.topicCard}
                onPress={() => toggleDone(subj.id, topic.id)}
              >
                <BlurView intensity={20} tint="light" style={styles.topicGlass}>
                  <Ionicons 
                    name={topic.done ? "checkmark-circle" : "ellipse-outline"} 
                    size={22} 
                    color={topic.done ? "#00C853" : "#CCC"} 
                  />
                  <View style={styles.topicInfo}>
                    <Text style={[styles.topicTitle, topic.done && styles.topicDone]}>{topic.title}</Text>
                    <View style={[styles.impBadge, { backgroundColor: topic.importance === "High" ? "#FFEBEE" : "#E3F2FD" }]}>
                       <Text style={[styles.impText, { color: topic.importance === "High" ? "#D32F2F" : "#1976D2" }]}>{topic.importance}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#BBB" />
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
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
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#fff", marginTop: 10 },
  headerSubtitle: { fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4 },
  scroll: { padding: 20, paddingBottom: 150 },
  subjectSection: { marginBottom: 30 },
  subjHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  subjIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center", marginRight: 12 },
  subjTitle: { fontSize: 18, fontWeight: "700", color: "#333", flex: 1 },
  subjProgress: { fontSize: 12, fontWeight: "600", color: "#6200EA" },
  topicCard: { marginBottom: 10, borderRadius: 18, overflow: "hidden", elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, backgroundColor: "#fff" },
  topicGlass: { flexDirection: "row", padding: 15, alignItems: "center", backgroundColor: "rgba(255,255,255,0.6)" },
  topicInfo: { flex: 1, marginLeft: 15 },
  topicTitle: { fontSize: 15, fontWeight: "600", color: "#333", marginBottom: 4 },
  topicDone: { color: "#999", textDecorationLine: "line-through" },
  impBadge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  impText: { fontSize: 10, fontWeight: "800" },
});
