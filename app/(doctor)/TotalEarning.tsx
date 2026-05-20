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

export default function TotalEarning() {
  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#2E86E4", "#8DA7F7"]} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceAmount}>₹52,480.00</Text>
          <TouchableOpacity style={styles.withdrawBtn}>
            <Text style={styles.withdrawText}>Withdraw funds</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* STATS GRID */}
        <View style={styles.statsGrid}>
          <StatBox label="Today" amount="₹2,450" trend="+12%" />
          <StatBox label="This Week" amount="₹15,200" trend="+5%" />
        </View>

        {/* RECENT ACTIVITY */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        
        <ActivityItem 
          title="Video Consultation" 
          patient="John Doe" 
          time="Today, 2:00 PM" 
          amount="+₹800" 
          type="vcall"
        />
        <ActivityItem 
          title="Audio Consultation" 
          patient="Sarah Smith" 
          time="Today, 3:30 PM" 
          amount="+₹500" 
          type="acall"
        />
        <ActivityItem 
          title="Message Consultation" 
          patient="Mike Ross" 
          time="Yesterday, 8:15 PM" 
          amount="+₹200" 
          type="message"
        />
        <ActivityItem 
          title="Withdrawal" 
          patient="To Bank A/c ...4291" 
          time="22 Mar, 10:00 AM" 
          amount="-₹10,000" 
          type="withdraw"
        />
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

function StatBox({ label, amount, trend }: any) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statAmount}>{amount}</Text>
      <View style={styles.trendBadge}>
        <Text style={styles.trendText}>{trend}</Text>
      </View>
    </View>
  );
}

function ActivityItem({ title, patient, time, amount, type }: any) {
  const getIcon = () => {
    switch (type) {
      case 'vcall': return "videocam";
      case 'acall': return "call";
      case 'message': return "chatbubble-ellipses";
      case 'withdraw': return "arrow-up-circle";
      default: return "cash";
    }
  };

  const getIconBg = () => {
    if (type === 'withdraw') return "#F44336";
    return "#2E86E4";
  };

  return (
    <View style={styles.activityItem}>
      <View style={[styles.iconContainer, { backgroundColor: getIconBg() }]}>
        <Ionicons name={getIcon()} size={20} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activitySub}>{patient} • {time}</Text>
      </View>
      <Text style={[styles.activityAmount, { color: type === 'withdraw' ? '#F44336' : '#2E7D32' }]}>
        {amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  balanceContainer: { alignItems: 'center', marginTop: 10 },
  balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '600' },
  balanceAmount: { color: '#fff', fontSize: 36, fontWeight: '800', marginTop: 5 },
  withdrawBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  withdrawText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  content: { padding: 20 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  statBox: {
    width: '48%',
    backgroundColor: '#F5F8FF',
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E1E8F5',
  },
  statLabel: { color: '#666', fontSize: 12, fontWeight: '600' },
  statAmount: { color: '#333', fontSize: 18, fontWeight: '800', marginTop: 5 },
  trendBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  trendText: { color: '#2E7D32', fontSize: 10, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 15 },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityTitle: { fontSize: 15, fontWeight: '700', color: '#333' },
  activitySub: { fontSize: 12, color: '#777', marginTop: 2 },
  activityAmount: { fontSize: 15, fontWeight: '700' },
});
