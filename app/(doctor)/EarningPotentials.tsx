import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EarningPotentials() {
  const [price, setPrice] = useState("150");

  const graphData = [
    { day: "Mon", value: 40 },
    { day: "Tue", value: 70 },
    { day: "Wed", value: 50 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 65 },
    { day: "Sat", value: 80 },
    { day: "Sun", value: 95 },
  ];

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient colors={["#2E86E4", "#8DA7F7"]} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Earning Potentials</Text>
          <Text style={styles.headerSub}>Maximize your growth & reach</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* GRAPH SECTION */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Earnings Trend</Text>
            <View style={styles.trendBadgeLarge}>
              <Ionicons name="trending-up" size={14} color="#2E7D32" />
              <Text style={styles.trendTextLarge}>+15.4%</Text>
            </View>
          </View>
          
          <View style={styles.graphContainer}>
            {graphData.map((data, index) => (
              <View key={index} style={styles.graphBarWrap}>
                <LinearGradient 
                  colors={["#8DA7F7", "#2E86E4"]} 
                  style={[styles.graphBar, { height: data.value * 1.5 }]} 
                />
                <Text style={styles.graphLabel}>{data.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* PRICING SIMULATION */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pricing Simulation</Text>
          <Text style={styles.cardDesc}>See how changing your hourly rate affects potential monthly income.</Text>
          
          <View style={styles.inputRow}>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Price per Hour ($)</Text>
              <TextInput 
                style={styles.input} 
                value={price} 
                onChangeText={setPrice} 
                keyboardType="numeric"
              />
            </View>
            <View style={styles.resultWrap}>
              <Text style={styles.resultLabel}>Est. Monthly</Text>
              <Text style={styles.resultAmount}>${(parseInt(price || "0") * 160).toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* GROWTH SUGGESTIONS */}
        <Text style={styles.sectionTitle}>Growth Suggestions</Text>
        
        <SuggestionCard 
          icon="videocam" 
          title="Host a Webinar" 
          desc="Docs who host weekly webinars see a 40% increase in bookings."
          color="#2E86E4"
        />
        <SuggestionCard 
          icon="image" 
          title="Update Profile Bio" 
          desc="A detailed bio with expertise increases trust by 25%."
          color="#FF9800"
        />
        <SuggestionCard 
          icon="star" 
          title="Collect Reviews" 
          desc="Encourage patients to leave 5-star feedback for better ranking."
          color="#4CAF50"
        />
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

function SuggestionCard({ icon, title, desc, color }: any) {
  return (
    <View style={styles.suggestionCard}>
      <View style={[styles.suggestIcon, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.suggestTitle}>{title}</Text>
        <Text style={styles.suggestDesc}>{desc}</Text>
      </View>
      <TouchableOpacity style={styles.applyBtn}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  titleContainer: { marginTop: 10 },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: '800' },
  headerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 5 },
  content: { padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  cardDesc: { color: '#666', fontSize: 12, marginTop: 5, marginBottom: 15 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  trendBadgeLarge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  trendTextLarge: { color: '#2E7D32', fontSize: 12, fontWeight: '700', marginLeft: 4 },
  graphContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 180, marginTop: 10 },
  graphBarWrap: { alignItems: 'center' },
  graphBar: { width: 28, borderRadius: 8 },
  graphLabel: { fontSize: 10, color: '#999', marginTop: 8, fontWeight: '600' },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  inputWrap: { flex: 1, marginRight: 15 },
  inputLabel: { fontSize: 11, color: '#999', marginBottom: 5, fontWeight: '600' },
  input: { backgroundColor: '#F5F8FF', borderRadius: 12, height: 44, paddingHorizontal: 15, fontSize: 16, fontWeight: '700', color: '#2E86E4' },
  resultWrap: { backgroundColor: '#2E86E4', borderRadius: 16, padding: 12, alignItems: 'center', minWidth: 100 },
  resultLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: '600' },
  resultAmount: { color: '#fff', fontSize: 18, fontWeight: '800', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 15, marginTop: 10 },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  suggestIcon: { width: 46, height: 46, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  suggestTitle: { fontSize: 15, fontWeight: '700', color: '#333' },
  suggestDesc: { fontSize: 12, color: '#777', marginTop: 4, lineHeight: 16 },
  applyBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, backgroundColor: '#F5F8FF' },
  applyText: { color: '#2E86E4', fontSize: 12, fontWeight: '700' },
});
