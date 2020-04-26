import React from 'react';
import { TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ListItem(recipe) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Recipe', recipe)}>
      <List.Item
        title={recipe.title}
        description={`Submitted by ${recipe.author.name}`}
      />
    </TouchableOpacity>
  );
}
