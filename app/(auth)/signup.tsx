import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { useLanguage } from "../../src/context/LanguageContext";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function SignupScreen() {
  const [role, setRole] = useState<"doctor" | "patient" | "student">("patient");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t, language } = useLanguage();

  const goSocialPassword = () => {
    router.push({
      pathname: "/(auth)/social-password",
      params: {
        name: name || "User",
        role,
        via: "social",
      },
    });
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* HEADER */}
          <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
            <View style={styles.headerTop}>
              <TouchableOpacity 
                style={styles.langButton} 
                onPress={() => router.push("/?force=true")}
              >
                <Ionicons name="language" size={18} color="#fff" />
                <Text style={styles.langButtonText}>{language?.toUpperCase() || "EN"}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>{t('create_account')}</Text>
            <Text style={styles.subtitle}>{t('join_today')}</Text>
          </LinearGradient>

          {/* FORM */}
          <View style={styles.card}>
            <Text style={styles.section}>{t('personal_info')}</Text>

            <Input
              icon="person-outline"
              placeholder={t('profile')}
              value={name}
              onChangeText={setName}
            />
            <Input icon="mail-outline" placeholder={t('email_placeholder')} />
            <Input 
              icon="lock-closed-outline" 
              placeholder={t('pass_placeholder')} 
              secure={!showPassword} 
              isPassword={true}
              onToggle={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            <Text style={styles.section}>{t('i_am_a')}</Text>

            <View style={styles.roleRow}>
              <RoleButton label={t('doctor_role')} active={role === "doctor"} onPress={() => setRole("doctor")} />
              <RoleButton label={t('patient_role')} active={role === "patient"} onPress={() => setRole("patient")} />
              <RoleButton label={t('student_role')} active={role === "student"} onPress={() => setRole("student")} />
            </View>

            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryText}>{t('create_account')}</Text>
            </TouchableOpacity>

            {/* DIVIDER */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.or}>{t('or')}</Text>
              <View style={styles.divider} />
            </View>

            {/* SOCIAL */}
            <SocialButton icon={<Ionicons name="logo-apple" size={22} />} text={t('continue_with_apple')} onPress={goSocialPassword} />
            <SocialButton icon={<FontAwesome name="google" size={18} />} text={t('continue_with_google')} onPress={goSocialPassword} />
            <SocialButton icon={<FontAwesome name="linkedin" size={18} />} text={t('continue_with_linkedin')} onPress={goSocialPassword} />

            <Text style={styles.footer}>
              {t('already_account')}{" "}
              <Text style={styles.link} onPress={() => router.push("/(auth)/login")}>
                {t('login')}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

/* ---------- COMPONENTS ---------- */

function Input({ icon, placeholder, secure = false, value, onChangeText, isPassword, onToggle, showPassword }: any) {
  return (
    <View style={styles.inputBox}>
      <Ionicons name={icon} size={20} color="#C56A2D" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#A07855"
        style={styles.input}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
      />
      {isPassword && (
        <TouchableOpacity onPress={onToggle}>
          <Ionicons 
            name={showPassword ? "eye-off-outline" : "eye-outline"} 
            size={20} 
            color="#C56A2D" 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

function RoleButton({ label, active, onPress }: any) {
  return (
    <TouchableOpacity style={[styles.roleBtn, active && styles.roleActive]} onPress={onPress}>
      <Text style={[styles.roleText, active && styles.roleTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function SocialButton({ icon, text, onPress }: any) {
  return (
    <TouchableOpacity style={styles.socialBtn} onPress={onPress}>
      {icon}
      <Text style={styles.socialText}>{text}</Text>
    </TouchableOpacity>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 25,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  langButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  langButtonText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "700",
    fontSize: 12,
  },
  title: { fontSize: 30, fontWeight: "700", color: "#fff" },
  subtitle: { fontSize: 14, color: "#FFE8D9", marginTop: 6 },
  card: {
    backgroundColor: "#fff",
    marginTop: -40,
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 24,
    elevation: 4,
  },
  section: { fontSize: 14, fontWeight: "600", marginBottom: 12 },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE3C7",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 14,
  },
  input: { marginLeft: 12, fontSize: 15, flex: 1 },
  roleRow: { flexDirection: "row", marginBottom: 24 },
  roleBtn: {
    flex: 1,
    marginHorizontal: 4,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFE3C7",
    justifyContent: "center",
    alignItems: "center",
  },
  roleActive: { backgroundColor: "#CC6600" },
  roleText: { fontSize: 14, fontWeight: "600", color: "#555" },
  roleTextActive: { color: "#fff" },
  primaryBtn: {
    backgroundColor: "#CC6600",
    height: 54,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  divider: { flex: 1, height: 1, backgroundColor: "#eee" },
  or: { marginHorizontal: 10, fontSize: 12, color: "#999" },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },
  socialText: { marginLeft: 10, fontSize: 14, fontWeight: "500" },
  footer: { textAlign: "center", marginTop: 16, fontSize: 13 },
  link: { color: "#CC6600", fontWeight: "600" },
});
