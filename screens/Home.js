// Home.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Home = ({ songs }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Screen</Text>
      {/* Burada 'songs' verisini gösterebilirsiniz */}
      {songs.map((song, index) => (
        <View key={index} style={styles.songItem}>
          <Text style={styles.songTitle}>{song.song}</Text>
          <Text>{song.artist}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  songItem: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
