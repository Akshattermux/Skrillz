import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import "react-native-reanimated";

import SplashScreen from "../src/components/SplashScreen";
import { LanguageProvider } from "../src/context/LanguageContext";
import { UserProvider } from "../src/context/UserContext";
import { VideoProvider } from "../src/context/VideoContext";
import { NotificationProvider } from "../src/context/NotificationContext";
import FloatingPiP from "../src/components/FloatingPiP";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <UserProvider>
      <LanguageProvider>
        <NotificationProvider>
          <VideoProvider>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <View style={styles.container}>
              {/* MAIN NAVIGATION (RENDERS IMMEDIATELY) */}
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(doctor)" />
                <Stack.Screen
                  name="(modals)"
                  options={{ presentation: "modal" }}
                />
              </Stack>

              {/* FLOATING PIP OVERLAY */}
              <FloatingPiP />

              {/* SPLASH OVERLAY (DOES NOT BLOCK UI THREAD) */}
              {showSplash && (
                <View style={StyleSheet.absoluteFill}>
                  <SplashScreen onFinish={() => setShowSplash(false)} />
                </View>
              )}

              <StatusBar style="auto" />
            </View>
          </ThemeProvider>
        </VideoProvider>
      </NotificationProvider>
    </LanguageProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
