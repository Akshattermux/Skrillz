import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* HEADER */}
        <LinearGradient
          colors={["#E46B2E", "#F78DA7"]}
          style={styles.header}
        >
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            We’ll help you reset it securely
          </Text>
        </LinearGradient>

        {/* CARD */}
        <View style={styles.card}>
          <Text style={styles.label}>Email address</Text>

          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color="#C56A2D" />
            <TextInput
              placeholder="Enter your registered email"
              placeholderTextColor="#A07855"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryText}>Send Reset Link</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={16} color="#CC6600" />
            <Text style={styles.backText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 220,
    paddingTop: 80,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#FFE8D9",
    marginTop: 6,
  },
  card: {
    backgroundColor: "#fff",
    marginTop: -40,
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE3C7",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 20,
  },
  input: {
    marginLeft: 12,
    fontSize: 15,
    flex: 1,
    color: "#333",
  },
  primaryBtn: {
    backgroundColor: "#CC6600",
    height: 54,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  backText: {
    marginLeft: 6,
    color: "#CC6600",
    fontSize: 14,
    fontWeight: "500",
  },
});
