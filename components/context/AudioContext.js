import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { Audio } from "expo-av";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [currentSongUrl, setCurrentSongUrl] = useState("");
  const [currentArtist, setCurrentArtist] = useState("");
  const [currentSong, setCurrentSong] = useState("");
  const [currentSongPhoto, setCurrentSongPhoto] = useState(null);
  const [currentSongDuration, setCurrentSongDuration] = useState(0);
  const [currentCountdown, setCurrentCountdown] = useState("00:00");

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    return () => {
      if (currentSound) {
        currentSound.unloadAsync();
        currentSound.pauseAsync();
      }
    };
  }, [currentSound]);

  useEffect(() => {
    console.log("currentSongUrl updated:", currentSongUrl);
    console.log("Current Time:", currentTime);
  }, [currentSongUrl, currentTime]);

  const togglePlay = async (url, songPhoto, artist, song, duration) => {
    const songUrl = url;

    const parseDuration = (durationString) => {
      const [minutes, seconds] = durationString.split(":").map(Number);
      return minutes * 60 + seconds;
    };

    try {
      if (currentSongUrl === url) {
        if (isPlaying) {
          await currentSound.pauseAsync();
          setIsPlaying(false);
        } else {
          await currentSound.playAsync();
          setIsPlaying(true);
        }
      } else {
        const { sound } = await Audio.Sound.createAsync({ uri: songUrl });
        setCurrentSound(sound);
        setCurrentSongUrl(songUrl);
        console.log("currentSongUrl changed:", currentSongUrl);
        setCurrentArtist(artist);
        setCurrentSong(song);
        setCurrentSongDuration(parseDuration(duration))
        setCurrentSongPhoto(songPhoto);

        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error in togglePlay:", error);
    }
  };

  useEffect(() => {
    const updateCountdownAndTime = async () => {
      if (currentSound && isPlaying) {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded) {
          const remainingTime = (status.durationMillis - status.positionMillis) / 1000;
          setCurrentCountdown(formatTime(remainingTime));
          setCurrentTime(status.positionMillis / 1000);
        }
      }
    };

    const interval = setInterval(updateCountdownAndTime, 1000);

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
        currentSound,
        currentSongUrl,
        currentSongPhoto,
        currentArtist,
        currentSong,
        currentSongDuration,
        currentCountdown,
        currentTime, 
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  return useContext(AudioContext);
};
