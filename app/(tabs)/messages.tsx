import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

/* =========================
   MOCK CHAT DATA (BACKEND READY)
   ========================= */
const CHATS = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    lastMessage: "Please start the medication from tomorrow.",
    time: "10:32 AM",
    unread: 2,
    online: true,
    muted: false,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    lastMessage: "📎 MRI_Report.pdf",
    time: "Yesterday",
    unread: 0,
    online: false,
    muted: true,
  },
  {
    id: "3",
    name: "Dr. Emily Carter",
    specialty: "Dermatologist",
    lastMessage: "Avoid sun exposure for 2 weeks.",
    time: "Mon",
    unread: 1,
    online: false,
    muted: false,
  },
];

export default function Messages() {
  return (
    <View style={styles.root}>
      {/* HEADER */}
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Ionicons name="search-outline" size={22} color="#fff" />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ACTIVE DOCTORS */}
        <View style={styles.activeSection}>
          <Text style={styles.sectionTitle}>Active Now</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CHATS.filter(c => c.online).map((doc) => (
              <View key={doc.id} style={styles.activeAvatar}>
                <View style={styles.activeCircle}>
                  <Text style={styles.activeText}>
                    {doc.name
                      .split(" ")
                      .map(n => n[0])
                      .join("")}
                  </Text>
                </View>
                <View style={styles.activeDot} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* CHAT LIST */}
        <View style={styles.list}>
          {CHATS.map(chat => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

/* =========================
   CHAT ITEM
   ========================= */
function ChatItem({ chat }: any) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.chat}
      onPress={() =>
        router.push("/(modals)/services/consultation-room")
      }
    >
      {/* AVATAR */}
      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {chat.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </Text>
        </View>

        {chat.online && <View style={styles.onlineDot} />}
      </View>

      {/* INFO */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{chat.name}</Text>
          {chat.muted && (
            <Ionicons
              name="volume-mute-outline"
              size={14}
              color="#999"
            />
          )}
        </View>

        <Text style={styles.specialty}>{chat.specialty}</Text>

        <Text style={styles.preview} numberOfLines={1}>
          {chat.lastMessage}
        </Text>
      </View>

      {/* META */}
      <View style={styles.meta}>
        <Text style={styles.time}>{chat.time}</Text>

        {chat.unread > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{chat.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

/* =========================
   STYLES
   ========================= */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 150,
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },

  activeSection: {
    marginTop: 18,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },

  activeAvatar: {
    marginRight: 14,
    alignItems: "center",
  },
  activeCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#CC6600",
    justifyContent: "center",
    alignItems: "center",
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },
  activeDot: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2E7D32",
    borderWidth: 2,
    borderColor: "#fff",
  },

  list: {
    paddingHorizontal: 12,
    marginTop: 10,
  },

  chat: {
    flexDirection: "row",
    backgroundColor: "#FFF3E8",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
  },

  avatarWrap: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#CC6600",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2E7D32",
    borderWidth: 2,
    borderColor: "#FFF3E8",
  },

  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
  },
  specialty: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  preview: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
  },

  meta: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginLeft: 8,
  },
  time: {
    fontSize: 11,
    color: "#999",
  },
  badge: {
    backgroundColor: "#CC6600",
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});
