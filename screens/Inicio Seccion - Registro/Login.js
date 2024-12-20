import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
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
});

export default LoginScreen;
