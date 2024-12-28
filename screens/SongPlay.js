import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SongsContext } from "../components/context/SongsProvider";
import { useAudio } from "../components/context/AudioContext";
import Slider from "@react-native-community/slider";

const SongPlay = ({navigation}) => {
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

  const handleBackward = async () => {
    if (currentSound) {
      const status = await currentSound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.max(0, status.positionMillis - 10000);
        await currentSound.setPositionAsync(newPosition);
      }
    }
  };

  const handleForward = async () => {
    if (currentSound) {
      const status = await currentSound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.min(status.durationMillis, status.positionMillis + 10000);
        await currentSound.setPositionAsync(newPosition);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon onPress={() => navigation.goBack()} name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Song Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: isPlaying ? currentSongPhoto : "https://via.placeholder.com/200" }}
          style={styles.image}
        />
        <Text style={styles.songTitle}>{isPlaying ? currentSong : "Song"}</Text>
        <Text style={styles.artistName}>{isPlaying ? currentArtist : "Artist"}</Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesignIcon name="hearto" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="share-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={progress}
            onValueChange={handleProgressChange}
            style={styles.progressBar}
            minimumTrackTintColor="blue"
            maximumTrackTintColor="red"
            thumbTintColor="white"
          />
        </View>

        {/* Playback Controls */}
        <View style={styles.playbackControls}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="shuffle" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleBackward}>
            <MaterialIcons name="skip-previous" size={45} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={togglePlay}>
            <MaterialIcons name={isPlaying ? "pause" : "play-arrow"} size={60} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleForward}>
            <MaterialIcons name="skip-next" size={45} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="repeat" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingBottom: 100
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 20,
    marginTop: 40
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 380,
    height: 380,
    borderRadius: 10,
    marginBottom: 15,
  },
  songTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 15,
  },
  artistName: {
    color: "#bbb",
    fontSize: 22,
    marginTop: 10,
  },
  controls: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  iconButton: {
    marginHorizontal: 10,
  },
  progressBarContainer: {
    width: "100%",
    height: 40,
    marginBottom: 30,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  progressBar: {
    width: "100%",
    height: 3,
    borderRadius: 3,
    backgroundColor: "#444",
  },
  playbackControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  playPauseButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1DB954",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  playPauseIcon: {
    color: "#fff",
    fontSize: 35,
  },
  buttonIcon: {
    marginHorizontal: 20,
    color: "#fff",
  },
});



export default SongPlay;
