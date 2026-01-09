import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VideoCall() {
  return (
    <View style={styles.root}>
      {/* REMOTE VIDEO */}
      <View style={styles.remote}>
        <Text style={styles.remoteText}>Doctor Video</Text>
      </View>

      {/* LOCAL PREVIEW */}
      <View style={styles.local}>
        <Text style={styles.localText}>You</Text>
      </View>

      {/* CONTROLS */}
      <View style={styles.controls}>
        <IconBtn icon="mic-off-outline" />
        <IconBtn icon="videocam-off-outline" />
        <IconBtn icon="camera-reverse-outline" />
        <IconBtn icon="call-outline" danger />
      </View>
    </View>
  );
}

function IconBtn({ icon, danger }: any) {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        danger && { backgroundColor: "#D32F2F" },
      ]}
    >
      <Ionicons name={icon} size={24} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },

  remote: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  remoteText: { color: "#777" },

  local: {
    position: "absolute",
    right: 16,
    top: 60,
    width: 110,
    height: 160,
    borderRadius: 12,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  localText: { color: "#aaa", fontSize: 12 },

  controls: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  btn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});
