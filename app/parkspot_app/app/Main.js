import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default class Main extends React.Component {
  render() {
    return (
      <MapView
        style={{flex: 1}}
        region={{
          latitude: 51.034809,
          longitude: 3.729268,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
      />
    );
  }
}