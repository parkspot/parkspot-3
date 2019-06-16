//React imports
import React, { Component } from 'react'
import { View, Text, Image, StyleSheet,TouchableOpacity, AsyncStorage} from 'react-native'
import { Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import Dialog, { DialogContent, DialogFooter,DialogButton, DialogTitle } from 'react-native-popup-dialog'
import { HOSTNAME, PORT } from 'react-native-dotenv'

//Local imports
import TextInputWithIcon from '../components/TextInputWithIcon'

/**
 * @class LoginForm
 * Styling of the log in form with functionality
 */
export default class LoginForm extends Component {

    /**
     * @constructor
     * @param {Object} props 
     */
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            dialogVisible: false,
            errorPass: false,
            errorEmail: false,
            EmailInUse: false,
            errorPassVisible: false,
            errorEmailVisible: false,
        }
    }

    /**
     * @function checkEmailInDatabase
     * Asynchronous function to check if the data passed on from the user is already in the database
     * If the data matches from 1 in the database set state of EmailInUse
     */
    async checkEmailInDatabase() {
        let {email} = this.state
        this.setState({EmailInUse: false})
        const url = `http://${HOSTNAME}:${PORT}/api/v1/users`
        await fetch(url)
        .then(response => 
            response.json()
            .then(data => {
                data.forEach(element => {
                    if(element.email == email){
                        this.setState({EmailInUse: true})
                    }
                }) 
            })
        ).catch(error => {
            console.error(error)
        })
    }

    /**
     * @function postUserToAuthentication
     * Asynchronous function to post the user to the authentication in the database
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
            this._postDataToAsyncStorage('userToken', response.token)
            this._postDataToAsyncStorage('email', response.email)
            this._postDataToAsyncStorage('userId', response.userId)
        })
        .catch(error => {
            this.setState({errorPassVisible: true})

        })
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
          } else {
              console.log('no value')
          }
        } catch (error) {
          // Error retrieving data
          console.error(error)
        }
      }

    /**
     * @function
     * Asynchronous function that handles the button press to log in
     */
    async onLoginPress() {
        //First check if there is an email that is in the database with the user input
        await this.checkEmailInDatabase()
        if(this.state.EmailInUse){
            this.setState({errorEmail: false})
            //Post user to authentication
            await this.postUserToAuthentication()
            if (this._retrieveDataFromAsyncStorage('userToken')){
                Actions.home()
            }
        } else {
            this.setState({errorEmailVisible: true, errorEmail: true})
        }
    }

    /**
     * @function render
     * @returns View of the log in form
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
                validated={false}
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
                <Text style={{marginTop: 10}}>This is Email is not used.         </Text>
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
                error={this.state.errorPassword}
                validated={false}
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
                <Text style={{marginTop: 10}}>The password you used was wrong.    </Text>
                </DialogContent>
                </Dialog>
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

/**
 * @type {StyleSheet}
 * Declaration of all the styles needed to style the log in form
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