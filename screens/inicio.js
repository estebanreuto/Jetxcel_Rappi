import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, Animated, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Bienvenidos = () => {
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  // Crear animaciones para cada burbuja
  const bubbleAnimations = Array(8)
    .fill()
    .map(() => useRef(new Animated.Value(screenHeight)).current);

  useEffect(() => {
    bubbleAnimations.forEach((animation, index) => {
      Animated.loop(
        Animated.timing(animation, {
          toValue: -100, // Mover fuera de la pantalla
          duration: 4000 + index * 500, // Diferente duración para cada burbuja
          useNativeDriver: true,
        })
      ).start();
    });
  }, [bubbleAnimations]);

  // Función para manejar el botón "Comenzar"
  const handleStart = async () => {
    await AsyncStorage.setItem('isFirstLaunch', 'false'); // Registrar que ya se vio la bienvenida
    navigation.replace('InicioSesion'); // Navegar al inicio de sesión
  };

  return (
    <View style={styles.container}>
      {/* Burbujas animadas */}
      {bubbleAnimations.map((animation, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bubble,
            styles[`bubble${index + 1}`],
            { transform: [{ translateY: animation }] },
          ]}
        />
      ))}

      {/* Logo e información */}
      <View style={styles.content}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>¡Bienvenido a RappiJet!</Text>
        <Text style={styles.subtitle}>
          La mejor plataforma para repartir comidas rápido y seguro.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: '#40ba93',
    borderRadius: 100,
    opacity: 0.3,
  },
  bubble1: { width: 80, height: 80, top: 50, left: 30 },
  bubble2: { width: 120, height: 120, top: 100, right: 50 },
  bubble3: { width: 60, height: 60, bottom: 120, left: 100 },
  bubble4: { width: 100, height: 100, bottom: 50, right: 70 },
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
    marginBottom: 20,
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#40ba93',
    textAlign: 'center',
    marginBottom: 11,
    padding: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#40ba93',
    paddingVertical: 10,
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
});

export default Bienvenidos;
