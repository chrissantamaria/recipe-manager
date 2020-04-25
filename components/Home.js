import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import data from '../data.json';
const recipes = Object.values(data.recipes);

export default function HomeScreen() {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
      }}
    >
      {recipes.map((recipe) => (
        <ListItem {...recipe} />
      ))}
    </View>
  );
}

function ListItem(recipe) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Recipe', recipe)}>
      <List.Item
        title={recipe.title}
        description={`Submitted by ${recipe.author}`}
      />
    </TouchableOpacity>
  );
}
