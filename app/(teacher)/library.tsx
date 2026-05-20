import SharedLibrary from "../../src/components/SharedLibrary";
import { View } from "react-native";

export default function TeacherLibrary() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F9FBFA" }}>
      <SharedLibrary 
        themeColor="#00897B" 
        gradientColors={["#00897B", "#4DB6AC"]} 
      />
    </View>
  );
}
