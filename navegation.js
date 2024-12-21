// navigation.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import screen1 from './screens/Tutorial/screen1'; 
import screen2 from './screens/Tutorial/screen2';
import screen3 from './screens/Tutorial/screen3';
import screen4 from './screens/Tutorial/screen4';
import login from './screens/Inicio Seccion - Registro/Login';

const Stack = createStackNavigator();

export default function Navigation() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
      if (alreadyLaunched === null) {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null; // Muestra un indicador de carga si aún no se ha determinado
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          <>
            <Stack.Screen name="screen1" component={screen1} />
            <Stack.Screen name="screen2" component={screen2} />
            <Stack.Screen name="screen3" component={screen3} />
            <Stack.Screen name="screen4" component={screen4} />
            <Stack.Screen name="login" component={login} />
          </>
        ) : (
          <Stack.Screen name="login" component={login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
