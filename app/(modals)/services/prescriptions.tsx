import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/* =======================
   PRESCRIPTION DATA (BACKEND READY)
   ======================= */
const PRESCRIPTION = {
  clinic: "SKRILZ Health Care",
  doctor: {
    name: "Dr. Sarah Johnson",
    qualification: "MD (Cardiology)",
    regNo: "MH-12345",
  },
  patient: {
    name: "John Doe",
    age: 32,
    gender: "Male",
  },
  date: "12 Jan 2026",
  medicines: [
    {
      id: "1",
      name: "Paracetamol",
      strength: "500 mg",
      frequency: "Twice a day",
      duration: "5 days",
      instructions: "After meals",
    },
    {
      id: "2",
      name: "Amoxicillin",
      strength: "250 mg",
      frequency: "Three times a day",
      duration: "7 days",
      instructions: "Before meals",
    },
  ],
  notes: "Drink plenty of water. Avoid alcohol during medication.",
};

export default function Prescriptions() {
  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <Text style={styles.clinic}>{PRESCRIPTION.clinic}</Text>
        <Text style={styles.title}>Medical Prescription</Text>
      </LinearGradient>

      {/* BODY */}
      <View style={styles.sheet}>
        {/* DOCTOR INFO */}
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.doctor}>{PRESCRIPTION.doctor.name}</Text>
            <Text style={styles.sub}>
              {PRESCRIPTION.doctor.qualification}
            </Text>
          </View>
          <Text style={styles.sub}>
            Reg No: {PRESCRIPTION.doctor.regNo}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* PATIENT INFO */}
        <View style={styles.rowBetween}>
          <Text style={styles.info}>
            Patient: {PRESCRIPTION.patient.name}
          </Text>
          <Text style={styles.info}>Date: {PRESCRIPTION.date}</Text>
        </View>
        <Text style={styles.info}>
          Age: {PRESCRIPTION.patient.age} •{" "}
          {PRESCRIPTION.patient.gender}
        </Text>

        <View style={styles.divider} />

        {/* RX SYMBOL */}
        <Text style={styles.rx}>℞</Text>

        {/* MEDICINES */}
        {PRESCRIPTION.medicines.map((med) => (
          <View key={med.id} style={styles.medicineCard}>
            <Text style={styles.medName}>
              {med.name} ({med.strength})
            </Text>

            <Text style={styles.medDetail}>
              Frequency: {med.frequency}
            </Text>
            <Text style={styles.medDetail}>
              Duration: {med.duration}
            </Text>
            <Text style={styles.medDetail}>
              Instructions: {med.instructions}
            </Text>
          </View>
        ))}

        {/* NOTES */}
        <View style={styles.notesBox}>
          <Text style={styles.notesTitle}>Doctor’s Notes</Text>
          <Text style={styles.notes}>{PRESCRIPTION.notes}</Text>
        </View>

        {/* SIGNATURE */}
        <View style={styles.signatureBox}>
          <Text style={styles.signatureLine}>______________________</Text>
          <Text style={styles.signatureText}>
            {PRESCRIPTION.doctor.name}
          </Text>
        </View>
      </View>

      {/* ACTIONS */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="download-outline" size={18} color="#fff" />
          <Text style={styles.actionText}>Download PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.outlineBtn}>
          <Ionicons name="print-outline" size={18} color="#CC6600" />
          <Text style={styles.outlineText}>Print</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
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
  clinic: {
    color: "#FFE8D9",
    fontSize: 13,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginTop: 6,
  },

  sheet: {
    backgroundColor: "#FFFDFB",
    margin: 16,
    borderRadius: 18,
    padding: 20,
    elevation: 3,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  doctor: {
    fontWeight: "700",
    fontSize: 15,
  },
  sub: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  info: {
    fontSize: 13,
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 14,
  },

  rx: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },

  medicineCard: {
    marginBottom: 14,
  },
  medName: {
    fontWeight: "600",
    fontSize: 14,
  },
  medDetail: {
    fontSize: 12,
    color: "#444",
    marginTop: 2,
  },

  notesBox: {
    backgroundColor: "#FFF3E8",
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
  },
  notesTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
  notes: {
    fontSize: 12,
    color: "#444",
  },

  signatureBox: {
    alignItems: "flex-end",
    marginTop: 24,
  },
  signatureLine: {
    fontSize: 12,
    color: "#333",
  },
  signatureText: {
    fontSize: 12,
    marginTop: 4,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 10,
  },

  actionBtn: {
    flexDirection: "row",
    backgroundColor: "#CC6600",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 24,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },

  outlineBtn: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#CC6600",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 24,
    alignItems: "center",
  },
  outlineText: {
    color: "#CC6600",
    marginLeft: 8,
    fontWeight: "600",
  },
});
