import { View, Text, Dimensions, Image, ScrollView, LogBox } from 'react-native'
import React, {useEffect} from 'react'

const {width, height}: {width: number; height: number} = Dimensions.get('window')

const Student = () => {

  useEffect(() => {
    LogBox.ignoreLogs([
      " Sending `onAnimatedValueUpdate` with no listeners registered.",
      "Non-serializable values were found in the navigation state."
    ])
  },[])

  return (
    <View className='flex-1' style={{backgroundColor: "#FFFAF5"}}>
      <ScrollView className='mt-4 mx-5' showsVerticalScrollIndicator={false}>
        <View className='flex-row items-center justify-between'>
          <Text className='text-xl font-bold mb-2'>Blog sinh viên</Text>
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
            source={require('../../assets/DaiNam.png')}
            style={{width: 120, height: 120}}
          />
          <View style={{ marginLeft: 20, width: width * 0.5}} className='space-y-2'>
            <Text className='font-bold' style={{fontSize: 18}}>Tuyển sinh Đại học Đại Nam 2023 Quản trị kinh doanh </Text>
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
            source={require('../../assets/svVN.jpg')}
            style={{width: 120, height: 120}}
          />
          <View style={{ marginLeft: 20, width: width * 0.5}} className='space-y-2'>
            <Text className='font-bold' style={{fontSize: 18}}>Sinh viên Việt Nam trong thời gian đi tìm trọ và những khó khăn</Text>
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
            source={require('../../assets/oghep.jpg')}
            style={{width: 120, height: 120}}
          />
          <View style={{ marginLeft: 20, width: width * 0.5}} className='space-y-2'>
            <Text className='font-bold' style={{fontSize: 18}}>Cải tạo phòng trọ đẹp như homestay chỉ với 3.000.000 đồng </Text>
            <Text>Viết bởi FREMA</Text>
            <Text style={{color: 'grey', fontSize: 13}}>2 tiếng trước</Text>
          </View>
          
        </View>
      </ScrollView>
    </View>
  )
}

export default Student