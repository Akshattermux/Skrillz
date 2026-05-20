import SharedProfile from "../../src/components/SharedProfile";
import { View } from "react-native";

export default function TeacherProfile() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F9FBFA" }}>
      <SharedProfile role="doctor" themeColor="#00897B" />
    </View>
  );
}
