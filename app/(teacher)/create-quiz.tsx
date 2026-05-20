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
  Dimensions,
} from "react-native";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function CreateQuiz() {
  const [questions, setQuestions] = useState([
    { id: "1", text: "What is the primary indicator of chronic heart failure?", options: ["A", "B", "C", "D"], correct: 0 },
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now().toString(), text: "", options: ["", "", "", ""], correct: 0 }]);
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
           <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Assessment</Text>
        <TouchableOpacity style={styles.saveBtn}>
           <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.metaSection}>
           <Text style={styles.label}>Quiz Title</Text>
           <TextInput style={styles.input} placeholder="e.g. Cardiology Weekly Test" />
        </View>

        <Text style={styles.sectionTitle}>Questions ({questions.length})</Text>
        
        {questions.map((q, idx) => (
          <View key={q.id} style={styles.qCard}>
             <View style={styles.qHeader}>
                <Text style={styles.qNum}>Question {idx + 1}</Text>
                <TouchableOpacity onPress={() => setQuestions(questions.filter(item => item.id !== q.id))}>
                   <Ionicons name="trash-outline" size={20} color="#FF5252" />
                </TouchableOpacity>
             </View>
             <TextInput 
               style={[styles.input, { height: 80, textAlignVertical: "top", paddingTop: 15 }]} 
               placeholder="Enter your question here..."
               multiline
             />
             <View style={styles.optionsList}>
                {[0,1,2,3].map(optIdx => (
                  <View key={optIdx} style={styles.optRow}>
                     <View style={[styles.radio, q.correct === optIdx && styles.radioActive]} />
                     <TextInput 
                       style={styles.optInput} 
                       placeholder={`Option ${String.fromCharCode(65 + optIdx)}`} 
                     />
                  </View>
                ))}
             </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addBtn} onPress={addQuestion}>
           <Ionicons name="add-circle-outline" size={24} color="#00897B" />
           <Text style={styles.addBtnText}>Add Question</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
         <TouchableOpacity style={styles.publishBtn}>
            <LinearGradient colors={["#00897B", "#4DB6AC"]} style={styles.publishGrad}>
               <Text style={styles.publishText}>Publish to Students</Text>
            </LinearGradient>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F9FBFA" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 25, paddingTop: 60, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#F5F8F7", justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#333" },
  saveBtn: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10, backgroundColor: "#E0F2F1" },
  saveText: { color: "#00897B", fontWeight: "700" },
  content: { flex: 1, padding: 25 },
  metaSection: { marginBottom: 30 },
  label: { fontSize: 13, fontWeight: "700", color: "#666", marginBottom: 10, textTransform: "uppercase" },
  input: { backgroundColor: "#fff", borderRadius: 16, paddingHorizontal: 20, height: 56, fontSize: 15, color: "#333", borderWidth: 1, borderColor: "#E1E8F5" },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#333", marginBottom: 20 },
  qCard: { backgroundColor: "#fff", borderRadius: 25, padding: 20, marginBottom: 20, elevation: 1 },
  qHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  qNum: { fontSize: 14, fontWeight: "700", color: "#00897B" },
  optionsList: { marginTop: 20, gap: 10 },
  optRow: { flexDirection: "row", alignItems: "center" },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: "#DDD" },
  radioActive: { backgroundColor: "#00897B", borderColor: "#00897B" },
  optInput: { flex: 1, marginLeft: 12, height: 45, fontSize: 14, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  addBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 20, borderRadius: 20, borderStyle: "dashed", borderWidth: 2, borderColor: "#00897B", marginTop: 10 },
  addBtnText: { color: "#00897B", fontWeight: "700", marginLeft: 10 },
  footer: { padding: 20, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#F0F0F0" },
  publishBtn: { borderRadius: 20, overflow: "hidden" },
  publishGrad: { height: 60, justifyContent: "center", alignItems: "center" },
  publishText: { color: "#fff", fontSize: 18, fontWeight: "800" },
});
