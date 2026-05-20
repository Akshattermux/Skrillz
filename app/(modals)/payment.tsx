import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { useUser } from "../../src/context/UserContext";

export default function PaymentScreen() {
  const { type, id, title, price } = useLocalSearchParams();
  const { addPurchase, setSubscription } = useUser();
  const [method, setMethod] = useState("card");

  const handlePay = () => {
    // Mock payment success
    if (type === "class") {
      addPurchase(id as string);
      Alert.alert("Success", `Unlocked ${title}!`);
    } else {
      setSubscription(id as "monthly" | "yearly");
      Alert.alert("Success", `Subscription activated!`);
    }
    router.back();
  };

  return (
    <View style={styles.root}>
      <BlurView intensity={80} tint="light" style={styles.blurBg}>
        <View style={styles.header}>
           <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#333" />
           </TouchableOpacity>
           <Text style={styles.headerTitle}>Checkout</Text>
        </View>

        <View style={styles.summaryCard}>
           <LinearGradient colors={["#6200EA", "#B388FF"]} style={styles.summaryGrad}>
              <Text style={styles.summaryLabel}>{type === "class" ? "Single Class" : "Subscription Plan"}</Text>
              <Text style={styles.summaryTitle} numberOfLines={1}>{title}</Text>
              <View style={styles.priceRow}>
                 <Text style={styles.priceSymbol}>$</Text>
                 <Text style={styles.priceValue}>{price}</Text>
              </View>
           </LinearGradient>
        </View>

        <View style={styles.methodSection}>
           <Text style={styles.sectionTitle}>Payment Method</Text>
           <View style={styles.methodToggle}>
              <TouchableOpacity 
                style={[styles.methodBtn, method === "card" && styles.methodBtnActive]} 
                onPress={() => setMethod("card")}
              >
                 <Ionicons name="card" size={20} color={method === "card" ? "#fff" : "#666"} />
                 <Text style={[styles.methodText, method === "card" && styles.methodTextActive]}>Card</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.methodBtn, method === "upi" && styles.methodBtnActive]} 
                onPress={() => setMethod("upi")}
              >
                 <Ionicons name="phone-portrait" size={20} color={method === "upi" ? "#fff" : "#666"} />
                 <Text style={[styles.methodText, method === "upi" && styles.methodTextActive]}>UPI</Text>
              </TouchableOpacity>
           </View>

           {method === "card" ? (
             <View style={styles.cardForm}>
                <TextInput placeholder="Card Number" style={styles.input} placeholderTextColor="#999" />
                <View style={styles.row}>
                   <TextInput placeholder="MM/YY" style={[styles.input, { flex: 1, marginRight: 10 }]} placeholderTextColor="#999" />
                   <TextInput placeholder="CVV" style={[styles.input, { flex: 1 }]} placeholderTextColor="#999" secureTextEntry />
                </View>
             </View>
           ) : (
             <View style={styles.cardForm}>
                <TextInput placeholder="vpa@upi" style={styles.input} placeholderTextColor="#999" />
             </View>
           )}
        </View>

        <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
           <LinearGradient colors={["#6200EA", "#B388FF"]} style={styles.payGrad}>
              <Text style={styles.payText}>Complete Secure Payment</Text>
              <Ionicons name="lock-closed" size={16} color="#fff" style={{ marginLeft: 8 }} />
           </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footerNote}>Payment secured by Skrillz Secure Bridge</Text>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  blurBg: { backgroundColor: "#fff", borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 25, paddingBottom: 50 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#F5F5F5", justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#333", marginLeft: 15 },
  summaryCard: { borderRadius: 24, overflow: "hidden", marginBottom: 30 },
  summaryGrad: { padding: 20 },
  summaryLabel: { color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: "600" },
  summaryTitle: { color: "#fff", fontSize: 22, fontWeight: "800", marginTop: 4 },
  priceRow: { flexDirection: "row", alignItems: "baseline", marginTop: 15 },
  priceSymbol: { color: "#fff", fontSize: 18, fontWeight: "600" },
  priceValue: { color: "#fff", fontSize: 36, fontWeight: "800", marginLeft: 2 },
  methodSection: { marginBottom: 30 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#333", marginBottom: 15 },
  methodToggle: { flexDirection: "row", backgroundColor: "#F5F5F5", borderRadius: 15, padding: 5, marginBottom: 20 },
  methodBtn: { flex: 1, flexDirection: "row", height: 45, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  methodBtnActive: { backgroundColor: "#6200EA" },
  methodText: { fontSize: 14, fontWeight: "700", color: "#666", marginLeft: 8 },
  methodTextActive: { color: "#fff" },
  cardForm: {},
  input: { height: 55, backgroundColor: "#F9F9F9", borderRadius: 15, paddingHorizontal: 15, fontSize: 15, color: "#333", marginBottom: 15, borderWidth: 1, borderColor: "#EEE" },
  row: { flexDirection: "row" },
  payBtn: { borderRadius: 20, overflow: "hidden" },
  payGrad: { height: 60, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  payText: { color: "#fff", fontSize: 18, fontWeight: "800" },
  footerNote: { textAlign: "center", color: "#999", fontSize: 12, marginTop: 20 },
});
