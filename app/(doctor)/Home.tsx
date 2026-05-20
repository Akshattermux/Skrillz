import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useLanguage } from "../../src/context/LanguageContext";
import {
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "../../src/context/UserContext";

export default function DoctorHome() {
  const { t } = useLanguage();
  const { user } = useUser();
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => subscription.remove();
    }, [])
  );

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#2E86E4", "#8DA7F7"]} style={styles.header}>
        <View style={styles.headerTopRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.welcome}>{t('welcome_back')},</Text>
            <View style={styles.nameContainer}>
              <Text style={styles.username}>{user.name}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push("/(doctor)/profile")} style={styles.miniProfileWrap}>
            <View style={styles.miniProfile}>
              {user.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.miniProfileImg} />
              ) : (
                <Ionicons name="person" size={24} color="#2E86E4" />
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.ratingStarsContainer}>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons key={s} name="star" size={12} color="#FFD700" style={{ marginRight: 2 }} />
            ))}
          </View>
          <View style={styles.ratingBadgeSmall}>
            <Text style={styles.ratingTextSmall}>4.9/5 {t('rating') || 'Rating'}</Text>
          </View>
        </View>

        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{t('doctor_role')} (Verified)</Text>
        </View>

        {/* STATS OVERVIEW on Header */}
        <View style={styles.headerStats}>
            <HeaderStat count="24" label={t('patients') || 'Patients'} />
            <View style={styles.headerDivider} />
            <HeaderStat count="12" label={t('meetings') || 'Meetings'} />
            <View style={styles.headerDivider} />
            <HeaderStat count="8" label={t('reports') || 'Reports'} />
        </View>
      </LinearGradient>


      {/* QUICK ACTIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('medical_essentials')}</Text>

        <View style={styles.actionsRow}>
          <ActionCard
            icon="wallet-outline"
            title={t('total_earning')}
            subtitle="₹52,480"
            onPress={() => router.push("/(doctor)/TotalEarning")}
            color="#2E86E4"
          />

          <ActionCard
            icon="videocam-outline"
            title={t('virtual_clinic')}
            subtitle={t('join') + " room"}
            onPress={() => router.push("/(modals)/services/consultation-room")}
            color="#2E86E4"
          />
        </View>

        <View style={styles.actionsRow}>
          <ActionCard
            icon="trending-up-outline"
            title={t('earning_potential')}
            subtitle="+12% this week"
            onPress={() => router.push("/(doctor)/EarningPotentials")}
            color="#2E86E4"
            insight="Trend: Rise 📈"
            suggestion="Tip: Post more reels"
          />

          <ActionCard
            icon="person-outline"
            title={t('professional')}
            subtitle={t('profile') + " & Degrees"}
            onPress={() => router.push("/(doctor)/profile")}
            color="#2E86E4"
          />
        </View>
      </View>

      {/* RESEARCH & CAREERS PANEL */}
      <View style={styles.panelSection}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>Research & Careers</Text>
          <Ionicons name="rocket-outline" size={18} color="#2E86E4" />
        </View>
        
        <View style={styles.panelRow}>
          <PanelCard
            icon="briefcase"
            title="Job Portal"
            desc="Explore medical career opportunities"
            onPress={() => router.push("/(doctor)/jobs")}
            color="#2E86E4"
          />
          <PanelCard
            icon="library"
            title="Medical Library"
            desc="Access clinical trials & textbooks"
            onPress={() => router.push("/(doctor)/library")}
            color="#2E86E4"
          />
        </View>
      </View>

      {/* UPCOMING APPOINTMENTS */}
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>{t('upcoming_meetings')}</Text>
          <Text onPress={() => router.push("/(doctor)/appointments")} style={styles.link}>{t('view_all')}</Text>
        </View>

        <AppointmentCard 
          patientName="John Doe" 
          time="Today • 2:00 PM" 
          type="Video Call" 
          icon="videocam" 
        />
        <AppointmentCard 
          patientName="Sarah Smith" 
          time="Today • 3:30 PM" 
          type="Audio Call" 
          icon="call" 
        />
      </View>

      {/* RECENT PATIENT REPORTS */}
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>{t('pending_reports')}</Text>
          <TouchableOpacity onPress={() => router.push("/(modals)/services/medical-records")}>
             <Text style={styles.link}>{t('open_records')}</Text>
          </TouchableOpacity>
        </View>

        <ReportCard
          patientName="Alice Brown"
          reportType="Blood Test"
          date="2 hours ago"
          status="Pending Review"
        />
        <ReportCard
          patientName="Michael Johnson"
          reportType="ECG Results"
          date="5 hours ago"
          status="Pending Review"
        />
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

