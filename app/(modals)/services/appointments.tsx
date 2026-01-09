import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UpcomingAppointments() {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "Tomorrow",
      time: "10:30 AM",
      fee: 800,
      type: "Video Consultation",
      status: "upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Neurologist",
      date: "25 Jan 2026",
      time: "04:00 PM",
      fee: 1000,
      type: "Clinic Visit",
      status: "upcoming",
    },
  ];

  const onCancel = (doctor: string) => {
    Alert.alert(
      "Cancel Appointment",
      `Are you sure you want to cancel your appointment with ${doctor}?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            Alert.alert("Cancelled", "Your appointment has been cancelled.");
          },
        },
      ]
    );
  };

  const onJoin = (doctor: string) => {
    Alert.alert(
      "Join Consultation",
      `Joining your appointment with ${doctor}.`,
      [{ text: "OK" }]
    );
    router.push("/(modals)/services/consultation-room");
  };

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <Text style={styles.title}>Upcoming Appointments</Text>
        <Text style={styles.subtitle}>
          Manage and track your scheduled visits
        </Text>
      </LinearGradient>

      {/* LIST */}
      <View style={styles.section}>
        {appointments.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* TOP */}
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.doctor}>{item.doctor}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
              </View>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>Upcoming</Text>
              </View>
            </View>

            {/* INFO */}
            <View style={styles.infoRow}>
              <InfoItem icon="calendar-outline" text={item.date} />
              <InfoItem icon="time-outline" text={item.time} />
            </View>

            <View style={styles.infoRow}>
              <InfoItem icon="videocam-outline" text={item.type} />
              <InfoItem icon="cash-outline" text={`₹${item.fee}`} />
            </View>

            {/* ACTIONS */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => onCancel(item.doctor)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.joinBtn}
                onPress={() => onJoin(item.doctor)}
              >
                <Text style={styles.joinText}>
                  {item.type.includes("Video") ? "Join" : "Directions"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

/* ---------------- COMPONENTS ---------------- */

function InfoItem({ icon, text }: any) {
  return (
    <View style={styles.infoItem}>
      <Ionicons name={icon} size={14} color="#CC6600" />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingTop: 70,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    color: "#FFE8D9",
    marginTop: 6,
    fontSize: 13,
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },

  card: {
    backgroundColor: "#FFF3E8",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  doctor: {
    fontWeight: "700",
    fontSize: 15,
  },
  specialty: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  badge: {
    backgroundColor: "#CC6600",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },

  infoRow: {
    flexDirection: "row",
    marginTop: 12,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  infoText: {
    fontSize: 12,
    marginLeft: 6,
    color: "#333",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  cancelBtn: {
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 22,
  },
  cancelText: {
    color: "#D32F2F",
    fontSize: 13,
    fontWeight: "600",
  },

  joinBtn: {
    backgroundColor: "#CC6600",
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 26,
  },
  joinText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
