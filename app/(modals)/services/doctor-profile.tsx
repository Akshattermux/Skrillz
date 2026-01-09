import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DoctorProfile() {
  const { name, specialty, experience, fee, rating } =
    useLocalSearchParams<any>();

  return (
    <ScrollView style={styles.root}>
      {/* HEADER */}
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name?.[0]}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.specialty}>{specialty}</Text>
      </LinearGradient>

      {/* INFO */}
      <View style={styles.section}>
        <Info label="Experience" value={experience} />
        <Info label="Rating" value={`⭐ ${rating}`} />
        <Info label="Consultation Fee" value={`₹${fee}`} />
      </View>

      {/* ACTION */}
      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() => router.push("/(modals)/services/book-appointment")}
      >
        <Text style={styles.bookText}>Book Appointment</Text>
      </TouchableOpacity>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

function Info({ label, value }: any) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: "#fff", flex: 1 },

  header: {
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#CC6600",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginTop: 10,
  },
  specialty: {
    color: "#FFE8D9",
    fontSize: 13,
    marginTop: 4,
  },

  section: {
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 13,
    color: "#666",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },

  bookBtn: {
    backgroundColor: "#CC6600",
    height: 54,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  bookText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
