import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import Headerperfil from '../components/header';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategorias = () => {
    fetch('https://rappijet.jetxcel.com/rappi_app/categorias.php')
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener categorías:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategorias();
    const intervalId = setInterval(fetchCategorias, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCategoriaPress = (categoria) => {
    console.log('Categoria seleccionada:', categoria);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#40ba93" />
        <Text>Cargando categorías...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Headerperfil fuera del ScrollView */}
      <Headerperfil />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.gridContainer}>
          {categorias.length > 0 ? (
            categorias.map((categoria, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCategoriaPress(categoria)}
                style={styles.card}
              >
                <View style={styles.cardContent}>
                  <Image source={{ uri: categoria.imagen_categoria }} style={styles.icon} />
                  <Text style={styles.cardTitle}>{categoria.nombre_cate}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No hay categorías disponibles.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 120,
  },
  card: {
    width: '48%',
    height: 170,
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd', // Color de bordeado suave
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 30,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default Categorias;
