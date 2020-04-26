import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import Router from './Router';
import AuthHandler from './views/auth';

function App() {
  return (
    <PaperProvider>
      <AuthHandler>
        <Router />
      </AuthHandler>
    </PaperProvider>
  );
}

export default registerRootComponent(App);
