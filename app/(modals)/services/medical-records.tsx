import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../../../src/context/LanguageContext";

/* =======================
   RECORDS DATA (BACKEND READY)
   ======================= */
const RECORDS = [
  {
    id: "1",
    title: "Blood Test Report",
    category: "Lab Report",
    date: "12 Sep 2024",
    uploadedBy: "Patient",
  },
  {
    id: "2",
    title: "X-Ray Chest",
    category: "Radiology",
    date: "03 Aug 2024",
    uploadedBy: "Doctor",
  },
  {
    id: "3",
    title: "MRI Scan - Brain",
    category: "Radiology",
    date: "18 Jul 2024",
    uploadedBy: "Patient",
  },
  {
    id: "4",
    title: "ECG Report",
    category: "Cardiology",
    date: "02 Jun 2024",
    uploadedBy: "Doctor",
  },
];

export default function MedicalRecords() {
  const { t } = useLanguage();

  const onUpload = () => {
    Alert.alert(
      t("upload_prescription_report"),
      t("choose_action"),
      [
        { text: t("camera_scan"), onPress: () => {} },
        { text: t("upload_pdf_img"), onPress: () => {} },
        { text: t("cancel"), style: "cancel" },
      ]
    );
  };

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>{t("medical_records")}</Text>
            <Text style={styles.subtitle}>
              {t("upload_manage_health")}
            </Text>
          </View>

          <TouchableOpacity style={styles.uploadBtn} onPress={onUpload}>
            <Ionicons name="cloud-upload-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* RECORDS LIST */}
      <View style={styles.section}>
        {RECORDS.map((item) => (
          <RecordCard key={item.id} record={item} />
        ))}
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

/* =======================
   RECORD CARD
   ======================= */
function RecordCard({ record }: any) {
  const { t } = useLanguage();

  const onOptions = () => {
    Alert.alert(
      record.title,
      t("choose_action"),
      [
        { text: t("view"), onPress: () => {} },
        { text: t("download"), onPress: () => {} },
        { text: t("delete"), style: "destructive", onPress: () => {} },
        { text: t("cancel"), style: "cancel" },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onOptions}>
      <View style={styles.iconBox}>
        <Ionicons
          name="document-text-outline"
          size={22}
          color="#CC6600"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.cardTitle}>{record.title}</Text>
        <Text style={styles.cardType}>{record.category}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.cardDate}>{record.date}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.uploadedBy}>
            {t("uploaded_by")} {record.uploadedBy === "Doctor" ? t("doctor_role") : t("patient_role")}
          </Text>
        </View>
      </View>

      <Ionicons name="ellipsis-vertical" size={18} color="#999" />
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 13,
    color: "#FFE8D9",
    marginTop: 6,
  },

  uploadBtn: {
    backgroundColor: "rgba(255,255,255,0.25)",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },

  card: {
    backgroundColor: "#FFF3E8",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFE3C7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  info: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  cardType: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  cardDate: {
    fontSize: 12,
    color: "#999",
  },
  dot: {
    marginHorizontal: 6,
    color: "#999",
  },
  uploadedBy: {
    fontSize: 12,
    color: "#999",
  },
});
