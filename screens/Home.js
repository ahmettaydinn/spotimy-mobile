import React, { useState, useRef, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Searchbar } from "react-native-paper";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { SongsContext } from "../components/context/SongsProvider";

const width = Dimensions.get("window").width;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const progress = useSharedValue(0);
  const ref = useRef(null);
  const { songs } = useContext(SongsContext);

  const onChangeSearch = (query) => setSearchQuery(query);

  const onPressPagination = (index) => {
    if (ref.current) {
      ref.current.scrollTo({ index, animated: true });
    }
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

      <View style={{ flex: 1 }}>
        <Carousel
          ref={ref}
          width={width - 110}
          height={width / 2}
          data={songs}
          loop={true}
          pagingEnabled={true}
          style={styles.carousel}
          onProgressChange={(offsetProgress) => {
            progress.value = offsetProgress;
          }}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 20,
                width: width - 80,
              }}
            >
              <Image
                source={{ uri: songs[index].songPhoto }}
                style={{
                  width: width - 150,
                  height: width / 2 - 40,
                  borderRadius: 10,
                  resizeMode: "cover",
                }}
              />
              <Text style={styles.carouselText}>{songs[index].artist}</Text>
            </View>
          )}
        />
      </View>

      <View style={{ flex: 1, marginTop: 80 }}>
        <Carousel
          ref={ref}
          width={width - 230}
          height={width / 2}
          data={songs}
          loop={true}
          pagingEnabled={true}
          style={styles.carousel}
          onProgressChange={(offsetProgress) => {
            progress.value = offsetProgress;
          }}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 20,
                width: 150,
              }}
            >
              <Image
                source={{ uri: songs[index].songPhoto }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 10,
                  resizeMode: "cover",
                }}
              />
              <Text style={styles.carouselText}>{songs[index].artist}</Text>
            </View>
          )}
        />
      </View>

      <View style={{flex: 1, marginTop: 80 }}>
        <Carousel
          ref={ref}
          width={width - 280}
          height={width / 2}
          data={songs}
          loop={true}
          pagingEnabled={true}
          style={styles.carousel}
          onProgressChange={(offsetProgress) => {
            progress.value = offsetProgress;
          }}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 20,
                width: 100,
              }}
            >
              <Image
                source={{ uri: songs[index].songPhoto }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  resizeMode: "cover",
                }}
              />
              <Text style={styles.carouselText}>{songs[index].artist}</Text>
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
  albumContainer: {
    marginTop: 60,
    marginBottom: 20,
    flex: 1,
  },
  albumTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  carouselText: {
    textAlign: "center",
    fontSize: 15,
    color: "#fff",
    marginTop: 10,
  },
  emptyBox: {
    flex: 1,
  },
});

export default Home;
