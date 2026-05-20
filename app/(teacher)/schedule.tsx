import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import { router } from "expo-router";

export default function ScheduleClass() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const themeColor = "#00897B";

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
           <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Class</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        {/* THUMBNAIL SELECTOR */}
        <TouchableOpacity style={styles.thumbPicker}>
           <Image 
             source={{ uri: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=1000" }} 
             style={styles.thumbImage} 
           />
           <View style={styles.thumbOverlay}>
              <Ionicons name="camera" size={30} color="#fff" />
              <Text style={styles.thumbText}>Change Thumbnail</Text>
           </View>
        </TouchableOpacity>

        <View style={styles.inputGroup}>
           <Text style={styles.label}>Class Title</Text>
           <TextInput 
             style={styles.input} 
             placeholder="e.g. Advanced Cardiology" 
             value={title}
             onChangeText={setTitle}
           />
        </View>

        <View style={styles.inputGroup}>
           <Text style={styles.label}>Description</Text>
           <TextInput 
             style={[styles.input, { height: 100, paddingTop: 15 }]} 
             placeholder="What will students learn?" 
             multiline
             value={desc}
             onChangeText={setDesc}
           />
        </View>

        <View style={styles.row}>
           <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Session Date</Text>
              <TouchableOpacity style={styles.datePicker}>
                 <Text style={styles.dateText}>25 Mar, 2026</Text>
                 <Ionicons name="calendar-outline" size={20} color="#999" />
              </TouchableOpacity>
           </View>
           <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.label}>Time</Text>
              <TouchableOpacity style={styles.datePicker}>
                 <Text style={styles.dateText}>10:00 AM</Text>
                 <Ionicons name="time-outline" size={20} color="#999" />
              </TouchableOpacity>
           </View>
        </View>

        <View style={styles.inputGroup}>
           <Text style={styles.label}>Set Price ($)</Text>
           <TextInput 
             style={styles.input} 
             placeholder="e.g. 49" 
             keyboardType="numeric"
             value={price}
             onChangeText={setPrice}
           />
        </View>

        <TouchableOpacity style={styles.launchBtn} onPress={() => router.back()}>
           <LinearGradient colors={["#00897B", "#4DB6AC"]} style={styles.launchGrad}>
              <Text style={styles.launchText}>Publish & Schedule</Text>
           </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 25, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#F5F8F7", justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#333" },
  form: { flex: 1, padding: 25 },
  thumbPicker: { height: 200, borderRadius: 25, overflow: "hidden", marginBottom: 30 },
  thumbImage: { width: "100%", height: "100%" },
  thumbOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
  thumbText: { color: "#fff", fontSize: 14, fontWeight: "600", marginTop: 10 },
  inputGroup: { marginBottom: 25 },
  label: { fontSize: 14, fontWeight: "700", color: "#333", marginBottom: 10 },
  input: { backgroundColor: "#F5F8F7", borderRadius: 16, paddingHorizontal: 20, height: 56, fontSize: 15, color: "#333" },
  row: { flexDirection: "row" },
  datePicker: { backgroundColor: "#F5F8F7", borderRadius: 16, paddingHorizontal: 20, height: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  dateText: { fontSize: 15, color: "#333" },
  launchBtn: { borderRadius: 20, overflow: "hidden", marginTop: 20 },
  launchGrad: { height: 64, justifyContent: "center", alignItems: "center" },
  launchText: { color: "#fff", fontSize: 18, fontWeight: "800" },
});
