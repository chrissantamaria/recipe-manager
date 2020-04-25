import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/Home';
import RecipeScreen from './components/Recipe';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Available Recipes' }}
          />
          <Stack.Screen
            name="Recipe"
            component={RecipeScreen}
            options={({ route }) => ({
              title: route.params.title,
              // Forcing title instead of potentially "Available Recipes"
              // depending on recipe title length
              headerBackTitle: 'Back',
            })}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);