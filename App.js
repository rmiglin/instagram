import { StatusBar } from 'expo-status-bar'
import React from 'react'

import * as firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';

const firebaseConfig = {
  apiKey: "AIzaSyDG-F-CndYAbSwvBcCWrpbKChBfZHZ6cko",
  authDomain: "instagram-295b0.firebaseapp.com",
  projectId: "instagram-295b0",
  storageBucket: "instagram-295b0.appspot.com",
  messagingSenderId: "177970976728",
  appId: "1:177970976728:web:04afa8da76e8f7db0844ad",
  measurementId: "G-YZS8FWC64P"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator intitialRouteName="Landing">
        <Stack.Screen name="Landing" component={ LandingScreen } options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  )
}

