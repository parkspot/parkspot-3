import React, { Component } from 'react'
import { View, Text, Image, StyleSheet,TouchableOpacity} from 'react-native'
import { Button } from 'react-native-elements'
import TextInputWithIcon from '../components/TextInputWithIcon'
import { Actions } from 'react-native-router-flux'
import Dialog, { DialogContent, DialogFooter,DialogButton, DialogTitle } from 'react-native-popup-dialog'

import validate from '../components/Validation/Validate'

export default class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            dialogVisible: false,
            email: "",
            password: "",
            errorPass: false,
            errorEmail: false,
            validatedPass: false,
            validatedEmail: false,
            errorPassVisible: false,
            errorEmailVisible: false,
        }
    }

    validateEmail() {
        return validate(this.state.email, "email")?true:false
    }

    validatePass() {
        return validate(this.state.password, "password")?true:false
    }

    onLoginPress() {
        if(!this.validateEmail()){
            this.setState({errorEmailVisible: true, errorEmail: true, validatedEmail: false})
        } else {
            this.setState({validatedEmail: true, errorEmail: false})
        }
        if(!this.validatePass()){
            this.setState({errorPass: true, errorPassVisible: true, validatedPass: false})
        } else {
            this.setState({validatedPass: true, errorPass: false})
        }
        if (this.validateEmail() && this.validatePass()) {
            Actions.home()
        }
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
                error={this.state.errorEmail}
                validated={this.state.validatedEmail}
                />
                <Dialog
                dialogTitle={<DialogTitle title="Error in Email!" />}
                visible={this.state.errorEmailVisible}
                onTouchOutside={() => {
                this.setState({ errorEmailVisible: false })
                }}
                footer={
                    <DialogFooter>
                      <DialogButton
                        text="CANCEL"
                        onPress={() => {this.setState({ errorEmailVisible: false })}}
                      />
                      <DialogButton
                        text="OK"
                        onPress={() => {this.setState({ errorEmailVisible: false })}}
                      />
                    </DialogFooter>
                  }
                >
                    <DialogContent>
                        <Text style={{marginTop: 10}}>This is not a valid Email.</Text>
                        <Text>Example: jhon.doe@gmail.com</Text>
                    </DialogContent>
                </Dialog>
                <TextInputWithIcon 
                onChangeText={(password) => this.setState({password})}
                icon="ios-lock" 
                placeholder="Password" 
                returnkeytype="send" 
                textcontenttype="password" 
                keyboardtype="default" 
                securetextentry={true}
                error={this.state.errorPass}
                validated={this.state.validatedPass}
                />
                <Dialog
                dialogTitle={<DialogTitle title="Error in Password!" />}
                visible={this.state.errorPassVisible}
                onTouchOutside={() => {
                this.setState({ errorPassVisible: false })
                }}
                footer={
                    <DialogFooter>
                      <DialogButton
                        text="CANCEL"
                        onPress={() => {this.setState({ errorPassVisible: false })}}
                      />
                      <DialogButton
                        text="OK"
                        onPress={() => {this.setState({ errorPassVisible: false })}}
                      />
                    </DialogFooter>
                  }
                >
                    <DialogContent>
                        <Text style={{marginTop: 10}}>This is not a valid Password.</Text>
                        <Text>Must contain atleast 1 lowercase character.</Text>
                        <Text>Must contain atleast 1 uppercase character.</Text>
                        <Text>Must contain atleast 1 number.</Text>
                        <Text>Must be atleast 8 characters long</Text>
                    </DialogContent>
                </Dialog>
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
                        <Text style={{width:"100%", fontSize:14, marginTop: 10}}>To Register:{"\n"} Please fill in your email-address and{"\n"} password in the corresponding input fields and {"\n"} press the "Get started !" button.</Text>
                        <Text style={{width:"100%", fontSize:14, marginTop: 10}}>To Sign in:{"\n"} Please press the "Already have an account button?" {"\n"} on the bottom of the screen.</Text>
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
    hideError: {
        display: "none"
    },
    showError: {
        display: "flex",
        color: "#FFF",
        fontSize: 14
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