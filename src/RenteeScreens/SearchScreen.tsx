import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Image, Dimensions, FlatList } from 'react-native'
import React, {useMemo, useState} from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign, FontAwesome  } from '@expo/vector-icons';
import MasonryList from '@react-native-seoul/masonry-list';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

type Input = {
    houseInput: string,
    setHouseInput: React.Dispatch<React.SetStateAction<string>>
}

const {width, height}: {width: number; height: number} = Dimensions.get('window')

const SearchScreen = ({route}: any ) => {

    const {houseInput, setHouseInput} = route.params

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

  return (
    <View className='flex-1' style={{backgroundColor: "#FFFAF5"}}>
    
        <View className="flex-row items-center px-2 space-x-3 pt-8 pb-5" style={{backgroundColor:'#e4c17a'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={35} color="black" />
            </TouchableOpacity>
            
            <View className='flex-1'>
                <View className="border-2 border-slate-900 p-3 rounded-xl">
                    <TextInput 
                    placeholder='Tìm kiếm quận, huyện'
                    placeholderTextColor={'white'}
                    value={houseInput}
                    onChangeText={value => setHouseInput(value)}
                    />
                </View>
             </View>
        </View>

        {/**bộ lọc */}

        <View className="mt-3 flex-row items-center justify-between mx-3">
            <View className="flex-row items-center space-x-2">
                <FontAwesome5 name="map-marker-alt" size={24} color="#b48c3c" />
                <Text className="text-md font-semibold">Khu vực: Thành phố Hà Nội</Text>
            </View>
            <View className="flex-row items-center space-x-4">
                <TouchableOpacity>
                    <AntDesign name="caretdown" size={24} color="#b48c3c" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
                    <FontAwesome name="filter" size={24} color="#b48c3c" />
                </TouchableOpacity>
            </View>
        </View>

        {/** phòng trọ show 
        
            <FlatList
                style={{alignSelf: 'center'}}
                data={filteredItems}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    
                }}
                numColumns={1}
                renderItem={({item}) => (
                    <View>
                        <Text className="text-5xl">{item.text}</Text>
                        <Image source={{uri: item.uri}} style={{width: width / 2, height: 150}} />
                    </View>
                )}
            />
        */}
            
        <View className='mt-5 mx-3 flex-1 '>
            <FlatList 
                data={rooms}
              //  keyExtractor={item => item.Id}
                numColumns={2}
                renderItem={({item}) => (
                    <View className='flex-1 mb-4 items-center'>
                        <View className=''>
                            <Image 
                                source={{uri: item.room_picture}}
                                style={{width: 180, height: 180, borderRadius: 15}}
                            />
                        </View>
                        <View className='mt-2'>
                            <Text className='text-lg font-bold'>{item.Name}</Text>
                            <Text className='font-semibold text-slate-400'>{item.District} - {item.M2} m2 - {item.Max} người</Text>
                            <Text className="text-orange-400 text-lg font-bold mt-2">{item.price} VNĐ</Text>
                        </View>
                    </View>
                )}
            />
            
        </View>
    </View>
  )
}

export default SearchScreen