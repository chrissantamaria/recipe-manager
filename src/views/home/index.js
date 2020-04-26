import React, { useLayoutEffect } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from '../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ListItem from './ListItem';

export default function HomeScreen({ navigation }) {
  const [recipes, loading] = useCollectionData(db.collection('recipes'), {
    idField: 'id',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Add Recipe')}>
          <Icon
            name="md-add"
            size={30}
            color="#037cff"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (loading)
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '30%',
        }}
      >
        <Title style={{ marginBottom: 10 }}>Loading recipes...</Title>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  return (
    <ScrollView
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
      }}
    >
      {recipes.map((recipe) => (
        <ListItem key={recipe.id} {...recipe} />
      ))}
    </ScrollView>
  );
}
