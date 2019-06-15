import React, { Component } from 'react'
import { Keyboard, View, TouchableWithoutFeedback, KeyboardAvoidingView, StyleSheet, ImageBackground } from 'react-native'

import LoginForm from '../components/LoginForm'

class LogInScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email : "",
            password: "",
        }
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <ImageBackground source={require('../assets/street_view_filter.png')} style={{width: '100%', height: '100%',}}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.loginScreenContainer}>
                            <View style={styles.loginFormView}>
                                <LoginForm />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
          </KeyboardAvoidingView>
        );
    }
}

const styles= StyleSheet.create({
    containerView: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        alignSelf: 'center',
        borderRadius: 10,
        width: 200,
        height: 200,
        marginTop: 80,
        marginBottom: 40
        
    },
    loginScreenContainer: {
        flex: 1,
    },
    loginFormView: {
        flex: 1
    },
})

export default LogInScreen