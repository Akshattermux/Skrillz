import SharedJobs from "../../src/components/SharedJobs";
import { View } from "react-native";

export default function TeacherJobs() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F9FBFA" }}>
      <SharedJobs 
        themeColor="#00897B" 
        gradientColors={["#00897B", "#4DB6AC"]} 
      />
    </View>
  );
}
