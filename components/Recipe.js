import React from 'react';
import { View, Text } from 'react-native';

export default function RecipeScreen({ route }) {
  const { author, title, content } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{title}</Text>
      <Text style={{ marginBottom: 15 }}>Submitted by {author}</Text>
      <Text>{content}</Text>
    </View>
  );
}
