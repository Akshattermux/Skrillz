import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useVideoPlayer, VideoPlayer } from "expo-video";
import { AppState } from "react-native";

export interface VideoMetadata {
  id: string;
  title: string;
  doctor: string;
  videoUrl: string;
}

interface VideoContextType {
  player: VideoPlayer;
  activeVideo: VideoMetadata | null;
  isMinimized: boolean;
  isPlaying: boolean;
  playVideo: (video: VideoMetadata) => void;
  closeVideo: () => void;
  setIsMinimized: (val: boolean) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [activeVideo, setActiveVideo] = useState<VideoMetadata | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const player = useVideoPlayer(activeVideo?.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", (p) => {
    p.loop = false;
  });

  useEffect(() => {
    const playListener = player.addListener('playingChange', (event) => {
      setIsPlaying(event.isPlaying);
    });
    return () => playListener.remove();
  }, [player]);

  useEffect(() => {
    if (activeVideo?.videoUrl) {
      player.replace(activeVideo.videoUrl);
      player.play();
      setIsMinimized(false);
    }
  }, [activeVideo]);

  // Handle App State for background play prevention
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState !== "active") {
        player.pause();
      }
    });
    return () => subscription.remove();
  }, [player]);

  const playVideo = (video: VideoMetadata) => {
    setActiveVideo(video);
  };

  const closeVideo = () => {
    player.pause();
    setActiveVideo(null);
    setIsMinimized(false);
  };

  return (
    <VideoContext.Provider value={{ 
        player, 
        activeVideo, 
        isMinimized, 
        isPlaying,
        playVideo, 
        closeVideo, 
        setIsMinimized 
    }}>
      {children}
    </VideoContext.Provider>
  );
}

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) throw new Error("useVideo must be used within VideoProvider");
  return context;
};
