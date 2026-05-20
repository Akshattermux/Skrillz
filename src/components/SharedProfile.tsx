import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../context/LanguageContext";
import { useUser } from "../context/UserContext";
import packageInfo from "../../package.json";

interface SharedProfileProps {
  role: "patient" | "doctor" | "student";
}

type Screen =
  | "profile"
  | "edit"
  | "account"
  | "password"
  | "sessions"
  | "payments"
  | "degrees"
  | "appinfo"
  | "language"
  | "help";

export default function SharedProfile({ role }: SharedProfileProps) {
  const isDoctor = role === "doctor";
  const isStudent = role === "student";
  
  const themeColor = isStudent ? "#6200EA" : (isDoctor ? "#2E86E4" : "#CC6600");
  const gradientColors = isStudent 
    ? ["#6200EA", "#B388FF"] as const 
    : (isDoctor ? ["#2E86E4", "#8DA7F7"] as const : ["#E46B2E", "#F78DA7"] as const);
  const bgColor = isStudent ? "#F9F5FF" : (isDoctor ? "#F5F8FF" : "#FFF3E8");

  const [screen, setScreen] = useState<Screen>("profile");
  const { t, setLanguage, language: currentLang } = useLanguage();
  const { user, updateUser } = useUser();

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!res.canceled) {
      updateUser({ avatar: res.assets[0].uri });
    }
  };

  const logout = () => {
    Alert.alert("Log Out", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => router.replace("/(auth)/login") },
    ]);
  };

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={gradientColors} style={styles.header}>
        <TouchableOpacity style={styles.avatarWrap} onPress={pickImage}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatarImg} />
          ) : (
            <Text style={[styles.avatarText, { color: themeColor }]}>
              {user.name.split(" ").map((n) => n[0]).join("")}
            </Text>
          )}
          <View style={[styles.camera, { backgroundColor: themeColor }]}>
            <Ionicons name="camera" size={14} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>{user.name}</Text>
        {isDoctor && (
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons key={s} name="star" size={14} color="#FFD700" style={{ marginHorizontal: 1 }} />
            ))}
          </View>
        )}
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{isStudent ? "Medical Student" : (isDoctor ? "Verified Professional" : "Patient")}</Text>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        {screen === "profile" && (
          <>
            <Menu icon="person-outline" title="Edit Profile" color={themeColor} bgColor={bgColor} onPress={() => setScreen("edit")} />
            {isDoctor ? (
              <Menu icon="school-outline" title="My Degrees & Certifications" color={themeColor} bgColor={bgColor} onPress={() => setScreen("degrees")} />
            ) : (
              <Menu icon="card-outline" title="Payment History" color={themeColor} bgColor={bgColor} onPress={() => setScreen("payments")} />
            )}
            <Menu icon="settings-outline" title="Account Center" color={themeColor} bgColor={bgColor} onPress={() => setScreen("account")} />
            <Menu icon="language-outline" title="Language / भाषा" color={themeColor} bgColor={bgColor} onPress={() => setScreen("language")} />
            <Menu icon="information-circle-outline" title="App Information" color={themeColor} bgColor={bgColor} onPress={() => setScreen("appinfo")} />
            <Menu icon="help-circle-outline" title="Help Center" color={themeColor} bgColor={bgColor} onPress={() => setScreen("help")} />

            <TouchableOpacity style={styles.logout} onPress={logout}>
              <Ionicons name="log-out-outline" size={18} color="#D32F2F" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </>
        )}

        {screen === "edit" && (
          <>
            <Back title="Edit Profile" onBack={() => setScreen("profile")} />
            <Field label="Full Name" value={user.name} onChange={(v: string) => updateUser({ name: v })} />
            {isDoctor && (
              <>
                <Field label="Medical Specialty" value={user.specialty} onChange={(v: string) => updateUser({ specialty: v })} />
                <Field label="Consultation Price ($/hr)" value="150" keyboardType="numeric" />
              </>
            )}
            <Field label="Phone" value="+91 98765 43210" />
            <Field
              label="Bio / Experience"
              value={user.bio}
              onChange={(v: string) => updateUser({ bio: v })}
              multiline={true}
              numberOfLines={4}
            />
            <Save color={themeColor} onPress={() => setScreen("profile")} />
          </>
        )}

        {screen === "degrees" && isDoctor && (
          <>
            <Back title="Degrees & Certs" onBack={() => setScreen("profile")} />
            <Text style={styles.hint}>Upload photos of your medical degrees for verification.</Text>
            <TouchableOpacity style={[styles.uploadCard, { borderColor: themeColor, backgroundColor: bgColor }]} onPress={() => Alert.alert("Upload", "Photo picker mock")}>
              <Ionicons name="add-circle-outline" size={32} color={themeColor} />
              <Text style={{ color: themeColor, fontWeight: '700', marginTop: 5 }}>Add Degree</Text>
            </TouchableOpacity>
          </>
        )}

        {/* ACCOUNT CENTER (Common) */}
        {screen === "account" && (
          <>
            <Back title="Account Center" onBack={() => setScreen("profile")} />
            <Menu icon="lock-closed-outline" title="Change Password" color={themeColor} bgColor={bgColor} onPress={() => setScreen("password")} />
            <Menu icon="shield-checkmark-outline" title="Active Sessions" color={themeColor} bgColor={bgColor} onPress={() => setScreen("sessions")} />
            <Menu icon="trash-outline" title="Delete Account" color="#D32F2F" bgColor="#FFEBEE" onPress={() => Alert.alert("Delete", "Irreversible action")} />
          </>
        )}

        {screen === "password" && (
          <>
            <Back title="Change Password" onBack={() => setScreen("account")} />
            <Field label="Current Password" secure />
            <Field label="New Password" secure />
            <Save color={themeColor} onPress={() => setScreen("account")} />
          </>
        )}

        {screen === "sessions" && (
          <>
            <Back title="Active Sessions" onBack={() => setScreen("account")} />
            <View style={[styles.menu, { backgroundColor: bgColor }]}>
              <Ionicons name="phone-portrait-outline" size={18} color={themeColor} />
              <Text style={{ marginLeft: 12 }}>iPhone 15 • Current Session</Text>
            </View>
          </>
        )}

        {screen === "payments" && !isDoctor && (
          <>
            <Back title="Payment History" onBack={() => setScreen("profile")} />
            <View style={[styles.menu, { backgroundColor: bgColor }]}>
              <Ionicons name="receipt-outline" size={18} color={themeColor} />
              <Text style={{ marginLeft: 12, flex: 1 }}>Dr. Sarah Johnson</Text>
              <Text style={{ fontWeight: '700' }}>₹499</Text>
            </View>
          </>
        )}

        {screen === "appinfo" && (
          <>
            <Back title="App Information" onBack={() => setScreen("profile")} />
            <InfoRow label="Version" value={packageInfo.version} bgColor={bgColor} />
            <InfoRow label="Build" value="100" bgColor={bgColor} />
          </>
        )}

        {screen === "language" && (
          <>
            <Back title="Select Language" onBack={() => setScreen("profile")} />
            {[
              { id: "en", label: "English" },
              { id: "hi", label: "हिंदी (Hindi)" },
              { id: "kn", label: "ಕನ್ನಡ (Kannada)" },
              { id: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
              { id: "ta", label: "தமிழ் (Tamil)" },
              { id: "te", label: "తెలుగు (Telugu)" },
              { id: "es", label: "Español (Spanish)" },
              { id: "zh", label: "中文 (Chinese)" },
              { id: "ur", label: "اردو (Urdu)" },
            ].map((l) => (
              <TouchableOpacity
                key={l.id}
                style={[styles.menu, { backgroundColor: currentLang === l.id ? themeColor : bgColor }]}
                onPress={() => {
                  setLanguage(l.id as any);
                }}
              >
                <Text style={{
                  marginLeft: 12,
                  fontWeight: '600',
                  color: currentLang === l.id ? '#fff' : '#333'
                }}>{l.label}</Text>
                {currentLang === l.id && <Ionicons name="checkmark-circle" size={18} color="#fff" style={{ marginLeft: 'auto' }} />}
              </TouchableOpacity>
            ))}
          </>
        )}

        {screen === "help" && (
          <>
            <Back title="Help Center" onBack={() => setScreen("profile")} />
            <Text style={{ marginBottom: 20 }}>Our support team is available 24/7.</Text>
            <TouchableOpacity style={[styles.save, { backgroundColor: themeColor }]} onPress={() => { }}>
              <Text style={styles.saveText}>Contact Support</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

function Menu({ icon, title, onPress, color, bgColor }: any) {
  return (
    <TouchableOpacity style={[styles.menu, { backgroundColor: bgColor }]} onPress={onPress}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={[styles.menuText, { color: color === "#D32F2F" ? color : "#333" }]}>{title}</Text>
      <Ionicons name="chevron-forward" size={16} color="#999" style={{ marginLeft: "auto" }} />
    </TouchableOpacity>
  );
}

function Back({ title, onBack }: any) {
  return (
    <View style={styles.back}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="chevron-back" size={22} />
      </TouchableOpacity>
      <Text style={styles.backTitle}>{title}</Text>
    </View>
  );
}

function Field({ label, value, onChange, secure, keyboardType, multiline, numberOfLines }: any) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
}

function Save({ color, onPress }: any) {
  return (
    <TouchableOpacity style={[styles.save, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.saveText}>Save Changes</Text>
    </TouchableOpacity>
  );
}

function InfoRow({ label, value, bgColor }: any) {
  return (
    <View style={[styles.menu, { backgroundColor: bgColor, justifyContent: 'space-between' }]}>
      <Text style={{ color: '#666' }}>{label}</Text>
      <Text style={{ fontWeight: '700' }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { paddingTop: 70, paddingBottom: 35, alignItems: "center" },
  avatarWrap: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
  avatarImg: { width: 90, height: 90, borderRadius: 45 },
  avatarText: { fontSize: 30, fontWeight: "700" },
  camera: { position: "absolute", bottom: 0, right: 0, width: 26, height: 26, borderRadius: 13, justifyContent: "center", alignItems: "center" },
  name: { fontSize: 18, fontWeight: "700", color: "#fff", marginTop: 10 },
  email: { fontSize: 12, color: "#fff", opacity: 0.9 },
  roleBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginTop: 8 },
  roleText: { color: "#fff", fontSize: 11, fontWeight: '700' },
  starsContainer: { flexDirection: 'row', marginTop: 4, marginBottom: 2 },
  body: { padding: 20 },
  menu: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 16, marginBottom: 12 },
  menuText: { marginLeft: 12, fontWeight: "600" },
  logout: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  logoutText: { marginLeft: 8, color: "#D32F2F", fontWeight: "600" },
  back: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backTitle: { marginLeft: 12, fontSize: 18, fontWeight: "700" },
  field: { marginBottom: 14 },
  label: { fontSize: 12, marginBottom: 4, color: '#666' },
  input: { backgroundColor: "#F6F6F6", borderRadius: 12, height: 44, paddingHorizontal: 14 },
  textArea: { height: 100, paddingTop: 12, textAlignVertical: 'top' },
  save: { height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", marginTop: 10 },
  saveText: { color: "#fff", fontWeight: "600" },
  hint: { fontSize: 13, color: '#777', marginBottom: 15 },
  uploadCard: { width: '100%', aspectRatio: 2, borderRadius: 16, borderStyle: 'dashed', borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
});
