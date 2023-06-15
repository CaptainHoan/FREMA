import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { auth, db } from '../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { MaterialIcons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import AnimatedLottieView from 'lottie-react-native';

const RenteeProfile = () => {

  const currentUser = auth.currentUser

  //check if user is null
  if(currentUser === null) return
  
  const [profile, setProfile] = useState([])
  const [profilePic, setProfilePic]= useState('https://img.freepik.com/free-icon/user_318-159711.jpg')

  useEffect(() => {
    onSnapshot(collection(db, 'users'), (snapshot) => {
      const profile = snapshot.docs.filter(doc => doc.id === currentUser.uid).map(doc => ({
        ...doc.data()
      }))
      setProfile(profile)
    })
  },[])

  const signOutUser = async() => {
    await signOut(auth)
    .then (() => {
      //signOut user
    })
    .catch(err => console.log(err.message))
  }

  return (
    <SafeAreaView className='flex-1' style={{backgroundColor: "#FFFAF5"}}>
      <View className=' items-center flex-row justify-between'>
        <View>
          <Image 
          source={require('../../assets/logo.png')}
          style={{width: 80, height: 50, resizeMode: 'cover'}}
        />
        </View>
        
        <View >
          <Text className="font-bold text-xl" style={{color: '#b48c3c'}}>HỒ SƠ</Text>
        </View>
        <Text className='text-transparent' >test of the</Text>
      </View>

      {/**profile */}

      <ScrollView>
          <View className="flex-row items-center space-x-5 p-8 mx-6 mt-6"
            style={{
              backgroundColor: '#f8efd5',
              borderRadius: 25,
              shadowOpacity: 0.2, 
              shadowOffset: {width: 5, height: 5},

            }}
          >
            <View >
                <Image 
                  source={{uri: profile[0]?.Profile_image}}
                  style={{width: 120, height: 120, borderRadius: 999}}
                />
              <View className='absolute bottom-1 right-2 px-3 py-1 rounded-lg ' style={{backgroundColor: '#e4c36e'}}>
                  <Text>Cấp</Text>
              </View>
            </View>
            
            <View>
              <Text className="text-lg font-bold mb-2">{profile[0]?.Name}</Text>
              <View style={{width: '80%'}} className='mb-2'>
                <Text className="text-md font-bold">ID: {profile[0]?.Id.slice(0,8)}</Text>
              </View>
              
              <View className='flex-row items-center'>
                <AnimatedLottieView
                  autoPlay 
                  style={{
                  width: 35,
                  height: 35,
                                
                  }}
                  source={require('../../assets/badge.json')}
                />
                <Text className="text-md font-bold">Thành viên vàng</Text>
              </View>
              <View className='flex-row items-center'>
                <TouchableOpacity className="mt-4">
                  <Text className="text-md">Sửa hồ sơ</Text>
                  <View style={{height: 1, backgroundColor: 'black'}}></View>
                </TouchableOpacity>
                <View></View>
              </View>
              
            </View>
          </View>

          {/**settings */}

          <View className='mt-7'>
            <View>

              <TouchableOpacity className='flex-row items-center justify-between mx-5'>
                <Text className='text-xl font-bold'>Cài đặt</Text>
                <MaterialIcons name="arrow-drop-down" size={30} color="transparent" />
              </TouchableOpacity>
              <View style={{height: 3, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>

              <View>
                <TouchableOpacity className='flex-row items-center justify-between ml-10 mr-5'>
                  <Text>Thông tin cá nhân</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="transparent" />
                </TouchableOpacity>
                <View style={{height: 0, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>
                <TouchableOpacity className='flex-row items-center justify-between ml-10 mr-5'>
                  <Text>Đăng nhập và bảo mật</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="transparent" />
                </TouchableOpacity>
                <View style={{height: 0, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>
                <TouchableOpacity className='flex-row items-center justify-between ml-10 mr-5'>
                  <Text>Thông báo</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="transparent" />
                </TouchableOpacity>
                <View style={{height: 0, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>
                <TouchableOpacity className='flex-row items-center justify-between ml-10 mr-5'>
                  <Text>Quyền riêng tư</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="transparent" />
                </TouchableOpacity>
                <View style={{height: 0, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>
              </View>
            </View>




            <TouchableOpacity className='flex-row items-center justify-between mx-5 mt-4'>
                <Text className='text-xl font-bold'>Đăng phòng cho thuê của bạn</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="transparent" />
            </TouchableOpacity>
            <View style={{height: 3, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>



            <TouchableOpacity className='flex-row items-center justify-between mx-5 mt-4'>
                <Text className='text-xl font-bold'>Hỗ trợ</Text>
                <MaterialIcons name="arrow-drop-down" size={30} color="transparent" />
            </TouchableOpacity>
            <View style={{height: 3, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>
            <View>
                <TouchableOpacity className='flex-row items-center justify-between ml-10 mr-5'>
                  <Text>Trung tâm an toàn</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="transparent" />
                </TouchableOpacity>
                <View style={{height: 0, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>
                <TouchableOpacity className='flex-row items-center justify-between ml-10 mr-5'>
                  <Text>Liên hệ bộ phận hỗ trợ</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="transparent" />
                </TouchableOpacity>
                <View style={{height: 0, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>
                <TouchableOpacity className='flex-row items-center justify-between ml-10 mr-5'>
                  <Text>Yêu cầu giúp đỡ</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="transparent" />
                </TouchableOpacity>
                <View style={{height: 0, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>
                <TouchableOpacity className='flex-row items-center justify-between ml-10 mr-5'>
                  <Text>Gửi phản hồi cho FREMA</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="transparent" />
                </TouchableOpacity>
                <View style={{height: 0, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View> 
            </View>




            <TouchableOpacity className='flex-row items-center justify-between mx-5 mt-4'>
                <Text className='text-xl font-bold'>Pháp lý</Text>
                <MaterialIcons name="arrow-drop-down" size={30} color="transparent" />
            </TouchableOpacity>
            <View style={{height: 3, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>
            <View>
                <TouchableOpacity className='flex-row items-center justify-between ml-10 mr-5'>
                  <Text>Điều khoản dịch vụ</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="transparent" />
                </TouchableOpacity>
                <View style={{height: 0, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>
                <TouchableOpacity className='flex-row items-center justify-between ml-10 mr-5'>
                  <Text>Chính sách quyền riêng tư</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="transparent" />
                </TouchableOpacity>
                <View style={{height: 0, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>
            </View>


            <TouchableOpacity className='flex-row items-center justify-between mx-5 mt-4' onPress={signOutUser}>
                <Text className='text-sm'>Đăng xuất</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="transparent" />
              </TouchableOpacity>
            <View style={{height: 3, backgroundColor: '#f8efd5'}} className='mt-2 mb-2'></View>


          </View>
      </ScrollView>

      
      

    </SafeAreaView>
  )
}

export default RenteeProfile