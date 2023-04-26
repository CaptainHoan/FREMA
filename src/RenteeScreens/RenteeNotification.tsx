import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';


const RenteeNotification = () => {
  return (
    <SafeAreaView>
      <View className=' items-center flex-row justify-between'>
        <View>
          <Image 
          source={require('../../assets/logo.png')}
          style={{width: 80, height: 50, resizeMode: 'cover'}}
        />
        </View>
        
        <View >
          <Text className="font-bold text-lg">Thông báo</Text>
        </View>
        <Text className='text-transparent' >test of the</Text>
      </View>

      <View className='mx-2 ml-4 mt-4 bg-slate-400 rounded-lg px-3 py-4'>
        <Text className='text-md font-semibold'> Chào mừng bạn đến với FREMA - ứng dụng quản lý bất  động sản cho thuê, nơi bạn có thể ổn định để vươn xa</Text>
      </View>
      <View className='mx-2 ml-4 mt-2 bg-slate-400 rounded-lg px-3 py-4'>
        <Text className='text-md font-semibold'> Nếu có bất kỳ thắc mắc gì hãy liên hệ với chúng tôi để biết được thông tin chi tiết</Text>
      </View>
      

    </SafeAreaView>
  )
}

export default RenteeNotification