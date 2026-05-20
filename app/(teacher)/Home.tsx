import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { useUser } from "../../src/context/UserContext";
import { useNotifications } from "../../src/context/NotificationContext";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function TeacherHome() {
  const { user } = useUser();
  const { unreadCount } = useNotifications();
  const themeColor = "#00897B";

  const INSIGHTS = [
    { label: "Active Students", value: "2.4k", icon: "people", trend: "+12%" },
    { label: "Hours Live", value: "145h", icon: "videocam", trend: "+5h" },
    { label: "Course Rating", value: "4.9", icon: "star", trend: "+0.1" },
    { label: "Certificates", value: "182", icon: "medal", trend: "+24" },
  ];

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER & BALANCE */}
      <LinearGradient colors={["#00897B", "#4DB6AC"]} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Earnings Dashboard</Text>
            <Text style={styles.headerSubtitle}>Welcome back, {user.name.split(" ")[1]}</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileBtn}
            onPress={() => router.push("/(modals)/notifications")}
          >
            <Ionicons name="notifications" size={24} color="#fff" />
            {unreadCount > 0 && <View style={styles.badge} />}
          </TouchableOpacity>
        </View>

        <BlurView intensity={30} tint="light" style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceValue}>${user.balance.toLocaleString()}</Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.withdrawBtn}>
              <Text style={styles.withdrawText}>Withdraw funds</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.historyBtn}>
               <Ionicons name="time-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </BlurView>
      </LinearGradient>
      
      {/* PRIMARY INSTRUCTOR ACTIONS */}
      <View style={styles.actionSection}>
        <TouchableOpacity 
          style={styles.primaryActionItem}
          onPress={() => router.push("/(teacher)/studio")}
        >
          <LinearGradient colors={["#FF5252", "#FF8A80"]} style={styles.actionIconCell}>
            <Ionicons name="videocam" size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.actionItemLabel}>Go Live</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.primaryActionItem}
          onPress={() => router.push("/(teacher)/studio")}
        >
          <LinearGradient colors={["#00796B", "#00897B"]} style={styles.actionIconCell}>
            <Ionicons name="play-circle" size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.actionItemLabel}>Recorded</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.primaryActionItem}
          onPress={() => router.push("/(teacher)/create-quiz")}
        >
          <LinearGradient colors={["#6200EA", "#7C4DFF"]} style={styles.actionIconCell}>
            <Ionicons name="create" size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.actionItemLabel}>Assignments</Text>
        </TouchableOpacity>
      </View>

      {/* QUICK INSIGHTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Insights & Business</Text>
        <View style={styles.insightGrid}>
          {INSIGHTS.map((item, index) => (
            <View key={index} style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <Ionicons name={item.icon as any} size={20} color={themeColor} />
                <Text style={styles.trendText}>{item.trend}</Text>
              </View>
              <Text style={styles.insightValue}>{item.value}</Text>
              <Text style={styles.insightLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* PROFESSIONAL HUB */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Network</Text>
        <View style={styles.hubGrid}>
          <TouchableOpacity 
            style={styles.hubCard} 
            onPress={() => router.push("/(teacher)/community")}
          >
            <LinearGradient colors={["#00897B", "#4DB6AC"]} style={styles.hubIcon}>
              <Ionicons name="people" size={24} color="#fff" />
            </LinearGradient>
            <Text style={styles.hubTitle}>Feed</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.hubCard} 
            onPress={() => router.push("/(teacher)/library")}
          >
            <LinearGradient colors={["#2E86E4", "#8DA7F7"]} style={styles.hubIcon}>
              <Ionicons name="library" size={24} color="#fff" />
            </LinearGradient>
            <Text style={styles.hubTitle}>E-Library</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.hubCard} 
            onPress={() => router.push("/(teacher)/jobs")}
          >
            <LinearGradient colors={["#FF9100", "#FFB74D"]} style={styles.hubIcon}>
              <Ionicons name="briefcase" size={24} color="#fff" />
            </LinearGradient>
            <Text style={styles.hubTitle}>Job Portal</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* RECENT SALES / TRANSACTIONS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Recent Earnings</Text>
           <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <View style={styles.transactionList}>
           <TransactionItem title="Cardiology Class (Live)" user="Amit S." amount={49} date="Just Now" />
           <TransactionItem title="Yearly Subscription" user="Sarah K." amount={199} date="2 mins ago" />
           <TransactionItem title="Neuro Notes Pack" user="John D." amount={15} date="1 hour ago" />
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

function TransactionItem({ title, user, amount, date }: any) {
  return (
    <View style={styles.txRow}>
      <View style={styles.txIcon}>
         <Ionicons name="arrow-up-circle" size={24} color="#00897B" />
      </View>
      <View style={styles.txInfo}>
         <Text style={styles.txTitle}>{title}</Text>
         <Text style={styles.txUser}>{user} • {date}</Text>
      </View>
      <Text style={styles.txAmount}>+${amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F9FBFA" },
  header: { padding: 25, paddingTop: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  actionSection: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 25, marginTop: -30 },
  primaryActionItem: { backgroundColor: "#fff", width: (width - 70) / 3, paddingVertical: 20, borderRadius: 22, alignItems: "center", elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10 },
  actionIconCell: { width: 44, height: 44, borderRadius: 14, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  actionItemLabel: { fontSize: 13, fontWeight: "800", color: "#333", textAlign: "center" },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30 },
  headerTitle: { color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: "600", letterSpacing: 1 },
  headerSubtitle: { color: "#fff", fontSize: 24, fontWeight: "800" },
  profileBtn: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: "rgba(255,255,255,0.2)", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF5252",
    borderWidth: 1,
    borderColor: "#00897B",
  },
  balanceCard: { padding: 25, borderRadius: 25, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.3)" },
  balanceLabel: { color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: "600" },
  balanceValue: { color: "#fff", fontSize: 42, fontWeight: "800", marginVertical: 10 },
  balanceActions: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  withdrawBtn: { backgroundColor: "#fff", paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, marginRight: 10 },
  withdrawText: { color: "#00897B", fontWeight: "700", fontSize: 14 },
  historyBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.2)", justifyContent: "center", alignItems: "center" },
  section: { padding: 25 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#333" },
  seeAll: { color: "#00897B", fontWeight: "600" },
  insightGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  insightCard: { backgroundColor: "#fff", width: (width - 65) / 2, padding: 20, borderRadius: 20, marginBottom: 15, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 },
  insightHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  trendText: { fontSize: 10, color: "#4CAF50", fontWeight: "700", backgroundColor: "#E8F5E9", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  insightValue: { fontSize: 24, fontWeight: "800", color: "#333" },
  insightLabel: { fontSize: 12, color: "#999", marginTop: 2 },
  hubGrid: { flexDirection: "row", justifyContent: "space-between" },
  hubCard: { backgroundColor: "#fff", width: (width - 70) / 3, padding: 15, borderRadius: 22, alignItems: "center", elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 },
  hubIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  hubTitle: { fontSize: 12, fontWeight: "700", color: "#333", textAlign: "center" },
  transactionList: { backgroundColor: "#fff", borderRadius: 25, padding: 15 },
  txRow: { flexDirection: "row", alignItems: "center", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  txIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#E0F2F1", justifyContent: "center", alignItems: "center" },
  txInfo: { flex: 1, marginLeft: 15 },
  txTitle: { fontSize: 14, fontWeight: "700", color: "#333" },
  txUser: { fontSize: 12, color: "#999", marginTop: 2 },
  txAmount: { fontSize: 15, fontWeight: "700", color: "#00897B" },
});
