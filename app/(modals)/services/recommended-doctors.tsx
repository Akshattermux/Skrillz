import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/* =======================
   DOCTORS DATA (BACKEND READY)
   ======================= */
const DOCTORS = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "12 yrs",
    fee: 800,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    experience: "9 yrs",
    fee: 1000,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Dr. Emily Clark",
    specialty: "Dermatologist",
    experience: "7 yrs",
    fee: 600,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Dr. Rajesh Verma",
    specialty: "Orthopedic",
    experience: "15 yrs",
    fee: 900,
    rating: 4.8,
  },
];

export default function AllDoctors() {
  return (
    <View style={styles.root}>
      {/* HEADER */}
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <Text style={styles.title}>All Doctors</Text>
        <Text style={styles.subtitle}>
          Choose a doctor and view full profile
        </Text>
      </LinearGradient>

      {/* LIST */}
      <FlatList
        data={DOCTORS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <DoctorCard doctor={item} />
        )}
      />
    </View>
  );
}

/* =======================
   DOCTOR CARD
   ======================= */
function DoctorCard({ doctor }: any) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/(modals)/services/doctor-profile",
          params: doctor,
        })
      }
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{doctor.name[0]}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>

        <Text style={styles.meta}>
          ⭐ {doctor.rating} • {doctor.experience}
        </Text>

        <Text style={styles.fee}>₹{doctor.fee} Consultation</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

/* =======================
   STYLES
   ======================= */
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

  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E8",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#CC6600",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  info: {
    flex: 1,
  },
  name: {
    fontWeight: "700",
    fontSize: 15,
  },
  specialty: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    marginTop: 4,
  },
  fee: {
    fontSize: 12,
    marginTop: 6,
    color: "#CC6600",
    fontWeight: "600",
  },
});
