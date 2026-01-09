import GlassTabBar from "@/src/components/GlassTabBar";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <GlassTabBar {...props} />}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size ?? 24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="appointments"
        options={{
          tabBarLabel: "Appointments",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size ?? 24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              size={size ?? 24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size ?? 24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
