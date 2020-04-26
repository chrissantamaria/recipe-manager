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

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
      }}
    >
      {loading ? (
        <React.Fragment />
      ) : (
        <ScrollView style={{ minHeight: '100%' }}>
          {recipes.map(({ id, ...data }) => (
            <ListItem key={id} {...data} />
          ))}
        </ScrollView>
      )}
    </View>
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
