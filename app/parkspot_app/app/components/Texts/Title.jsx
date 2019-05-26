import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: '#000',
    }
})

const Title = ({ text }) => (
    <Text style={styles.subtitle}>{text}</Text>
)

export default Title
