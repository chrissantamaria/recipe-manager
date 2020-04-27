import React, { useEffect, useLayoutEffect } from 'react';
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
import useLoading from '../../components/LoadingProvider';

export default function HomeScreen({ navigation }) {
  const [recipes, loading] = useCollectionData(db.collection('recipes'), {
    idField: 'id',
  });

  // Keeping Firestore loading indicator in sync with global loading indicator
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

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

  if (loading) return <React.Fragment />;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
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
