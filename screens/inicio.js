import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Headerperfil from '../components/header';

const ITEM_WIDTH = 388;
const ITEM_HEIGHT = 220;

const carouselData = [
  { id: '1', image: 'https://i.ytimg.com/vi/eufy-_XhRUE/maxresdefault.jpg' },
  { id: '2', image: 'https://i.ytimg.com/vi/eufy-_XhRUE/maxresdefault.jpg' },
  { id: '3', image: 'https://i.ytimg.com/vi/eufy-_XhRUE/maxresdefault.jpg' },
];

const providersData = [
  {
    id: '1',
    name: 'Pedidos Mono',
    description: 'Aquí va una descripción muy pequeña sobre el negocio',
    image: 'https://www.jotform.com/uploads/wreuto2006/form_files/images.675da226bb9835.45996796.jpeg',
  },
  {
    id: '2',
    name: 'Pedidos Mono',
    description: 'Aquí va una descripción muy pequeña sobre el negocio',
    image: 'https://www.jotform.com/uploads/wreuto2006/form_files/images.675da226bb9835.45996796.jpeg',
  },
];

const productsData = [
  {
    id: '1',
    name: 'Nombre de Producto',
    price: '$10.00',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    name: 'Nombre de Producto',
    price: '$10.00',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '3',
    name: 'Nombre de Producto',
    price: '$10.00',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '4',
    name: 'Nombre de Producto',
    price: '$10.00',
    image: 'https://via.placeholder.com/100',
  },
];

const Inicio = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const flatListRef = useRef(null);
  const scrollInterval = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    scrollInterval.current = setInterval(() => {
      if (flatListRef.current) {
        currentIndex.current = (currentIndex.current + 1) % carouselData.length;
        flatListRef.current.scrollToIndex({ index: currentIndex.current, animated: true });
      }
    }, 3000);

    return () => clearInterval(scrollInterval.current);
  }, []);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItemContainer}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
    </View>
  );

  const renderProviderItem = ({ item }) => (
    <View style={styles.providerCard}>
      <Image source={{ uri: item.image }} style={styles.providerImage} />
      <View style={styles.providerDetails}>
        <Text style={styles.providerName}>{item.name}</Text>
        <Text style={styles.providerDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const renderProduct = ({ item }) => (
    <View style={[styles.productCard, viewMode === 'list' && styles.productCardList]}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <TouchableOpacity style={styles.favoriteIcon}>
        <Icon name="favorite-border" size={20} color="#6c757d" />
      </TouchableOpacity>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.cartButton}>
        <Icon name="shopping-cart" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <>
      <FlatList
        ref={flatListRef}
        data={carouselData}
        renderItem={renderCarouselItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.carouselContainer}
      />
      <Text style={styles.providersTitle}>PROVEEDORES</Text>
    </>
  );

  const renderFooter = () => (
    <>
      <Text style={styles.title}>PRODUCTOS MÁS VENDIDOS</Text>
      <View style={styles.viewToggleContainer}>
        <TouchableOpacity onPress={() => setViewMode('grid')}>
          <Icon name="view-module" size={30} color={viewMode === 'grid' ? '#40ba93' : '#6c757d'} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={productsData}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={viewMode === 'grid' ? 2 : 1}
        contentContainerStyle={styles.productsList}
        style={styles.espacio}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <Headerperfil />
      <FlatList
        data={providersData}
        renderItem={renderProviderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  carouselContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  carouselItemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginHorizontal: 0,
    padding: 5,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  providersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#000',
  },
  providerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 15,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  providerImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 20,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  providerDescription: {
    fontSize: 13,
    color: '#6c757d',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 3,
    marginRight: 13,
  },
  productsList: {
    paddingBottom: 10,
    backgroundColor: '#40ba93',
  },
  productCard: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    margin: 4,
    alignItems: 'center',
    elevation: 1,
  },
  productCardList: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginBottom: 10,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
  },
  cartButton: {
    backgroundColor: '#40ba93',
    borderRadius: 8,
    padding: 10,
    width: '90%',
    alignItems: 'center',
  },
  espacio: {
    marginBottom: 120,
  },
});

export default Inicio;
