import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useEffect, useState, useMemo} from 'react'
import { auth, db } from '../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

const MessageScreen = () => {

  
  const currentUser = auth.currentUser

  //check if user is null
  if(currentUser === null) return

  const [messages, setMessages] = useState([])
  const [hostMessage, setHostMesage] = useState([])
  const navigation = useNavigation()

  const hostID: [] = []

  useMemo(() => 
        onSnapshot(collection(db, 'messages'), (snapshot) => {
            const messages = snapshot.docs.filter(doc => doc.data().userID === currentUser.uid).map(doc => ({
                ...doc.data()
            }))
            setMessages(messages)
        })
    , [db])

    messages.forEach(message => hostID.push(message?.id))

    useMemo(() => {
      onSnapshot(collection(db, 'hosts'), (snapshot) => {
        const hostMessage = snapshot.docs.filter(doc => hostID.includes(doc.data().Id)).map(doc => ({
          ...doc.data()
        }))
        setHostMesage(hostMessage)
      })
    }, [hostID, db])

  return (
    <View className='flex-1' style={{backgroundColor: '#FFFAF5'}}>

      {
        hostMessage.length == 0

        ? (<View className='flex-1 items-center pt-10 px-10' style={{backgroundColor: '#FFFAF5'}}>
        <Text className='text-xl font-semibold ' style={{color: 'grey'}}>Hiện tại bạn không có tin nhắn nào</Text>
      </View>)

        : (
          <ScrollView className="">
          {
            hostMessage.map((host, index) => (
              <TouchableOpacity key={index} className="flex-row items-center space-x-3 p-3 px-4 pl-8" 
                style={{
                  backgroundColor: '#f8efd5',
                  borderBottomWidth: 1,
                   borderBottomColor: '#b48c3c'
                }}
                onPress={() => navigation.navigate('Send', {
                  hostName: host?.Name,
                  hostImage: host?.Profile_image,
                  hostId: host?.Id
                })}
              >
                  <Image 
                    source={{uri: host?.Profile_image}}
                    style={{width: 40, height: 40, borderRadius: 999}}
                  />
                  <View>
                      <Text className='' style={{fontSize: 15}}>{host?.Name}</Text>
                  </View>
                  
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        )
      }
    </View>
  )
}

export default MessageScreen