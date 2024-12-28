import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Footer() {
    return (
        <View style={styles.footerContainer}>
            <View style={styles.iconContainer}>
                {/* Home Ikonu */}
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="home-outline" size={30} color="white" />
                    <Text style={styles.iconLabel}>Home</Text>
                </TouchableOpacity>

                {/* Search Ikonu */}
                <TouchableOpacity style={styles.iconButton}>
                    <Feather name="search" size={30} color="white" />
                    <Text style={styles.iconLabel}>Search</Text>
                </TouchableOpacity>

                {/* Heart Ikonu */}
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="heart-outline" size={30} color="white" />
                    <Text style={styles.iconLabel}>Favorites</Text>
                </TouchableOpacity>

                {/* Library Ikonu */}
                <TouchableOpacity style={styles.iconButton}>
                    <Feather name="book-open" size={30} color="white" />
                    <Text style={styles.iconLabel}>Library</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#000',  // Siyah arka plan
        paddingVertical: 10,
        paddingHorizontal: 20,
        position: 'absolute',  // Ekranın alt kısmına sabitlemek için
        bottom: 0,
        width: '100%',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconLabel: {
        marginTop: 5,
        fontSize: 12,
        color: 'white',  // Beyaz yazı rengi
    },
});
