import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Inicio from './screens/inicio';
import Categorias from './screens/categorias';
import Establecimientos from './screens/establecimientos';
import Login from './screens/iniciosesion'; // Pantalla de inicio de sesión

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.centralButtonContainer}
    onPress={onPress}
  >
    <View style={styles.centralButton}>
      {children}
    </View>
  </TouchableOpacity>
);

    const TabNavigator = () => {
      return (
        <Tab.Navigator
          initialRouteName="home" 
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarActiveTintColor: '#40ba93',
            tabBarInactiveTintColor: '#888',
          }}
        >
          <Tab.Screen
            name="Categorías"
            component={Categorias}
            options={{
              tabBarIcon: ({ color, size }) => (
              <Image source={require('./assets/categoria_icon.png')} style={styles.logo} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="home"
            component={Inicio}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color="#fff" size={35} />
              ),
              headerShown: false,
              tabBarButton: (props) => (
                <CustomTabBarButton {...props}>
                  <Icon name="home" color="#fff" size={35} />
                </CustomTabBarButton>
              ),
            }}
          />
          <Tab.Screen
            name="Establecimientos"
            component={Establecimientos}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Image source={require('./assets/establecimiento_icon.png')} style={styles.logo} />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      );
    };
    

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="inicio" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    height: 75,
    backgroundColor: '#f8f8f8',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralButtonContainer: {
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralButton: {
    width: 100,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#40ba93',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10
  }
});
