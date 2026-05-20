import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useLanguage } from "../../src/context/LanguageContext";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

/* ==========================
   MOCK DOCTORS (BACKEND READY)
   ========================== */
const DOCTORS = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "12 yrs",
    fee: 499,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    experience: "9 yrs",
    fee: 699,
    rating: 4.8,
  },
];

export default function Appointments() {
  const { t } = useLanguage();
  const [doctor, setDoctor] = useState<any>(null);
  const [date, setDate] = useState("Today");
  const [type, setType] = useState("video");

  const CONSULT_TYPES = [
    { id: "video", label: t('video_call'), icon: "videocam-outline" },
    { id: "audio", label: t('audio_call'), icon: "call-outline" },
    { id: "clinic", label: t('clinic_visit'), icon: "location-outline" },
  ];

  const total = doctor ? doctor.fee : 0;

  const confirmBooking = () => {
    if (!doctor) {
      Alert.alert("Incomplete", "Please select a doctor to continue.");
      return;
    }

    Alert.alert(
      "Request Sent",
      `Your appointment request with ${doctor.name} has been sent. The doctor will confirm a time slot soon.`,
      [{ text: "OK" }]
    );
  };

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <Text style={styles.title}>{t('appointments')}</Text>
        <Text style={styles.subtitle}>
          {t('choose_doctor_date')}
        </Text>
      </LinearGradient>

      {/* DOCTORS */}
      <Section title={t('select_doctor')}>
        {DOCTORS.map((d) => (
          <TouchableOpacity
            key={d.id}
            style={[
              styles.doctorCard,
              doctor?.id === d.id && styles.activeCard,
            ]}
            onPress={() => setDoctor(d)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {d.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.docName}>{d.name}</Text>
              <Text style={styles.docMeta}>
                {d.specialty} • {d.experience}
              </Text>
              <Text style={styles.docRating}>⭐ {d.rating}</Text>
            </View>

            <Text style={styles.fee}>₹{d.fee}</Text>
          </TouchableOpacity>
        ))}
      </Section>

      {/* DATE */}
      <Section title={t('select_date')}>
        <View style={styles.row}>
          {[t('today'), t('tomorrow'), "Next Day"].map((d) => (
            <Chip
              key={d}
              label={d}
              active={date === d}
              onPress={() => setDate(d)}
            />
          ))}
        </View>
      </Section>

      {/* CONSULT TYPE */}
      <Section title={t('consult_type')}>
        <View style={styles.row}>
          {CONSULT_TYPES.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[
                styles.typeCard,
                type === c.id && styles.activeType,
              ]}
              onPress={() => setType(c.id)}
            >
              <Ionicons
                name={c.icon as any}
                size={22}
                color={type === c.id ? "#fff" : "#CC6600"}
              />
              <Text
                style={[
                  styles.typeText,
                  type === c.id && { color: "#fff" },
                ]}
              >
                {c.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Section>

      {/* PAYMENT */}
      {doctor && (
        <Section title={t('payment_summary')}>
          <Row label={t('consult_fee')} value={`₹${doctor.fee}`} />
          <Row label={t('platform_charges')} value="₹0" />
          <Row label={t('total_payable')} value={`₹${total}`} bold />
        </Section>
      )}

      {/* CONFIRM */}
      <TouchableOpacity style={styles.payBtn} onPress={confirmBooking}>
        <Ionicons name="send-outline" size={18} color="#fff" />
        <Text style={styles.payText}>{t('request_appointment')}</Text>
      </TouchableOpacity>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

/* ==========================
   REUSABLE COMPONENTS
   ========================== */

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
      style={[styles.chip, active && styles.activeChip]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, active && { color: "#fff" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function Slot({ label, active, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.slot, active && styles.activeSlot]}
      onPress={onPress}
    >
      <Text style={[styles.slotText, active && { color: "#fff" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function Row({ label, value, bold }: any) {
  return (
    <View style={styles.rowBetween}>
      <Text>{label}</Text>
      <Text style={bold && { fontWeight: "700" }}>{value}</Text>
    </View>
  );
}

/* ==========================
   STYLES
   ========================== */

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
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
  },
  activeCard: { borderWidth: 2, borderColor: "#CC6600" },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#CC6600",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontWeight: "700" },

  docName: { fontWeight: "600" },
  docMeta: { fontSize: 12, color: "#666" },
  docRating: { fontSize: 12 },

  fee: { fontWeight: "700" },

  row: { flexDirection: "row", flexWrap: "wrap" },
  grid: { flexDirection: "row", flexWrap: "wrap" },

  chip: {
    backgroundColor: "#FFE3C7",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  activeChip: { backgroundColor: "#CC6600" },
  chipText: { fontSize: 12 },

  slot: {
    width: "30%",
    backgroundColor: "#FFE3C7",
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
    marginRight: "3%",
    marginBottom: 12,
  },
  activeSlot: { backgroundColor: "#CC6600" },
  slotText: { fontSize: 12 },

  typeCard: {
    flex: 1,
    backgroundColor: "#FFF3E8",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    marginRight: 10,
  },
  activeType: { backgroundColor: "#CC6600" },
  typeText: { marginTop: 6, fontSize: 12 },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  payBtn: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: "#CC6600",
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  payText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
