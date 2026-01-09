import SplashScreen from "@/src/components/SplashScreen";
import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
  const [done, setDone] = useState(false);
  const isLoggedIn = false; // later from store

  if (!done) {
    return <SplashScreen onFinish={() => setDone(true)} />;
  }

  return isLoggedIn
    ? <Redirect href="/(tabs)/Home" />
    : <Redirect href="/(auth)/login" />;
}
