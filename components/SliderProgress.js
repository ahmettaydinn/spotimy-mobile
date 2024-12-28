import { SongsContext } from "../components/context/SongsProvider";
import { useAudio } from "../components/context/AudioContext";
import Slider from "@react-native-community/slider";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function SliderProgress() {
  const { songs } = useContext(SongsContext);
  const {
    isPlaying,
    togglePlay,
    currentSound,
    currentSongPhoto,
    currentArtist,
    currentSong,
    currentCountdown,
    currentSongDuration,
    currentTime,
  } = useAudio();
  const [progress, setProgress] = useState(0);

  const handleProgressChange = (value) => {
    setProgress(value);
    if (currentSound) {
      const newPosition = (value / 100) * currentSongDuration;
      currentSound.setPositionAsync(newPosition * 1000); // Convert to milliseconds
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSongDuration > 0) {
        const progress = (currentTime / currentSongDuration) * 100;
        setProgress(progress);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [currentTime, currentSongDuration]);

  return (
    <View style={styles.progressBarContainer}>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={progress}
        onValueChange={handleProgressChange}
        style={styles.progressBar}
        minimumTrackTintColor="blue"
        maximumTrackTintColor="red"
        thumbTintColor="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    width: "100%",
    position: "absolute", 
    bottom: 0,  
    justifyContent: "center",
    marginHorizontal: 0,  
    paddingHorizontal: 0,  
    marginBottom: 0,  
  },
  progressBar: {
    width: "100%",
    height: 2,  
  },
});
