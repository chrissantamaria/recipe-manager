import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Title } from 'react-native-paper';
import { db } from '../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ListItem from './ListItem';

export default function HomeScreen() {
  const [recipes, loading] = useCollectionData(db.collection('recipes'), {
    idField: 'id',
  });

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
      {recipes.map(({ id, ...data }) => (
        <ListItem key={id} {...data} />
      ))}
    </ScrollView>
  );
}
