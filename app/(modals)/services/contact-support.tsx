import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const CATEGORIES = [
  "Account Issue",
  "Appointment Problem",
  "Payment Issue",
  "Doctor Consultation",
  "Technical Bug",
  "Other",
];

export default function ContactSupport() {
  const [category, setCategory] = useState("Account Issue");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    if (!subject || !message) {
      Alert.alert("Missing Information", "Please fill all required fields.");
      return;
    }

    Alert.alert(
      "Support Request Sent",
      "Our support team will contact you shortly.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Contact Support</Text>
        <Text style={styles.subtitle}>
          We’re here to help you 24×7
        </Text>
      </LinearGradient>

      {/* FORM */}
      <View style={styles.card}>
        {/* CATEGORY */}
        <Text style={styles.label}>Issue Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setCategory(item)}
              style={[
                styles.chip,
                category === item && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  category === item && styles.chipTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* SUBJECT */}
        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Briefly describe your issue"
          value={subject}
          onChangeText={setSubject}
        />

        {/* MESSAGE */}
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Explain your issue in detail"
          multiline
          numberOfLines={5}
          value={message}
          onChangeText={setMessage}
        />

        {/* ATTACHMENT */}
        <TouchableOpacity style={styles.attachBtn}>
          <Ionicons name="attach-outline" size={18} color="#CC6600" />
          <Text style={styles.attachText}>
            Attach Screenshot / Report
          </Text>
        </TouchableOpacity>

        {/* SUBMIT */}
        <TouchableOpacity style={styles.submitBtn} onPress={submit}>
          <Ionicons name="send" size={18} color="#fff" />
          <Text style={styles.submitText}>Submit Request</Text>
        </TouchableOpacity>
      </View>

      {/* EMERGENCY NOTE */}
      <View style={styles.note}>
        <Ionicons name="alert-circle-outline" size={18} color="#D32F2F" />
        <Text style={styles.noteText}>
          For medical emergencies, please call local emergency services immediately.
        </Text>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

/* =======================
   STYLES
   ======================= */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: 70,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 13,
    color: "#FFE8D9",
    marginTop: 6,
  },

  card: {
    marginTop: -20,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 20,
    elevation: 4,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 6,
  },

  chip: {
    backgroundColor: "#FFE3C7",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  chipActive: {
    backgroundColor: "#CC6600",
  },
  chipText: {
    fontSize: 12,
    color: "#333",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    fontSize: 14,
  },

  textArea: {
    height: 110,
    textAlignVertical: "top",
    paddingTop: 12,
  },

  attachBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  attachText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#CC6600",
    fontWeight: "600",
  },

  submitBtn: {
    marginTop: 24,
    backgroundColor: "#CC6600",
    height: 54,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },

  note: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    paddingHorizontal: 20,
  },
  noteText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#D32F2F",
  },
});
