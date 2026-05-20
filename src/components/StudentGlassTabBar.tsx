import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";

export default function StudentGlassTabBar({ state, descriptors, navigation }: any) {
  const STUDENT_PURPLE = "#6200EA";

  const focusedRoute = state.routes[state.index];
  const focusedOptions = descriptors[focusedRoute.key].options;

  if (focusedOptions.tabBarStyle?.display === "none") {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={90} tint="light" style={styles.blur}>
        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];

          if (options.href === null || options.tabBarButton) return null;

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              { translateY: withSpring(focused ? -10 : 0) },
              { scale: withSpring(focused ? 1.2 : 1) },
            ],
          }));

          const renderIcon =
            options.tabBarIcon ??
            (({ color }: any) => (
              <Ionicons
                name="ellipse-outline"
                size={24}
                color={color}
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
                <View style={[styles.iconContainer, focused && styles.activeContainer]}>
                   {renderIcon({
                     color: focused ? "#fff" : "#999",
                     size: 24,
                   })}
                </View>
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
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  blur: {
    flexDirection: "row",
    height: 75,
    borderRadius: 35,
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor:
      Platform.OS === "android" ? "rgba(255,255,255,0.95)" : "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  activeContainer: {
    backgroundColor: "#6200EA",
    elevation: 4,
    shadowColor: "#6200EA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});
