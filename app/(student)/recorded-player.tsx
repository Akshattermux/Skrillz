import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { VideoView } from "expo-video";
import { usePreventScreenCapture } from "expo-screen-capture";
import { BlurView } from "expo-blur";
import { useVideo } from "@/src/context/VideoContext";

export default function RecordedPlayer() {
  usePreventScreenCapture();
  const { id, title, doctor, videoUrl } = useLocalSearchParams();
  const { player, playVideo, setIsMinimized, activeVideo } = useVideo();

  useEffect(() => {
    if (!activeVideo || activeVideo.id !== id) {
      playVideo({
        id: id as string,
        title: title as string,
        doctor: doctor as string,
        videoUrl: (videoUrl as string) || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      });
    }
    setIsMinimized(false);

    return () => {
      setIsMinimized(true);
    };
  }, [id]);

  return (
    <View style={styles.root}>
      {/* VIDEO AREA */}
      <View style={styles.playerContainer}>
        <VideoView 
          player={player} 
          style={styles.video} 
        />
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
           <BlurView intensity={30} tint="light" style={styles.backBlur}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
           </BlurView>
        </TouchableOpacity>
      </View>

      {/* CONTENT AREA */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
           <Text style={styles.title}>{title}</Text>
           <Text style={styles.doctor}>{doctor}</Text>
        </View>

        <View style={styles.descriptionCard}>
           <Text style={styles.descTitle}>Lecture Description</Text>
           <Text style={styles.descText}>
             In this comprehensive session, we explore the fundamental principles and advanced techniques 
             required for mastery in this field. This recorded lecture includes detailed visual aids 
             and case studies discussed during the live session.
           </Text>
        </View>

        <View style={styles.resourceSection}>
           <Text style={styles.sectionTitle}>Lecture Resources</Text>
           <TouchableOpacity style={styles.resourceItem}>
              <Ionicons name="document-text-outline" size={20} color="#6200EA" />
              <Text style={styles.resourceText}>Lecture PDF Notes</Text>
              <Ionicons name="download-outline" size={18} color="#999" />
           </TouchableOpacity>
           <TouchableOpacity style={styles.resourceItem}>
              <Ionicons name="images-outline" size={20} color="#6200EA" />
              <Text style={styles.resourceText}>Case Study Slides</Text>
              <Ionicons name="download-outline" size={18} color="#999" />
           </TouchableOpacity>
        </View>
      </ScrollView>

      {/* BOTTOM ACTION */}
      <View style={styles.footer}>
         <TouchableOpacity style={styles.completeBtn}>
            <LinearGradient colors={["#6200EA", "#B388FF"]} style={styles.completeGrad}>
               <Text style={styles.completeText}>Complete Lecture</Text>
               <Ionicons name="checkmark-circle" size={20} color="#fff" style={{ marginLeft: 8 }} />
            </LinearGradient>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F9FAFF" },
  playerContainer: { width: "100%", height: 260, backgroundColor: "#000" },
  video: { width: "100%", height: "100%" },
  backBtn: { position: "absolute", top: 50, left: 20 },
  backBlur: { width: 44, height: 44, borderRadius: 22, justifyContent: "center", alignItems: "center", overflow: "hidden" },
  content: { flex: 1, padding: 25 },
  header: { marginBottom: 30 },
  title: { fontSize: 24, fontWeight: "800", color: "#333", marginBottom: 8 },
  doctor: { fontSize: 16, color: "#666", fontWeight: "600" },
  descriptionCard: { backgroundColor: "#fff", padding: 20, borderRadius: 20, marginBottom: 25, elevation: 2 },
  descTitle: { fontSize: 15, fontWeight: "700", color: "#333", marginBottom: 10 },
  descText: { fontSize: 14, color: "#666", lineHeight: 22 },
  resourceSection: { marginBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#333", marginBottom: 15 },
  resourceItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 15, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: "#E1E8F5" },
  resourceText: { flex: 1, marginLeft: 12, fontSize: 14, fontWeight: "600", color: "#444" },
  footer: { padding: 20, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#EEE" },
  completeBtn: { borderRadius: 18, overflow: "hidden" },
  completeGrad: { height: 56, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  completeText: { color: "#fff", fontSize: 18, fontWeight: "800" },
});
