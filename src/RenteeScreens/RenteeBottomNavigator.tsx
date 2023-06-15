import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import RenteeHome from './RenteeHome';
import RenteeMessenger from './RenteeMessenger';
import RenteeProfile from './RenteeProfile';
import RenteeNotification from './RenteeNotification';
import RenteMap from './RenteMap';
import BlogScreen from './BlogScreen';
import { FontAwesome } from '@expo/vector-icons';

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
            return (
              <View className='items-center'>
                <MaterialCommunityIcons name="home-circle-outline" size={27} color={focused ? "#b48c3c" : 'gray'} />
                
              </View>
            )
          }
          if(route.name === 'RenteeMessenger') {
            return (
              <View className='items-center'>
                <Feather name="message-circle" size={27} color={focused ? "#b48c3c" : 'gray'} />
                
              </View>
            
            )
          }
          if(route.name === 'RenteeProfile') {
            return (
              <View className='items-center'>
                <Ionicons name="person-circle-outline" size={27} color={focused ? "#b48c3c" : 'gray'} />
                
              </View>
            ) 
          }
          if(route.name === 'RenteeMap') {
            return (
              <View className='items-center'>
                <Feather name="map-pin" size={24} color={focused ? "#b48c3c" : 'gray'} />
                
              </View>
            ) 
          }
          if(route.name === 'Blog') {
            return (
              <View className='items-center'>
                <FontAwesome name="pencil-square-o" size={24} color={focused ? "#b48c3c" : 'gray'} />
                
              </View>
            ) 
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
            name="RenteeMap"
            component={RenteMap}
        />
        <RenteeBottomStack.Screen 
            name="Blog"
            component={BlogScreen}
        />
        <RenteeBottomStack.Screen 
            name="RenteeMessenger"
            component={RenteeMessenger}
        />
        <RenteeBottomStack.Screen 
            name="RenteeProfile"
            component={RenteeProfile}
        />
    </RenteeBottomStack.Navigator>
  )
}

export default RenteeBottomNavigator