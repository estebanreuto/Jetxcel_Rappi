import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserLogin = useCallback(async () => {
        try {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error checking user login:', error);
            setUser(null);
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        checkUserLogin();
    }, [checkUserLogin]);

    const login = useCallback(async (userData) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error during login:', error);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }, []);

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        checkUserLogin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

