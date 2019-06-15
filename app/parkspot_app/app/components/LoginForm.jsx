import React, { Component } from 'react'
import { View, Text, Image, StyleSheet,TouchableOpacity} from 'react-native'
import { Button } from 'react-native-elements'
import TextInputWithIcon from '../components/TextInputWithIcon'
import { Actions } from 'react-native-router-flux'
import Dialog, { DialogContent, DialogFooter,DialogButton, DialogTitle } from 'react-native-popup-dialog'

export default class LoginForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            dialogVisible: false,
            email: "",
            emailError: "",
            password: "",
            passwordError: ""
        }
    }

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
                onChangeText={(email) => this.setState({email})}
                icon="ios-mail" 
                placeholder="Email" 
                returnkeytype="next" 
                textcontenttype="emailAddress" 
                keyboardtype="email-address" 
                securetextentry={false}
                error={false}
                validated={false}
                />
                <TextInputWithIcon 
                onChangeText={(password) => this.setState({password})}
                icon="ios-lock" 
                placeholder="Password" 
                returnkeytype="send" 
                textcontenttype="password" 
                keyboardtype="default" 
                securetextentry={true}
                error={false}
                validated={false}
                />
                <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                title="Get Started !"
                color="#4CD964"
                />
                <View style={styles.registerHelpContainer}>
                    <TouchableOpacity style={styles.register} onPress={() => Actions.register()}>
                        <Text style={styles.whiteText}>
                            Create account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.help} onPress={() => this.setState({dialogVisible: true})}>
                        <Text style={styles.whiteText}>
                            Need help?
                        </Text>
                    </TouchableOpacity>
                </View>
                <Dialog
                dialogTitle={<DialogTitle title="Help" />}
                visible={this.state.dialogVisible}
                onTouchOutside={() => {
                this.setState({ dialogVisible: false })
                }}
                footer={
                    <DialogFooter>
                      <DialogButton
                        text="CANCEL"
                        onPress={() => {this.setState({ dialogVisible: false })}}
                      />
                      <DialogButton
                        text="OK"
                        onPress={() => {this.setState({ dialogVisible: false })}}
                      />
                    </DialogFooter>
                  }
                >
                    <DialogContent>
                        <Text style={{width:"100%", fontSize:14, marginTop: 10}}>To Sign in:{"\n"} Please fill in your email-address and{"\n"} password in the corresponding input fields and {"\n"} press the "Get started !" button.</Text>
                        <Text style={{width:"100%", fontSize:14, marginTop: 10}}>To Register:{"\n"} Please press the "Create account" button{"\n"} on the bottom of the screen.</Text>
                    </DialogContent>
                </Dialog>
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