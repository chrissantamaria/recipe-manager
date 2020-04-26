import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function HomeScreen() {
  const [recipes, loading] = useCollectionData(db.collection('recipes'), {
    idField: 'id',
  });

  if (loading) return <React.Fragment />;
  return (
    <ScrollView
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
      }}
    >
      {recipes.map(({ id, ...data }) => (
        <ListItem key={id} {...data} />
      ))}
    </ScrollView>
  );
}

function ListItem(recipe) {
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
