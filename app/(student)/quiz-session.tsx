import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  Alert,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "Which of the following serves as the primary pacemaker of the heart?",
    options: ["AV Node", "Bundle of His", "SA Node", "Purkinje Fibers"],
    correct: 2,
    explanation: "The SA Node (Sinoatrial Node) is the heart's natural pacemaker, initiating the electrical impulses."
  },
  {
    id: 2,
    question: "What is the normal range for adult resting heart rate?",
    options: ["40-60 bpm", "60-100 bpm", "100-120 bpm", "50-80 bpm"],
    correct: 1,
    explanation: "A normal resting heart rate for adults ranges from 60 to 100 beats per minute."
  },
  {
    id: 3,
    question: "Which valve separates the left atrium from the left ventricle?",
    options: ["Mitral Valve", "Tricuspid Valve", "Aortic Valve", "Pulmonary Valve"],
    correct: 0,
    explanation: "The Mitral (Bicuspid) valve separates the left side chambers of the heart."
  }
];

export default function QuizSession() {
  const { subject } = useLocalSearchParams();
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelect = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    setShowExplanation(true);
    if (idx === MOCK_QUESTIONS[currentIdx].correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < MOCK_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    } else {
      Alert.alert(
        "Quiz Finished!",
        `You scored ${score} out of ${MOCK_QUESTIONS.length}`,
        [{ text: "Great!", onPress: () => router.back() }]
      );
    }
  };

  const currentQuestion = MOCK_QUESTIONS[currentIdx];

  return (
    <View style={styles.root}>
      <ImageBackground 
        source={{ uri: "https://www.transparenttextures.com/patterns/cubes.png" }}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.05, tintColor: "#6200EA" }}
      />

      <LinearGradient colors={["#6200EA", "#B388FF"]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.subjectTitle}>{subject}</Text>
          <View style={styles.timerBadge}>
            <Ionicons name="time-outline" size={16} color="#fff" />
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>
        
        <View style={styles.progressSection}>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${((currentIdx + 1) / MOCK_QUESTIONS.length) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>Question {currentIdx + 1} of {MOCK_QUESTIONS.length}</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Animated.View 
          key={currentIdx}
          entering={FadeInRight}
          exiting={FadeOutLeft}
          style={styles.questionCard}
        >
          <BlurView intensity={20} tint="light" style={styles.questionGlass}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </BlurView>
        </Animated.View>

        <View style={styles.optionsList}>
          {currentQuestion.options.map((opt, idx) => {
            const isCorrect = idx === currentQuestion.correct;
            const isSelected = idx === selectedOpt;
            const isDisabled = selectedOpt !== null && !isCorrect && !isSelected;

            return (
              <TouchableOpacity 
                key={idx} 
                style={[
                  styles.optionBtn,
                  isSelected && styles.optSelected,
                  selectedOpt !== null && isCorrect && styles.optCorrect,
                  selectedOpt !== null && isSelected && !isCorrect && styles.optWrong,
                  isDisabled && styles.optDisabled,
                ]} 
                onPress={() => handleSelect(idx)}
              >
                <Text style={[
                  styles.optText, 
                  selectedOpt !== null && (isCorrect || isSelected) && styles.optTextActive
                ]}>{opt}</Text>
                {selectedOpt !== null && isCorrect && <Ionicons name="checkmark-circle" size={20} color="#fff" />}
                {selectedOpt !== null && isSelected && !isCorrect && <Ionicons name="close-circle" size={20} color="#fff" />}
              </TouchableOpacity>
            );
          })}
        </View>

        {showExplanation && (
          <Animated.View entering={FadeInRight} style={styles.explanationCard}>
            <BlurView intensity={10} tint="light" style={styles.explanationGlass}>
              <Text style={styles.expTitle}>Explanation</Text>
              <Text style={styles.expText}>{currentQuestion.explanation}</Text>
            </BlurView>
          </Animated.View>
        )}
      </View>

      <View style={styles.footer}>
        {selectedOpt !== null && (
          <TouchableOpacity style={styles.nextBtn} onPress={nextQuestion}>
            <LinearGradient colors={["#6200EA", "#B388FF"]} style={styles.nextGradient}>
              <Text style={styles.nextText}>{currentIdx === MOCK_QUESTIONS.length - 1 ? "Finish Quiz" : "Next Question"}</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F9F5FF" },
  header: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  subjectTitle: { fontSize: 18, fontWeight: "800", color: "#fff" },
  timerBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 6 },
  timerText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  progressSection: { marginTop: 10 },
  progressBg: { height: 6, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#fff", borderRadius: 3 },
  progressText: { color: "rgba(255,255,255,0.8)", fontSize: 11, marginTop: 8, textAlign: "right", fontWeight: "600" },
  content: { padding: 20 },
  questionCard: { marginBottom: 25 },
  questionGlass: { padding: 25, borderRadius: 25, backgroundColor: "rgba(255,255,255,0.6)", borderWidth: 1, borderColor: "rgba(255,255,255,0.5)", overflow: "hidden" },
  questionText: { fontSize: 19, fontWeight: "700", color: "#333", lineHeight: 28 },
  optionsList: { gap: 12 },
  optionBtn: { 
    height: 56, 
    borderRadius: 18, 
    backgroundColor: "#fff", 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E1E8F5",
  },
  optSelected: { borderColor: "#6200EA", backgroundColor: "#F5F0FF" },
  optCorrect: { backgroundColor: "#00C853", borderColor: "#00C853" },
  optWrong: { backgroundColor: "#FF1744", borderColor: "#FF1744" },
  optDisabled: { opacity: 0.5 },
  optText: { fontSize: 15, fontWeight: "600", color: "#333" },
  optTextActive: { color: "#fff" },
  explanationCard: { marginTop: 20 },
  explanationGlass: { padding: 20, borderRadius: 20, backgroundColor: "rgba(98, 0, 234, 0.05)", borderWidth: 1, borderColor: "rgba(98, 0, 234, 0.1)", overflow: "hidden" },
  expTitle: { fontSize: 14, fontWeight: "800", color: "#6200EA", marginBottom: 6 },
  expText: { fontSize: 13, color: "#555", lineHeight: 20 },
  footer: { position: "absolute", bottom: 40, left: 20, right: 20 },
  nextBtn: { borderRadius: 28, overflow: "hidden", elevation: 4 },
  nextGradient: { height: 56, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
