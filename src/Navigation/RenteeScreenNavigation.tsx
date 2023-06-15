import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RenteeBottomNavigator from '../RenteeScreens/RenteeBottomNavigator'
import DetailedRoomScreen from '../RenteeScreens/DetailedRoomScreen'
import RenteeNotification from '../RenteeScreens/RenteeNotification'
import SearchScreen from '../RenteeScreens/SearchScreen'
import CommentScreen from '../RenteeScreens/CommentScreen'
import SendMessage from '../RenteeScreens/SendMessage'
import RenteeTogether from '../RenteeScreens/RenteeTogether'
import TogetherRegister from '../RenteeScreens/TogetherRegister'
import Calender from '../RenteeScreens/Calender'
import FremaIntro from '../RenteeScreens/FremaIntro'
import FilterScreen from '../RenteeScreens/FilterScreen'

const RenteeStack = createStackNavigator()

const RenteeScreenNavigation = () => {
  return (
    <RenteeStack.Navigator>
        <RenteeStack.Group>
            <RenteeStack.Screen name="RenteeBottom" component={RenteeBottomNavigator} options={{headerShown: false}} />
        </RenteeStack.Group>
        <RenteeStack.Group>
            <RenteeStack.Screen name="RenteeNotification" component={RenteeNotification} options={{headerShown: false}} />
            <RenteeStack.Screen name="DetailedRoom" component={DetailedRoomScreen} options={{headerShown: false}} />
            <RenteeStack.Screen name="SearchScreen" component={SearchScreen} options={{headerShown: false}} />
            <RenteeStack.Screen name="Intro" component={FremaIntro } options={{headerShown: false}}  />
            <RenteeStack.Screen name="Filter" component={FilterScreen} options={{headerShown: false, presentation: 'modal'}} />
        </RenteeStack.Group>
        <RenteeStack.Group>
            <RenteeStack.Screen name="Comment" component={CommentScreen} options={{headerShown: false}} />
            <RenteeStack.Screen name="Send" component={SendMessage } options={{headerShown: false}} />
            <RenteeStack.Screen name="Together" component={RenteeTogether } options={{headerShown: false}} />
            <RenteeStack.Screen name="Register" component={TogetherRegister } options={{headerShown: false, presentation: 'modal'}}  />
            <RenteeStack.Screen name="Calender" component={Calender } options={{headerShown: false, presentation: 'modal'}}  />
        </RenteeStack.Group>
    </RenteeStack.Navigator>
  )
}

export default RenteeScreenNavigation