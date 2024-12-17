import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <ImageBackground style={styles.container}>
      <Image style={styles.img_comida} source={require('./assets/img_pag3.png')} />
      <View style={styles.containerdes}>
        <Text style={styles.title}>Paga Contraentrega</Text>
        <Text style={styles.descrip}>
          Selecciona, personaliza y paga tus platos de forma segura, fácil y rápida desde nuestra plataforma.
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  img_comida: {
    height: '60%',
    width: '100%',
    resizeMode: 'cover',
    top: 20
  },

  containerdes: {
    top: 80
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
