import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useLanguage } from "../context/LanguageContext";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface SharedMessagesProps {
  role: 'patient' | 'doctor';
}

export default function SharedMessages({ role }: SharedMessagesProps) {
  const { t } = useLanguage();
  const isDoctor = role === 'doctor';
  const themeColor = isDoctor ? "#2E86E4" : "#CC6600";
  const gradientColors: [string, string] = isDoctor ? ["#2E86E4", "#8DA7F7"] : ["#E46B2E", "#F78DA7"];
  const bgColor = isDoctor ? "#F5F8FF" : "#FFF3E8";

  const chats = isDoctor ? [
    { id: "1", name: "John Doe", lastMsg: "Thank you for the prescription, Dr.", time: "2m ago", unread: 2, online: true },
    { id: "2", name: "Sarah Smith", lastMsg: "When should I take the next dose?", time: "1h ago", unread: 0, online: false },
    { id: "3", name: "Alice Brown", lastMsg: "The report looks good, thanks!", time: "3h ago", unread: 0, online: true },
    { id: "4", name: "Michael Johnson", lastMsg: "Can we reschedule the meeting?", time: "Yesterday", unread: 1, online: false },
  ] : [
    { id: "1", name: "Dr. Sarah Johnson", lastMsg: "Please start the medication from tomorrow.", time: "10:32 AM", unread: 2, online: true },
    { id: "2", name: "Dr. Michael Chen", lastMsg: "📎 MRI_Report.pdf", time: "Yesterday", unread: 0, online: false },
    { id: "3", name: "Dr. Emily Carter", lastMsg: "Avoid sun exposure for 2 weeks.", time: "Mon", unread: 1, online: false },
  ];

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <LinearGradient colors={gradientColors} style={styles.header}>
        <Text style={styles.title}>{t('messages')}</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            placeholder={isDoctor ? t('search_patient_msg') : t('search_doctor_msg')}
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ACTIVE SECTION */}
        <View style={styles.activeSection}>
          <Text style={styles.sectionTitle}>{t('active_now')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {chats.filter(c => c.online).map((chat) => (
              <View key={chat.id} style={styles.activeAvatar}>
                <View style={[styles.activeCircle, { backgroundColor: themeColor }]}>
                  <Text style={styles.activeText}>
                    {chat.name.split(" ").map(n => n[0]).join("")}
                  </Text>
                </View>
                <View style={styles.activeDot} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* CHAT LIST */}
        <View style={styles.list}>
          {chats.map(chat => (
            <TouchableOpacity 
                key={chat.id} 
                style={[styles.chatCard, { backgroundColor: bgColor }]} 
                onPress={() => router.push("/(modals)/services/consultation-room")}
            >
                <View style={styles.avatarWrap}>
                    <View style={[styles.avatar, { backgroundColor: themeColor }]}>
                        <Text style={styles.avatarText}>{chat.name.split(" ").map(n => n[0]).join("")}</Text>
                    </View>
                    {chat.online && <View style={styles.onlineDot} />}
                </View>

                <View style={styles.chatInfo}>
                    <View style={styles.chatHeader}>
                        <Text style={styles.chatName}>{chat.name}</Text>
                        <Text style={styles.chatTime}>{chat.time}</Text>
                    </View>
                    <Text style={[styles.lastMsg, chat.unread > 0 && styles.unreadMsg]} numberOfLines={1}>
                        {isDoctor ? chat.lastMsg : (chat as any).lastMessage || chat.lastMsg}
                    </Text>
                </View>
                {chat.unread > 0 && (
                    <View style={[styles.badge, { backgroundColor: themeColor }]}>
                        <Text style={styles.badgeText}>{chat.unread}</Text>
                    </View>
                )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* FAB (Only for Doctors) */}
      {isDoctor && (
        <TouchableOpacity style={[styles.fab, { backgroundColor: themeColor }]}>
            <Ionicons name="create-outline" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: { color: "#fff", fontSize: 24, fontWeight: "700" },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 46,
    alignItems: "center",
    marginTop: 15,
  },
  searchInput: { marginLeft: 10, flex: 1, fontSize: 14 },

  activeSection: { marginTop: 20, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 14, fontWeight: "700", marginBottom: 12, color: "#333" },
  activeAvatar: { marginRight: 15, alignItems: "center", position: "relative" },
  activeCircle: { width: 54, height: 54, borderRadius: 27, justifyContent: "center", alignItems: "center" },
  activeText: { color: "#fff", fontWeight: "700" },
  activeDot: { position: "absolute", bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: "#2E7D32", borderWidth: 2, borderColor: "#fff" },

  list: { padding: 20 },
  chatCard: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 18, marginBottom: 12 },
  avatarWrap: { position: "relative" },
  avatar: { width: 50, height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  onlineDot: { position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: "#2E7D32", borderWidth: 2, borderColor: "#fff" },
  chatInfo: { flex: 1, marginLeft: 15 },
  chatHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  chatName: { fontSize: 15, fontWeight: "700", color: "#333" },
  chatTime: { fontSize: 11, color: "#999" },
  lastMsg: { fontSize: 13, color: "#777", marginTop: 4 },
  unreadMsg: { fontWeight: "700", color: "#333" },
  badge: { minWidth: 20, height: 20, borderRadius: 10, justifyContent: "center", alignItems: "center", marginLeft: 10, paddingHorizontal: 6 },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },

  fab: { position: "absolute", bottom: 100, right: 20, width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center", elevation: 5 },
});
