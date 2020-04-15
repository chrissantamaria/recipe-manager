import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
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
