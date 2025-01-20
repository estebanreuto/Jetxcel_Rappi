import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Header from '../components/header';
import Carrusel from '../components/Carousel'

const carouselData = [
    { id: '1', image: 'https://i.ytimg.com/vi/eufy-_XhRUE/maxresdefault.jpg' },
    { id: '2', image: 'https://i.ytimg.com/vi/eufy-_XhRUE/maxresdefault.jpg' },
    { id: '3', image: 'https://i.ytimg.com/vi/eufy-_XhRUE/maxresdefault.jpg' },
  ];

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5FCFF" />
            <View style={styles.headerContainer}>
                <Header navigation={navigation} />
            </View>
            <View>
            <Carrusel data={carouselData} />
            </View>
            <View style={styles.container}>
                {/* Aqui va lo que le sigue despues del carrusel */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    headerContainer: {
        width: '100%',
        zIndex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
});

export default HomeScreen;
