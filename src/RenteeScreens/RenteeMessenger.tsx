import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MessageScreen from './MessageScreen';
import WatingMessage from './WatingMessage';
import GroupMessage from './GroupMessage';
import { Feather } from '@expo/vector-icons';

const MessageTap = createMaterialTopTabNavigator()

const RenteeMessenger = () => {
  return (
   <SafeAreaView style={{ backgroundColor: "#FFFAF5", flex: 1}}>

    {/**header */}
      <View className=' items-center flex-row justify-between'>
        <View>
          <Image 
          source={require('../../assets/logo.png')}
          style={{width: 80, height: 50, resizeMode: 'cover'}}
        />
        </View>
        
        <View >
          <Text className="font-bold text-lg mr-8" style={{color: '#b48c3c'}}>TIN NHẮN</Text>
        </View>
        <View className=' mr-3'>
          <Feather name="search" size={24} color="black" />
        </View>
      </View>

    {/**Top Tap  */}
    <View className='flex-1'>
      <MessageTap.Navigator
        initialRouteName='Tin nhắn'
        
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#FFFAF5"
          },
          tabBarActiveTintColor: '#b48c3c',
          tabBarLabelStyle: {
            fontWeight: 'bold'
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#b48c3c'
          }
        }}  
      >
        <MessageTap.Screen name='Tin nhắn' component={MessageScreen} />
        <MessageTap.Screen name='Tin nhắn chờ' component={WatingMessage} />
        <MessageTap.Screen name='Tạo nhóm' component={GroupMessage} />
      </MessageTap.Navigator>
    </View>

   </SafeAreaView>
  )
}

export default RenteeMessenger