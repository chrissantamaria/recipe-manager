import * as React from 'react';
import { Text, View, ImageBackground } from 'react-native';

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <ImageBackground
        style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
        source={require('../assets/hoody.gif')}
      >
        <Text style={{ fontSize: 30 }}> Loading.. </Text>
      </ImageBackground>
    );
  }
}
