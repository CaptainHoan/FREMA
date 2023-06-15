import { View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity, ScrollView, Animated, LogBox } from 'react-native'
import React, {useRef, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MessageScreen from './MessageScreen';
import WatingMessage from './WatingMessage';
import GroupMessage from './GroupMessage';
import FremaIntro from './FremaIntro';
import FremaTip from './FremaTip';
import Student from './Student';

const {width, height}: {width: number; height: number} = Dimensions.get('window')


const BlogTap = createMaterialTopTabNavigator()

const BlogScreen = () => {


  const navigation = useNavigation()

  useEffect(() => {
    LogBox.ignoreLogs([
      " Sending `onAnimatedValueUpdate` with no listeners registered.",
      "Non-serializable values were found in the navigation state."
    ])
  },[])

  return (
    <View className='flex-1' style={{backgroundColor: "#FFFAF5"}}>
     <View className=''>
      <Image 
        source={require('../../assets/man4.png')}
        style={{width: width, height: 200}}
      />
     </View>

      <BlogTap.Navigator
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
        <BlogTap.Screen name='Blog sinh viên' component={Student} />
        <BlogTap.Screen name='Tip thuê phòng' component={FremaTip} />
        <BlogTap.Screen name='Giới thiệu' component={FremaIntro} />
      </BlogTap.Navigator>

    </View>
  )
}

export default BlogScreen