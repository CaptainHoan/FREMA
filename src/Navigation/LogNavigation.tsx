import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../LogScreen/Login';
import Signup from '../LogScreen/Signup';

const LogStack = createStackNavigator()

const LogNavigation = () => {
  return (
    <NavigationContainer>
        <LogStack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
            <LogStack.Screen name="Login" component={Login} />
            <LogStack.Screen name="SignUp" component={Signup} />
        </LogStack.Navigator>
    </NavigationContainer>
  )
}

export default LogNavigation