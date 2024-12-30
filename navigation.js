import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/iniciosesion'; // Pantalla de inicio de sesión
import Inicio from './screens/inicio'; // Pantalla de inicio después de iniciar sesión

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Primera pantalla será siempre Login */}
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="inicio" component={Inicio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
