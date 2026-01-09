import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      
      {/* Header */}
      <LinearGradient
        colors={["#E46B2E", "#F78DA7"]}
        style={styles.header}
      >
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue your journey
        </Text>
      </LinearGradient>

      {/* Form */}
      <View style={styles.form}>
        
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#C56A2D" />
          <TextInput
            placeholder="Enter your email or ID"
            placeholderTextColor="#B58B6A"
            style={styles.input}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#C56A2D" />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#B58B6A"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <TouchableOpacity onPress={() => {router.push("/(auth)/forgot-password")}}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {router.push("/(tabs)/Home")}}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footer} onPress={() => {router.push("/(auth)/signup")}}>
        <Text style={styles.footer}>  Don&apos;t have an account?{" "}</Text>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 220,
    paddingHorizontal: 24,
    paddingTop: 70,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#FFE8D9",
    marginTop: 6,
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE3C7",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 16,
  },
  input: {
    marginLeft: 12,
    fontSize: 15,
    color: "#333",
    flex: 1,
  },
  forgot: {
    alignSelf: "flex-end",
    color: "#D2691E",
    fontSize: 13,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#CC6600",
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    marginTop: 26,
    color: "#555",
    fontSize: 13,
    
  },
  signup: {
    marginLeft: 110,
    height: 30,
    width: 100,
    fontSize: 15,
    marginTop: 10,
    paddingTop: 6,
    textAlign: "center",
    color: "#D2691E",
    fontWeight: "600",
    backgroundColor: "#FFE3C7",
    borderRadius:"10%",
  },
});
