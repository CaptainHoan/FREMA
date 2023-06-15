import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'

const GroupMessage = () => {
  return (
    <View className='flex-1' style={{backgroundColor: '#FFFAF5'}}>
      <View className='items-center pt-5'>
        <AnimatedLottieView
          autoPlay 
          style={{
            width: 250,
            height: 250,                         
          }}
          source={require('../../assets/group.json')}
        />
      </View>
      <TouchableOpacity>
        <Text className='text-xl text-center font-semibold' style={{color: 'grey'}}>Tạo nhóm để nhắn tin</Text>
      </TouchableOpacity>
      
    </View>
  )
}

export default GroupMessage