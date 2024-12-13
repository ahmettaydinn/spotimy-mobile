import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, ViewStyle } from "react-native";
import { Searchbar } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import { SongsContext } from "../components/context/SongsProvider"; // Import the context

const { width } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [search, setSearch] = useState("");
  const { songs } = useContext(SongsContext);  // Access songs from the context

  const onChangeSearch = (query) => setSearch(query);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: item.songPhoto }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.cardTitle}>{item.artist}</Text>
          <Text style={styles.cardSubtitle}>{item.song}</Text>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Spotimy</Text>
      </View>

      <View style={{ padding: 10 }}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={search}
        />
      </View>

      <Carousel
        data={songs}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.8}
        layout="tinder"
        loop={true}
        autoplay={true}
        autoplayDelay={2000}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Songs")}
      >
        <Text style={styles.buttonText}>Go to Songs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#6200ee",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 10,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#ddd",
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
