import { View, Text,TouchableOpacity, SafeAreaView, Image, Dimensions, ScrollView} from 'react-native'
import React, { useState, useMemo } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { SliderBox } from 'react-native-image-slider-box'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const {width}: {width: number; height: number} = Dimensions.get('window')

const RenteeHome = () => {

  const  [houseInput, setHouseInput] = useState<string>('')

  const navigation = useNavigation()

  const [rooms, setRooms] = useState<[]>([])

  useMemo(() => 
    onSnapshot(query(collection(db, 'rooms'), orderBy('timestamp', 'desc')), (snapshot) => {
      const rooms = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setRooms(rooms);
    })
  ,[db])
  
  //console.log(rooms)

  return (
    <SafeAreaView className='flex-1' style={{backgroundColor: "#FFFAF5"}}>
      <View className=' items-center flex-row justify-between'>
        <View>
          <Image 
          source={require('../../assets/logo.png')}
          style={{width: 80, height: 50, resizeMode: 'cover'}}
        />
        </View>
        
        <View className="self-center mr-3">
          <Text className="font-bold text-xl text-center" style={{color: '#b48c3c'}}>FREMA</Text>
        </View>
        <View className='mr-3 flex-row items-center space-x-3'>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen', {
             houseInput,
             setHouseInput: setHouseInput
          })}>
            <Feather name="search" size={24} style={{color: '#b48c3c'}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RenteeNotification')}>
            <Ionicons name="notifications" size={24} style={{color: '#b48c3c'}} />
          </TouchableOpacity>
        </View>
      </View>

      {/**search function implementation */}


      {/**available options */}
      <ScrollView showsVerticalScrollIndicator={false} className="mt-3 mx-3 space-y-5">

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        className='space-x-4 h-35 w-full bg-transparent'
      >
        <TouchableOpacity className='justify-center items-center' style={{
          backgroundColor: '#f8efd5',
           height:100,
           width: 100,
           borderRadius: 15
        }}>
          <MaterialCommunityIcons name="map-marker-multiple" size={35} style={{color: '#b48c3c'}} />
          <View className=' self-center'>
            <Text className='font-semibold text-center'>Tìm phòng </Text>
            <Text className='font-semibold text-center'>quanh đây</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className='justify-center items-center' style={{
          backgroundColor: '#f8efd5',
           height:100,
           width: 100,
           borderRadius: 15
        }}>
          <MaterialCommunityIcons name="home-search" size={36} style={{color: '#b48c3c'}} />
          <View className=' self-center'>
            <Text className='font-semibold text-center'>Tìm phòng </Text>
            <Text className='font-semibold text-center'>nhanh</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className='justify-center items-center' style={{
          backgroundColor: '#f8efd5',
           height:100,
           width: 100,
           borderRadius: 15
        }}>
          <MaterialCommunityIcons name="account-key" size={36} style={{color: '#b48c3c'}} />
          <View className=' self-center'>
            <Text className='font-semibold text-center'>Nhượng </Text>
            <Text className='font-semibold text-center'>phòng</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className='justify-center items-center'
        style={{
          backgroundColor: '#f8efd5',
           height:100,
           width: 100,
           borderRadius: 15
        }}>
          <FontAwesome5 name="hands-helping" size={33} color="black" style={{color: '#b48c3c'}}/>
          <Text className='font-semibold text-center'>Dịch vụ</Text>
          <Text className='font-semibold text-center'>Tiện ích</Text>
        </TouchableOpacity>
      </ScrollView>

      {/**posts to rent rooms */}

        <View className='px-3 ml-3 py-1 bg-transparent rounded-full border-2 border-slate-800 mt-2' style={{alignSelf: 'center', alignItems: 'center'}}>
          <Text className="text-xl font-semibold">Tin nổi bật</Text>
        </View>
        
        
        {
          rooms.map((room, index) => (
            <TouchableOpacity 
              className="mx-3 pb-4 bg-white" 
              style={{
                flex: 1,
                borderRadius: 20,
                shadowOpacity: 0.2, 
                shadowOffset: {width: 5, height: 5}
              }}  
              key={index}
              onPress={() => navigation.navigate('DetailedRoom',{
                room_galary: room.room_galary,
                room_name: room.Name,
                room_location: room.Location,
                room_district: room.District,
                room_review: room.Review,
                room_star: room.Star,
                room_contact: room.Contact,
                room_price: room.price,
                room_floor: room.Floor,
                room_m2: room.M2,
                room_deposit: room.Deposit,
                room_max: room.Max,
                room_parking: room.Parking,
                room_electricity: room.electricity,
                room_internet: room.Internet,
                room_water: room.Water,
                room_service: room.Service,
                room_number: room.room_number,
                room_discount: room.Discount,
                room_id: room.Id,
                room_description: room.Description,
                room_reviews: room.reviews,
                room_nearby: room.Nearby,
                room_seen: room.Seen
              })}
            >
              <View >
                <SliderBox 
                  images={room.room_galary}
                  parentWidth={width * 0.885}
                  sliderBoxHeight={250} 
                  dotColor="#b48c3c"
                  ImageComponentStyle={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}
                />
              </View>   
                
              <View className="ml-2 mt-2">
                <Text className="text-2xl font-bold pr-3">{room.Name}</Text>
                <Text className='font-semibold text-slate-400'>{room.District} - {room.M2} m2 - {room.Max} người</Text>
                <Text className="text-orange-400 text-lg font-bold mt-2">{room.price} VNĐ</Text>
              </View>
            </TouchableOpacity>
          ))
        }
        
        
        
      </ScrollView>
       

    </SafeAreaView>
  )
}

export default RenteeHome