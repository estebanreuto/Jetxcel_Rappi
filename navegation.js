import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import DrawerContent from './components/DrawerContent';
import HomeScreen from './screens/home';
import TiendasScreen from './screens/tiendas';
import CategoriasScreen from './screens/categorias';
import MisComprasScreen from './screens/mis-compras';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/profile';
import LoginModal from './components/LoginModal';
import { getUser, setUser } from './utils/auth';
import { AuthContext } from './context/AuthContext';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  const { isLoggedIn, login, checkLoginStatus } = React.useContext(AuthContext);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const MisComprasWrapper = ({ navigation }) => {
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('tabPress', (e) => {
        if (!isLoggedIn) {
          e.preventDefault();
          setIsLoginModalVisible(true);
        } else {
          navigation.navigate('Mis Compras');
        }
      });

      return unsubscribe;
    }, [navigation, isLoggedIn]);

    return (
      <>
        <LoginModal
          visible={isLoginModalVisible}
          onClose={() => setIsLoginModalVisible(false)}
          onLogin={async (userData) => {
            await login(userData);
            setIsLoginModalVisible(false);
            await checkLoginStatus();
            navigation.navigate('Mis Compras');
          }}
        />
        <MisComprasScreen />
      </>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tiendas') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'Categorias') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Mis Compras') {
            iconName = focused ? 'bag' : 'bag-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Tiendas" component={TiendasScreen} />
      <Tab.Screen name="Categorias" component={CategoriasScreen} />
      <Tab.Screen name="Mis Compras" component={MisComprasWrapper} />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUserState] = useState(null);

  const checkLoginStatus = useCallback(async () => {
    const userData = await getUser();
    setIsLoggedIn(!!userData);
    setUserState(userData);
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const login = useCallback(async (userData) => {
    await setUser(userData);
    setIsLoggedIn(true);
    setUserState(userData);
  }, []);

  const logout = useCallback(async () => {
    await setUser(null);
    setIsLoggedIn(false);
    setUserState(null);
  }, []);

  const authContext = React.useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      logout,
      checkLoginStatus,
    }),
    [isLoggedIn, user, login, logout, checkLoginStatus]
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="MainStack"
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              width: '70%',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              overflow: 'hidden',
            },
          }}
        >
          <Drawer.Screen name="MainStack" component={MainStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default Navigation;

