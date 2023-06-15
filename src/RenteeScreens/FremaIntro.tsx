import { View, Text, Image, Dimensions, ScrollView, LogBox } from 'react-native'
import React, {useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const {width, height}: {width: number; height: number} = Dimensions.get('window')

const FremaIntro = () => {

  useEffect(() => {
    LogBox.ignoreLogs([
      " Sending `onAnimatedValueUpdate` with no listeners registered.",
      "Non-serializable values were found in the navigation state."
    ])
  },[])

  return (
    <View className='flex-1' style={{backgroundColor: "#FFFAF5"}}>
        <ScrollView showsVerticalScrollIndicator={false} className='mt-4 mx-5'>
          <View>
            <View className='flex-row items-center space-x-2 mb-2'>
              <AntDesign name="star" size={24} style={{color: '#e4c17a'}} />
              <Text className='text-xl font-bold'>Về chúng tôi</Text>
            </View>
            <Text className='mb-2'>FREMA là một start up tập trung vào thị trường bất động sản thương mại áp dụng công nghệ hiện đại với mục tiêu tạo dựng hệ sinh thái bất động sản cho thuê phục vụ cộng đồng</Text>
            <View className='flex-row items-center space-x-2 mb-4'>
              <AntDesign name="star" size={24} style={{color: '#e4c17a'}} />
              <Text className='text-xl font-bold'>Sứ mệnh</Text>
            </View>
            <Text className='font-semibold italic mb-4 text-center'>"Cam kết cống hiến, nâng cao chất lượng cuộc sống cộng đồng"</Text>
            <View className='flex-row items-center space-x-2 mb-4'>
              <AntDesign name="star" size={24} style={{color: '#e4c17a'}} />
              <Text className='text-xl font-bold'>Giá trị cốt lõi</Text>
            </View>
            <Text className='font-semibold italic mb-4 text-center'>"Chất lượng – Tin cậy – Kết nối"</Text>
          </View>

          <View>

            <View className='flex-row items-center space-x-2 mb-4'>
              <AntDesign name="star" size={24} style={{color: '#e4c17a'}} />
              <Text className='text-xl font-bold'> FREMA Founders</Text>
            </View>

            <View className="self-center mb-4">
              <View className="self-center mb-7">
                <Image 
                  source={require('../../assets/CEO.jpg')}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 9999,
                    alignSelf: 'center'
                  }}
                />
                <Text className='mt-2 font-semibold text-center'>Ngô Hải Dương</Text>
                <Text className='mt-2 font-semibold text-center'>Nhà sáng lập, Giám đốc điều hành</Text>
              </View>
              <View>
                <Image 
                    source={require('../../assets/CTO.jpg')}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 9999,
                      alignSelf: 'center'
                    }}
                  />
                  <Text className='mt-2 font-semibold text-center'>Ngô Minh Hoàn</Text>
                  <Text className='mt-2 font-semibold text-center'>Giám đốc công nghệ - tài chính</Text>
                </View>
            </View>
          </View>

          <View>
            <View className='flex-row items-center space-x-2 mb-4'>
              <AntDesign name="star" size={24} style={{color: '#e4c17a'}} />
              <Text className='text-xl font-bold'>Thông tin liên hệ</Text>
            </View>

            <View className='flex-row items-center space-x-3 mb-3'>
              <FontAwesome name="phone-square" size={34} color="black" />
              <Text className='text-lg'>0969893140 / 0562993086</Text>
            </View>

            <View className='flex-row items-center space-x-3 mb-3'>
              <MaterialCommunityIcons name="email" size={35} color="black" />
              <Text className='text-lg'>Fremabusiness@gmail.com</Text>
            </View>

            <View className='flex-row items-center space-x-3 mb-3'>
              <AntDesign name="facebook-square" size={34} color="black" />
              <Text className='text-lg'>FREMA Fanpage / FREMA Community</Text>
            </View>

            <View className='flex-row items-center space-x-3 mb-3'>
              <AntDesign name="customerservice" size={34} color="black" />
              <Text className='text-lg'>Facebook/FREMA-Community-Support</Text>
            </View>
          </View>

        </ScrollView>
    </View>
  )
}

export default FremaIntro