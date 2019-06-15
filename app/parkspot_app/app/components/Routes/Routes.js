import React, { Component } from 'react'
import {Router, Scene} from 'react-native-router-flux'

import LogInScreen from '../../views/LogInScreen'
import RegisterScreen from '../../views/RegisterScreen'
import HomeScreen from '../../views/HomeScreen'

export default class Routes extends Component {
	render() {
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