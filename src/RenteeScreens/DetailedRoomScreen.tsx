import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image, Share, Alert } from 'react-native'
import React, { useMemo, useState, useCallback } from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import { AntDesign, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot} from 'firebase/firestore';
import { db } from '../../firebase';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Modal, ModalContent, ScaleAnimation, ModalFooter, ModalButton } from 'react-native-modals';
import {Calendar, CalendarUtils, LocaleConfig} from 'react-native-calendars';
import ImageView from "react-native-image-viewing";

const {width, height}: {width: number; height: number} = Dimensions.get('window')

LocaleConfig.locales['vi'] = {
    monthNames: [
      'tháng 1',
      'tháng 2',
      'tháng 3',
      'tháng 4',
      'tháng 5',
      'tháng 6',
      'tháng 7',
      'tháng 8',
      'tháng 9',
      'tháng 10',
      'tháng 11',
      'tháng 12'
    ],
    monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 6', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
    dayNamesShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    today: "Hôm nay"
  };
  
  LocaleConfig.defaultLocale = 'vi';

const getDate = (count: number) => {
    const date = new Date();
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
};

const INITIAL_DATE = getDate(0);

const DetailedRoomScreen = ({
    route
}: any) => {

    const {
        room_galary,
        room_name,
        room_location,
        room_district,
        room_review,
        room_star,
        room_price,
        room_floor,
        room_m2,
        room_deposit,
        room_max,
        room_electricity,
        room_internet,
        room_water,
        room_service,
        room_number,
        room_discount,
        room_id,
        room_contact,
        room_description,
        room_reviews,
        room_nearby,
        room_seen
    } = route.params

    const [host,setHost] = useState([])

    useMemo(() => 
        onSnapshot(collection(db, 'hosts'), (snapshot) => {
            const room = snapshot.docs.filter(doc => doc.data().roomId.includes(room_id)).map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setHost(room)
        })
    , [db])

    const navigation = useNavigation()

    const callHost = async() => {
        try {
           await Linking.openURL(`tel:// ${room_contact}`)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const [isVisible, setIsVisible] = useState(false)

    const [selected, setSelected] = useState(INITIAL_DATE);

      const onDayPress = useCallback((day) => {
        setSelected(day.dateString);
      }, []);

      const marked = useMemo(() => {
        return {
          [getDate(0)]: {
            dotColor: 'black',
            marked: true
          },
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'orange',
            selectedTextColor: 'black'
          }
        };
      }, [selected]);

      const [isDate, setIsDate] = useState(false)
      const [visible, setVisible] = useState(false)
      const [seen, setSeen] = useState(false)

      const images = [
        {
          uri: room_galary[0],
        },
        {
          uri: room_galary[1],
        },
        {
          uri: room_galary[2],
        },
        {
            uri: room_galary[3],
        },
        {
            uri: room_galary[4],
        },
      ];

      const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'Chia sẻ cho bạn bè phòng mà bạn ưng ý',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error: any) {
          Alert.alert(error.message);
        }
      };

  return (
    <View className='flex-1' style={{backgroundColor: '#FFFAF5'}}>
        {/**pictures of the room */}
        <View>

                <SliderBox
                    images={room_galary}
                    sliderBoxHeight={250}
                />
                
                <TouchableOpacity className='absolute top-8 left-5 p-1 rounded-full bg-white' style={{borderWidth: 0}} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-sharp" size={18} color="black" />
                </TouchableOpacity>
                <View className="flex-row items-center absolute right-5 top-8 space-x-4">
                    <View className="p-1 rounded-full bg-white " style={{borderWidth: 0, backgroundColor: seen === false ? 'transparent' : 'white'}}>
                        <Text className='font-bold' style={{fontSize: 10, color: seen === false ? 'transparent' : 'black'}}>{room_seen} lượt xem</Text>
                    </View>
                    <TouchableOpacity className="p-1 rounded-full bg-white " style={{borderWidth: 0}} onPress={() => setSeen(!seen)}>
                        <AntDesign name="eyeo" size={18} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-1 rounded-full bg-white " style={{borderWidth: 0}} onPress={onShare}>
                        <AntDesign name="sharealt" size={18} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-1 rounded-full bg-white " style={{borderWidth: 0}} onPress={() => setVisible(!visible)}>
                        <Ionicons name="camera-reverse-outline" size={18} color="black" />
                    </TouchableOpacity>    
                </View>
                <ImageView
                    images={images}
                    imageIndex={0}
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                />
        </View>


        <ScrollView showsVerticalScrollIndicator={false} className=''>

            <View className='mt-2 flex-row items-center justify-between mx-5 mb-2'>
                <Text className="text-3xl font-bold" style={{width: width * 0.75}}>
                    {room_name}
                </Text>
                <View className="mr-2">
                    <MaterialCommunityIcons name="star-circle-outline" size={30} color="orange" />
                </View>
            </View>

            <View className="mt-0 space-y-1 mx-5" style={{width: width *0.85}}>
                <Text className='font-semibold'>{room_location}, {room_district} <Text style={{fontSize: 10, marginBottom:3}}>- xem trên bản đồ</Text> </Text>
            </View>

            <View className='flex-row items-end mt-1 mx-5'>
                <AntDesign name="star" size={15} color="black" />
                <View>
                    <View className='flex-row items-center'>    
                        <Text className='font-bold' style={{fontSize: 12}}>{room_star} - </Text>
                        <View>
                            <Text className="font-bold" style={{fontSize: 12}}>{room_review} đánh giá</Text>
                            <View style={{height: 1, backgroundColor: 'black', marginTop: -2}}></View>
                        </View>                  
                    </View>
                </View>
            </View>

            <View className="flex-row items-center justify-around mt-5 mx-2">
                <TouchableOpacity 
                    className="p-2 " 
                    style={{borderWidth: 0, borderColor: 'black', 
                        borderRadius: 10,
                        backgroundColor: '#e4c17a',
                        alignItems: 'center',
                        width: 100
                      }}
                    onPress={() => navigation.navigate('Comment', {
                        room_name: room_name, 
                        room_location: room_location,
                        room_district: room_district,
                        room_id: room_id
                    })}
                >
                    <Text className="font-semibold" style={{fontSize: 15}}>Trao đổi</Text>
                    <Text className="font-semibold" style={{fontSize: 15}}>cộng đồng</Text>
                </TouchableOpacity>
               
                <TouchableOpacity className="p-2 " 
                        style={{
                            borderWidth: 0, 
                            borderColor: 'black',
                            borderRadius: 10,  
                            backgroundColor: '#e4c17a',
                            alignItems: 'center',
                            width: 100
                        }}
                        onPress={() => navigation.navigate('Together', {
                            room_id: room_id
                        })}
                    >
                        <Text className="font-semibold" style={{fontSize: 15}}> Đăng ký</Text>
                        <Text className="font-semibold" style={{fontSize: 15}}> ở ghép</Text>
                </TouchableOpacity>
                <View className=''>
                    <TouchableOpacity 
                            className="p-2 " 
                            style={{
                                borderWidth: 0, 
                                borderColor: 'black',
                                borderRadius: 10,
                                backgroundColor: '#e4c17a',
                                alignItems: 'center',
                                width: 100
                            }}
                            onPress={() => setIsVisible(true)}
                        >
                            <Text className="font-semibold" style={{fontSize: 15}}>Đặt lịch</Text>
                            <Text className="font-semibold" style={{fontSize: 15}}>xem phòng</Text>
                    </TouchableOpacity>
                    <Modal
                        visible={isVisible}
                        onTouchOutside={() => setIsVisible(false)}
                        modalAnimation={new ScaleAnimation({
                            initialValue: 0, // optional
                            useNativeDriver: true, // optional
                          })}
                          footer={
                            <ModalFooter>
                              <ModalButton
                                text="Thoát"
                                onPress={() => setIsVisible(false)}
                                textStyle={{
                                    color: '#b48c3c'
                                }}
                              />
                              <ModalButton
                                text="Đặt lịch"
                                onPress={() => {
                                    setIsVisible(false)
                                    setIsDate(true)
                                }}
                                textStyle={{
                                    color: '#b48c3c'
                                }}
                              />
                            </ModalFooter>
                          }
                    >
                        <ModalContent>
                            <Calendar
                            style={{
                                height: 320,
                                width: width * 0.8
                            }}
                                current={INITIAL_DATE}
                                onDayPress={onDayPress}
                                markedDates={marked}
                                />
                            </ModalContent>
                    </Modal>
                </View>
                
                
            </View>

            <View style={{height: 5, backgroundColor: '#f8efd5'}} className='mt-6 mb-3'></View>

            <View className='flex-row items-center justify-between mx-5 mt-3 mb-3'>
                <View className='justify-center items-center'>
                    <Text className='font-semibold mb-2' style={{fontSize: 10}}>TẨNG</Text>
                    <Text style={{color: '#b48c3c'}} className='font-bold'>{room_floor}</Text>
                </View>
                {room_number && (
                    <View className='justify-center items-center'>
                        <Text className='font-semibold mb-2' style={{fontSize: 10}}>SỐ PHÒNG</Text>
                        <Text style={{color: '#b48c3c'}} className='font-bold'>{room_number}</Text>
                    </View>
                )}
                <View className='justify-center items-center'>
                    <Text className='font-semibold mb-2' style={{fontSize: 10}}>DIỆN TÍCH</Text>
                    <Text style={{color: '#b48c3c'}} className='font-bold'>{room_m2} m2</Text>
                </View>
                <View className='justify-center items-center'>
                    <Text className='font-semibold mb-2' style={{fontSize: 10}}>SỐ NGƯỜI</Text>
                    <Text style={{color: '#b48c3c'}} className='font-bold'>{room_max}</Text>
                </View>
                <View className='justify-center items-center'>
                    <Text className='font-semibold mb-2' style={{fontSize: 10}}>ĐĂT CỌC</Text>
                    <Text style={{color: '#b48c3c'}} className='font-bold'>{room_deposit}</Text>
                </View>
            </View>

            <View style={{height: 5, backgroundColor: '#f8efd5'}} className='mt-3 mb-3'></View>

            {/** Phí dịch vụ */}
            <View className='mx-2 mt-3 mb-3'>
                <Text className="ml-2 font-semibold text-lg">Thông số điện nước:</Text>
                <View className='mt-2 flex-row items-center justify-between mx-3 space-y-3'>
                    <View className='mt-2 flex-row items-center space-x-1'>
                        <Text className='font-semibold' style={{fontSize: 10}}>ĐIỆN:</Text>
                        <Text className='font-semibold' style={{fontSize: 10, color: '#b48c3c'}}>{room_electricity}vnđ/kwh</Text>
                    </View>
                    <View className='mt-2 flex-row items-center space-x-1'>
                        <Text className='font-semibold' style={{fontSize: 10}}>NƯỚC:</Text>
                        <Text className='font-semibold' style={{fontSize: 10, color: '#b48c3c'}}>{room_water}vnđ/m3</Text>
                    </View>
                </View>
                
                <View className='mt-2 flex-row items-center justify-between mx-3 space-y-3'>
                    <View className='mt-2 flex-row items-center space-x-1'>
                        <Text className='font-semibold ' style={{fontSize: 10}}>MẠNG:</Text>
                        <Text className='font-semibold' style={{fontSize: 10, color: '#b48c3c'}}>{room_internet}vnđ/phòng</Text>
                    </View>
                    <View className='mt-2 flex-row items-center space-x-1'>
                        <Text className='font-semibold ' style={{fontSize: 10}}>DỊCH VỤ CHUNG:</Text>
                        <Text className='font-semibold ' style={{fontSize: 10, color: '#b48c3c'}}>{room_service}vnđ/phòng</Text>
                    </View>
                </View>
            </View>

            <View style={{height: 5, backgroundColor: '#f8efd5'}} className='mt-6 mb-6'></View>

            {/** Chủ Nhà */}
            <View className='mx-2'>
                <Text className="font-semibold text-lg ml-2 mb-3">Chủ Nhà</Text>
                <TouchableOpacity className="flex-row items-center self-center space-x-5 p-8"
                    style={{
                        backgroundColor: '#f8efd5',
                        borderRadius: 25,
                        shadowOpacity: 0.2, 
                        shadowOffset: {width: 5, height: 5}
                    }}
                >
                    <View>
                        <View>
                            <Image 
                                source={{uri: host[0]?.Profile_image}}
                                style={{width: 150, height: 150, borderRadius: 100}}
                            />
                            <View className='absolute bottom-0 right-5'>
                                <MaterialIcons name="verified" size={30} style={{color: '#07F57E'}} />
                            </View>
                             
                        </View>      
                                           
                        <Text className="text-center font-bold mt-2">{host[0]?.Name}</Text>
                    </View>
                    <View>
                        <Text><Text className="text-lg font-bold">{host[0]?.Review}</Text> đánh giá</Text>
                        <View style={{height: 1, backgroundColor: 'grey'}} className='mb-3'></View>
                        <Text><Text className="text-lg font-bold">{host[0]?.Rank}</Text> xếp hạng</Text>
                        <View style={{height: 1, backgroundColor: 'grey'}} className='mb-3'></View>
                        <Text><Text className="text-lg font-bold">{host[0]?.Experience}</Text> năm kinh nghiệm</Text>
                        <View style={{height: 1, backgroundColor: 'grey'}} className='mb-3'></View>
                    </View>
                </TouchableOpacity>
                <View className="flex-row items-center justify-between mx-5 mt-7">
                    <TouchableOpacity 
                        className="flex-row items-center space-x-2 p-3 rounded-xl" 
                        style={{backgroundColor: '#e4c17a'}}
                        onPress={() => callHost()}
                    >
                        <Feather name="phone-call" size={24} color="black" />
                        <Text>{room_contact}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('Send', {
                        hostName: host[0]?.Name,
                        hostImage: host[0]?.Profile_image,
                        hostId: host[0]?.Id,
                    })}
                    className="flex-row items-center space-x-2 p-3 rounded-xl" style={{backgroundColor: '#e4c17a'}}>
                        <Feather name="message-circle" size={27} color={'black'} />
                        <Text>Nhắn tin chủ nhà</Text>
                    </TouchableOpacity>
                </View>
            </View>





            <View style={{height: 5, backgroundColor: '#f8efd5'}} className='mt-6 mb-6'></View>
            {/**Tiện ích */}
            <View className='mx-2 ml-5 mr-5'>
                <Text className="font-semibold text-lg mb-3">Tiện ích</Text>
                <View className='mt-5 flex-row items-end justify-between'>
                    <View className='space-y-3 items-center'>
                        <MaterialCommunityIcons name="air-conditioner" size={50} style={{color: '#b48c3c'}}/>
                        <Text className=''>Điều hòa</Text>
                    </View>
                    <View className='space-y-3 items-center'>
                        <Ionicons name="md-bed-sharp" size={50}  style={{color: '#b48c3c'}}/>
                        <Text className=''>Giường</Text>
                    </View>
                    <View className='space-y-3 items-center'>
                        <MaterialCommunityIcons name="fridge" size={50} style={{color: '#b48c3c'}}/>
                        <Text className=''>Tủ lạnh</Text>
                    </View>
                    <View className='space-y-3 items-center'>
                        <MaterialCommunityIcons name="washing-machine" size={50}  style={{color: '#b48c3c'}}/>
                        <Text className=''>Máy giặt</Text>
                    </View>
                </View>
                <View className='mt-5 flex-row items-end justify-between'>
                    <View className='space-y-3 items-center'>
                        <MaterialCommunityIcons name="sofa" size={50} style={{color: '#b48c3c'}}/>
                        <Text className=''>Sofa</Text>
                    </View>
                    <View className='space-y-3 items-center'>
                        <MaterialCommunityIcons name="wardrobe" size={50} style={{color: '#b48c3c'}} />
                        <Text className=''>Tủ</Text>
                    </View>
                    <View className='space-y-3 items-center'>
                        <MaterialCommunityIcons name="toaster-oven" size={50} style={{color: '#b48c3c'}} />
                        <Text className=''>Bếp</Text>
                    </View>
                    <View className='space-y-3 items-center'>
                        <MaterialCommunityIcons name="water-boiler" size={50} style={{color: '#b48c3c'}} />
                        <Text className=''>Nóng lạnh</Text>
                    </View>
                </View>
                <View className='mt-7 flex-row items-end justify-between'>
                    <View className='space-y-3 items-center'>
                        <FontAwesome5 name="restroom" size={40} style={{color: '#b48c3c'}} />
                        <Text className=''>khép kín</Text>
                    </View>
                    <View className='space-y-3 items-center'>
                        <FontAwesome5 name="eye-slash" size={35} style={{color: '#b48c3c'}} />
                        <Text className=''>Không chung chủ</Text>
                    </View>
                    <View className='space-y-3 items-center'>
                        <FontAwesome5 name="dog" size={40} style={{color: '#b48c3c'}} />
                        <Text className=''>Nuôi pet</Text>
                    </View>
                    
                </View>
            </View>




            
            <View style={{height: 5, backgroundColor: '#f8efd5'}} className='mt-6 mb-6'></View>
            {/*** Địa điểm gần đây */}
            <View className='mx-2 ml-5'>
                <Text className="font-semibold text-lg mb-3">Địa điểm gần đây</Text>
                <View className='mt-1'>
                    <View className="flex-row items-center">
                        <LottieView
                            autoPlay 
                            style={{
                                width: 80,
                                height: 80,
                                
                            }}
                            source={require('../../assets/uni1.json')}
                        />
                        <View style={{width: width * 0.7}}>
                            <Text className="text-md font-semibold">{room_nearby.University}</Text>
                        </View>
                        
                    </View>
                    {
                        room_nearby.Market && (
                            <View className="flex-row items-center">
                                <LottieView
                                    autoPlay 
                                    style={{
                                        width: 80,
                                        height: 80,
                                        
                                    }}
                                    source={require('../../assets/mart.json')}
                                />
                                <View style={{width: width * 0.7}}>
                                    <Text className="text-md font-semibold">{room_nearby.Market}</Text>
                                </View>
                            </View> 
                        )
                    }
                    {
                        room_nearby.Hospital && (
                            <View className="flex-row items-center">
                                <LottieView
                                    autoPlay 
                                    style={{
                                        width: 80,
                                        height: 80,
                                        backgroundColor: '#FFFAF5'
                                    }}
                                    source={require('../../assets/hos.json')}
                                />
                                <View style={{width: width * 0.7}}>
                                    <Text className="text-md font-semibold">{room_nearby.Hospital}</Text>
                                </View>
                            </View> 
                        )
                    }
                </View>
            </View>




            {
                room_description && (
                    <View>
                        <View style={{height: 5, backgroundColor: '#f8efd5'}} className='mt-6 mb-6'></View>
                        <View className='mx-2 ml-5'>
                            <Text className="font-semibold text-lg mb-1">Giới thiệu về căn phòng</Text>
                            <Text style={{width: width * 0.75}}>{room_description}</Text>
                        </View>
                    </View>
                )
            }




            <View style={{height: 5, backgroundColor: '#f8efd5'}} className='mt-6 mb-6'></View>
            <View >
                <View className='flex-row items-center mx-5'>
                    <AntDesign name="star" size={20} color="black" />
                    <View>
                        <View className='flex-row items-center'>    
                            <Text className='font-bold text-lg'>{room_star} - </Text>
                            <View>
                                <Text className="font-bold text-lg">{room_review} đánh giá</Text>
                                <View style={{height: 1, backgroundColor: 'black', marginTop: -2}}></View>
                            </View>                  
                        </View>
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="ml-5 mt-6 space-x-5">
                    {
                        room_reviews.map((review, index) => (
                            <View key={index} className=''
                            style={{
                                borderWidth: 2,
                                width: width * 0.8,
                                padding: 15,
                                borderColor: 'grey',
                                borderRadius: 20
                            }}>
                                <View className='flex-row items-center space-x-3'>
                                    <View className="rounded-full" style={{borderRadius: 50}}>
                                        <Image 
                                            source={{uri: review.user_profile}}
                                            style={{width: 60, height: 60, borderRadius: 100}}
                                        />
                                    </View>
                                    <View>
                                        <Text className="text-lg font-bold">{review.Name}</Text>
                                        <Text className="font-semibold " style={{color: 'grey'}}>{review.timestamp}</Text>
                                    </View> 
                                </View>
                                <View className="mt-6" style={{width: width * 0.7}}>
                                    <Text className='font-semibold' style={{fontSize: 15}}>{review.Review}</Text>
                                </View>
                                <View className="flex-row items-center justify-between">
                                    <View></View>
                                    <TouchableOpacity className='mt-6 flex-row items-end'>
                                        <View className=''>
                                            <Text className='text-md'>Hiển thị thêm </Text>
                                            <View style={{height: 1, backgroundColor: 'black', marginTop: -1}}></View>
                                        </View>
                                        <AntDesign name="caretright" size={10} color="black" />
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                        ))
                    }
                </ScrollView>
                <TouchableOpacity className='mt-6' style={{
                    borderWidth: 2,
                    padding: 15,
                    borderColor: 'grey',
                    borderRadius: 20,
                    marginHorizontal: 75
                }}>
                    <Text className='text-center text-md'>Hiện thị tất cả {room_review} đánh giá</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{height: 5, backgroundColor: '#f8efd5'}} className='mt-6 mb-6'></View>
            <View className="ml-5 self-start mb-3">
                <Text className='text-md'>Nội quy </Text>
                <View style={{height: 1, backgroundColor: 'black', marginTop: -1}}></View>
            </View>

            <View className="ml-5 self-start mb-3">
                <Text className='text-md'>Báo cáo </Text>
                <View style={{height: 1, backgroundColor: 'black', marginTop: -1}}></View>
            </View>
            
        </ScrollView>

        <View className="flex-row items-center justify-between px-2 pt-2 pb-2" style={{backgroundColor: 'white'}}>
            
            <View className='ml-2'>
                <View className='self-center'>
                    <Text className="font-bold text-xl" style={{color: 'black'}}>{room_price} / tháng</Text>
                    <View style={{height: 1.5, backgroundColor: 'black', marginTop: -2}}></View>
                </View>
                {
                    room_discount === true && (
                        <View className='self-center'>
                            <Text className='mt-1 ml-4' style={{fontSize: 10}}>Giảm giá tháng đầu 20%</Text>
                        </View>
                    )
                }
                {
                    isDate === true 
                    ? (
                        <View className='self-center'>
                            <Text className='mt-1' style={{fontSize: 15}}>Lịch xem phòng: {selected}</Text>
                        </View>
                    
                    )
                    : <View></View>
                }
                
            </View>
            <TouchableOpacity className="flex-row items-center px-3 py-2 mr-5" 
            style={{
                borderRadius: 10,
                backgroundColor: 'black'
            }} >
                <Text className="font-semibold text-white" style={{fontSize: 20}}>Đặt cọc </Text>
            </TouchableOpacity>

        </View>
    </View>
  )
}

export default DetailedRoomScreen