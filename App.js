import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'

import { View, Text } from 'react-native'
import * as firebase from 'firebase'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
	apiKey: "AIzaSyDG-F-CndYAbSwvBcCWrpbKChBfZHZ6cko",
	authDomain: "instagram-295b0.firebaseapp.com",
	projectId: "instagram-295b0",
	storageBucket: "instagram-295b0.appspot.com",
	messagingSenderId: "177970976728",
	appId: "1:177970976728:web:04afa8da76e8f7db0844ad",
	measurementId: "G-YZS8FWC64P"
};

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'


if(firebase.apps.length === 0){
  	firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();

export class App extends Component {
  	constructor(props){
    	super(props);
    	this.state = {
      		loaded: false
    	}
  	}

  	componentDidMount(){
    	firebase.auth().onAuthStateChanged((user) => {
      	if(!user){
        	this.setState({
          		loggedIn: false,
          		loaded: true,
        	})
      	} else {
        	this.setState({
          		loggedIn: true,
          		loaded: true,
        	})
      	}})
  	}

  	render() {
		const { loggedIn, loaded } = this.state;
    	if(!loaded){
      		return(
        		<View style={{ flex: 1, justifyContent: 'center' }}>
          			<Text>Loading</Text>
        		</View>
      		)
    	}
    	if(!loggedIn){
      		return (
        		<NavigationContainer>
          			<Stack.Navigator intitialRouteName="Landing">
            			<Stack.Screen name="Landing" component={ LandingScreen } options={{ headerShown: false}}/>
            			<Stack.Screen name="Register" component={RegisterScreen}/>
						<Stack.Screen name="Login" component={LoginScreen}/>
          			</Stack.Navigator>
        		</NavigationContainer>
      		)
    	}

    	return (
			<Provider store = { store }>
				<NavigationContainer>
					<Stack.Navigator intitialRouteName="Main">
            			<Stack.Screen name="Main" component={ MainScreen } options={{ headerShown: false}}/>
						<Stack.Screen name="Add" component={ AddScreen } navigation={this.props.navigation}/>
						<Stack.Screen name="Save" component={ SaveScreen } navigation={this.props.navigation}/>
          			</Stack.Navigator>
				</NavigationContainer>
			</Provider>
    	)
  	}
}

export default App

