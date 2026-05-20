import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function SplashScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);

    animation.start(onFinish);

    return () => {
      animation.stop();
    };
  }, []);

  return (
    <LinearGradient
      colors={["#F46C2D", "#F78DA7"]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.center,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        {/* LOGO */}
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>S</Text>
        </View>

        <Text style={styles.title}>SKRILLZ</Text>
        <Text style={styles.subtitle}>
          Healthcare & Education Ecosystem
        </Text>

        {/* PROGRESS BAR */}
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                transform: [{ scaleX: progress }],
                alignSelf: "flex-start",
              },
            ]}
          />
        </View>
      </Animated.View>

      <Text style={styles.footer}>Made with by MMW Corps</Text>
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
    color: "#fff",
    opacity: 0.9,
    marginTop: 6,
    marginBottom: 26,
  },
  progressBar: {
    width: width * 0.6,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
    overflow: "hidden",
  },
  progressFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
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
