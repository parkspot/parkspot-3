import React, { Component } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


export default class TextInputWithIcon extends Component {
    render() {
        let borderstyle;
        if(this.props.error){
            borderstyle = styles.containerBad
        } else if (this.props.validated){
            borderstyle = styles.containerGood
        } else {
            borderstyle = styles.container
        }
        return (
            <View style={borderstyle}>
                <Ionicons style={styles.icon} name={this.props.icon} size={32} color="rgb(255, 255, 255)"/>
                <TextInput 
                {...this.props}
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
        backgroundColor: 'rgba(190, 190, 190, .7)',
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
        color: '#FFF',
        alignSelf: 'center',
        paddingLeft: 10,
        height: 43,
        fontSize: 14,
        width: "80%",
    },
    containerGood: {
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: "space-around",
        borderRadius: 10,
        borderColor: "green",
        borderWidth: 1,
        backgroundColor: 'rgba(144,238,144, .7)',
        height: 60,
        width: "90%",
        marginTop: 5,
        marginBottom: 5,
    },
    containerBad: {
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: "space-around",
        borderRadius: 10,
        borderColor: "red",
        borderWidth: 1,
        backgroundColor: 'rgba(242,138,140, .7)',
        height: 60,
        width: "90%",
        marginTop: 5,
        marginBottom: 5,
    },
    
})
