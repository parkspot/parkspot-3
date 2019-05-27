import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#484848',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 15,
    }
})

const Title = ({ text }) => (
    <Text style={styles.subtitle}>{text}</Text>
)

export default Title
