import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

const {width, height}: {width: number; height: number} = Dimensions.get('window')

const RenteeHome = () => {

  const  [houseInput, setHouseInput] = useState<string>('')

  return (
    <SafeAreaView className='flex-1'>
      <View className=' items-center flex-row justify-between'>
        <View>
          <Image 
          source={require('../../assets/logo.png')}
          style={{width: 80, height: 50, resizeMode: 'cover'}}
        />
        </View>
        
        <View >
          <Text className="font-bold text-lg">FREMA</Text>
        </View>
        <Text className='text-transparent' >test of the</Text>
      </View>

      {/**search function implementation */}

      <View className="flex-row items-center mx-2 space-x-2 mt-2">
        <View className='flex-row items-center'>
          <EvilIcons name="location" size={24} color="red" />
          <TouchableOpacity>
            <Text className="text-md">Hà Nội</Text>
          </TouchableOpacity>
        </View>
        <View className='flex-1'>
          <View className="border-2 border-slate-900 p-2 rounded-2xl">
            <TextInput 
              placeholder='Tìm kiếm quận, huyện'
              placeholderTextColor={'gray'}
              value={houseInput}
              onChangeText={value => setHouseInput(value)}
            />
          </View>
        </View>
      </View>

      {/**available options */}

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        className='space-x-3 mt-2 h-40 w-full bg-transparent'
      >
        <View className='justify-center items-center'>
          <Image 
            source={require('../../assets/timphongquanhday.png')}
            style={{resizeMode: 'contain', width: 60, height: 60, }}
          />
          <Text>Tìm phòng quanh đây</Text>
        </View>
        <View className='justify-center items-center'>
          <Image 
            source={require('../../assets/binhnuoc.jpg')}
            style={{resizeMode: 'contain', width: 60, height: 60, }}
          />
          <Text>Đổi bình nước</Text>
        </View>
        <View className='justify-center items-center'>
          <Image 
            source={require('../../assets/binhgas.jpg')}
            style={{resizeMode: 'contain', width: 60, height: 60, }}
          />
          <Text>Đổi bình gas</Text>
        </View>
        <View className='justify-center items-center'>
          <Image 
            source={require('../../assets/giatla.jpg')}
            style={{resizeMode: 'contain', width: 60, height: 60, }}
          />
          <Text>Giặt là</Text>
        </View>
        <View className='justify-center items-center'>
          <Image 
            source={require('../../assets/suadiennuoc.png')}
            style={{resizeMode: 'contain', width: 60, height: 60, }}
          />
          <Text>sửa chữa điện nước</Text>
        </View>
      </ScrollView>

      {/**posts to rent rooms */}
      <ScrollView showsVerticalScrollIndicator={false} className="mt-3 mx-3 space-y-5">
        <Text className="text-2xl font-semibold">Bài đăng</Text>
        <View className="mt-2 flex-row space-x-3">
          <View>
            <Image 
              source={require('../../assets/canhochothue.jpg')}
              style={{width: 120, height: 120, resizeMode: 'cover'}}
            />
          </View>
          <View>
            <Text>Phòng 1 phòng ngủ, 1 bếp, 1 nhà vệ sinh, diện tích 30m2 </Text>
            <Text>Tối đa 2 người</Text>
            <Text>Giá tiền: 3 triệu</Text>
            <Text>275 Nguyễn Trãi, sảnh B tòa nhà Hoàng Huy, Thanh Xuân, Hà Nội</Text> 
          </View>
        </View>
        <View className='mt-2 flex-row space-x-3'>
          <View>
            <Image 
              source={require('../../assets/canhochothue.jpg')}
              style={{width: 120, height: 120, resizeMode: 'cover'}}
            />
          </View>
          <View>
            <Text>Phòng 1 phòng ngủ, 1 bếp, 1 nhà vệ sinh, diện tích 30m2 </Text>
            <Text>Tối đa 2 người</Text>
            <Text>Giá tiền: 3 triệu</Text>
            <Text>275 Nguyễn Trãi, sảnh B tòa nhà Hoàng Huy, Thanh Xuân, Hà Nội</Text> 
          </View>
        </View>
        <View className='mt-2 flex-row space-x-3'>
          <View>
            <Image 
              source={require('../../assets/canhochothue.jpg')}
              style={{width: 120, height: 120, resizeMode: 'cover'}}
            />
          </View>
          <View>
            <Text>Phòng 1 phòng ngủ, 1 bếp, 1 nhà vệ sinh, diện tích 30m2 </Text>
            <Text>Tối đa 2 người</Text>
            <Text>Giá tiền: 3 triệu</Text>
            <Text>275 Nguyễn Trãi, sảnh B tòa nhà Hoàng Huy, Thanh Xuân, Hà Nội</Text> 
          </View>
        </View>
        <View className='mt-2 flex-row space-x-3'>
          <View>
            <Image 
              source={require('../../assets/canhochothue.jpg')}
              style={{width: 120, height: 120, resizeMode: 'cover'}}
            />
          </View>
          <View>
            <Text>Phòng 1 phòng ngủ, 1 bếp, 1 nhà vệ sinh, diện tích 30m2 </Text>
            <Text>Tối đa 2 người</Text>
            <Text>Giá tiền: 3 triệu</Text>
            <Text>275 Nguyễn Trãi, sảnh B tòa nhà Hoàng Huy, Thanh Xuân, Hà Nội</Text> 
          </View>
        </View>
      </ScrollView>
       

    </SafeAreaView>
  )
}

export default RenteeHome