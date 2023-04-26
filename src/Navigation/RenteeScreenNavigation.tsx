import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RenteeBottomNavigator from '../RenteeScreens/RenteeBottomNavigator'

const RenteeStack = createStackNavigator()

const RenteeScreenNavigation = () => {
  return (
    <RenteeStack.Navigator>
        <RenteeStack.Group>
            <RenteeStack.Screen name="RenteeBottom" component={RenteeBottomNavigator} options={{headerShown: false}} />
        </RenteeStack.Group>
    </RenteeStack.Navigator>
  )
}

export default RenteeScreenNavigation