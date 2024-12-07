import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import database from "@react-native-firebase/database";

const Songs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const reference = database().ref("/songs"); // songs path'i


console.log("Reference: ", database().ref("/songs"));

    // Veriyi dinle
    const onValueChange = reference.on("value", (snapshot) => {
      const data = snapshot.val(); // snapshot'tan veri alın
      if (data) {
        const songList = Object.values(data); // Objeyi diziye çevir
        setSongs(songList);
      }
    });

    // Component unmount olduğunda dinleyiciyi kaldır
    return () => reference.off("value", onValueChange);
  }, []);
  console.log("Firebase URL: ", database().ref().toString());

 

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Song List</Text>
      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.songPhoto }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.song}</Text>
              <Text style={styles.subtitle}>{item.artist}</Text>
              <Text style={styles.info}>Genre: {item.genre}</Text>
              <Text style={styles.info}>Duration: {item.duration}</Text>
              <Text style={styles.info}>Release Date: {item.releaseDate}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  info: {
    fontSize: 12,
    color: "#888",
  },
});

export default Songs;
