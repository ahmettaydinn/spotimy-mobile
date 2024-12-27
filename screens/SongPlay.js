import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SongsContext } from "../components/context/SongsProvider";
import { useAudio } from "../components/context/AudioContext";

const SongPlay = () => {
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
    currentTime
  } = useAudio();
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSongDuration > 0) {
        const progress = (currentTime / currentSongDuration) * 100;
        setProgress(progress);
      }
    }, 500);
  
    return () => clearInterval(interval);
  }, [currentTime, currentSongDuration]);
       


  console.log("currentTime:", currentTime);
  console.log("currentSongDuration:", currentSongDuration);
  console.log("progress", progress)
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="white" />
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
        {/* Heart and Share */}
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesignIcon name="hearto" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="share-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        {/* Playback Controls */}
        <View style={styles.playbackControls}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="shuffle" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="skip-previous" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={togglePlay}>
            <MaterialIcons name={isPlaying ? "pause" : "play-arrow"} size={50} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="skip-next" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="repeat" size={35} color="white" />
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
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 10,
  },
  songTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15,
  },
  artistName: {
    color: "#ccc",
    fontSize: 24,
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
    marginBottom: 20,
  },
  iconButton: {
    marginHorizontal: 20,
  },
  progressBarContainer: {
    width: "100%",
    height: 5,
    backgroundColor: "#333",
    borderRadius: 5,
    marginBottom: 30,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#1DB954", // Custom color for progress bar
    borderRadius: 5,
  },
  playbackControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

export default SongPlay;
