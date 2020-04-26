import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ login }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={{ fontSize: 36, marginBottom: 10 }}>Recipe Manager</Text>
        <Text style={{ fontSize: 16, color: '#7f7f7f' }}>
          Let's get cooking!
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={{ color: 'white' }}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: height * 0.1,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginTop: 'auto',
    height: 60,
    backgroundColor: '#16aaff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
