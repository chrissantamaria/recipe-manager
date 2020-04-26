import React, { useRef, useLayoutEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { OutlinedTextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Feather';
import firebase, { db, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function AddRecipeScreen({ navigation }) {
  const titleRef = useRef('');
  const contentRef = useRef('');
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
  }, [navigation]);

  const postRecipe = async () => {
    const title = titleRef.current.value();
    const content = contentRef.current.value();

    if (!title || !content) {
      Alert.alert('Hang on!', 'Please fill out all fields before submitting');
      return;
    }

    await db.collection('recipes').add({
      author: {
        uid: user.uid,
        name: user.displayName,
      },
      title,
      content,
      created: firebase.firestore.Timestamp.now(),
    });
    navigation.navigate('Home');
  };

  return (
    <View
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
    </View>
  );
}
