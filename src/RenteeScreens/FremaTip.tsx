import { View, Text, Image, Dimensions, ScrollView } from 'react-native'
import React from 'react'

const {width, height}: {width: number; height: number} = Dimensions.get('window')

const FremaTip = () => {
  return (
    <View className='flex-1' style={{backgroundColor: "#FFFAF5"}}>
      <ScrollView className='mt-4 mx-5' showsVerticalScrollIndicator={false}>
        <View className='flex-row items-center justify-between'>
          <Text className='text-xl font-bold mb-2'>Bài viết gần đây</Text>
          <View>
            <Text style={{color: 'grey'}}>Xem thêm</Text>
            <View style={{height: 1, backgroundColor: 'grey'}}></View>
          </View>
        </View>

        <View className='flex-row items-start p-2'
          style={{
            backgroundColor: '#f8efd5',
            borderRadius: 10
          }}
        >
          <Image  
            source={require('../../assets/huongdan.jpg')}
            style={{width: 120, height: 120}}
          />
          <View style={{ marginLeft: 20, width: width * 0.5}} className='space-y-2'>
            <Text className='font-bold' style={{fontSize: 18}}>Hướng dẫn sử dụng ứng dụng FREMA dành cho người bắt đầu </Text>
            <Text>Viết bởi FREMA</Text>
            <Text style={{color: 'grey', fontSize: 13}}>15 phút trước</Text>
          </View>
        </View>
        <View className='flex-row items-start p-2 mt-2'
          style={{
            backgroundColor: '#f8efd5',
            borderRadius: 10
          }}
        >
          <Image  
            source={require('../../assets/thietke.jpg')}
            style={{width: 120, height: 120}}
          />
          <View style={{ marginLeft: 20, width: width * 0.5}} className='space-y-2'>
            <Text className='font-bold' style={{fontSize: 18}}>Một số tip thiết kế phòng trọ đẹp dành cho sinh viên</Text>
            <Text>Viết bởi FREMA</Text>
            <Text style={{color: 'grey', fontSize: 13}}>1 tiếng trước</Text>
          </View>
          
        </View>
        <View className='flex-row items-start p-2 mt-2'
          style={{
            backgroundColor: '#f8efd5',
            borderRadius: 10
          }}
        >
          <Image  
            source={require('../../assets/tipthuenha.jpg')}
            style={{width: 120, height: 120}}
          />
          <View style={{ marginLeft: 20, width: width * 0.5}} className='space-y-2'>
            <Text className='font-bold' style={{fontSize: 18}}>Một số tip chọn phòng trọ giá rẻ cho các bạn sinh viên </Text>
            <Text>Viết bởi FREMA</Text>
            <Text style={{color: 'grey', fontSize: 13}}>2 tiếng trước</Text>
          </View>
          
        </View>
      </ScrollView>
    </View>
  )
}

export default FremaTip