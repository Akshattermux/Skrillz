import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { VideoView } from "expo-video";
import { Ionicons } from "@expo/vector-icons";
import { useVideo } from "@/src/context/VideoContext";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PIP_WIDTH = 180;
const PIP_HEIGHT = 100;

export default function FloatingPiP() {
  const { player, activeVideo, isMinimized, isPlaying, closeVideo, setIsMinimized } = useVideo();
  const router = useRouter();

  if (!activeVideo || !isMinimized) return null;

  const handleExpand = () => {
    setIsMinimized(false);
    router.push({
      pathname: "/(student)/recorded-player",
      params: { 
          id: activeVideo.id, 
          title: activeVideo.title, 
          doctor: activeVideo.doctor,
          videoUrl: activeVideo.videoUrl
      }
    });
  };

  const togglePlay = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={90} tint="dark" style={styles.blur}>
        <View style={styles.videoContainer}>
            <VideoView 
                player={player} 
                style={styles.video} 
                nativeControls={false}
                allowsPictureInPicture={false}
            />
            <View style={styles.controlsLayer}>
                <TouchableOpacity onPress={togglePlay} style={styles.iconBtn}>
                    <Ionicons name={isPlaying ? "pause" : "play"} size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleExpand} style={styles.iconBtn}>
                    <Ionicons name="expand" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={closeVideo} style={styles.closeBtn}>
                <BlurView intensity={20} tint="dark" style={styles.closeBlur}>
                    <Ionicons name="close" size={16} color="#fff" />
                </BlurView>
            </TouchableOpacity>
        </View>
        <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>{activeVideo.title}</Text>
            <Text style={styles.doctor} numberOfLines={1}>{activeVideo.doctor}</Text>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 110, // Adjusted to be above the StudentGlassTabBar which is at bottom 25
    right: 20,
    width: PIP_WIDTH,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    zIndex: 9999,
  },
  blur: {
    padding: 2,
  },
  videoContainer: {
    width: "100%",
    height: PIP_HEIGHT,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controlsLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  closeBlur: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "rgba(255,64,129,0.5)",
  },
  info: {
    padding: 8,
  },
  title: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
  },
  doctor: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 9,
    fontWeight: "600",
    marginTop: 2,
  }
});
