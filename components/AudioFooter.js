import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SongsContext } from "../components/context/SongsProvider";
import { useAudio } from "../components/context/AudioContext";
import { useNavigation } from "@react-navigation/native";
import SliderProgress from "./SliderProgress";

export default function AudioFooter() {
  const { songs } = useContext(SongsContext);
  const {
    isPlaying,
    togglePlay,
    currentSongPhoto,
    currentArtist,
    currentSong,
  } = useAudio();
  const navigation = useNavigation();

  const openSongPlay = () => {
    navigation.navigate("SongPlay");
    console.log("play");
  };

  return (
    <TouchableOpacity onPress={openSongPlay} style={styles.footerContainer}>
      <View style={styles.songInfoContainer}>
        <View style={styles.songDetails}>
          <Image
            source={{ uri: isPlaying ? currentSongPhoto : "https://via.placeholder.com/50" }}
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
      <SliderProgress />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#333",
    flexDirection: "column", 
    height: 55,  // Daha kompakt bir yükseklik
    width: "100%",
    marginBottom: 0,
    borderRadius: 3,
    paddingBottom: 0,  // Alt boşluğu kaldırıyoruz
    position: "absolute",  // Footer'ı ekranın en altına sabitliyoruz
    bottom: 76,
    left: 0
  },
  songInfoContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between", 
    marginBottom: 0, 
    paddingVertical: 5
  },
  songDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  songImage: {
    width: 45,  // Daha küçük görsel
    height: 45,
    borderRadius: 3,
    marginRight: 10
  },
  textContainer: {
    justifyContent: "center",
  },
  songName: {
    color: "white",
    fontSize: 12,  // Daha küçük yazı
    fontWeight: "bold",
  },
  artistName: {
    color: "#b3b3b3",
    fontSize: 10,  // Daha küçük yazı
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 10, 
  }
});
