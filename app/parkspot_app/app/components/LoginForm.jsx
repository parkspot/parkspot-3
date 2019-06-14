import React, { Component } from 'react'
import { View, Text, Image, StyleSheet,TouchableOpacity} from 'react-native'
import { Button } from 'react-native-elements';
import TextInputWithIcon from '../components/TextInputWithIcon'

export default class LoginForm extends Component {

    onLoginPress() {

    }

    render() {
        return (
            <React.Fragment>
                <Image 
                style={styles.logo} 
                source={require("../assets/parkspot.png")}
                />
                <TextInputWithIcon 
                icon="ios-mail" 
                placeholder="Email" 
                returnkeytype="next" 
                textcontenttype="emailAddress" 
                keyboardtype="email-address" 
                securetextentry={false}
                />
                <TextInputWithIcon 
                icon="ios-lock" 
                placeholder="Password" 
                returnkeytype="send" 
                textcontenttype="password" 
                keyboardtype="default" 
                securetextentry={true}
                />
                <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                title="Get Started !"
                color="#4CD964"
                />
                <View style={styles.registerHelpContainer}>
                    <TouchableOpacity style={styles.register}>
                        <Text style={styles.whiteText}>
                            Create account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.help}>
                        <Text style={styles.whiteText}>
                            Need help?
                        </Text>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        borderRadius: 10,
        width: 200,
        height: 200,
        marginTop: 80,
        marginBottom: 40
    },
     
    loginButton: {
        alignSelf: 'center',
        backgroundColor: '#46CA5D',
        height: 60,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 50,
        width: "90%"
    },
    registerHelpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    register: {
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10,
    },
    whiteText: {
        fontSize: 16,
        color:"#FFF"
    },
    help: {
        marginTop: 10,
        marginRight: 20,
        marginBottom: 10,
    }
})