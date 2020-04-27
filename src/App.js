import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import Router from './Router';
import AuthHandler from './views/auth';
import { LoadingProvider } from './components/LoadingProvider';

// Hide warning boxes in Expo client
console.disableYellowBox = true;

function App() {
  return (
    <PaperProvider>
      <LoadingProvider>
        <AuthHandler>
          <Router />
        </AuthHandler>
      </LoadingProvider>
    </PaperProvider>
  );
}

export default registerRootComponent(App);
