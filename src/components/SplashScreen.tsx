import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const progress = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: width * 0.6,
        duration: 2200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTimeout(onFinish, 300);
    });
  }, []);

  return (
    <LinearGradient
      colors={["#F46C2D", "#F78DA7"]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.center,
          { transform: [{ scale }], opacity },
        ]}
      >
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>S</Text>
        </View>

        <Text style={styles.title}>SKRILZ</Text>
        <Text style={styles.subtitle}>
          Healthcare & Education Ecosystem
        </Text>

        <View style={styles.progressBar}>
          <Animated.View
            style={[styles.progressFill, { width: progress }]}
          />
        </View>
      </Animated.View>

      <Text style={styles.footer}>Made with ❤️ by MWM</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
  },
  logoBox: {
    width: 90,
    height: 90,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 42,
    fontWeight: "700",
    color: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#ffe",
    opacity: 0.9,
    marginTop: 6,
    marginBottom: 26,
  },
  progressBar: {
    width: width * 0.6,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.25)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    color: "#fff",
    fontSize: 12,
    opacity: 0.9,
  },
});
