import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNotifications, AppNotification } from "@/src/context/NotificationContext";
import { router } from "expo-router";

export default function NotificationsModal() {
  const { notifications, markAllAsRead, clearAll } = useNotifications();

  React.useEffect(() => {
    // Mark all as read when opening notification modal
    markAllAsRead();
  }, []);

  const renderItem = ({ item }: { item: AppNotification }) => {
    let iconName: any = "notifications-outline";
    let iconColor = "#999";

    if (item.type === "live") { iconName = "videocam"; iconColor = "#FF5252"; }
    else if (item.type === "milestone") { iconName = "trending-up"; iconColor = "#FFD700"; }
    else if (item.type === "enrollment") { iconName = "person-add"; iconColor = "#00897B"; }

    return (
      <View style={styles.notificationItem}>
        <View style={[styles.iconBox, { backgroundColor: iconColor + "20" }]}>
          <Ionicons name={iconName} size={22} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {notifications.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
             <Text style={styles.clearText}>Clear all notifications</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={80} color="#DDD" />
          <Text style={styles.emptyText}>No notifications yet</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#333" },
  closeBtn: { padding: 5 },
  list: { padding: 25 },
  notificationItem: { flexDirection: "row", marginBottom: 25 },
  iconBox: { width: 50, height: 50, borderRadius: 15, justifyContent: "center", alignItems: "center", marginRight: 15 },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: "700", color: "#333", marginBottom: 4 },
  message: { fontSize: 14, color: "#666", lineHeight: 20 },
  time: { fontSize: 11, color: "#999", marginTop: 8, fontWeight: "600" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#999", fontSize: 16, fontWeight: "600", marginTop: 15 },
  clearBtn: { margin: 25, paddingVertical: 15, alignItems: "center", borderTopWidth: 1, borderTopColor: "#F0F0F0" },
  clearText: { color: "#FF5252", fontWeight: "700", fontSize: 14 },
});
