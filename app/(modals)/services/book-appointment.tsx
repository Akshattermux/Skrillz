import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/* =======================
   MOCK DATA (FRONTEND ONLY)
   ======================= */
const DOCTOR = {
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  fee: 800,
};

const DATES = ["Today", "Tomorrow", "Wed", "Thu", "Fri"];

export default function BookAppointment() {
  const [date, setDate] = useState("Today");
  const [type, setType] = useState("Video");
  const [payment, setPayment] = useState("UPI");

  const confirmBooking = () => {
    Alert.alert(
      "Request Appointment",
      `Doctor: ${DOCTOR.name}
Type: ${type}
Date: ${date}
Fee: ₹${DOCTOR.fee}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () =>
            Alert.alert(
              "Request Sent",
              "Your appointment request has been sent to the doctor. They will confirm a time soon."
            ),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <Text style={styles.title}>Book Appointment</Text>
        <Text style={styles.subtitle}>
          Schedule consultation with doctor
        </Text>
      </LinearGradient>

      {/* DOCTOR CARD */}
      <View style={styles.section}>
        <View style={styles.doctorCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SJ</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.docName}>{DOCTOR.name}</Text>
            <Text style={styles.docSpec}>{DOCTOR.specialty}</Text>
          </View>
          <Text style={styles.fee}>₹{DOCTOR.fee}</Text>
        </View>
      </View>

      {/* CONSULTATION TYPE */}
      <Section title="Consultation Type">
        <Choice
          options={["Video", "Audio", "Message"]}
          value={type}
          onSelect={setType}
        />
      </Section>

      {/* DATE */}
      <Section title="Select Date">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {DATES.map((d) => (
            <Chip
              key={d}
              label={d}
              active={date === d}
              onPress={() => setDate(d)}
            />
          ))}
        </ScrollView>
      </Section>

      {/* PAYMENT */}
      <Section title="Payment Method">
        <Choice
          options={["UPI", "Card", "Wallet"]}
          value={payment}
          onSelect={setPayment}
        />
      </Section>

      {/* SUMMARY */}
      <View style={styles.summary}>
        <Text style={styles.summaryRow}>
          Consultation Fee: ₹{DOCTOR.fee}
        </Text>
        <Text style={styles.summaryRow}>Payment Method: {payment}</Text>
      </View>

      {/* CONFIRM */}
      <TouchableOpacity style={styles.confirmBtn} onPress={confirmBooking}>
        <Text style={styles.confirmText}>Request & Pay ₹{DOCTOR.fee}</Text>
      </TouchableOpacity>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

/* =======================
   COMPONENTS
   ======================= */

function Section({ title, children }: any) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Chip({ label, active, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function Choice({ options, value, onSelect }: any) {
  return (
    <View style={styles.choiceRow}>
      {options.map((o: string) => (
        <TouchableOpacity
          key={o}
          style={[
            styles.choice,
            value === o && styles.choiceActive,
          ]}
          onPress={() => onSelect(o)}
        >
          <Text
            style={[
              styles.choiceText,
              value === o && styles.choiceTextActive,
            ]}
          >
            {o}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

/* =======================
   STYLES
   ======================= */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: 70,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: { fontSize: 26, fontWeight: "700", color: "#fff" },
  subtitle: { fontSize: 13, color: "#FFE8D9", marginTop: 6 },

  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },

  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E8",
    borderRadius: 18,
    padding: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#CC6600",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: { color: "#fff", fontWeight: "700" },
  docName: { fontWeight: "700" },
  docSpec: { fontSize: 12, color: "#666" },
  fee: { fontWeight: "700", color: "#CC6600" },

  chip: {
    backgroundColor: "#FFE3C7",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  chipActive: { backgroundColor: "#CC6600" },
  chipText: { fontSize: 12 },
  chipTextActive: { color: "#fff" },

  slotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  slot: {
    width: "48%",
    backgroundColor: "#FFE3C7",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  slotActive: { backgroundColor: "#CC6600" },
  slotText: { fontSize: 12 },
  slotTextActive: { color: "#fff" },

  choiceRow: { flexDirection: "row", flexWrap: "wrap" },
  choice: {
    borderWidth: 1,
    borderColor: "#CC6600",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 10,
    marginBottom: 8,
  },
  choiceActive: { backgroundColor: "#CC6600" },
  choiceText: { fontSize: 12, color: "#CC6600" },
  choiceTextActive: { color: "#fff" },

  summary: {
    backgroundColor: "#FFF3E8",
    margin: 20,
    borderRadius: 18,
    padding: 16,
  },
  summaryRow: { fontSize: 13, marginBottom: 6 },

  confirmBtn: {
    backgroundColor: "#CC6600",
    height: 54,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  confirmText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
