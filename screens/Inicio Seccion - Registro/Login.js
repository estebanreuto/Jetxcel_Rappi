import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');



function login () {
    return (
        <View style={styles.container}>
            {/* Burbujas decorativas */}
            <View style={[styles.bubble, styles.bubble1]} />
            <View style={[styles.bubble, styles.bubble2]} />
            <View style={[styles.bubble, styles.bubble3]} />
            <View style={[styles.bubble, styles.bubble4]} />
            <View style={[styles.bubble, styles.bubble5]} />
            <View style={[styles.bubble, styles.bubble6]} />
            <View style={[styles.bubble, styles.bubble7]} />
            <View style={[styles.bubble, styles.bubble8]} />

            <Text style={styles.title}>Bienvenido</Text>

            {/* Inicio de sesión con correo */}
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Correo Electrónico" 
                    keyboardType="email-address"
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Contraseña" 
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.orText}>O</Text>

            {/* Inicio de sesión con Google */}
            <TouchableOpacity style={styles.googleButton}>
                <FontAwesome name="google" size={24} color="white" />
                <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
            </TouchableOpacity>

            {/* Enlace a registro */}
            <TouchableOpacity>
                <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    orText: {
        marginVertical: 15,
        fontSize: 16,
        color: '#666',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DB4437',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        justifyContent: 'center',
    },
    googleButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    registerText: {
        marginTop: 20,
        color: '#007BFF',
    },
    bubble: {
        position: 'absolute',
        backgroundColor: '#40ba93',
        borderRadius: 100,
        opacity: 0.4,
    },
    bubble1: {
        width: 120,
        height: 120,
        top: height * 0.06,
        left: width * 0.02,
    },
    bubble2: {
        width: 200,
        height: 200,
        top: height * 0.4,
        right: width * 0.1,
    },
    bubble3: {
        width: 80,
        height: 80,
        bottom: height * 0.3,
        left: width * 0.06,
    },
    bubble4: {
        width: 150,
        height: 150,
        bottom: height * 0.1,
        right: width * 0.06,
    },
    bubble5: {
        width: 100,
        height: 100,
        top: height * 0.05,
        right: width * 0.4,
    },
    bubble6: {
        width: 90,
        height: 90,
        top: height * 0.25,
        left: width * 0.2,
    },
    bubble7: {
        width: 180,
        height: 180,
        bottom: height * 0.0,
        right: width * 0.6,
    },
    bubble8: {
        width: 140,
        height: 140,
        top: height * 0.12,
        right: width * 0.02,
    },
});

export default login;
