import SharedLibrary from "../../src/components/SharedLibrary";

export default function StudentLibrary() {
  const themeColor = "#6200EA";
  const gradientColors = ["#6200EA", "#B388FF"] as const;
  
  return <SharedLibrary themeColor={themeColor} gradientColors={gradientColors} glassmorphism={true} />;
}
