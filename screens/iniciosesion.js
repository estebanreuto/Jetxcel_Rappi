import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';

const login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');

    const handleLogin = async () => {
        if (email === '' || pass === '') {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
        } else {
            try {
                // Realizamos una solicitud fetch al servidor PHP
                const response = await fetch('https://rappijet.jetxcel.com/iniciosesion.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, pass }),
                });

                const data = await response.json();
                console.log('Data recibida del servidor:', data);

                if (data.success) {
                    // Si la respuesta es exitosa, el usuario ha iniciado sesión correctamente
                    Alert.alert('Inicio de Sesión', 'Inicio de sesión exitoso');
                    // Redirigir a la pantalla de inicio si la contraseña es correcta
                    navigation.navigate('inicio');
                } else {
                    // Si hubo un error, mostrar un mensaje
                    Alert.alert('Error', data.message);
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Hubo un problema con el inicio de sesión.');
            }
        }
    };

    const handleRegister = () => {
        Alert.alert('Registro', 'Aquí se redirigirá a la pantalla de registro.');
        // Redirige a la pantalla de registro
    };

    const handleForgotPassword = () => {
        Alert.alert('Recuperar contraseña', 'Aquí se redirigirá a la pantalla de recuperación de contraseña.');
        // Redirige a la pantalla de recuperación de contraseña
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Burbujas estáticas */}
            <View style={[styles.bubble, styles.bubble1]} />
            <View style={[styles.bubble, styles.bubble2]} />
            <View style={[styles.bubble, styles.bubble3]} />
            <View style={[styles.bubble, styles.bubble4]} />
            <View style={[styles.bubble, styles.bubble5]} />
            <View style={[styles.bubble, styles.bubble6]} />
            <View style={[styles.bubble, styles.bubble7]} />
            <View style={[styles.bubble, styles.bubble8]} />

            {/* Contenido del inicio de sesión */}
            <View style={styles.content}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Inicio de Sesión</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#aaa"
                    value={pass}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <View style={styles.linksContainer}>
                    <TouchableOpacity onPress={handleRegister}>
                        <Text style={styles.link}>Regístrate aquí</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Asegura que el contenido se expanda para ocupar toda la pantalla
        backgroundColor: 'white',
        position: 'relative',
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
        paddingBottom: 20, // Espacio adicional para evitar que los elementos se oculten
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 25,
        marginTop: 18
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#40ba93',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#40ba93',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 6,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linksContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    link: {
        color: '#40ba93',
        fontSize: 16,
        marginBottom: 10,
    },
});

export default login;
