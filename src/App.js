import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import Router from './Router';

function App() {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
}

export default registerRootComponent(App);
