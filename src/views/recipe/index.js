import React, { useLayoutEffect } from 'react';
import { Card, Paragraph } from 'react-native-paper';
import { TouchableOpacity, Alert, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db, storage, auth } from '../../firebase';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { format as formatDate } from 'date-fns';
import useLoading from '../../components/LoadingProvider';

export default function RecipeScreen({ route, navigation }) {
  const { author, title, content, id, created } = route.params;
  const [photoURL, loading] = useDownloadURL(storage.ref(`recipes/${id}.jpg`));
  const [user] = useAuthState(auth);
  const { setLoading } = useLoading();

  useLayoutEffect(() => {
    if (user && user.uid === author.uid) {
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
    }
  }, [navigation, user]);

  const deleteRecipe = () => {
    Alert.alert('Are you sure?', 'This will delete the recipe for all users.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          setLoading(true);

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

          setLoading(false);
          navigation.navigate('Home');
        },
      },
    ]);
  };

  if (loading) return <React.Fragment />;
  return (
    <ScrollView>
      {photoURL && <Card.Cover source={{ uri: photoURL }} />}
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <Card.Title
          title={title}
          subtitle={`Submitted by ${author.name}\nPublished ${formatDate(
            created,
            'M/d/yy'
          )}`}
          subtitleNumberOfLines={2}
          style={{ marginBottom: 20 }}
        />
        <Card.Content>
          <Paragraph>{content}</Paragraph>
        </Card.Content>
      </View>
    </ScrollView>
  );
}
