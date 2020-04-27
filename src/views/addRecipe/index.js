import React, { useState, useRef, useLayoutEffect } from 'react';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { OutlinedTextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Feather';
import firebase, { db, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getImageFromGallery, uploadPhoto } from './utils';

export default function AddRecipeScreen({ navigation }) {
  const titleRef = useRef('');
  const contentRef = useRef('');
  const [photoURI, setPhotoURI] = useState(null);
  const [user] = useAuthState(auth);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={postRecipe}>
          <Icon
            name="check"
            size={30}
            color="#037cff"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, postRecipe, photoURI]);

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
        padding: 20,
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
        placeholder={'You can entire multiple lines for your recipe.'}
        multiline
      />
      <Button onPress={getURIFromGallery}>
        {!photoURI ? 'Choose photo' : 'Change photo'}
      </Button>
    </ScrollView>
  );
}
