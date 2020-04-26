import React, { useLayoutEffect } from 'react';
import { Card, Paragraph } from 'react-native-paper';
import { TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db, storage } from '../../firebase';
import { format as formatDate } from 'date-fns';

export default function RecipeScreen({ route, navigation }) {
  const { author, title, content, id, created } = route.params;

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
          await Promise.all([
            db.collection('recipes').doc(id).delete(),
            storage
              .ref()
              .child(`recipes/${id}.jpg`)
              .delete()
              .catch(() =>
                console.log(`Failed to delete photo for recipe ${id}`)
              ),
          ]);
          navigation.navigate('Home');
        },
      },
    ]);
  };

  return (
    <Card>
      <ScrollView style={{ margin: 10 }}>
        <Card.Title
          title={title}
          subtitle={`Submitted by ${author.name}\n${formatDate(
            created,
            'M/d/yy'
          )}`}
          subtitleNumberOfLines={2}
          style={{ marginBottom: 20 }}
        />
        <Card.Content>
          <Paragraph>{content}</Paragraph>
        </Card.Content>
      </ScrollView>
    </Card>
  );
}
