import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Alert,
} from "react-native";
import { SongsContext } from "../components/context/SongsProvider";
import { FlashList } from "@shopify/flash-list";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const width = Dimensions.get("window").width;

const Songs = ({ navigation }) => {
  const { songs } = useContext(SongsContext);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [songID, setSongID] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  // Donanımsal geri tuşunu devre dışı bırakma
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Uyarı", "Geri tuşu devre dışı bırakıldı!", [
        { text: "Tamam" },
      ]);
      return true; // Hiçbir işlem yapılmaz.
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Temizlik
  }, []);

  const logout = () => {
    navigation.replace("Login");
  };

  const handleSongPress = (song) => {
    navigation.navigate("SongDetails", { song }); // Şarkıyı detay sayfasına yönlendir
  };

  const renderItem = ({ item }) => {
    return (
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: currentSong.songPhoto }}
          style={{ width: width, height: 400, borderRadius: 10 }}
        />
      </View>
      <View style={styles.overlay}>
        <Text>{currentSong.song}</Text>
        <Text>{currentSong.artist}</Text>
      </View>
      <Searchbar
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlashList
        data={songs}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={70} // Ortalama yükseklik
      />
      <Button title="Log out" onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
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
  overlay: {
    position: "absolute", // Fotoğrafın üzerine yerleştirmek için
    bottom: 10, // Alt kısıma yaklaşık konumlandırma
    left: 10, // Soldan 10 birim
    right: 10, // Sağdan 10 birim
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Siyah transparan arka plan
    borderRadius: 10,
    padding: 5, // Metni etrafında biraz boşluk bırakmak için
  },
  searchbar: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "black",
    color: "white",
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  id: {
    fontSize: 16, // Yazı boyutu
    color: "white", // Yazı rengi
    textAlign: "center", // Metni ortalama
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
});

export default Songs;
