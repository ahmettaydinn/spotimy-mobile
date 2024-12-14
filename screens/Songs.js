import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Image, Button } from "react-native";
import { SongsContext } from "../components/context/SongsProvider";   // Import the context

const Songs = ({ navigation }) => {
  const { songs } = useContext(SongsContext);  // Access songs from the context

  const logout = () => {
    navigation.replace('Login');
  }

  const renderItem = ({ item }) => {
    return (
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
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Song List</Text>
      <FlatList
        data={songs}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={renderItem}
      />
      <Button title="Log out" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
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
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  info: {
    fontSize: 12,
    color: "#999",
    marginTop: 3,
  },
});


export default Songs