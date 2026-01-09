import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ConsultationRoom() {
  const [message, setMessage] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SJ</Text>
          </View>

          <View>
            <Text style={styles.doctor}>Dr. Sarah Johnson</Text>
            <Text style={styles.specialty}>Cardiologist</Text>
          </View>
        </View>

        {/*  PRESSABLE ACTIONS */}
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => router.push("/(modals)/services/audio-call")}
            style={styles.callBtn}
          >
            <Ionicons name="call-outline" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(modals)/services/video-call")}
            style={[styles.callBtn, { marginLeft: 12 }]}
          >
            <Ionicons name="videocam-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* CHAT */}
      <ScrollView
        style={styles.chat}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <PatientBubble
          text="Hello Doctor, I need your help with my heart condition"
          time="10:30 AM"
        />

        <DoctorBubble
          text="Hello! I'm here to help. Can you describe your symptoms?"
          time="10:31 AM"
        />

        <PatientBubble
          text="I've been experiencing chest pain and shortness of breath."
          time="10:32 AM"
        />

        <DoctorBubble
          text="I understand. How long have you been experiencing these symptoms?"
          time="10:33 AM"
        />
      </ScrollView>

      {/* PATIENT HISTORY */}
      <TouchableOpacity
        style={styles.historyToggle}
        onPress={() => setHistoryOpen(!historyOpen)}
      >
        <Ionicons name="document-text-outline" size={18} color="#CC6600" />
        <Text style={styles.historyText}>Patient History</Text>
        <Ionicons
          name={historyOpen ? "chevron-down" : "chevron-up"}
          size={18}
          color="#999"
          style={{ marginLeft: "auto" }}
        />
      </TouchableOpacity>

      {historyOpen && (
        <View style={styles.historyBox}>
          <Text style={styles.historyItem}>• Previous heart attack (2022)</Text>
          <Text style={styles.historyItem}>• Hypertension (5 years)</Text>
          <Text style={styles.historyItem}>
            • Current medication: Atenolol
          </Text>
        </View>
      )}

      {/* UPLOAD */}
      <TouchableOpacity style={styles.uploadBtn}>
        <Ionicons name="cloud-upload-outline" size={18} color="#CC6600" />
        <Text style={styles.uploadText}>
          Upload Prescription / Report
        </Text>
      </TouchableOpacity>

      {/* INPUT */}
      <View style={styles.inputBar}>
        <TouchableOpacity>
          <Ionicons name="attach-outline" size={22} color="#999" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.sendBtn}>
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* =======================
   BUBBLES
   ======================= */

function PatientBubble({ text, time }: any) {
  return (
    <View style={styles.patientWrap}>
      <View style={styles.patientBubble}>
        <Text style={styles.patientText}>{text}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

function DoctorBubble({ text, time }: any) {
  return (
    <View style={styles.doctorWrap}>
      <View style={styles.doctorBubble}>
        <Text style={styles.doctorText}>{text}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

/* =======================
   STYLES
   ======================= */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: { color: "#CC6600", fontWeight: "700" },

  doctor: { color: "#fff", fontWeight: "700" },
  specialty: { color: "#FFE8D9", fontSize: 12 },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  callBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },

  chat: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  patientWrap: {
    alignItems: "flex-start",
    marginBottom: 14,
  },
  patientBubble: {
    backgroundColor: "#FFE3C7",
    borderRadius: 14,
    padding: 12,
    maxWidth: "80%",
  },
  patientText: { fontSize: 13 },
  time: { fontSize: 10, color: "#999", marginTop: 4 },

  doctorWrap: {
    alignItems: "flex-end",
    marginBottom: 14,
  },
  doctorBubble: {
    backgroundColor: "#CC6600",
    borderRadius: 14,
    padding: 12,
    maxWidth: "80%",
  },
  doctorText: { fontSize: 13, color: "#fff" },

  historyToggle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  historyText: { marginLeft: 8, fontWeight: "600" },

  historyBox: {
    backgroundColor: "#FFF3E8",
    padding: 14,
  },
  historyItem: { fontSize: 12, marginBottom: 6 },

  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  uploadText: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#CC6600",
  },

  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  input: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 40,
    marginHorizontal: 10,
    fontSize: 13,
  },

  sendBtn: {
    backgroundColor: "#CC6600",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
