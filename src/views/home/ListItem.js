import React from 'react';
import { TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ListItem(recipe) {
  const navigation = useNavigation();

  const navigateToRecipe = () => {
    navigation.navigate('Recipe', {
      ...recipe,
      created: new Date(recipe.created.seconds * 1000),
    });
  };

  return (
    <TouchableOpacity onPress={navigateToRecipe}>
      <List.Item
        title={recipe.title}
        description={`Submitted by ${recipe.author.name}`}
      />
    </TouchableOpacity>
  );
}
