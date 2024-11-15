import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import useFetchSongLyrics from '../components/hooks/UseFetchSongLyrics';

export default function Details({ route }) {
    const { item } = route.params;
    const { lyrics, error: lyricsError, isLoading: lyricsLoading } = useFetchSongLyrics(item?.artist, item?.songName);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: item.songPhoto }}
                style={styles.image}
            />
            <Text style={styles.songName}>{`${item.artist} - ${item.songName}`}</Text>
            <Text style={styles.songGenre}>{item.genre}</Text>
            <Text style={styles.releaseDate}>{item.releaseDate}</Text>

            {lyricsLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : lyricsError ? (
                <Text style={{ color: 'red' }}>Error: {lyricsError}</Text>
            ) : (
                <Text style={styles.lyrics}>Lyrics: {lyrics}</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: 200,  
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    songName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    songGenre: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 5,
    },
    releaseDate: {
        fontSize: 16,
        color: 'darkgray',
        marginBottom: 20,
    },
    lyrics: {
        fontSize: 16,
        color: 'black',
        whiteSpace: 'pre-wrap', // React Native desteklemese de metni düzenli göstermek için formatlıyoruz
        textAlign: 'center',
    },
});
``
