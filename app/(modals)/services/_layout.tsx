import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="appointments" />
      <Stack.Screen name="audio-call" />
      <Stack.Screen name="book-appointment" />
      <Stack.Screen name="consultation-room" />
      <Stack.Screen name="contact-support" />
      <Stack.Screen name="doctor-profile" />
      <Stack.Screen name="health-status" />
      <Stack.Screen name="medical-records" />
      <Stack.Screen name="prescriptions" />
      <Stack.Screen name="recommended-doctors" />
      <Stack.Screen name="video-call" />
    </Stack>
  );
}
