import SharedJobs from "../../src/components/SharedJobs";

export default function DoctorJobs() {
  const themeColor = "#2E86E4";
  const gradientColors = ["#2E86E4", "#8DA7F7"] as const;
  
  return <SharedJobs themeColor={themeColor} gradientColors={gradientColors} />;
}
