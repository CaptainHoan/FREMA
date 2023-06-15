import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, {useLayoutEffect, useEffect, useState} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const RenteeTogether = ({route}: any) => {

    const navigation = useNavigation()

    const {room_id} = route.params

    const currentUser = auth.currentUser

    //check if user is null
    if(currentUser === null) return

    const [togethers, setTogether] = useState([])
    const [userID, setUserID] = useState('')

    useEffect(() => {
        onSnapshot(query(collection(db, 'rooms', room_id, 'together'), 
        orderBy('timestamp', 'desc')), 
        (snapshot) => {
            const togethers = snapshot.docs.map(doc => ({
                ...doc.data()
            }))
            setTogether(togethers)
        })
    },[db])

    useEffect(() => {
        onSnapshot(collection(db, 'rooms', room_id, 'together'), (snapshot) => {
            const userID =  snapshot.docs.filter(doc => doc.data().id === currentUser.uid).map(doc => ({
                ...doc.data()
            }))
            setUserID(userID[0]?.id)
        })
        
    }, [db])

    useEffect(() => {
        if (userID == undefined) {
            navigation.navigate('Register', {
                room_id: room_id
            })
        }
    },[userID])

  return (
    <SafeAreaView className='flex-1' style={{backgroundColor: "#FFFAF5"}}>
        <View className=' items-center flex-row justify-between mx-2'>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={40} color="black" />
            </TouchableOpacity>
            
            <View >
                <Text className="font-bold text-xl" style={{color: '#b48c3c'}}>ĐĂNG KÝ Ở GHÉP</Text>
            </View>

            <Text className='text-transparent' >test</Text>
        </View>
        <ScrollView>

            <View className='mt-6 mx-5'>
                <Text className='text-lg font-semibold'>Những bạn đã đăng ký phòng này</Text>
                <View className='mt-6 space-y-3'>
                    {togethers.map((together, index) => (
                        <View 
                            key={index} 
                            className='flex-row items-center justify-between p-3 '
                            style={{
                                backgroundColor: '#e4c17a',
                                borderRadius: 15,
                                shadowOpacity: 0.2, 
                                shadowOffset: {width: 5, height: 5}
                            }}
                        >
                            <Text className='font-bold'>{together.name}</Text>
                            <View className='self-center'>
                                <Text>{together.sex}</Text>
                                <Text>{together.age} tuổi</Text>
                                <Text>{together.job}</Text>
                            </View>
                            <TouchableOpacity className='flex-row items-center space-x-1 p-2'
                                style={{
                                    backgroundColor: 'black',
                                    borderRadius: 15
                                }}
                            >
                                <Feather name="message-circle" size={24} color="white" />
                                <Text className='text-white'>Nhắn tin</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
            
            <View className='mt-8 mx-5'>
                <Text className='text-lg font-semibold'>Nội quy căn phòng</Text>
                <View className='mt-3 space-y-2'>
                    <Text>- Khách thuê phòng cần mang theo giấy tờ tùy thân quan trọng để làm hợp đồng</Text>
                    <Text>- Chấp hành các quy định về phòng cháy, chữa cháy và an ninh trật tự nghiêm túc</Text>
                    <Text>- Có ý thức bảo quản, giữ gìn tài sản cá nhân cũng như các thiết bị, tài sản trong phòng. Không
                        tự ý sửa chữa, tháo giỡ, vẽ, đục khoét tường. Nếu hư hỏng phải bồi thường thiệt hại.
                    </Text>
                    <Text>- Nghiêm cấm tàng trữ, buôn bán chất ma túy, chất gây nghiện và các chất khác trong danh mục hàng cấm
                        theo quy định của pháp luật
                    </Text>
                </View>
            </View>
        </ScrollView>

    </SafeAreaView>
  )
}

export default RenteeTogether