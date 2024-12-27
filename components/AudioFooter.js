import React, {useContext} from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { SongsContext } from "../components/context/SongsProvider";
import { useAudio } from "../components/context/AudioContext";
import { useNavigation } from "@react-navigation/native";

export default function AudioFooter() {
  const { songs } = useContext(SongsContext);
  const {
    isPlaying,
    togglePlay,
    currentSongPhoto,
    currentArtist,
    currentSong,
    currentCountdown,
  } = useAudio();
  const navigation = useNavigation();

  const openSongPlay = () => {
    navigation.navigate("SongPlay");
    console.log("play");
  }

  return (
    <TouchableOpacity onPress={openSongPlay} style={styles.footerContainer}>
      <View style={styles.songInfoContainer}>
        <View style={styles.songDetails}>
          <Image
            source={{ uri: isPlaying ? currentSongPhoto : "https://via.placeholder.com/50"}} 
            style={styles.songImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.songName}>{isPlaying ? currentSong : "Song"}</Text>
            <Text style={styles.artistName}>{isPlaying ? currentArtist : "Artist"}</Text>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <AntDesignIcon
              name="hearto"
              size={25}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={togglePlay}>
            <MaterialCommunityIcons
              name={isPlaying ? "pause" : "play"}
              size={35}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "black",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  songInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  songDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  songImage: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: "center",
  },
  songName: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  artistName: {
    color: "#b3b3b3",
    fontSize: 12,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
  },
});
