//React imports
import React, { Component } from 'react'
import { View, Text, Image, StyleSheet,TouchableOpacity, AsyncStorage} from 'react-native'
import { Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import Dialog, { DialogContent, DialogFooter,DialogButton, DialogTitle } from 'react-native-popup-dialog'
import { HOSTNAME, PORT } from 'react-native-dotenv'

//Local imports
import TextInputWithIcon from '../components/TextInputWithIcon'
import validate from '../components/Validation/Validate'

/**
 * @class RegisterForm
 * Styling and functionality for the register form
 */
export default class RegisterForm extends Component {
    /**
     * @constructor
     * @param {Object} props 
     */
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
            errorEmailInUse: false
        }
    }

    /**
     * @function checkEmailInDatabase
     * Asynchronous function to check if the data passed on from the user is already in the database
     * If the data matches from 1 in the database set state of EmailInUse
     */
    async checkEmailInDatabase() {
        let {email} = this.state
        this.setState({errorEmailInUse: false})
        const url = `http://${HOSTNAME}:${PORT}/api/v1/users`
        await fetch(url)
        .then(response => 
            response.json()
            .then(data => {
                data.forEach(element => {
                    if(element.email == email){
                        this.setState({errorEmailInUse: true})
                    }
                }) 
            })
        ).catch(error => {
            console.error(error)
        })
        
        
    }

    /**
     * @function postUserToDatabase
     * Asynchronous function to post the user that was just created to the user database
     */
    async postUserToDatabase() {
        const url = `http://${HOSTNAME}:${PORT}/api/v1/users`
        var data = {
            email: this.state.email,
            password: this.state.password
        }
        
        await fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error))
    }

    /**
     * @function postUserToAuthentication
     * Asynchronous function to post the user that was just created to the authentication in the database
     * If the post request was succesfull store the value in the AsyncStorage with the response token from the API
     */
    async postUserToAuthentication(){
        const url = `http://${HOSTNAME}:${PORT}/api/v1/login/local`
        var data = {
            email: this.state.email,
            password: this.state.password
        }
        
        await fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(response => {
            console.log('Success:', JSON.stringify(response))
            console.log('Token:', response.token)
            this._postDataToAsyncStorage('userToken', response.token)
            this._postDataToAsyncStorage('email', response.email)
        })
        .catch(error => console.error('Error:', error))
    }

    /**
     * @function validateEmail
     * Validation of the email that was given from the user
     * @returns {boolean}
     */
    validateEmail() {
        return validate(this.state.email, "email")?true:false
    }
    /**
     * @function validatePass
     * Validation of the pass that was given from the user
     * @returns {boolean}
     */
    validatePass() {
        return validate(this.state.password, "password")?true:false
    }

    /**
     * @function
     * Asynchronous function that handles the button press to log in
     */
    async onLoginPress() {
        //First check if there is an email that is in the database with the user input
        await this.checkEmailInDatabase()
        //Check if user is already in use
        if(this.state.errorEmailInUse){
            return this.setState({errorEmail: true, validatedEmail: false})
        //validate email
        } else if (!this.validateEmail()){
            return this.setState({errorEmailVisible: true, errorEmail: true, validatedEmail: false})
        } else {
            this.setState({validatedEmail: true, errorEmail: false})
        }
        //validate pass
        if(!this.validatePass()){
            return this.setState({errorPass: true, errorPassVisible: true, validatedPass: false})
        } else {
            this.setState({validatedPass: true, errorPass: false})
        }
        //If everything passes post user to database and authentication and go to Home Screen
        if (this.validateEmail() && this.validatePass() && !this.state.errorEmailInUse) {
            await this.postUserToDatabase()
            await this.postUserToAuthentication()
            Actions.home()
        }
    }

    /**
     * @function _postDataToAsyncStorage
     * @param {String} key 
     * @param {String} value 
     * Posts a key with a certain value to the AsyuncStorage
     */
    async _postDataToAsyncStorage (key, value) {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * @function _retrieveDataFromAsyncStorage
     * @param {String} key 
     * Will check if there is a key in the AsyncStorage
     */
    async _retrieveDataFromAsyncStorage(key) {
        try {
          const value = await AsyncStorage.getItem(key)
          if (value !== null) {
            // We have data!!
            console.log(value);
          } else {
              console.log('no value')
          }
        } catch (error) {
          // Error retrieving data
          console.error(error)
        }
      }

      /**
       * @function render
       * @returns View of the Register Form
       */
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
                <Dialog
                dialogTitle={<DialogTitle title="Error: Email is already in use!" />}
                visible={this.state.errorEmailInUse}
                onTouchOutside={() => {
                this.setState({ errorEmailInUse: false })
                }}
                footer={
                    <DialogFooter>
                      <DialogButton
                        text="CANCEL"
                        onPress={() => {this.setState({ errorEmailInUse: false })}}
                      />
                      <DialogButton
                        text="OK"
                        onPress={() => {this.setState({ errorEmailInUse: false })}}
                      />
                    </DialogFooter>
                  }
                >
                    <DialogContent>
                        <Text style={{marginTop: 10}}>This Email is already in use.</Text>
                        <Text>Please use a different email address.</Text>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        )
    }
}

/**
 * @type {StyleSheet}
 * Declaration of all the styles needed to style the register form
 */
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