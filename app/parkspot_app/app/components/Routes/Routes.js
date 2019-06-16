//React imports
import React, { Component } from 'react'
import {AsyncStorage} from 'react-native'
import {Router, Scene} from 'react-native-router-flux'

//Local imports
import LogInScreen from '../../views/LogInScreen'
import RegisterScreen from '../../views/RegisterScreen'
import HomeScreen from '../../views/HomeScreen'

/**
 * @class Routes
 * Routing for the app
 */
export default class Routes extends Component {
	/**
	 * @constructor
	 * @param {Object} props 
	 */
	constructor(props){
		super(props)
		this.state = {
			loggedIn: false
		}
	}

	/**
	 * @function componentWillMount
	 * Asynchronous function to check for a local storage key
	 * This happens in the life cycle when the component will mount
	 * We have chosen this life cycle to update it before the component actually renders
	 */
	async componentWillMount() {
		await this._retrieveDataFromAsyncStorage('userToken')
	}

	/**
	 * @function _retrieveDataFromAsyncStorage
	 * @param {String} key
	 * Asynchronous function to get a key out of the local storage
	 * @returns {false} if there is no key with that name
	 * @returns {Object} if there is a key with that name
	 */
	async _retrieveDataFromAsyncStorage(key) {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
			// We have data!!
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
	  
	/**
	 * @function render
	 * @returns The routing of the app used in the root component
	 * If a user is not logged in, show different routing.
	 */
	render() {
		//Check if a user is logged in or not
		if (this.state.loggedIn){
			return(
				<Router>
					<Scene key="root" hideNavBar>
						<Scene key="home" component={HomeScreen} title="Home" initial={true} />
						<Scene key="login" component={LogInScreen} title="Login" />
						<Scene key="register" component={RegisterScreen} title="Register"/>
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