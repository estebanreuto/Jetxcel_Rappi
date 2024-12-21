import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function screen4({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.img_comida} source={require('./assets/Bienvenido.png')} />
      <View style={styles.containerdes}>
        <Text style={styles.title}>Bienvenido a Jextcel Rappi 👋</Text>
        <Text style={styles.descrip}>
          Haz tu pedido con nuestra aplicación sencillo y fácil de usar.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  img_comida: {
    height: '60%',
    width: '100%',
    resizeMode: 'cover',
    top: 25
  },

  containerdes: {
    top: 80,
    backgroundColor: 'white',
  },

  title: {
    margin: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#40ba93',
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  descrip: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 20,
  },
  button: {
    position: 'absolute', // Posicionamiento absoluto
    bottom: 30, // Distancia desde la parte inferior
    right: 20, // Distancia desde el lado derecho
    backgroundColor: '#40ba93', // Color de fondo del botón
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
