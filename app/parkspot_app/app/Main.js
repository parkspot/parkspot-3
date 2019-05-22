import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'
import Searchbar from './components/Searchbar'

export default class Main extends React.Component {
  render() {
    return (

      <View>

        <Searchbar />
      </View>


    );
  }
}