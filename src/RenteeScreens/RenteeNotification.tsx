import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';


const RenteeNotification = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className=' items-center flex-row justify-between'>
        <View>
          <Image 
          source={require('../../assets/logo.png')}
          style={{width: 80, height: 50, resizeMode: 'cover'}}
        />
        </View>
        
        <View >
          <Text className="font-bold text-xl" style={{color: '#b48c3c'}}>THÔNG BÁO</Text>
        </View>
        <Text className='text-transparent' >test of the</Text>
      </View>

      <ScrollView className='flex-1'>
        <TouchableOpacity className='mx-2 ml-4 mt-4 rounded-lg px-3 py-4' style={{backgroundColor: '#f8efd5'}}>
          <Text className='text-md font-semibold'> Chào mừng bạn đến với FREMA - ứng dụng quản lý bất  động sản cho thuê, nơi bạn có thể ổn định để vươn xa</Text>
        </TouchableOpacity>
        <TouchableOpacity className='mx-2 ml-4 mt-2 rounded-lg px-3 py-4' style={{backgroundColor: '#f8efd5'}}>
          <Text className='text-md font-semibold'> Nếu có bất kỳ thắc mắc gì hãy liên hệ với chúng tôi để biết được thông tin chi tiết</Text>
        </TouchableOpacity>
      </ScrollView>

      
      

    </SafeAreaView>
  )
}

export default RenteeNotification