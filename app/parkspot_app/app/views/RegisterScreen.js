import React, { Component } from 'react'
import { Keyboard, View, TouchableWithoutFeedback, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo'

import RegisterForm from '../components/RegisterForm'

class RegisterScreen extends Component {
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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <LinearGradient colors={["#9CD994", "#96CA9D"]} style={{ width: "100%", height: "100%"}}>
                        <View style={styles.registerScreenContainer}>
                            <View style={styles.registerFormView}>
                                <RegisterForm />
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableWithoutFeedback>
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
    registerScreenContainer: {
        flex: 1,
    },
    registerFormView: {
        flex: 1
    },
})

export default RegisterScreen