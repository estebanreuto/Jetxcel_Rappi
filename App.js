import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Navigation from './navegation';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;

