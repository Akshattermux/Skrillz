import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";

export default function TeacherLayout() {
  const themeColor = "#00897B"; // Teal for Teacher

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: themeColor,
        tabBarInactiveTintColor: "#999",
        tabBarBackground: () => (
          <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
        ),
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <Ionicons name="stats-chart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="studio"
        options={{
          title: "Live",
          tabBarIcon: ({ color }) => <Ionicons name="videocam" size={24} color={color} />,
        }}
      />
      <Tabs.Screen name="content-manager" options={{ href: null }} />
      <Tabs.Screen
        name="community"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />,
        }}
      />
      <Tabs.Screen name="jobs" options={{ href: null }} />
      <Tabs.Screen name="library" options={{ href: null }} />
      <Tabs.Screen name="schedule" options={{ href: null }} />
      <Tabs.Screen name="create-quiz" options={{ href: null }} />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    height: 70,
    paddingBottom: 12,
    paddingTop: 8,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: "hidden",
  },
});
