//React imports
import React, { Component } from 'react'
import { Keyboard, View, TouchableWithoutFeedback, KeyboardAvoidingView, StyleSheet, ImageBackground } from 'react-native'

//Local imports
import RegisterForm from '../components/RegisterForm'

/**
 * @class RegisterScreen
 * Shows The Screen for registering
 */
class RegisterScreen extends Component {
    /**
     * @constructor
     * @param {Object} props
     */
    constructor(props) {
        super(props)
        this.state = {
            email : "",
            password: "",
        }
    }

    /**
     * @function render
     * @returns View of the Screen
     */
    render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ImageBackground source={require('../assets/street_view_filter.png')} style={{width: '100%', height: '100%',}}>
                        <View style={styles.registerScreenContainer}>
                            <View style={styles.registerFormView}>
                                <RegisterForm />
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        );
    }
}

/**
 * @type {StyleSheet}
 * Declaration of all the styles needed to style the RegisterScreen
 */
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