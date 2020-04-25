import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/Home';
import RecipeScreen from './components/Recipe';

const Stack = createStackNavigator();

export default function App() {
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
            options={({ route }) => ({ title: route.params.title })}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
