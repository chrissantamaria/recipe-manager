import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Facebook from 'expo-facebook';
import LoadingScreen from '../../components/LoadingScreen';
import LoginScreen from './LoginScreen';
import { FACEBOOK_PROJECT_ID } from 'react-native-dotenv';
import firebase, { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function AuthHandler({ children }) {
  const [token, setToken] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [user, authLoading] = useAuthState(auth);

  useEffect(() => {
    (async () => {
      // Used in development to clear token from storage
      // await SecureStore.deleteItemAsync('facebookToken');
      checkForToken();
    })();
  }, []);

  useEffect(() => {
    if (token) {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((credential) => {
          console.log('Login successful', credential.user.uid);
        })
        .catch((error) => {
          console.error('Firebase auth failed!', error);
        });
    }
  }, [token]);

  const saveToken = (token) => {
    SecureStore.setItemAsync('facebookToken', token);
    setToken(token);
  };

  const checkForToken = async () => {
    const token = await SecureStore.getItemAsync('facebookToken');
    setToken(token);
    setTokenLoading(false);
  };

  const fetchToken = async () => {
    try {
      await Facebook.initializeAsync(FACEBOOK_PROJECT_ID);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        saveToken(token);
      } else throw new Error(`Facebook login returned type ${type}`);
    } catch ({ message }) {
      alert(`Facebook login error': ${message}`);
    }
  };

  if (tokenLoading || authLoading) return <LoadingScreen />;
  if (!token) return <LoginScreen login={fetchToken} />;
  if (!user) return <LoadingScreen />;
  return children;
}
