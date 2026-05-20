import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { BlurView } from "expo-blur";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { useLanguage } from "../../src/context/LanguageContext";
import { router } from "expo-router";

const LIVE_CLASSES = [
  {
    id: "l1",
    title: "Advanced Cardiology",
    doctor: "Dr. Akshat Sharma",
    time: "Starting Now",
    students: "1.2k",
    price: "49",
    image: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=400",
  },
  {
    id: "l2",
    title: "Neurological Disorders",
    doctor: "Dr. Sarah Wilson",
    time: "In 30 mins",
    students: "850",
    price: "39",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c0ef?q=80&w=400",
  },
];

const RECORDED_CLASSES = [
  {
    id: "r1",
    title: "Medical Ethics 101",
    doctor: "Dr. Michael Chen",
    duration: "45 mins",
    views: "5.4k",
    price: "19",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400",
  },
  {
    id: "r2",
    title: "Pediatric Nutrition",
    doctor: "Dr. Anna Smith",
    duration: "1h 20m",
    views: "12k",
    price: "29",
    image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=400",
  },
  {
      id: "r3",
      title: "Radiology Basics",
      doctor: "Dr. Robert Roe",
      duration: "55 mins",
      views: "2.1k",
      price: "25",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=400",
    },
];

import { useUser } from "../../src/context/UserContext";

export default function StudentClasses() {
  const { t } = useLanguage();
  const { user } = useUser();
  const [tab, setTab] = useState<"live" | "recorded">("live");
  const themeColor = "#6200EA";
  const gradientColors = ["#6200EA", "#B388FF"] as const;

  const isPurchased = (id: string) => user.purchasedClasses.includes(id);

  const renderClass = ({ item }: { item: any }) => {
    const locked = !isPurchased(item.id);

    return (
      <View style={styles.classCard}>
        <Image source={{ uri: item.image }} style={styles.classImg} />
        
        {/* Indicators */}
        {tab === "live" ? (
          <LinearGradient colors={["#FF4081", "#FF80AB"]} style={styles.liveTag}>
            <Text style={styles.liveTagText}>LIVE</Text>
          </LinearGradient>
        ) : (
          <View style={styles.playBtn}>
            <Ionicons name="play" size={24} color="#fff" />
          </View>
        )}

        <BlurView intensity={80} tint="light" style={styles.classInfoGlass}>
          <Text style={styles.classTitle}>{item.title}</Text>
          <Text style={styles.classDoctor}>{item.doctor}</Text>
          <View style={styles.classFooter}>
            <View style={styles.meta}>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.metaText}>{tab === "live" ? item.time : item.duration}</Text>
            </View>
            <View style={styles.meta}>
              <Ionicons name={tab === "live" ? "people-outline" : "eye-outline"} size={14} color="#666" />
              <Text style={styles.metaText}>{tab === "live" ? `${item.students} Students` : `${item.views} Views`}</Text>
            </View>
          </View>
        </BlurView>

        {locked && (
          <BlurView intensity={60} tint="dark" style={styles.lockOverlay}>
            <Ionicons name="lock-closed" size={40} color="#fff" />
            <Text style={styles.unlockTitle}>Premium Class</Text>
            <TouchableOpacity 
              style={styles.payNowBtn} 
              onPress={() => router.push({
                pathname: "/(modals)/payment",
                params: { type: "class", id: item.id, title: item.title, price: item.price }
              })}
            >
              <LinearGradient colors={["#6200EA", "#B388FF"]} style={styles.payNowGrad}>
                <Text style={styles.payNowText}>Unlock for ${item.price}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        )}

        {!locked && (
          <TouchableOpacity 
            style={StyleSheet.absoluteFill} 
            onPress={() => {
              if (tab === "live") {
                router.push("/(student)/live-class");
              } else {
                router.push({
                   pathname: "/(student)/recorded-player",
                   params: { id: item.id, title: item.title, doctor: item.doctor }
                });
              }
            }} 
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <ImageBackground 
        source={{ uri: "https://www.transparenttextures.com/patterns/cubes.png" }}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.05, tintColor: themeColor }}
      />
      
      <LinearGradient colors={gradientColors} style={styles.header}>
        <Text style={styles.headerTitle}>Medical Classes</Text>
        <BlurView intensity={30} tint="light" style={styles.tabBarGlass}>
          <TouchableOpacity
            style={[styles.tab, tab === "live" && styles.activeTab]}
            onPress={() => setTab("live")}
          >
            <Text style={[styles.tabText, tab === "live" && styles.activeTabText]}>Live Classes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === "recorded" && styles.activeTab]}
            onPress={() => setTab("recorded")}
          >
            <Text style={[styles.tabText, tab === "recorded" && styles.activeTabText]}>Recorded</Text>
          </TouchableOpacity>
        </BlurView>
      </LinearGradient>

      <FlatList
        data={tab === "live" ? LIVE_CLASSES : RECORDED_CLASSES}
        renderItem={renderClass}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F9FAFF" },
  header: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    zIndex: 10,
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#fff", marginBottom: 20 },
  tabBarGlass: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 16, padding: 4, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center", borderRadius: 12 },
  activeTab: { backgroundColor: "#fff" },
  tabText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  activeTabText: { color: "#6200EA" },
  list: { padding: 20, paddingBottom: 150 },
  classCard: {
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    backgroundColor: "#fff",
  },
  classImg: { width: "100%", height: 200 },
  liveTag: { position: "absolute", top: 15, left: 15, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, zIndex: 1 },
  liveTagText: { color: "#fff", fontSize: 10, fontWeight: "900" },
  playBtn: { position: "absolute", top: 15, right: 15, width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", zIndex: 1 },
  classInfoGlass: { padding: 18, backgroundColor: "rgba(255,255,255,0.7)", borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.3)" },
  classTitle: { fontSize: 17, fontWeight: "800", color: "#333", marginBottom: 5 },
  classDoctor: { fontSize: 13, color: "#666", marginBottom: 15 },
  classFooter: { flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "rgba(0,0,0,0.05)", paddingTop: 12 },
  meta: { flexDirection: "row", alignItems: "center" },
  metaText: { fontSize: 12, color: "#666", marginLeft: 4, fontWeight: "600" },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center", padding: 20 },
  unlockTitle: { color: "#fff", fontSize: 20, fontWeight: "800", marginTop: 15, marginBottom: 20 },
  payNowBtn: { borderRadius: 15, overflow: "hidden", minWidth: 160 },
  payNowGrad: { paddingVertical: 12, paddingHorizontal: 20, alignItems: "center" },
  payNowText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
