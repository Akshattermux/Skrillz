import DoctorGlassTabBar from "@/src/components/DoctorGlassTabBar";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function DoctorTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <DoctorGlassTabBar {...props} />}
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
        name="feed"
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "apps" : "apps-outline"}
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

      {/* HIDDEN SCREENS */}
      <Tabs.Screen
        name="TotalEarning"
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="EarningPotentials"
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
