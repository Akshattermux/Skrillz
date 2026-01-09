import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PatientHome() {
  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.welcome}>Welcome back,</Text>
          <Text style={styles.username}>John Doe</Text>

          <TouchableOpacity style={styles.roleSwitch}>
            <Text style={styles.roleText}>Patient Dashboard</Text>
            <Ionicons name="chevron-down" size={14} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            placeholder="Find a specialist, hospital, service"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>
      </LinearGradient>

      {/* QUICK ACTIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionsRow}>
          <ActionCard
            icon="calendar-outline"
            title="Re-Book Appointment"
            subtitle="Book appointment with recently visited doctor"
            onPress={() => router.push("/(modals)/services/book-appointment")}
          />

          <ActionCard
            icon="medical-outline"
            title="Doctor Consultation"
            subtitle="Join scheduled meeting"
            onPress={() => router.push("/(modals)/services/consultation-room")}
          />
        </View>

        <View style={styles.actionsRow}>
          <ActionCard
            icon="document-text-outline"
            title="Medical Records"
            subtitle="Reports & history"
            onPress={() => router.push("/(modals)/services/medical-records")}
          />

          <ActionCard
            icon="receipt-outline"
            title="Prescriptions"
            subtitle="Active & past"
            onPress={() => router.push("/(modals)/services/prescriptions")}
          />
        </View>
      </View>

      {/* HEALTH STATS */}
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Your Health Stats</Text>
          <Text onPress={()=>router.push("/(modals)/services/health-status")} style={styles.link}>View Details</Text>
        </View>

        <View style={styles.statsRow}>
          <StatBox count="12" label="Consultations" />
          <StatBox count="8" label="Prescriptions" />
          <StatBox count="5" label="Reports" />
        </View>
      </View>

      {/* UPCOMING APPOINTMENTS */}
      <View style={styles.section}>
        <View  style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          <Text onPress={()=>router.push("/(modals)/services/appointments")} style={styles.link}>View All</Text>
        </View>

        <AppointmentCard />
      </View>

      {/* RECOMMENDED DOCTORS */}
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Recommended Doctors</Text>
          <Text onPress={()=>router.push("/(modals)/services/recommended-doctors")} style={styles.link}>View All</Text>
        </View>

        <DoctorCard
          name="Dr. Sarah Johnson"
          specialty="Cardiologist"
          rating="4.9"
          patients="2.3k"
        />
        <DoctorCard
          name="Dr. Michael Chen"
          specialty="Neurologist"
          rating="4.8"
          patients="1.8k"
        />
      </View>

      

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ActionCard({ icon, title, subtitle, onPress }: any) {
  return (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <Ionicons name={icon} size={26} color="#CC6600" />
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

function StatBox({ count, label }: any) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function AppointmentCard() {
  return (
    <View style={styles.appointmentCard}>
      <View>
        <Text style={styles.appointmentTitle}>General Checkup</Text>
        <Text style={styles.appointmentSub}>Dr. Sarah Johnson</Text>
        <Text style={styles.appointmentDate}>Tomorrow • 10:30 AM</Text>
      </View>
      <TouchableOpacity onPress={()=>router.push("/(modals)/services/consultation-room")} style={styles.joinBtn}>
        <Text  style={styles.joinText}>Join</Text>
      </TouchableOpacity>
    </View>
  );
}

function DoctorCard({ name, specialty, rating, patients }: any) {
  return (
    <View style={styles.doctorCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{name[0]}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.doctorName}>{name}</Text>
        <Text style={styles.doctorSpec}>{specialty}</Text>
        <Text style={styles.doctorMeta}>
          ⭐ {rating} • {patients} patients
        </Text>
      </View>

      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() => router.push("/(modals)/services/book-appointment")}
      >
        <Text style={styles.bookText}>Book</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: { marginBottom: 20 },
  welcome: { color: "#FFE8D9", fontSize: 13 },
  username: { color: "#fff", fontSize: 26, fontWeight: "700" },
  roleSwitch: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  roleText: { color: "#fff", marginRight: 6, fontSize: 12 },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    height: 46,
  },
  searchInput: { marginLeft: 8, flex: 1 },

  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: "700" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: { color: "#CC6600", fontSize: 13 },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  actionCard: {
    width: "48%",
    backgroundColor: "#FFF3E8",
    borderRadius: 16,
    padding: 16,
  },
  actionTitle: { fontWeight: "600", marginTop: 8 },
  actionSubtitle: { fontSize: 12, color: "#777", marginTop: 4 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  statBox: {
    width: "31%",
    backgroundColor: "#FFF3E8",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
  },
  statCount: { fontSize: 18, fontWeight: "700", color: "#CC6600" },
  statLabel: { fontSize: 12, color: "#666", marginTop: 4 },

  appointmentCard: {
    backgroundColor: "#FFF3E8",
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appointmentTitle: { fontWeight: "600" },
  appointmentSub: { fontSize: 12, color: "#666", marginTop: 2 },
  appointmentDate: { fontSize: 12, marginTop: 4 },
  joinBtn: {
    backgroundColor: "#CC6600",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinText: { color: "#fff", fontSize: 12 },

  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E8",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#CC6600",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontWeight: "700" },
  doctorName: { fontWeight: "600" },
  doctorSpec: { fontSize: 12, color: "#666" },
  doctorMeta: { fontSize: 12, marginTop: 4 },

  bookBtn: {
    backgroundColor: "#CC6600",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  bookText: { color: "#fff", fontSize: 12 },

  emergencyBtn: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: "#D32F2F",
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  emergencyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
