import React, { useRef, useState, useEffect, useContext } from "react";
import { Text, Button, Dimensions, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import ActionSheet from "react-native-actions-sheet";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SongsContext } from "../components/context/SongsProvider";
import { useAudio } from "../components/context/AudioContext";
import UseFetchSongLyrics from "../components/hooks/UseFetchSongLyrics";

const { height } = Dimensions.get("window");

export default function SongPlay({ navigation }) {
  const actionSheetRef = useRef(null);
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

  const { lyrics, error: lyricsError, isLoading: lyricsLoading } = UseFetchSongLyrics(currentArtist, currentSong);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeSheet = () => {
    actionSheetRef.current?.hide();
  };

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openActionSheet}>
          <Icon name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: isPlaying ? currentSongPhoto : "https://via.placeholder.com/200" }}
          style={styles.image}
        />
        <Text style={styles.songTitle}>{isPlaying ? currentSong : "Song"}</Text>
        <Text style={styles.artistName}>{isPlaying ? currentArtist : "Artist"}</Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesignIcon name="hearto" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="share-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>

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

      <TouchableOpacity style={styles.lyricsButton} onPress={openActionSheet}>
  <MaterialIcons name="notes" size={24} color="white" />
  <Text style={styles.lyricsButtonText}>Lyrics</Text>
</TouchableOpacity>

      <ActionSheet ref={actionSheetRef} containerStyle={styles.actionSheetContainer}>
        <View style={styles.lyricsContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeSheet}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {lyricsLoading ? (
            <Text style={styles.loadingText}>Loading lyrics...</Text>
          ) : lyricsError ? (
            <Text style={styles.errorText}>Could not fetch lyrics. Please try again later.</Text>
          ) : (
            <>
              <Text style={styles.lyricsTitle}>Lyrics</Text>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.lyricsText}>
                  {lyrics || "No lyrics available for this song."}
                </Text>
              </ScrollView>
            </>
          )}
        </View>
      </ActionSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 40,
    paddingBottom: 20,
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
    textAlign: "center",
  },
  artistName: {
    color: "#bbb",
    fontSize: 22,
    textAlign: "center",
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
  progressBar: {
    height: 3,
    width: "100%",
    marginTop: 15,
  },
  playbackControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 50,
    paddingTop: 40,
  },
  lyricsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  lyricsButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,  
  },
  actionSheetContainer: {
    height: height,
    backgroundColor: "white",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  lyricsContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  lyricsTitle: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    color: "#32CD32",
    marginVertical: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  lyricsText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    lineHeight: 24,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#BBBBBB",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#FF5252",
    textAlign: "center",
  },
});
