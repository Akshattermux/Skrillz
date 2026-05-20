import SharedLibrary from "../../src/components/SharedLibrary";

export default function DoctorLibrary() {
  const themeColor = "#2E86E4";
  const gradientColors = ["#2E86E4", "#8DA7F7"] as const;
  
  return <SharedLibrary themeColor={themeColor} gradientColors={gradientColors} />;
}
