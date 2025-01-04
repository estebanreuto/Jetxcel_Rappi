import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
            tabBarShowLabel: true,
            tabBarStyle: styles.tabBarStyle,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#888',
          }}
        >
          <Tab.Screen
            name="Categorías"
            component={Categorias}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="category" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="home"
            component={Inicio}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color="#fff" size={30} />
              ),
              headerShown: false,
              tabBarButton: (props) => (
                <CustomTabBarButton {...props}>
                  <Icon name="home" color="#fff" size={30} />
                </CustomTabBarButton>
              ),
            }}
          />
          <Tab.Screen
            name="Establecimientos"
            component={Establecimientos}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="store" color={color} size={size} />
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#f8f8f8',
    elevation: 5,
  },
  centralButtonContainer: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralButton: {
    width: 80,
    height: 80,
    borderRadius: 35,
    backgroundColor: '#40ba93',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
});
