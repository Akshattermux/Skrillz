import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";

export default function DoctorGlassTabBar({ state, descriptors, navigation }: any) {
  const DOCTOR_BLUE = "#2E86E4";

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={80} tint="light" style={styles.blur}>
        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];

          if (options.href === null || options.tabBarButton) return null;

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              { translateY: withSpring(focused ? -8 : 0) },
              { scale: withSpring(focused ? 1.15 : 1) },
            ],
          }));

          const renderIcon =
            options.tabBarIcon ??
            (() => (
              <Ionicons
                name="ellipse-outline"
                size={24}
                color={focused ? DOCTOR_BLUE : "#999"}
              />
            ));

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <Animated.View style={animatedStyle}>
                {renderIcon({
                  color: focused ? DOCTOR_BLUE : "#999",
                  size: 26,
                })}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  blur: {
    flexDirection: "row",
    height: 70,
    borderRadius: 30,
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor:
      Platform.OS === "android" ? "rgba(255,255,255,0.9)" : "transparent",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
