import React, { useState, useRef } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { OutlinedTextField } from 'react-native-material-textfield';
import firebase, { db, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getImageFromGallery, uploadPhoto } from './utils';

export default function AddRecipeScreen({ navigation }) {
  const titleRef = useRef('');
  const contentRef = useRef('');
  const [photoURI, setPhotoURI] = useState(null);
  const [user] = useAuthState(auth);

  const getURIFromGallery = async () => {
    const uri = await getImageFromGallery();
    setPhotoURI(uri);
  };

  const postRecipe = async () => {
    const title = titleRef.current.value();
    const content = contentRef.current.value();

    if (!title || !content) {
      Alert.alert('Hang on!', 'Please fill out all fields before submitting');
      return;
    }

    const { id } = await db.collection('recipes').add({
      author: {
        uid: user.uid,
        name: user.displayName,
      },
      title,
      content,
      created: firebase.firestore.Timestamp.now(),
    });

    if (photoURI) await uploadPhoto({ id, uri: photoURI, uid: user.uid });
    else console.log('No photo URI, skipping upload');

    navigation.navigate('Home');
  };

  return (
    <ScrollView
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 20,
      }}
    >
      <OutlinedTextField
        ref={titleRef}
        label="Title"
        containerStyle={{ marginBottom: 20 }}
      />
      <OutlinedTextField
        ref={contentRef}
        label="Content"
        placeholder={
          'Enter your recipe here!\n\nYou can entire multiple lines as well.'
        }
        multiline
      />
      <Button onPress={getURIFromGallery}>
        {!photoURI ? 'Choose photo' : 'Change photo'}
      </Button>
      <Button onPress={postRecipe}>Save recipe</Button>
    </ScrollView>
  );
}
