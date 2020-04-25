import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './views/home';
import RecipeScreen from './views/recipe';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
