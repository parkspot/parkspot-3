//React imports
import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

/**
 * @class Searchbar
 * Styling of the searchbar
 */
class Searchbar extends Component {

  /**
   * @function render
   * @returns View of the searchbar
   */
  render() {

    const { placeholder } = this.props;
    return (
      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        onSubmitEditing={this.props.submitHandler}
      />
    );
  }
}


/**
 * @type {StyleSheet}
 * Declaration of all the styles needed to style the searchbar
 */
const styles = StyleSheet.create({
  inputField: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff',
    opacity: 1.0,
    height: 55,
    width: 320,
    borderRadius: 50,
    textAlign: 'left',
    fontSize: 20,
    color: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.09,
    shadowRadius: 4.65,
    elevation: 1,
  }
})

export default Searchbar