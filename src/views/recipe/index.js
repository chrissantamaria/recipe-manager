import React, { useLayoutEffect } from 'react';
import { Card, Paragraph } from 'react-native-paper';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../../firebase';

export default function RecipeScreen({ route, navigation }) {
  const { author, title, content, id } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={deleteRecipe}>
          <Icon
            name="delete"
            size={30}
            color="#037cff"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const deleteRecipe = () => {
    Alert.alert('Are you sure?', 'This will delete the recipe for all users.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          await db.collection('recipes').doc(id).delete();
          navigation.navigate('Home');
        },
      },
    ]);
  };

  return (
    <Card>
      <Card.Title title={title} subtitle={`Submitted by ${author.name}`} />
      <Card.Content>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
    </Card>
  );
}
