import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LoginModal from '../components/LoginModal';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout, login, checkUserLogin } = useContext(AuthContext);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  useEffect(() => {
    if (checkUserLogin) {
      checkUserLogin();
    }
  }, [checkUserLogin]);

  const handleLogin = async (userData) => {
    if (login) {
      await login(userData);
      setIsLoginModalVisible(false);
      if (checkUserLogin) {
        checkUserLogin();
      }
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Está seguro de que desea cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Sí, cerrar sesión", 
          onPress: async () => {
            try {
              if (logout) {
                await logout();
                navigation.navigate('MainStack', { screen: 'BottomTabs', params: { screen: 'Inicio' } });
              }
            } catch (error) {
              console.error('Error during logout:', error);
            }
          }
        }
      ]
    );
  };

  const menuItems = [
    { icon: 'person-outline', label: 'Editar Perfil', chevron: true },
    { icon: 'settings-outline', label: 'Configuración', chevron: true },
    { icon: 'help-circle-outline', label: 'Soporte', chevron: true },
    { icon: 'shield-outline', label: 'Política de Privacidad', chevron: true },
    { icon: 'log-out-outline', label: 'Cerrar Sesión', chevron: false, onPress: handleLogout },
  ];

  const renderMenuItem = ({ icon, label, chevron, onPress }) => (
    <TouchableOpacity key={label} style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={22} color="#666" />
        <Text style={styles.menuItemText}>{label}</Text>
      </View>
      {chevron && <Ionicons name="chevron-forward" size={20} color="#666" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerBackground} />
        </View>
        
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: '/placeholder.svg?height=100&width=100' }}
              style={styles.profileImage}
            />
          </View>
          {user ? (
            <>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </>
          ) : (
            <>
              <Text style={styles.profileName}>Invitado</Text>
              <TouchableOpacity 
                style={styles.loginButton} 
                onPress={() => setIsLoginModalVisible(true)}
              >
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.menuContainer}>
          {user && menuItems.map(renderMenuItem)}
          {!user && menuItems.slice(0, -1).map(renderMenuItem)}
        </View>
      </View>
      
      <LoginModal
        visible={isLoginModalVisible}
        onClose={() => setIsLoginModalVisible(false)}
        onLogin={handleLogin}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    position: 'relative',
    height: 180,
  },
  headerTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1a2f4b',
  },
  backButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -50,
    marginBottom: 24,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  loginButton: {
    backgroundColor: '#1a2f4b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

