import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { BlurView } from "expo-blur";
import { useLanguage } from "../context/LanguageContext";

const DUMMY_JOBS = [
  {
    id: "1",
    role: "Senior Cardiologist",
    hospital: "City Medical Center",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹15L - ₹25L / year",
    posted: "2 days ago",
  },
  {
    id: "2",
    role: "Junior Neurologist",
    hospital: "Global Health Institute",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹10L - ₹18L / year",
    posted: "1 day ago",
  },
  {
    id: "3",
    role: "Pediatric Resident",
    hospital: "Children's Hospital",
    location: "Delhi, India",
    type: "Contract",
    salary: "₹8L - ₹12L / year",
    posted: "5 hours ago",
  },
  {
    id: "4",
    role: "Medical Researcher",
    hospital: "BioTech Labs",
    location: "Pune, India",
    type: "Remote",
    salary: "₹12L - ₹20L / year",
    posted: "3 days ago",
  },
];

interface SharedJobsProps {
  themeColor?: string;
  gradientColors?: string[];
  bgColor?: string;
  glassmorphism?: boolean;
}

export default function SharedJobs({ 
  themeColor = "#2E86E4", 
  gradientColors = ["#2E86E4", "#8DA7F7"], 
  bgColor = "#F5F8FF", 
  glassmorphism 
}: SharedJobsProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = DUMMY_JOBS.filter(job => 
    job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.hospital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderJobItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.jobCard, glassmorphism && styles.glassCard]}>
      {glassmorphism && <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />}
      <View style={styles.jobHeader}>
        <View style={[styles.jobIcon, { backgroundColor: themeColor + '20' }]}>
            <Ionicons name="business" size={24} color={themeColor} />
        </View>
        <View style={styles.jobInfo}>
          <Text style={styles.jobRole}>{item.role}</Text>
          <Text style={styles.hospitalName}>{item.hospital}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.jobDetails}>
        <Detail icon="location-outline" text={item.location} />
        <Detail icon="time-outline" text={item.type} />
        <Detail icon="cash-outline" text={item.salary} />
      </View>

      <View style={styles.jobFooter}>
        <Text style={styles.postedDate}>{item.posted}</Text>
        <TouchableOpacity style={[styles.applyBtn, { backgroundColor: themeColor }]}>
          <Text style={styles.applyText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.root, { backgroundColor: bgColor }]}>
      <LinearGradient colors={gradientColors || ["#2E86E4", "#8DA7F7"]} style={styles.header}>
        <Text style={styles.headerTitle}>{t('job_portal') || 'Job Portal'}</Text>
        <View style={[styles.searchContainer, glassmorphism && styles.glassSearch]}>
          {glassmorphism && <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />}
          <Ionicons name="search" size={20} color={glassmorphism ? "#fff" : "#999"} style={styles.searchIcon} />
          <TextInput
            placeholder={t('search_jobs') || "Search by role or hospital..."}
            style={[styles.searchInput, { color: glassmorphism ? "#fff" : "#333" }]}
            placeholderTextColor={glassmorphism ? "rgba(255,255,255,0.6)" : "#999"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      {glassmorphism && (
        <ImageBackground 
            source={{ uri: "https://www.transparenttextures.com/patterns/cubes.png" }}
            style={StyleSheet.absoluteFill}
            imageStyle={{ opacity: 0.05, tintColor: themeColor }}
        />
      )}

      <FlatList
        data={filteredJobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
                <Ionicons name="briefcase-outline" size={60} color="#ccc" />
                <Text style={styles.emptyText}>No matching jobs found.</Text>
            </View>
        )}
      />
    </View>
  );
}

function Detail({ icon, text }: { icon: any, text: string }) {
  return (
    <View style={styles.detailItem}>
      <Ionicons name={icon} size={14} color="#666" />
      <Text style={styles.detailText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 15 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 46,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: "100%", color: "#333", fontSize: 14 },
  listContent: { padding: 20, paddingBottom: 100 },
  jobCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E1E8F5",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  jobIcon: { width: 50, height: 50, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  jobInfo: { flex: 1, marginLeft: 12 },
  jobRole: { fontSize: 16, fontWeight: "700", color: "#333" },
  hospitalName: { fontSize: 13, color: "#777", marginTop: 2 },
  jobDetails: { flexDirection: "row", flexWrap: "wrap", marginBottom: 15 },
  detailItem: { flexDirection: "row", alignItems: "center", marginRight: 15, marginBottom: 5 },
  detailText: { fontSize: 12, color: "#666", marginLeft: 5 },
  jobFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 15, borderTopWidth: 1, borderTopColor: "#F0F2F5" },
  postedDate: { fontSize: 12, color: "#999" },
  applyBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 12 },
  applyText: { color: "#fff", fontSize: 13, fontWeight: "700" },
  emptyContainer: { alignItems: "center", marginTop: 100 },
  emptyText: { color: "#999", marginTop: 15, fontSize: 14 },
  glassCard: {
    backgroundColor: "rgba(255,255,255,0.4)",
    borderColor: "rgba(255,255,255,0.3)",
    elevation: 4,
    overflow: "hidden",
  },
  glassSearch: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
  },
});
