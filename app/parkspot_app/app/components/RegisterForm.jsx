import React, { Component } from 'react'
import { View, Text, Image, StyleSheet,TouchableOpacity} from 'react-native'
import { Button } from 'react-native-elements';
import TextInputWithIcon from '../components/TextInputWithIcon'
import { Actions } from 'react-native-router-flux';

export default class RegisterForm extends Component {

    onLoginPress() {
        Actions.home()
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
                buttonStyle={styles.registerButton}
                onPress={() => this.onLoginPress()}
                title="Get Signed up !"
                color="#4CD964"
                />
                <View style={styles.loginHelpContainer}>
                    <TouchableOpacity style={styles.login} onPress={() => Actions.pop()}>
                        <Text style={styles.whiteText}>
                        Already have an account?
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
     
    registerButton: {
        alignSelf: 'center',
        backgroundColor: '#46CA5D',
        height: 60,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 50,
        width: "90%"
    },
    loginHelpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    login: {
        marginTop: 10,
        marginBottom: 10,
    },
    whiteText: {
        fontSize: 16,
        color:"#FFF"
    },
    help: {
        marginTop: 10,
        marginBottom: 10,
    }
})