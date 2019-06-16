//React imports
import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {Actions} from 'react-native-router-flux'

/**
 * @class LogOutbutton
 * Styling and functionality of a log out button
 */
export default class LogOutButton extends Component {
    /**
     * @constructor
     * @param {Object} props 
     */
    constructor(props){
        super(props)

    }

    async _removeItemValue(key) {
        await AsyncStorage.removeItem(key).catch(error => {
            console.error(error)
        })
        return true;
    }

    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={async () => {
                await this._removeItemValue('userToken')
                await this._removeItemValue('email')
                await this._removeItemValue('userId')
                Actions.login()
            }}>
                <Ionicons name="ios-log-out" size={32} color="#707070" style={styles.favIcon} />
            </TouchableOpacity>
        )
    }
}

const styles= StyleSheet.create({
    button: {
        borderRadius: 10,
        backgroundColor: "#FFF",
        position: "absolute",
        zIndex: 2,
        top: 35,
        right: 15
    },
    favIcon: {
        margin: 10
    }
})