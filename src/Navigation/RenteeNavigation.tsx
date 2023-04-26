import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RenteeScreenNavigation from './RenteeScreenNavigation';

const RenteeNavigation = () => {
  return (
    <NavigationContainer>
        <RenteeScreenNavigation />
    </NavigationContainer>

  )
}

export default RenteeNavigation