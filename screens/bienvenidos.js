import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Bienvenidos = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                navigation.replace('inicio'); // Redirige a inicio si hay un token
            } else {
                setIsLoading(false); // Solo mostramos la pantalla si no hay token
            }
        };
        checkSession();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#40ba93" />
            </View>
        );
    }

    const handleNavigateToLogin = () => {
        navigation.navigate('login');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Burbujas decorativas */}
            <View style={[styles.bubble, styles.bubble1]} />
            <View style={[styles.bubble, styles.bubble2]} />
            <View style={[styles.bubble, styles.bubble3]} />
            <View style={[styles.bubble, styles.bubble4]} />
            <View style={[styles.bubble, styles.bubble5]} />
            <View style={[styles.bubble, styles.bubble6]} />
            <View style={[styles.bubble, styles.bubble7]} />
            <View style={[styles.bubble, styles.bubble8]} />

            {/* Contenido */}
            <View style={styles.content}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Bienvenido a la App</Text>
                <TouchableOpacity style={styles.button} onPress={handleNavigateToLogin}>
                    <Text style={styles.buttonText}>Iniciar Sesión con Correo Electrónico</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={() => alert('Próximamente')}>
                    <Text style={styles.buttonText}>Iniciar Sesión con Google</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'relative',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    bubble: {
        position: 'absolute',
        backgroundColor: '#40ba93',
        borderRadius: 100,
        opacity: 0.3,
    },
    bubble1: { width: 80, height: 80, top: 60, left: 30 },
    bubble2: { width: 120, height: 120, top: 100, right: 50 },
    bubble3: { width: 60, height: 60, bottom: 190, left: 30 },
    bubble4: { width: 100, height: 100, bottom: 30, right: 70 },
    bubble5: { width: 90, height: 90, top: 200, left: 150 },
    bubble6: { width: 70, height: 70, bottom: 200, right: 30 },
    bubble7: { width: 110, height: 110, top: 250, right: 100 },
    bubble8: { width: 50, height: 50, bottom: 30, left: 60 },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 25,
        marginTop: 18,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#40ba93',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#40ba93',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 15,
    },
    googleButton: {
        backgroundColor: '#db4a39',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Bienvenidos;
