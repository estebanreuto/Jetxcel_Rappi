  import React from 'react';
  import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
  import Icon from 'react-native-vector-icons/MaterialIcons';

  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}></Text>
        <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
        <Icon name="search" size={27} color="#40ba93" style={styles.searchIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="shopping-cart" size={27} color="#40ba93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="person" size={27} color="#40ba93" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 10,
      height: 100,
      backgroundColor: '#fff',
      // Sombras
      elevation: 4, // Sombra para Android
      shadowColor: '#000', // Sombra para iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
    },
    title: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
      top: 13
    },
    iconsContainer: {
      flexDirection: 'row',
      top: 15
    },
    iconButton: {
      marginLeft: 15,
    },
  });

  export default Header;
