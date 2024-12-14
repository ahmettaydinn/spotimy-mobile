import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spotimy</Text>

      <Searchbar
        placeholder="Search for music, artists, or albums"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Discover your favorite music here!</Text>
      </View>

      <View style={styles.emptyBox}></View>
      <View style={styles.emptyBox}></View>
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
  infoBox: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  infoText: {
    color: "#B3B3B3",
    fontSize: 16,
    textAlign: "center",
  },
  emptyBox: {
    flex: 1,
  },
});

export default Home;
