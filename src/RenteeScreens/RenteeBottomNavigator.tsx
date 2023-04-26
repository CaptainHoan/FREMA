import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import RenteeHome from './RenteeHome';
import RenteeMessenger from './RenteeMessenger';
import RenteeProfile from './RenteeProfile';
import RenteeNotification from './RenteeNotification';

const RenteeBottomStack  = createBottomTabNavigator();

const RenteeBottomNavigator = () => {
  return (
    <RenteeBottomStack.Navigator 
    screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused}) => {
          if(route.name === 'RenteeHome') {
            return <Entypo name="home" size={27} color={focused ? "red" : 'gray'} />
          }
          if(route.name === 'RenteeMessenger') {
            return <MaterialIcons name="message" size={24} color={focused ? "red" : 'gray'} />
          }
          if(route.name === 'RenteeProfile') {
            return <AntDesign name="profile" size={24} color={focused ? "red" : 'gray'} />
          }
          if(route.name === 'RenteeNotification') {
            return <Ionicons name="notifications-outline" size={24} color={focused ? "red" : 'gray'} />
          }
        },
        title: () => null
      })}
      initialRouteName="Profile"
    >
        <RenteeBottomStack.Screen 
            name="RenteeHome"
            component={RenteeHome}
        />
        <RenteeBottomStack.Screen 
            name="RenteeMessenger"
            component={RenteeMessenger}
        />
        <RenteeBottomStack.Screen 
            name="RenteeNotification"
            component={RenteeNotification}
        />
        <RenteeBottomStack.Screen 
            name="RenteeProfile"
            component={RenteeProfile}
        />
    </RenteeBottomStack.Navigator>
  )
}

export default RenteeBottomNavigator