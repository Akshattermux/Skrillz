import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* AUTH FLOW (NO TABS, NO MODALS) */}
        <Stack.Screen name="(auth)" />

        {/* MAIN APP */}
        <Stack.Screen name="(tabs)" />

        {/* OVERLAY FLOWS */}
        <Stack.Screen
          name="(modals)"
          options={{ presentation: "modal" }}
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
