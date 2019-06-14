import React, { Component } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


export default class TextInputWithIcon extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Ionicons style={styles.icon} name={this.props.icon} size={32} color="rgb(255, 255, 255)"/>
                <TextInput 
                placeholder={this.props.placeholder}
                placeholderTextColor="rgb(255, 255, 255)"
                autoCapitalize="none"
                keyboardType={this.props.keyboardtype}
                returnKeyType={this.props.returnkeytype}
                textContentType={this.props.textcontenttype}
                secureTextEntry={this.props.securetextentry}
                style={styles.loginFormTextInput} 
                />
            </View>
        )
    }
}
styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: "space-around",
        borderRadius: 10,
        backgroundColor: 'rgba(250, 250, 250, .2)',
        height: 60,
        width: "90%",
        marginTop: 5,
        marginBottom: 5,
    },
    icon: {
        alignSelf: 'center',
        marginLeft: 10
    },
    loginFormTextInput: {
        alignSelf: 'center',
        paddingLeft: 10,
        height: 43,
        fontSize: 14,
        width: "80%"
    }
})