/* ---------------- COMPONENTS ---------------- */

function HeaderStat({ count, label }: any) {
    return (
        <View style={styles.headerStatBox}>
            <Text style={styles.headerStatCount}>{count}</Text>
            <Text style={styles.headerStatLabel}>{label}</Text>
        </View>
    );
}

function ActionCard({ icon, title, subtitle, onPress, color, insight, suggestion }: any) {
  return (
    <TouchableOpacity style={[styles.actionCard, { backgroundColor: color + '15' }]} onPress={onPress}>
      <Ionicons name={icon} size={26} color={color} />
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
      {insight && (
        <View style={styles.insightTag}>
          <Text style={styles.insightText}>{insight}</Text>
        </View>
      )}
      {suggestion && (
        <Text style={styles.suggestionText}>{suggestion}</Text>
      )}
    </TouchableOpacity>
  );
}

function PanelCard({ icon, title, desc, onPress, color }: any) {
  return (
    <TouchableOpacity style={styles.panelCard} onPress={onPress}>
      <View style={[styles.panelIconBox, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.panelCardTitle}>{title}</Text>
        <Text style={styles.panelCardDesc} numberOfLines={1}>{desc}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#ccc" />
    </TouchableOpacity>
  );
}

function AppointmentCard({ patientName, time, type, icon }: any) {
  const { t } = useLanguage();
  return (
    <View style={styles.appointmentCard}>
      <View>
        <Text style={styles.appointmentTitle}>{patientName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <Ionicons name={icon} size={14} color="#666" style={{ marginRight: 4 }} />
            <Text style={styles.appointmentSub}>{type}</Text>
        </View>
        <Text style={styles.appointmentDate}>{time}</Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/(modals)/services/consultation-room")} style={[styles.joinBtn, { backgroundColor: "#2E86E4" }]}>
        <Text style={styles.joinText}>{t('join')}</Text>
      </TouchableOpacity>
    </View>
  );
}

function ReportCard({ patientName, reportType, date, status }: any) {
  const { t } = useLanguage();
  return (
    <View style={styles.reportCard}>
      <View style={styles.reportIcon}>
        <Ionicons name="document-text" size={20} color="#fff" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.reportTitle}>{patientName}</Text>
        <Text style={styles.reportSub}>{reportType} • {date}</Text>
        <Text style={[styles.reportStatus, { color: status === 'Pending Review' ? '#D32F2F' : '#2E7D32' }]}>{status}</Text>
      </View>

      <TouchableOpacity
        style={[styles.viewBtn, { borderColor: "#2E86E4" }]}
        onPress={() => router.push("/(modals)/services/medical-records")}
      >
        <Text style={[styles.viewText, { color: "#2E86E4" }]}>{t('review')}</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  searchSection: { paddingHorizontal: 20, marginTop: 24 },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#F5F8FF",
    borderRadius: 18,
    paddingHorizontal: 18,
    alignItems: "center",
    height: 56,
    borderWidth: 1.2,
    borderColor: 'rgba(46, 134, 228, 0.15)',
    shadowColor: "#2E86E4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  searchPlaceholderText: { marginLeft: 12, color: "#2E86E4", fontSize: 15, fontWeight: "500", opacity: 0.6 },

  header: {
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  headerTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  miniProfileWrap: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 3, borderRadius: 25 },
  miniProfile: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  miniProfileImg: { width: 44, height: 44, borderRadius: 22 },
  nameContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  welcome: { color: "#D9E8FF", fontSize: 13 },
  username: { color: "#fff", fontSize: 26, fontWeight: "700" },
  ratingStarsContainer: { flexDirection: 'row', alignItems: 'center', marginTop: -5 },
  starsRow: { flexDirection: 'row', marginRight: 8 },
  ratingBadgeSmall: { 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 6 
  },
  ratingTextSmall: { color: '#fff', fontSize: 10, fontWeight: '700' },
  roleBadge: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 14, alignSelf: 'flex-start', marginTop: 12 },
  roleText: { color: "#fff", fontSize: 12, fontWeight: '700' },

  headerStats: { 
    flexDirection: 'row', 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    borderRadius: 20, 
    padding: 15,
    marginTop: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  headerStatBox: { alignItems: 'center' },
  headerStatCount: { color: '#fff', fontSize: 20, fontWeight: '700' },
  headerStatLabel: { color: '#D9E8FF', fontSize: 11, marginTop: 2 },
  headerDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },

  panelSection: { 
    marginHorizontal: 20, 
    marginTop: 24, 
    backgroundColor: '#F8FAFF', 
    borderRadius: 24, 
    padding: 20,
    borderWidth: 1.2,
    borderColor: 'rgba(46, 134, 228, 0.15)',
  },
  panelHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  panelTitle: { fontSize: 18, fontWeight: '800', color: '#2E86E4' },
  panelRow: { gap: 12 },
  panelCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(46, 134, 228, 0.1)',
  },
  panelIconBox: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  panelCardTitle: { fontSize: 15, fontWeight: '700', color: '#333' },
  panelCardDesc: { fontSize: 12, color: '#777', marginTop: 2 },

  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: '#333' },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: { color: "#2E86E4", fontSize: 13, fontWeight: '600' },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  actionCard: {
    width: "48%",
    borderRadius: 18,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    borderWidth: 1.2,
    borderColor: 'rgba(46, 134, 228, 0.12)',
  },
  actionTitle: { fontWeight: "700", marginTop: 8, fontSize: 15 },
  actionSubtitle: { fontSize: 12, color: "#777", marginTop: 4 },
  insightTag: { backgroundColor: '#E8F5E9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 6, alignSelf: 'flex-start' },
  insightText: { fontSize: 10, color: '#2E7D32', fontWeight: '700' },
  suggestionText: { fontSize: 10, color: '#666', marginTop: 4, fontStyle: 'italic' },

  appointmentCard: {
    backgroundColor: "#F8FAFF",
    borderRadius: 18,
    padding: 16,
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.2,
    borderColor: 'rgba(46, 134, 228, 0.15)',
  },
  appointmentTitle: { fontWeight: "700", fontSize: 16, color: '#333' },
  appointmentSub: { fontSize: 12, color: "#666" },
  appointmentDate: { fontSize: 12, marginTop: 5, fontWeight: '600', color: '#2E86E4' },
  joinBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 3,
  },
  joinText: { color: "#fff", fontSize: 12, fontWeight: '700' },

  reportCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 15,
    marginTop: 12,
    borderWidth: 1.2,
    borderColor: 'rgba(46, 134, 228, 0.12)',
  },
  reportIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#2E86E4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  reportTitle: { fontWeight: "700", color: '#333' },
  reportSub: { fontSize: 12, color: "#666", marginTop: 3 },
  reportStatus: { fontSize: 11, fontWeight: '700', marginTop: 5 },
  viewBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1.5,
  },
  viewText: { fontSize: 12, fontWeight: '700' },
});
