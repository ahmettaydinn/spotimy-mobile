import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { SongsContext } from "../components/context/SongsProvider";

const width = Dimensions.get("window").width;

const musicGenres = [
  { title: "Rock", color: "#FFB6B6" },
  { title: "Pop", color: "#B6FFB6" },
  { title: "Jazz", color: "#B6C6FF" },
  { title: "Classical", color: "#FFD1FF" },
  { title: "Hip Hop", color: "#FFEBB6" },
  { title: "Electronic", color: "#B6F0FF" },
  { title: "Metal", color: "#D1D1D1" },
];

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const progress = useSharedValue(0);
  const refMiddle = useRef(null);
  const refSmall = useRef(null);
  const refSmaller = useRef(null);
  const { songs } = useContext(SongsContext);

  const onChangeSearch = (query) => setSearchQuery(query);

  const onPressPagination = (index) => {
    if (ref.current) {
      ref.current.scrollTo({ index, animated: true });
    }
  };

  const handlePress = () => {
    console.log("Button Pressed!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spotimy</Text>

      <Searchbar
        placeholder="Search for music, artists, or albums"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />

      <View style={styles.carouselContainer}>
        <Carousel
          ref={refMiddle}
          width={width - 160}
          height={160}
          data={songs}
          loop={true}
          pagingEnabled={true}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1, 
            parallaxScrollingOffset: 0, 
            parallaxAdjacentItemScale: 0.9, 
          }}
          style={styles.carousel}
          renderItem={({ index }) => (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: songs[index].songPhoto }}
                style={styles.image}
              />
              <View style={styles.overlay}>
                <Text style={styles.artistName}>{songs[index].artist}</Text>
                <Text style={styles.songName}>{songs[index].song}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.carouselContainer}>
        <Text style={styles.carouselLabel}>Albums</Text>
        <Carousel
          ref={refSmall}
          width={width * 0.44}
          height={160}
          data={songs}
          loop={true}
          pagingEnabled={true}
          style={styles.carousel}
          renderItem={({ index }) => (
            <View style={styles.carouselItem}>
              <Image
                source={{ uri: songs[index].songPhoto }}
                style={{ width: 160, height: 120, borderRadius: 20 }}
              />
              <Text style={styles.artistName}>{songs[index].artist}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.carouselContainer}>
        <Text style={styles.carouselLabel}>Playlists</Text>
        <Carousel
          ref={refSmaller}
          width={width * 0.32}
          height={160}
          data={musicGenres}
          loop={true}
          pagingEnabled={true}
          style={[styles.carousel, styles.shadowEffect]}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.carouselItem,
                {
                  backgroundColor: item.color,
                  transform: [{ scale: 0.9 }],
                  width: 120,
                  height: 100,
                  borderRadius: 20,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() =>
                  item.title === "Metal" && navigation.navigate("Songs")
                }
              >
                <Text style={styles.itemText}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View style={styles.emptyBox}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
    paddingTop: 50
  },
  carouselContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1DB954",
    textAlign: "center",
    marginBottom: 20,
  },
  searchbar: {
    marginBottom: 20,
    borderRadius: 8,
  },
  carousel: {
    overflow: "visible",
  },
  image: {
    height: 150,
    width: 250,
    borderRadius: 10,
    resizeMode: "cover",
  },
  emptyBox: {
    flex: 1,
  },
  carouselLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "left",
    width: "100%",
  },
  carouselItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  artistName: {
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
  },
  imageContainer: {
    overflow: "hidden", 
    position: "relative", 
  },
  overlay: {
    position: "absolute",
    bottom: 10, 
    left: 10, 
    right: 10, 
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    borderRadius: 10,
    padding: 5, 
  },
  artistName: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },

  songName: {
    fontSize: 12,
    color: "#fff", 
  },
  shadowEffect: {
    shadowColor: "#000", 
    shadowOffset: {
      width: 15, 
      height: 0, 
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10, 
  },
  button: {
    padding: 20,
    borderRadius: 10,
  },
});

export default Home;
