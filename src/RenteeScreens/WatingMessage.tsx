import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const WatingMessage = () => {
  return (
    <View className='flex-1 items-center pt-10 px-10' style={{backgroundColor: '#FFFAF5'}}>
      <Text className='text-xl font-semibold ' style={{color: 'grey'}}>Hiện tại bạn không có tin nhắn chờ nào</Text>
    </View>
  )
}

export default WatingMessage