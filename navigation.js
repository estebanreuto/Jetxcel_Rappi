import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importa los íconos
import Login from './screens/iniciosesion'; // Pantalla de inicio de sesión
import Inicio from './screens/inicio'; // Pantalla de inicio después de iniciar sesión
import Categorias from './screens/categorias'; // Nueva pantalla de Categorías
import Establecimientos from './screens/establecimientos'; // Nueva pantalla de Establecimientos

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Componente para el menú de navegación con pestañas
const TabNavigator = () => {
  return (
    <Tab.Navigator 
      initialRouteName="Home" // Establece la pantalla Home como inicial
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen 
        name="Categorías" 
        component={Categorias} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="category" color={color} size={size} /> // Aquí puedes personalizar el ícono
          ),
        }} 
      />
      <Tab.Screen 
        name="Home" 
        component={Inicio} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} /> // Aquí puedes personalizar el ícono
          ),
        }} 
      />
      <Tab.Screen 
        name="Establecimientos" 
        component={Establecimientos} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="store" color={color} size={size} /> // Aquí puedes personalizar el ícono
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

// Navegación principal
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="inicio" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
