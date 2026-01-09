import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AudioCall() {
  return (
    <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.root}>
      {/* CALL INFO */}
      <View style={styles.top}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>SJ</Text>
        </View>
        <Text style={styles.name}>Dr. Sarah Johnson</Text>
        <Text style={styles.role}>Cardiologist</Text>
        <Text style={styles.status}>Audio Call • 02:14</Text>
      </View>

      {/* CONTROLS */}
      <View style={styles.controls}>
        <Control icon="mic-off-outline" label="Mute" />
        <Control icon="volume-high-outline" label="Speaker" />
        <Control icon="document-text-outline" label="Records" />
      </View>

      {/* END */}
      <TouchableOpacity style={styles.endCall}>
        <Ionicons name="call" size={26} color="#fff" />
        <Text style={styles.endText}>End Call</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

function Control({ icon, label }: any) {
  return (
    <View style={styles.control}>
      <Ionicons name={icon} size={26} color="#fff" />
      <Text style={styles.controlText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: "space-between", padding: 24 },

  top: { alignItems: "center", marginTop: 120 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: { fontSize: 32, fontWeight: "700", color: "#fff" },

  name: { fontSize: 22, fontWeight: "700", color: "#fff" },
  role: { fontSize: 14, color: "#FFE8D9", marginTop: 4 },
  status: { fontSize: 13, color: "#fff", marginTop: 12 },

  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
  },

  control: { alignItems: "center" },
  controlText: { marginTop: 6, color: "#fff", fontSize: 12 },

  endCall: {
    backgroundColor: "#D32F2F",
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  endText: { color: "#fff", fontSize: 16, marginLeft: 8 },
});
