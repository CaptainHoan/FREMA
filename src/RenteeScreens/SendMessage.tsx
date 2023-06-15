import { View, Text, SafeAreaView, Image, FlatList, TextInput, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SendMessage = ({route}: any) => {

    const {hostName, hostImage, hostId} = route.params

    const currentUser = auth.currentUser
     //check if user is null
    if(currentUser === null) return 
    
    const navigation = useNavigation()

    const [messageInput, setMessageInput] = useState<string>('')
    const [messages, setMessages] = useState([])

    const sendMessage = () => {
        addDoc(collection(db, 'messages'), {
            id: hostId,
            userID: currentUser.uid,
            timestamp: serverTimestamp(),
            message: messageInput,
            hostName: hostName,
            hostImage: hostImage,
        })

        setMessageInput('')
    }

    useEffect(() => {
        onSnapshot(query(collection(db, 'messages'), orderBy('timestamp', 'desc')), (snapshot) => {
            const messages = snapshot.docs.filter(doc => doc.data().id === hostId 
            && doc.data().userID === currentUser.uid).map(doc => ({
                ...doc.data(),
                ID: doc.id
            }))
            setMessages(messages)
        })
    },[])

  return (
    <SafeAreaView className='flex-1' style={{backgroundColor: '#FFFAF5'}}>

        {/**Chat header */}
        <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-3">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="keyboard-arrow-left" size={45} color="black" />
                </TouchableOpacity>
                
                <View className="flex-row items-center space-x-2" >
                    <Image 
                        source={{uri: hostImage}}
                        style={{width: 40, height: 40, borderRadius: 999}}
                    />
                    <Text className='text-lg font-semibold'>{hostName}</Text>
                </View>
                
            </View>
            <View className='flex-row items-center space-x-3 mr-3'> 
                <Foundation name="telephone" size={25} color="black" />
                <FontAwesome5 name="video" size={22} color="black" />
            </View>
        </View>

        {/**Chat Section */}
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
            keyboardVerticalOffset={10}
        >   
            
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                   
                    <FlatList 
                        data={messages}
                        inverted={true}
                        keyExtractor={item => item.ID}
                        renderItem={({item}) => (
                            <View className='bg-orange-200 rounded-full px-5 py-3 mx-3 my-2 ' 
                                style={{alignSelf: 'flex-start', marginLeft: 'auto'}}
                            >
                                <Text className="text-black">{item.message}</Text>
                            </View>
                        )}
                    />
                    
                </TouchableWithoutFeedback>

                <View className='flex-row items-center space-x-3 mx-3  '>
                    
                    <View className=' rounded-full border-2 border-gray-400 px-5 py-2 flex-1'>
                        <TextInput 
                            className=' text-black text-md'
                            placeholderTextColor={'grey'}
                            placeholder='Nhắn tin'
                            multiline={true}
                            value={messageInput}
                            onChangeText={setMessageInput}
                            onSubmitEditing={sendMessage}
                        />
                        
                    </View>
                    <TouchableOpacity onPress={sendMessage}>
                        <Feather name="send" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                
                
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SendMessage