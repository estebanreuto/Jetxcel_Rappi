// Navigation.js

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bienvenidos from './screens/bienvenidos'; // Tu pantalla de bienvenida
import InicioSesion from './screens/iniciosesion'; // Tu pantalla de inicio de sesión
import inicio from './screens/inicio'; // Tu pantalla de inicio después de iniciar sesión

const Stack = createStackNavigator();

const Navigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const value = await AsyncStorage.getItem('isFirstLaunch');
      if (value === null) {
        // Si es la primera vez que se inicia la app, marca como lanzada
        await AsyncStorage.setItem('isFirstLaunch', 'false');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null; // Mostrar una pantalla de carga o nada mientras se verifica
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          <Stack.Screen name="Bienvenidos" component={Bienvenidos} />
        ) : (
          <>
            <Stack.Screen name="InicioSesion" component={InicioSesion} />
            <Stack.Screen name="inicio" component={inicio} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
