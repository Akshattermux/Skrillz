import StudentGlassTabBar from "@/src/components/StudentGlassTabBar";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function StudentLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <StudentGlassTabBar {...props} />}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "grid" : "grid-outline"} size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          tabBarLabel: "Community",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "people" : "people-outline"} size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          tabBarLabel: "Library",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "book" : "book-outline"} size={size ?? 24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="classes"
        options={{
          tabBarLabel: "Classes",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "play-circle" : "play-circle-outline"} size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size ?? 24} color={color} />
          ),
        }}
      />

      {/* Hidden Screens */}
      <Tabs.Screen name="recorded-player" options={{ href: null, tabBarStyle: { display: "none" } }} />
      <Tabs.Screen name="jobs" options={{ href: null }} />
      <Tabs.Screen name="live-class" options={{ href: null, tabBarStyle: { display: "none" } }} />
      <Tabs.Screen name="quizzes" options={{ href: null, tabBarStyle: { display: "none" } }} />
      <Tabs.Screen name="quiz-session" options={{ href: null, tabBarStyle: { display: "none" } }} />
      <Tabs.Screen name="notes" options={{ href: null, tabBarStyle: { display: "none" } }} />
      <Tabs.Screen name="topics" options={{ href: null, tabBarStyle: { display: "none" } }} />
    </Tabs>
  );
}
