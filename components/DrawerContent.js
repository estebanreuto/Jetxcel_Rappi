import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import LoginModal from './LoginModal';

const DrawerContent = (props) => {
    const navigation = useNavigation();
    const { isLoggedIn, user, login, logout } = useContext(AuthContext);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState(null);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                // setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Error checking login status:', error);
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
                            await AsyncStorage.removeItem('user');
                            logout();
                            navigation.navigate('MainStack', { screen: 'BottomTabs', params: { screen: 'Inicio' } });
                            props.navigation.closeDrawer();
                        } catch (error) {
                            console.error('Error during logout:', error);
                        }
                    }
                }
            ]
        );
    };

    const navigateAndCloseDrawer = (screenName) => {
        if (screenName === 'Mis Compras' || screenName === 'Carrito' || screenName === 'Profile') {
            if (isLoggedIn) {
                navigation.navigate('MainStack', { screen: 'BottomTabs', params: { screen: screenName } });
                props.navigation.closeDrawer();
            } else {
                setPendingNavigation(screenName);
                setIsLoginModalVisible(true);
            }
        } else {
            navigation.navigate('MainStack', { screen: 'BottomTabs', params: { screen: screenName } });
            props.navigation.closeDrawer();
        }
    };

    const handleLogin = async (userData) => {
        await login(userData);
        setIsLoginModalVisible(false);
        if (pendingNavigation) {
            navigation.navigate('MainStack', { screen: 'BottomTabs', params: { screen: pendingNavigation } });
            setPendingNavigation(null);
        }
        props.navigation.closeDrawer();
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            <View style={styles.drawerContent}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    )}
                    label="Inicio"
                    onPress={() => navigateAndCloseDrawer('Inicio')}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Ionicons name="search-outline" color={color} size={size} />
                    )}
                    label="Buscar"
                    onPress={() => navigateAndCloseDrawer('Search')}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Ionicons name="business-outline" color={color} size={size} />
                    )}
                    label="Tiendas"
                    onPress={() => navigateAndCloseDrawer('Tiendas')}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Ionicons name="grid-outline" color={color} size={size} />
                    )}
                    label="Categorias"
                    onPress={() => navigateAndCloseDrawer('Categorias')}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Ionicons name="bag-outline" color={color} size={size} />
                    )}
                    label="Mis Compras"
                    onPress={() => navigateAndCloseDrawer('Mis Compras')}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Ionicons name="cart-outline" color={color} size={size} />
                    )}
                    label="Carrito"
                    onPress={() => navigateAndCloseDrawer('Carrito')}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    )}
                    label="Mi Cuenta"
                    onPress={() => navigateAndCloseDrawer('Profile')}
                />
            </View>
            <View style={styles.bottomSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Ionicons name="settings-outline" color={color} size={size} />
                    )}
                    label="Configuración"
                    onPress={() => navigateAndCloseDrawer('Settings')}
                />
                {isLoggedIn ? (
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Ionicons name="log-out-outline" color={color} size={size} />
                        )}
                        label="Cerrar Sesión"
                        onPress={handleLogout}
                    />
                ) : (
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Ionicons name="log-in-outline" color={color} size={size} />
                        )}
                        label="Iniciar Sesión"
                        onPress={() => setIsLoginModalVisible(true)}
                    />
                )}
            </View>
            <LoginModal
                visible={isLoginModalVisible}
                onClose={() => {
                    setIsLoginModalVisible(false);
                    setPendingNavigation(null);
                }}
                onLogin={handleLogin}
            />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 150,
        height: 50,
        alignSelf: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    drawerContent: {
        flex: 1,
        paddingTop: 10,
    },
    bottomSection: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
    },
});

export default DrawerContent;

