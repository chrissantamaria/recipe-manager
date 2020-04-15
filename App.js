import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to recipe"
        onPress={() => {
          navigation.navigate('Recipe', {
            author: 'user1',
            title: 'Kraft Mac and Cheese',
            content: 'Just pop it into the microwave!',
          });
        }}
      />
    </View>
  );
}

function RecipeScreen({ route }) {
  const { author, title, content } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{title}</Text>
      <Text style={{ marginBottom: 15 }}>Submitted by {author}</Text>
      <Text>{content}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Recipe"
          component={RecipeScreen}
          options={({ route }) => ({ title: route.params.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
