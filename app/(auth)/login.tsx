import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    Alert,
    BackHandler,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useLanguage } from "../../src/context/LanguageContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t, language } = useLanguage();

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

  const handleLogin = () => {
    const VALID_PATIENT_EMAIL = "akshatsharma5645@gmail.com";
    const VALID_DOCTOR_EMAIL = "doctor@gmail.com";
    const VALID_STUDENT_EMAIL = "student@gmail.com";
    const VALID_TEACHER_EMAIL = "teacher@gmail.com";
    const VALID_PASSWORD = "console.log";

    if (password === VALID_PASSWORD) {
      if (email === VALID_PATIENT_EMAIL) {
        router.replace("/(tabs)/Home");
      } else if (email === VALID_DOCTOR_EMAIL) {
        router.replace("/(doctor)/Home");
      } else if (email === VALID_STUDENT_EMAIL) {
        console.log("Accessing Student Portal...");
        router.replace("/(student)/Home");
      } else if (email === VALID_TEACHER_EMAIL) {
        router.replace("/(teacher)/Home");
      } else {
        Alert.alert("Login Failed", "Invalid email or password");
      }
    } else {
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#E46B2E", "#F78DA7"]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.langButton} 
            onPress={() => router.push("/?force=true")}
          >
            <Ionicons name="language" size={18} color="#fff" />
            <Text style={styles.langButtonText}>{language?.toUpperCase() || "EN"}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{t('welcome_back')}</Text>
        <Text style={styles.subtitle}>
          {t('login_subtitle')}
        </Text>
      </LinearGradient>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#C56A2D" />
          <TextInput
            placeholder={t('email_placeholder')}
            placeholderTextColor="#B58B6A"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#C56A2D" />
          <TextInput
            placeholder={t('pass_placeholder')}
            placeholderTextColor="#B58B6A"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#C56A2D" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/forgot-password")}
        >
          <Text style={styles.forgot}>{t('forgot_pass')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>{t('login')}</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>
            {t('no_account')}
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/signup")}
            style={styles.signupButton}
          >
            <Text style={styles.signupText}>{t('signup')}</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingBottom: 20,
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
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 26,
  },
  footerText: {
    color: "#555",
    fontSize: 13,
    marginRight: 8,
  },
  signupButton: {
    backgroundColor: "#FFE3C7",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12, // ✅ NUMBER, SAFE
  },
  signupText: {
    color: "#D2691E",
    fontSize: 14,
    fontWeight: "600",
  },
});
