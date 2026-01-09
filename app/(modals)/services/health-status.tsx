import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function HealthProfile() {
  const [profile, setProfile] = useState({
    height: "",
    weight: "",
    bloodGroup: "",
    conditions: "",
    surgeries: "",
    allergies: "",
    medications: "",
    smoking: "No",
    alcohol: "No",
    activity: "Moderate",
  });

  const update = (key: string, value: string) =>
    setProfile({ ...profile, [key]: value });

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <Text style={styles.title}>Health Profile</Text>
        <Text style={styles.subtitle}>
          Manage your personal health information
        </Text>
      </LinearGradient>

      {/* BODY INFO */}
      <Section title="Basic Information">
        <Input label="Height (cm)" value={profile.height} onChange={(v) => update("height", v)} />
        <Input label="Weight (kg)" value={profile.weight} onChange={(v) => update("weight", v)} />
        <Input label="Blood Group" value={profile.bloodGroup} onChange={(v) => update("bloodGroup", v)} />
      </Section>

      {/* MEDICAL HISTORY */}
      <Section title="Medical History">
        <TextArea
          label="Existing Conditions (e.g. heart attack, diabetes)"
          value={profile.conditions}
          onChange={(v) => update("conditions", v)}
        />
        <TextArea
          label="Past Surgeries / Hospitalizations"
          value={profile.surgeries}
          onChange={(v) => update("surgeries", v)}
        />
        <TextArea
          label="Allergies"
          value={profile.allergies}
          onChange={(v) => update("allergies", v)}
        />
        <TextArea
          label="Current Medications"
          value={profile.medications}
          onChange={(v) => update("medications", v)}
        />
      </Section>

      {/* LIFESTYLE */}
      <Section title="Lifestyle">
        <Choice
          label="Smoking"
          value={profile.smoking}
          onSelect={(v) => update("smoking", v)}
          options={["No", "Occasionally", "Yes"]}
        />
        <Choice
          label="Alcohol"
          value={profile.alcohol}
          onSelect={(v) => update("alcohol", v)}
          options={["No", "Occasionally", "Yes"]}
        />
        <Choice
          label="Physical Activity"
          value={profile.activity}
          onSelect={(v) => update("activity", v)}
          options={["Low", "Moderate", "High"]}
        />
      </Section>

      {/* SAVE */}
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Save Health Profile</Text>
      </TouchableOpacity>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

/* =======================
   COMPONENTS
   ======================= */

function Section({ title, children }: any) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

function Input({ label, value, onChange }: any) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={label}
        placeholderTextColor="#999"
      />
    </View>
  );
}

function TextArea({ label, value, onChange }: any) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textArea}
        value={value}
        onChangeText={onChange}
        placeholder={label}
        placeholderTextColor="#999"
        multiline
      />
    </View>
  );
}

function Choice({ label, value, options, onSelect }: any) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.choiceRow}>
        {options.map((opt: string) => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.choice,
              value === opt && styles.choiceActive,
            ]}
            onPress={() => onSelect(opt)}
          >
            <Text
              style={[
                styles.choiceText,
                value === opt && styles.choiceTextActive,
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
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
  title: { fontSize: 26, fontWeight: "700", color: "#fff" },
  subtitle: { fontSize: 13, color: "#FFE8D9", marginTop: 6 },

  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },

  card: {
    backgroundColor: "#FFF3E8",
    borderRadius: 18,
    padding: 16,
  },

  field: { marginBottom: 14 },
  label: { fontSize: 13, marginBottom: 6, color: "#555" },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    fontSize: 14,
  },

  textArea: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 10,
    minHeight: 80,
    fontSize: 14,
    textAlignVertical: "top",
  },

  choiceRow: { flexDirection: "row", flexWrap: "wrap" },
  choice: {
    borderWidth: 1,
    borderColor: "#CC6600",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 10,
    marginBottom: 8,
  },
  choiceActive: {
    backgroundColor: "#CC6600",
  },
  choiceText: { fontSize: 12, color: "#CC6600" },
  choiceTextActive: { color: "#fff" },

  saveBtn: {
    backgroundColor: "#CC6600",
    height: 54,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
