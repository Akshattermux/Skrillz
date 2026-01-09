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

/* =======================
   MOCK DATA (BACKEND READY)
   ======================= */
const INITIAL_USER = {
  name: "Emma Wilson",
  email: "emma.wilson@medlink.com",
  phone: "+91 98765 43210",
  role: "Patient",
  avatar: null as string | null,
};

const PAYMENTS = [
  {
    id: "TXN001",
    doctor: "Dr. Sarah Johnson",
    amount: "₹499",
    date: "12 Sep 2024",
    status: "Paid",
  },
  {
    id: "TXN002",
    doctor: "Dr. Michael Chen",
    amount: "₹799",
    date: "03 Aug 2024",
    status: "Refunded",
  },
];

type Screen =
  | "profile"
  | "edit"
  | "account"
  | "password"
  | "sessions"
  | "payments"
  | "appinfo"
  | "help";

export default function Profile() {
  const [screen, setScreen] = useState<Screen>("profile");
  const [user, setUser] = useState(INITIAL_USER);

  /* =======================
     PROFILE PHOTO UPLOAD
     ======================= */
  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!res.canceled) {
      setUser({ ...user, avatar: res.assets[0].uri });
    }
  };

  /* =======================
     LOGOUT
     ======================= */
  const logout = () => {
    Alert.alert("Log Out", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => router.replace("/(auth)/login"),
      },
    ]);
  };

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <TouchableOpacity style={styles.avatarWrap} onPress={pickImage}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatarImg} />
          ) : (
            <Text style={styles.avatarText}>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Text>
          )}
          <View style={styles.camera}>
            <Ionicons name="camera" size={14} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.role}>{user.role}</Text>
      </LinearGradient>

      <View style={styles.body}>
        {/* ================= PROFILE HOME ================= */}
        {screen === "profile" && (
          <>
            <Menu icon="person-outline" title="Edit Profile" onPress={() => setScreen("edit")} />
            <Menu icon="settings-outline" title="Account Center" onPress={() => setScreen("account")} />
            <Menu icon="card-outline" title="Payment History" onPress={() => setScreen("payments")} />
            <Menu icon="information-circle-outline" title="App Information" onPress={() => setScreen("appinfo")} />
            <Menu icon="help-circle-outline" title="Help Center" onPress={() => setScreen("help")} />

            <TouchableOpacity style={styles.logout} onPress={logout}>
              <Ionicons name="log-out-outline" size={18} color="#D32F2F" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </>
        )}

        {/* ================= EDIT PROFILE ================= */}
        {screen === "edit" && (
          <>
            <Back title="Edit Profile" onBack={() => setScreen("profile")} />
            <Field label="Full Name" value={user.name} onChange={(v) => setUser({ ...user, name: v })} />
            <Field label="Email" value={user.email} onChange={(v) => setUser({ ...user, email: v })} />
            <Field label="Phone" value={user.phone} onChange={(v) => setUser({ ...user, phone: v })} />
            <Save onPress={() => setScreen("profile")} />
          </>
        )}

        {/* ================= ACCOUNT CENTER ================= */}
        {screen === "account" && (
          <>
            <Back title="Account Center" onBack={() => setScreen("profile")} />
            <Menu icon="lock-closed-outline" title="Change Password" onPress={() => setScreen("password")} />
            <Menu icon="shield-checkmark-outline" title="Active Sessions" onPress={() => setScreen("sessions")} />
            <Menu
              icon="trash-outline"
              title="Delete Account"
              danger
              onPress={() =>
                Alert.alert("Delete Account", "This action is irreversible.", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Delete", style: "destructive" },
                ])
              }
            />
          </>
        )}

        {/* ================= CHANGE PASSWORD ================= */}
        {screen === "password" && (
          <>
            <Back title="Change Password" onBack={() => setScreen("account")} />
            <Field label="Current Password" secure />
            <Field label="New Password" secure />
            <Field label="Confirm Password" secure />
            <Save onPress={() => setScreen("account")} />
          </>
        )}

        {/* ================= SESSIONS ================= */}
        {screen === "sessions" && (
          <>
            <Back title="Active Sessions" onBack={() => setScreen("account")} />
            <Session device="iPhone 15 • India" active />
            <Session device="Chrome • Windows" />
          </>
        )}

        {/* ================= PAYMENTS ================= */}
        {screen === "payments" && (
          <>
            <Back title="Payment History" onBack={() => setScreen("profile")} />
            {PAYMENTS.map((p) => (
              <View key={p.id} style={styles.paymentCard}>
                <Ionicons name="receipt-outline" size={20} color="#CC6600" />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={styles.paymentDoctor}>{p.doctor}</Text>
                  <Text style={styles.paymentMeta}>{p.date} • {p.id}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.paymentAmount}>{p.amount}</Text>
                  <Text style={[styles.paymentStatus, p.status === "Refunded" && { color: "#D32F2F" }]}>
                    {p.status}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        {/* ================= APP INFO ================= */}
        {screen === "appinfo" && (
          <>
            <Back title="App Information" onBack={() => setScreen("profile")} />
            <InfoRow label="App Name" value="Skrillz Health" />
            <InfoRow label="Version" value="1.0.0" />
            <InfoRow label="Build" value="100" />
            <InfoRow label="Platform" value="Android / iOS" />
            <Menu icon="document-text-outline" title="Terms of Service" />
            <Menu icon="shield-outline" title="Privacy Policy" />
          </>
        )}

        {/* ================= HELP ================= */}
        {screen === "help" && (
          <>
            <Back title="Help Center" onBack={() => setScreen("profile")} />
            <FAQ q="How do I book an appointment?" a="Go to Home → Book Appointment." />
            <FAQ q="How to upload reports?" a="Medical Records → Upload." />
            <FAQ q="How to contact doctor?" a="Open appointment → Chat or Call." />

            <TouchableOpacity
              style={styles.support}
              onPress={() => router.push("/(modals)/services/contact-support")}
            >
              <Ionicons name="mail-outline" size={18} color="#fff" />
              <Text style={styles.supportText}>Contact Support</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

/* =======================
   COMPONENTS
   ======================= */

function Menu({ icon, title, onPress, danger }: any) {
  return (
    <TouchableOpacity style={styles.menu} onPress={onPress}>
      <Ionicons name={icon} size={18} color={danger ? "#D32F2F" : "#CC6600"} />
      <Text style={[styles.menuText, danger && { color: "#D32F2F" }]}>{title}</Text>
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

function Field({ label, value, onChange, secure }: any) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} value={value} onChangeText={onChange} secureTextEntry={secure} />
    </View>
  );
}

function Save({ onPress }: any) {
  return (
    <TouchableOpacity style={styles.save} onPress={onPress}>
      <Text style={styles.saveText}>Save</Text>
    </TouchableOpacity>
  );
}

function Session({ device, active }: any) {
  return (
    <View style={styles.session}>
      <Ionicons name="phone-portrait-outline" size={18} />
      <Text style={{ marginLeft: 10 }}>{device}</Text>
      {active && <Text style={styles.active}>Current</Text>}
    </View>
  );
}

function FAQ({ q, a }: any) {
  const [open, setOpen] = useState(false);
  return (
    <TouchableOpacity style={styles.faq} onPress={() => setOpen(!open)}>
      <Text style={styles.q}>{q}</Text>
      {open && <Text style={styles.a}>{a}</Text>}
    </TouchableOpacity>
  );
}

function InfoRow({ label, value }: any) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

/* =======================
   STYLES
   ======================= */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { paddingTop: 70, paddingBottom: 30, alignItems: "center" },

  avatarWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImg: { width: 90, height: 90, borderRadius: 45 },
  avatarText: { fontSize: 30, fontWeight: "700", color: "#CC6600" },
  camera: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#CC6600",
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  name: { fontSize: 18, fontWeight: "700", color: "#fff", marginTop: 8 },
  email: { fontSize: 12, color: "#fff" },
  role: { fontSize: 12, color: "#FFE8D9" },

  body: { padding: 20 },

  menu: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E8",
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
  },
  menuText: { marginLeft: 12, fontWeight: "600" },

  logout: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  logoutText: { marginLeft: 8, color: "#D32F2F", fontWeight: "600" },

  back: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backTitle: { marginLeft: 12, fontSize: 18, fontWeight: "700" },

  field: { marginBottom: 14 },
  label: { fontSize: 12, marginBottom: 4 },
  input: { backgroundColor: "#F6F6F6", borderRadius: 12, height: 44, paddingHorizontal: 14 },

  save: {
    backgroundColor: "#CC6600",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { color: "#fff", fontWeight: "600" },

  session: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E8",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  active: { marginLeft: "auto", color: "#2E7D32", fontWeight: "600" },

  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E8",
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
  },
  paymentDoctor: { fontWeight: "600" },
  paymentMeta: { fontSize: 12, color: "#666", marginTop: 2 },
  paymentAmount: { fontWeight: "700" },
  paymentStatus: { fontSize: 12, color: "#2E7D32" },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF3E8",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  infoLabel: { fontSize: 13, color: "#555" },
  infoValue: { fontSize: 13, fontWeight: "600" },

  faq: { backgroundColor: "#FFF3E8", padding: 14, borderRadius: 16, marginBottom: 10 },
  q: { fontWeight: "600" },
  a: { marginTop: 6, fontSize: 13, color: "#555" },

  support: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CC6600",
    height: 50,
    borderRadius: 25,
    marginTop: 10,
  },
  supportText: { color: "#fff", marginLeft: 8, fontWeight: "600" },
});
