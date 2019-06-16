//React imports
import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

/**
 * @type {StyleSheet}
 * Declaration of all the styles needed to style the RegisterScreen
 */
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#484848',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 15,
    }
})

/**
 * @Class Title
 * @param {String} text 
 * Styling of a title
 */
const Title = ({ text }) => (
    <Text style={styles.title}>{text}</Text>
)

export default Title
