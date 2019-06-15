import React, { Component } from 'react'
import {AsyncStorage} from 'react-native'
import {Router, Scene} from 'react-native-router-flux'

import LogInScreen from '../../views/LogInScreen'
import RegisterScreen from '../../views/RegisterScreen'
import HomeScreen from '../../views/HomeScreen'

export default class Routes extends Component {
	constructor(props){
		super(props)
		this.state = {
			loggedIn: false
		}
	}
	async componentWillMount() {
		await this._retrieveDataFromAsyncStorage('userToken')
	}
	async _retrieveDataFromAsyncStorage(key) {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
			// We have data!!
			console.log(value)
            return this.setState({loggedIn: true})
          } else {
			  console.log('no value')
              return false
          }
        } catch (error) {
          // Error retrieving data
          console.error(error)
        }
      }
	render() {
		if (this.state.loggedIn){
			return(
				<Router>
					<Scene key="root" hideNavBar>
						<Scene key="home" component={HomeScreen} title="Home" />
					</Scene>
				 </Router>
				)
		} else {
			return(
				<Router>
					<Scene key="root" hideNavBar>
						<Scene key="login" component={LogInScreen} title="Login" initial={true}/>
						<Scene key="register" component={RegisterScreen} title="Register"/>
						<Scene key="home" component={HomeScreen} title="Home" />
					</Scene>
				</Router>
			)
		}
	}
}