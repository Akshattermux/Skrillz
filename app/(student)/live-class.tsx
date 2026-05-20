import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { usePreventScreenCapture } from "expo-screen-capture";
import { useUser } from "../../src/context/UserContext";

const { width } = Dimensions.get("window");

const DUMMY_CHAT = [
  { id: "1", user: "Alice", text: "Great explanation of cardiac output!" },
  { id: "2", user: "Bob", text: "Can you repeat the last point?" },
  { id: "3", user: "Charlie", text: "Hello from Bangalore! 👋" },
];

export default function LiveClassDetail() {
  usePreventScreenCapture();
  const { user } = useUser();
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState(DUMMY_CHAT);
  const [activeTab, setActiveTab] = useState<"chat" | "qna">("chat");

  const player = useVideoPlayer("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");

  useEffect(() => {
    player.play();
    return () => {
      player.pause();
    };
  }, [player]);

  if (!user.purchasedClasses.includes("l1")) {
    return (
      <View style={[styles.root, { justifyContent: "center", alignItems: "center" }]}>
         <ImageBackground 
           source={{ uri: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=1000" }} 
           style={StyleSheet.absoluteFill}
           blurRadius={20}
         />
         <BlurView intensity={90} tint="dark" style={styles.lockFull}>
            <Ionicons name="lock-closed" size={60} color="#fff" />
            <Text style={styles.lockFullTitle}>Class Locked</Text>
            <Text style={styles.lockFullDesc}>You need to purchase this class to join the live session and chat.</Text>
            <TouchableOpacity 
              style={styles.lockFullBtn} 
              onPress={() => router.push({
                pathname: "/(modals)/payment",
                params: { type: "class", id: "l1", title: "Advanced Cardiology", price: "49" }
              })}
            >
               <LinearGradient colors={["#6200EA", "#B388FF"]} style={styles.lockFullGrad}>
                  <Text style={styles.lockFullBtnText}>Unlock Now for $49</Text>
               </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
               <Text style={{ color: "rgba(255,255,255,0.6)", fontWeight: "600" }}>Go Back</Text>
            </TouchableOpacity>
         </BlurView>
      </View>
    );
  }

  const sendMsg = () => {
    if (!msg.trim()) return;
    setChat([...chat, { id: Date.now().toString(), user: "You", text: msg }]);
    setMsg("");
  };

  return (
    <View style={styles.root}>
      {/* VIDEO PLAYER AREA */}
      <View style={styles.videoPlayer}>
        <VideoView 
          player={player} 
          style={styles.videoImg} 
        />
        <LinearGradient colors={["rgba(0,0,0,0.6)", "transparent"]} style={styles.videoOverlay}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={["#FF4081", "#FF80AB"]} style={styles.liveIndicator}>
          <View style={styles.dot} />
          <Text style={styles.liveText}>LIVE</Text>
        </LinearGradient>
      </View>

      {/* INFO AREA */}
      <View style={styles.infoArea}>
        <Text style={styles.title}>Advanced Cardiology: Heart Failure Management</Text>
        <Text style={styles.doctor}>Dr. Akshat Sharma • Cardiologist</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
             <Ionicons name="people" size={16} color="#666" />
             <Text style={styles.statText}>1,240 Watching</Text>
          </View>
          <View style={styles.statItem}>
             <Ionicons name="time" size={16} color="#666" />
             <Text style={styles.statText}>45:12</Text>
          </View>
        </View>
      </View>

      {/* INTERACTION AREA */}
      <View style={styles.interactionArea}>
        <View style={styles.tabHeader}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "chat" && styles.activeTab]} 
            onPress={() => setActiveTab("chat")}
          >
            <Text style={[styles.tabText, activeTab === "chat" && styles.activeTabText]}>Live Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "qna" && styles.activeTab]} 
            onPress={() => setActiveTab("qna")}
          >
             <Text style={[styles.tabText, activeTab === "qna" && styles.activeTabText]}>Ask Question</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={chat}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.chatRow}>
              <Text style={styles.chatUser}>{item.user}: </Text>
              <Text style={styles.chatText}>{item.text}</Text>
            </View>
          )}
          style={styles.chatList}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
          <View style={styles.inputRow}>
            <TextInput
              placeholder={activeTab === "chat" ? "Say something..." : "Ask a question..."}
              style={styles.input}
              value={msg}
              onChangeText={setMsg}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMsg}>
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  videoPlayer: { width: "100%", height: 250, backgroundColor: "#000" },
  videoImg: { width: "100%", height: "100%", opacity: 0.8 },
  videoOverlay: { position: "absolute", top: 0, left: 0, right: 0, height: 80, padding: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
  liveIndicator: { position: "absolute", top: 20, right: 20, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#fff", marginRight: 6 },
  liveText: { color: "#fff", fontSize: 10, fontWeight: "800" },
  playCenter: { position: "absolute", top: "50%", left: "50%", marginTop: -25, marginLeft: -25 },
  infoArea: { padding: 20, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  title: { fontSize: 18, fontWeight: "700", color: "#333", marginBottom: 5 },
  doctor: { fontSize: 14, color: "#666", marginBottom: 15 },
  stats: { flexDirection: "row" },
  statItem: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  statText: { fontSize: 12, color: "#666", marginLeft: 6 },
  interactionArea: { flex: 1 },
  tabHeader: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  tab: { flex: 1, paddingVertical: 15, alignItems: "center" },
  activeTab: { borderBottomWidth: 2, borderBottomColor: "#6200EA" },
  tabText: { fontSize: 14, fontWeight: "600", color: "#999" },
  activeTabText: { color: "#6200EA" },
  chatList: { padding: 15 },
  chatRow: { flexDirection: "row", marginBottom: 10 },
  chatUser: { fontWeight: "700", color: "#6200EA", fontSize: 13 },
  chatText: { color: "#333", fontSize: 13, flex: 1 },
  inputRow: { flexDirection: "row", padding: 15, borderTopWidth: 1, borderTopColor: "#F0F0F0", alignItems: "center" },
  input: { flex: 1, backgroundColor: "#F5F8FF", height: 44, borderRadius: 22, paddingHorizontal: 20, marginRight: 10 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#6200EA", justifyContent: "center", alignItems: "center" },
  lockFull: { padding: 40, borderRadius: 30, alignItems: "center", overflow: "hidden", margin: 20 },
  lockFullTitle: { color: "#fff", fontSize: 24, fontWeight: "800", marginTop: 20 },
  lockFullDesc: { color: "rgba(255,255,255,0.7)", fontSize: 14, textAlign: "center", marginTop: 10, marginBottom: 30 },
  lockFullBtn: { width: "100%", borderRadius: 20, overflow: "hidden" },
  lockFullGrad: { height: 55, justifyContent: "center", alignItems: "center" },
  lockFullBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
