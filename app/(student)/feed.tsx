import SharedFeed from "../../src/components/SharedFeed";

export default function StudentFeed() {
  const themeColor = "#6200EA";
  const gradientColors = ["#6200EA", "#B388FF"] as const;
  
  return <SharedFeed themeColor={themeColor} gradientColors={gradientColors} glassmorphism={true} />;
}
