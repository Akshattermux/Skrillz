import SharedFeed from "../../src/components/SharedFeed";
import { View } from "react-native";

export default function TeacherCommunity() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F9FBFA" }}>
      <SharedFeed 
        themeColor="#00897B" 
        gradientColors={["#00897B", "#4DB6AC"]} 
      />
    </View>
  );
}
