//React dependencies
import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
//Styles

class Searchbar extends Component {

  render() {

    const { placeholder } = this.props;
    return (
      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
      />
    );
  }
}



const styles = StyleSheet.create({
  inputField: {
    backgroundColor: '#ffffff',
    opacity: 0.9,
    height: 55,
    width: 320,
    borderRadius: 50,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  }
})

export default Searchbar