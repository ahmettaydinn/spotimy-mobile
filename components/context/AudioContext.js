import React, { createContext, useState, useContext, useEffect } from "react";
import { Audio } from "expo-av";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [currentSongUrl, setCurrentSongUrl] = useState("");
  const [currentArtist, setCurrentArtist] = useState("");
  const [currentSong, setCurrentSong] = useState("");
  const [currentSongDuration, setCurrentSongDuration] = useState(0);
  const [currentCountdown, setCurrentCountdown] = useState("00:00");

  useEffect(() => {
    return () => {
      if (currentSound) {
        currentSound.unloadAsync();
        setCurrentSound(null);
      }
    };
  }, [currentSound]);

  const togglePlay = async (url, artist, song, duration) => {
    console.log("url", url);

    try {
 
      if (currentSongUrl === url) {
        if (isPlaying) {
          await currentSound.pauseAsync();
          setIsPlaying(false);
        } else {
          await currentSound.playAsync();
          setIsPlaying(true);
        }
        return;
      }

      setCurrentSongUrl(url);
      console.log("currentSongUrl", currentSongUrl);

      const { sound } = await Audio.Sound.createAsync({ uri: url });
      setCurrentSound(sound);
      setCurrentSongUrl(url);
      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error("togglePlay sırasında bir hata oluştu:", error);
    }
  };

  useEffect(() => {
    const updateCountdown = async () => {
      if (currentSound && isPlaying) {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded) {
          const remainingTime =
            (status.durationMillis - status.positionMillis) / 1000;
          setCurrentCountdown(formatTime(remainingTime));
        }
      }
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSound]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        togglePlay,
        currentSongUrl,
        currentArtist,
        currentSong,
        currentSongDuration,
        currentCountdown,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  return useContext(AudioContext);
};