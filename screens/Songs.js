import React from "react";
import { Text, View, FlatList, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useFetchSongs from "../components/hooks/UseFetchSongs";

export default function Songs() {
  const navigation = useNavigation();
  const songs = useFetchSongs("http://192.168.1.101:3000/songs");

  return (
    <View style={styles.container}>
      <Text>Songs</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.songContainer}>
            <Image source={{ uri: item.songPhoto }} style={styles.songPhoto} />
            <View>
              <Text
                style={styles.songName}
                onPress={() => navigation.navigate("Details", { item })}
              >{`${item.artist} - ${item.songName}`}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  songContainer: {
    flexDirection: "column",
    marginBottom: 15,
  },
  songPhoto: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  songName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  songGenre: {
    fontSize: 14,
    color: "gray",
  },
  releaseDate: {
    fontSize: 12,
    color: "darkgray",
  },
});
