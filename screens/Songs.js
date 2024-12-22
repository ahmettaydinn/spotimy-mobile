import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Alert,
  Dimensions,
  Button,
} from "react-native";
import { SongsContext } from "../components/context/SongsProvider";
import { FlashList } from "@shopify/flash-list";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAudio } from "../components/context/AudioContext";

const width = Dimensions.get("window").width;

const Songs = ({ navigation }) => {
  const { songs } = useContext(SongsContext);
  const {
    isPlaying,
    togglePlay,
    currentArtist,
    currentSong,
    currentCountdown,
  } = useAudio();
  const [currentSongList, setCurrentSongList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songs);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  // console.log("filteredSongs", filteredSongs)

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Uyarı", "Geri tuşu devre dışı bırakıldı!", [
        { text: "Tamam" },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      setCurrentSongList(songs[0]);
      setFilteredSongs(
        songs.filter((song) =>
          song.song.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [songs, searchQuery]);

  const logout = () => {
    navigation.navigate("Login");
  };

  const handleSongPress = (song) => {
    setCurrentSongList(song);
    togglePlay(song.url, song.artist, song.song, song.duration);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSongPress(item)}>
      <View style={styles.item}>
        <View>
          <Text style={styles.id}>{item.id}</Text>
        </View>
        <Image source={{ uri: item.songPhoto }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.song}</Text>
          <Text style={styles.subtitle}>{item.artist}</Text>
        </View>
        <Icon name="more-vert" size={30} color="white" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {currentSongList && (
        <View style={styles.mainImage}>
          <Image
            source={{ uri: currentSongList.songPhoto }}
            style={{ width: width, height: 400, borderRadius: 10 }}
          />
        </View>
      )}
      {currentSongList && (
        <View style={styles.overlay}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {currentSongList.song}
          </Text>
          <Text style={{ color: "white", fontSize: 14 }}>
            {currentSongList.artist}
          </Text>
        </View>
      )}
      <Searchbar
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlashList
        data={filteredSongs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={70}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 0,
  },
  mainImage: {
    position: "relative",
    width: "100%",
    height: 400,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 20,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: 5,
    zIndex: 10,
  },
  searchbar: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "black",
    color: "white",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  id: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 5,
  },
  icon: {
    alignSelf: "center",
    marginLeft: 10,
  },
  logoutButton: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
});

export default Songs;
