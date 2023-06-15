import { View, Text, SafeAreaView, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { auth, db } from '../../firebase'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { Image } from 'react-native'
import { TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const {width}: {width: number; height: number} = Dimensions.get('window')

const CommentScreen = ({route}:any) => {

  const {
    room_name,
    room_location,
    room_district,
    room_id 
  } = route.params

  const currentUser = auth.currentUser

    //check if user is null
    if(currentUser === null) return
  
    const [profile, setProfile] = useState([])

    useEffect(() => {
        onSnapshot(collection(db, 'users'), (snapshot) => {
          const profile = snapshot.docs.filter(doc => doc.id === currentUser.uid).map(doc => ({
            ...doc.data()
          }))
          setProfile(profile)
        })
    },[db])

    const [comment, setComment] = useState<string>('')
    const [comments, setComments] = useState([])
    const navigation = useNavigation()

    const postComment = () => {
      addDoc(collection(db, 'rooms', room_id, 'comments'), {
        comment_userName: profile[0].Name,
        comment_profileImage: profile[0].Profile_image,
        comment: comment,
        comment_id: profile[0].Id,
        timestamp: serverTimestamp()
      })
      setComment('')
    }

    useEffect(() => {
      onSnapshot(query(collection(db, 'rooms', room_id, 'comments'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        const comments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setComments(comments)
      })
    },[db])

  return (
    <SafeAreaView className='flex-1' style={{backgroundColor: '#FFFAF5'}}>

      <View className=' items-center flex-row justify-between mb-2'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={44} color="black" />
        </TouchableOpacity>
        
        <View >
          <Text className="font-bold text-xl" style={{color: '#b48c3c'}}>CỘNG ĐỒNG</Text>
        </View>
        <Text className='text-transparent' >test of the</Text>
      </View>
      

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback>
          <ScrollView>
            <View className='ml-4'>
                <Text className="text-2xl font-bold" style={{width: width * 0.85}}>{room_name}</Text>
                <Text className='font-semibold'>{room_location} {room_district}</Text>
            </View>

            <View className='mx-3 mt-6 space-y-2'>
              {comments.map((comment, index) => (
                <View key={index} className='flex-row items-start space-x-2'>
                  <Image 
                    source={{uri: comment.comment_profileImage}}
                    className="h-10 w-10 rounded-full"
                  />
                  <Text style={{width: width * 0.85}}>
                    <Text className='text-base font-semibold'>
                      {comment.comment_userName} {' '} 
                    </Text>
                    {comment.comment}
                  </Text>
                </View>
              ))}
            </View>

          </ScrollView>
        </TouchableWithoutFeedback>

        {/**Input to post */}
          <View className='flex-row items-center mx-2 mb-2'>
              <Image 
                source={{uri: profile[0]?.Profile_image}}
                className="h-10 w-10 rounded-full"
              />
              <View 
                className="border-2 border-gray-400 flex-row items-center justify-between pr-4 pl-3 rounded-2xl flex-1 ml-2"
              >
                <View className='flex-1'>
                  <TextInput 
                    className=' text-black text-base flex-1 '
                    placeholder='Trao đổi cộng đồng...'
                    placeholderTextColor={'gray'}
                    value={comment}
                    onChangeText={setComment}
                    onSubmitEditing={postComment}
                    multiline={true}
                  />
                </View>
                <TouchableOpacity onPress={postComment}>
                  <Text className="font-bold text-base text-blue-600">Đăng</Text>
                </TouchableOpacity>
              </View>
            </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default CommentScreen