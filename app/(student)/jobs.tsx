import SharedJobs from "../../src/components/SharedJobs";

export default function StudentJobs() {
  const themeColor = "#6200EA";
  const gradientColors = ["#6200EA", "#B388FF"] as const;
  
  return <SharedJobs themeColor={themeColor} gradientColors={gradientColors} glassmorphism={true} />;
}
