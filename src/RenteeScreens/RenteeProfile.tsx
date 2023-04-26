import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const RenteeProfile = () => {
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
          <Text className="font-bold text-lg">Hồ sơ của bạn</Text>
        </View>
        <Text className='text-transparent' >test of the</Text>
      </View>

      {/**profile avatar */}
      <TouchableOpacity className="mt-3 self-center relative">
        <Image 
          source={{uri: 'https://img.freepik.com/free-icon/user_318-159711.jpg'}}
          style={{width: 150, height: 150}}
        />
        <View className='absolute bottom-1 right-2 px-3 py-1 rounded-lg ' style={{backgroundColor: '#e4c36e'}}>
          <Text>Cấp</Text>
        </View>
      </TouchableOpacity>

      {/**profile name */}
      <View className='items-center mt-3'>
        <Text className='text-md font-semibold'>Ngo Hai Duong</Text>
      </View>
    </SafeAreaView>
  )
}

export default RenteeProfile