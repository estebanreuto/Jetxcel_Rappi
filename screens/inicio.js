import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
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
    name: 'Product Name',
    price: '$10.00',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    name: 'Nombre de producto',
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

    return () => {
      clearInterval(scrollInterval.current);
    };
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar productos"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <Icon name="search" size={20} color="#6c757d" style={styles.searchIcon} />
      </View>
      <View style={styles.viewToggleContainer}>
        <TouchableOpacity onPress={() => setViewMode('list')}>
          <Icon name="view-list" size={24} color={viewMode === 'list' ? '#007bff' : '#6c757d'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setViewMode('grid')}>
          <Icon name="view-module" size={24} color={viewMode === 'grid' ? '#007bff' : '#6c757d'} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={productsData}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={viewMode === 'grid' ? 2 : 2}
        contentContainerStyle={styles.productsList}
      style={styles.espacio}/>
    </>
  );

  return (
    <View>
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
    backgroundColor: '#f8f9fa',
  },
  carouselContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  secondCarouselContainer: {
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    marginBottom: 20,
  },
  carouselItemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#000',
  },
  providersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#000',
  },
  providersList: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 25,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '91%',
    left: 15,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 5,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginRight: 13,
  },
  productsList: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    margin: 3,
    alignItems: 'center',
    elevation: 2,
  },
  productCardList: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 10,
    width: '90%',
    alignItems: 'center',
  },
  espacio: {
    margin: 10,
    marginBottom: 120
  }
});

export default Inicio;
