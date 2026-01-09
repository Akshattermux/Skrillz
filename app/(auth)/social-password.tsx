import { useLocalSearchParams } from "expo-router";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function SocialPasswordScreen() {
  const { name, role } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {name} 👋</Text>
      <Text style={styles.subtitle}>
        You&apos;re signing up as {role}. Set a password to secure your account.
      </Text>

      <TextInput placeholder="Create password" secureTextEntry style={styles.input} />
      <TextInput placeholder="Confirm password" secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 24 },
  input: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#FFE3C7",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#CC6600",
    height: 54,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
