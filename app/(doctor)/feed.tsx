import SharedFeed from "../../src/components/SharedFeed";

export default function DoctorFeed() {
  const themeColor = "#2E86E4";
  const gradientColors = ["#2E86E4", "#8DA7F7"] as const;
  
  return <SharedFeed themeColor={themeColor} gradientColors={gradientColors} />;
}
