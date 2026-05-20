import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useLanguage } from "../../src/context/LanguageContext";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function DoctorAppointments() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"suggested" | "accepted" | "history">("suggested");
  const [selectingTimeFor, setSelectingTimeFor] = useState<string | null>(null);
  const [appointments, setAppointments] = useState([
    { id: "1", patient: "John Doe", time: "Today • 2:30 PM", type: "Video Call", status: "accepted", report: true },
    { id: "2", patient: "Sarah Smith", time: "Pending Approval", type: "Audio Call", status: "suggested", report: false },
    { id: "3", patient: "Alice Brown", time: "Yesterday • 10:00 AM", type: "In-Person", status: "history", report: true },
    { id: "4", patient: "Michael Johnson", time: "Today • 4:30 PM", type: "Video Call", status: "suggested", report: false },
    { id: "5", patient: "Emma Wilson", time: "21 Mar • 5:00 PM", type: "Audio Call", status: "history", report: true },
  ]);

  const SLOTS = ["09:00 AM", "10:30 AM", "12:00 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

  const handleAccept = (id: string) => {
    setSelectingTimeFor(id);
  };

  const confirmTimeSlot = (id: string, time: string) => {
    setAppointments((prev) => 
      prev.map((item) => item.id === id ? { ...item, status: 'accepted', time: `Today • ${time}` } : item)
    );
    setSelectingTimeFor(null);
    Alert.alert("Success", "Appointment confirmed and time scheduled.");
  };

  const handleViewReport = (name: string) => {
    Alert.alert("Patient Report", `Opening medical report for ${name}... (Redirecting to Medical Records)`);
  };

  const handleCancel = (id: string, name: string) => {
    Alert.alert(
      "Cancel Appointment",
      `Are you sure you want to cancel the appointment with ${name}?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            setAppointments((prev) => prev.filter((item) => item.id !== id));
            Alert.alert("Cancelled", "Appointment has been successfully cancelled.");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <LinearGradient colors={["#2E86E4", "#8DA7F7"]} style={styles.header}>
        <Text style={styles.headerTitle}>{t('all_appointments')}</Text>
        <Text style={styles.headerSub}>{t('manage_schedule')}</Text>
      </LinearGradient>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <TabButton 
           label={t('suggested')} 
           active={activeTab === "suggested"} 
           onPress={() => setActiveTab("suggested")} 
        />
        <TabButton 
           label={t('accepted')} 
           active={activeTab === "accepted"} 
           onPress={() => setActiveTab("accepted")} 
        />
        <TabButton 
           label={t('history')} 
           active={activeTab === "history"} 
           onPress={() => setActiveTab("history")} 
        />
      </View>

      {/* SEARCH & FILTER */}
      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            placeholder={t('search_patient')}
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {appointments
          .filter((item) => item.status === activeTab)
          .map((item) => (
            <View key={item.id} style={styles.appointmentCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.patientName}>{item.patient}</Text>
                  <Text style={styles.appType}>{item.type}</Text>
                </View>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: activeTab === 'suggested' ? '#FFF3E0' : '#E8F3FF' }
                ]}>
                  <Text style={[
                    styles.statusText, 
                    { color: activeTab === 'suggested' ? '#EF6C00' : '#2E86E4' }
                  ]}>
                    {t(activeTab).toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              {selectingTimeFor === item.id ? (
                <View style={styles.timeSelectionArea}>
                  <Text style={styles.selectTimeTitle}>{t('select_time_title')}</Text>
                  <View style={styles.slotGrid}>
                    {SLOTS.map((s) => (
                      <TouchableOpacity 
                        key={s} 
                        style={styles.slotMini} 
                        onPress={() => confirmTimeSlot(item.id, s)}
                      >
                        <Text style={styles.slotTextMini}>{s}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <TouchableOpacity 
                    onPress={() => setSelectingTimeFor(null)} 
                    style={styles.cancelLinkSmall}
                  >
                    <Text style={styles.cancelLinkText}>{t('cancel')}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.cardFooter}>
                  <View style={styles.timeInfo}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>

                  <View style={styles.actionRow}>
                    {activeTab === "suggested" && (
                      <TouchableOpacity
                        onPress={() => handleAccept(item.id)}
                        style={[styles.primaryBtn, { backgroundColor: "#2E86E4" }]}
                      >
                        <Text style={styles.primaryBtnText}>{t('accept_set_time')}</Text>
                      </TouchableOpacity>
                    )}

                    {(activeTab === "accepted" || activeTab === "history") && (
                      <TouchableOpacity
                        onPress={() => handleViewReport(item.patient)}
                        style={[styles.reportBtn, { borderColor: "#2E86E4" }]}
                      >
                        <Text style={[styles.reportBtnText, { color: "#2E86E4" }]}>{t('view_report')}</Text>
                      </TouchableOpacity>
                    )}

                    {activeTab === "accepted" && (
                      <TouchableOpacity
                        onPress={() => handleCancel(item.id, item.patient)}
                        style={styles.cancelLink}
                      >
                        <Ionicons name="close-circle-outline" size={20} color="#D32F2F" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </View>
          ))}
        {appointments.filter((item) => item.status === activeTab).length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={60} color="#DDD" />
            <Text style={styles.emptyText}>{t('no_apps_found')}</Text>
          </View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

function TabButton({ label, active, onPress }: any) {
  return (
    <TouchableOpacity 
      style={[styles.tabBtn, active && styles.tabBtnActive]} 
      onPress={onPress}
    >
      <Text style={[styles.tabBtnText, active && styles.tabBtnTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFF" },
  header: {
    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 45,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTitle: { color: "#fff", fontSize: 28, fontWeight: "800", letterSpacing: 0.5 },
  headerSub: { color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 6, fontWeight: '500' },
  tabContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    padding: 6, 
    marginHorizontal: 20, 
    borderRadius: 16, 
    marginTop: -25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBtn: { 
    flex: 1, 
    paddingVertical: 10, 
    alignItems: 'center', 
    borderRadius: 12 
  },
  tabBtnActive: { 
    backgroundColor: '#2E86E4' 
  },
  tabBtnText: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: '#666' 
  },
  tabBtnTextActive: { 
    color: '#fff' 
  },

  searchSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 46,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#E1E8F5',
  },
  searchInput: { marginLeft: 10, flex: 1, fontSize: 14 },
  filterBtn: {
    width: 46,
    height: 46,
    backgroundColor: "#fff",
    borderRadius: 14,
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  list: { padding: 20 },
  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E1E8F5",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  patientName: { fontSize: 16, fontWeight: "700", color: "#333" },
  appType: { fontSize: 13, color: "#666", marginTop: 2 },
  statusBadge: {
    backgroundColor: "#E8F3FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: { fontSize: 11, color: "#2E86E4", fontWeight: "600" },

  divider: { height: 1, backgroundColor: "#F0F4F8", marginVertical: 14 },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeInfo: { flexDirection: "row", alignItems: "center" },
  timeText: { marginLeft: 6, fontSize: 13, color: "#444", fontWeight: "500" },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  primaryBtn: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 10, 
    marginLeft: 12 
  },
  primaryBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  reportBtn: { 
    paddingHorizontal: 14, 
    paddingVertical: 7, 
    borderRadius: 10, 
    borderWidth: 1.5,
    marginLeft: 10,
  },
  reportBtnText: { fontSize: 12, fontWeight: '700' },
  cancelLink: { marginLeft: 12 },
  cancelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  cancelText: { color: "#D32F2F", fontSize: 12, fontWeight: "600" },

  timeSelectionArea: { paddingVertical: 5 },
  selectTimeTitle: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 10 },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  slotMini: { 
    width: '31%', 
    backgroundColor: '#F0F4F8', 
    paddingVertical: 8, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E1E8F5'
  },
  slotTextMini: { fontSize: 11, fontWeight: '600', color: '#2E86E4' },
  cancelLinkSmall: { alignSelf: 'center', marginTop: 5 },
  cancelLinkText: { color: '#D32F2F', fontSize: 12, fontWeight: '600' },

  emptyState: { alignItems: "center", marginTop: 100 },
  emptyText: { color: "#999", marginTop: 10, fontSize: 16 },
});
