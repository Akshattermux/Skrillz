import SplashScreen from "@/src/components/SplashScreen";
import { Redirect, useRouter, useLocalSearchParams } from "expo-router";
import { useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguage } from "../src/context/LanguageContext";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const LANGUAGES = [
  { id: "en", label: "English", flag: "🇺🇸", native: "English" },
  { id: "hi", label: "Hindi", flag: "🇮🇳", native: "हिंदी" },
  { id: "kn", label: "Kannada", flag: "🇮🇳", native: "ಕನ್ನಡ" },
  { id: "pa", label: "Punjabi", flag: "🇮🇳", native: "ਪੰਜਾਬੀ" },
  { id: "ta", label: "Tamil", flag: "🇮🇳", native: "தமிழ்" },
  { id: "te", label: "Telugu", flag: "🇮🇳", native: "తెలుగు" },
  { id: "es", label: "Spanish", flag: "🇪🇸", native: "Español" },
  { id: "zh", label: "Chinese", flag: "🇨🇳", native: "中文" },
  { id: "ur", label: "Urdu", flag: "🇵🇰", native: "اردو" },
];

export default function Index() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [done, setDone] = useState(false);
  const [search, setSearch] = useState("");
  const { language, setLanguage, t } = useLanguage();
  const [tempLang, setTempLang] = useState<any>(language || "en");
  const isLoggedIn = false;

  const forceShow = params.force === "true";

  const filteredLangs = useMemo(() => {
    return LANGUAGES.filter(
      (l) =>
        l.label.toLowerCase().includes(search.toLowerCase()) ||
        l.native.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  if (!done && !forceShow) {
    return <SplashScreen onFinish={() => setDone(true)} />;
  }

  // Auto-redirect to login if not forced to show language picker
  if (!forceShow) {
    return isLoggedIn ? (
      <Redirect href="/(tabs)/Home" />
    ) : (
      <Redirect href="/(auth)/login" />
    );
  }

  const handleContinue = () => {
    if (tempLang) {
      setLanguage(tempLang);
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#E46B2E", "#F78DA7"]} style={styles.header}>
        <Text style={styles.title}>Skrillz</Text>
        <Text style={styles.subtitle}>{t('select_lang')}</Text>
      </LinearGradient>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#C56A2D" />
          <TextInput
            placeholder="Search language..."
            placeholderTextColor="#B58B6A"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {filteredLangs.map((lang, index) => (
          <Animated.View
            key={lang.id}
            entering={FadeInDown.delay(40 * index).duration(350)}
          >
            <TouchableOpacity
              style={[styles.langCard, tempLang === lang.id && styles.activeCard]}
              onPress={() => setTempLang(lang.id)}
            >
              <View style={styles.langContent}>
                <Text style={styles.flag}>{lang.flag}</Text>
                <View style={styles.labelContainer}>
                  <Text style={styles.langNative}>{lang.native}</Text>
                  <Text style={styles.langLabel}>{lang.label}</Text>
                </View>
                {tempLang === lang.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#CC6600" />
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueBtn, !tempLang && styles.disabledBtn]}
          onPress={handleContinue}
          disabled={!tempLang}
        >
          <LinearGradient
            colors={tempLang ? ["#CC6600", "#FF8C00"] : ["#E0E0E0", "#BDBDBD"]}
            style={styles.gradientBtn}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.continueText}>{t("continue")}</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    marginBottom: 20,
  },
  title: { fontSize: 32, fontWeight: "700", color: "#fff" },
  subtitle: { fontSize: 14, color: "#FFE8D9", marginTop: 6, fontWeight: "500" },
  searchSection: { paddingHorizontal: 24, marginBottom: 16 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE3C7",
    paddingHorizontal: 16,
    height: 52,
    borderRadius: 14,
  },
  searchInput: { flex: 1, color: "#333", marginLeft: 10, fontSize: 15 },
  list: { paddingHorizontal: 24 },
  langCard: {
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: "#FFE3C7",
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeCard: { borderColor: "#CC6600" },
  langContent: { flexDirection: "row", alignItems: "center", padding: 14 },
  flag: { fontSize: 28, marginRight: 14 },
  labelContainer: { flex: 1 },
  langNative: { fontSize: 17, fontWeight: "700", color: "#333" },
  langLabel: { fontSize: 12, color: "#A07855", marginTop: 2 },
  footer: { position: "absolute", bottom: 40, left: 24, right: 24 },
  continueBtn: { borderRadius: 28, overflow: "hidden", elevation: 4, shadowColor: "#CC6600", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 6 },
  disabledBtn: { opacity: 0.6 },
  gradientBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 56, gap: 10 },
  continueText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
