import { View, Text, Button, TextInput, TouchableOpacity, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard, LogBox } from 'react-native'
import React, {useLayoutEffect, useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native'
import { CheckBox, Icon } from '@rneui/themed';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { Feather } from '@expo/vector-icons';

const {width, height}: {width: number; height: number} = Dimensions.get('window')

const DismissKeyboard = ({ children }: {children: any}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

const TogetherRegister = ({route}: any) => {

    const currentUser = auth.currentUser

    const navigation = useNavigation()

    //check if user is null
    if(currentUser === null) return

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
      }, [])

    const {room_id} = route.params

    const [registerName, setRegisterName] = useState<string>('')

    const [registerAge, setRegisterAge] = useState<string>('')

    const [sex, setSex] = useState([
        {label: 'Nam', value: 'nam'},
        {label: 'Nữ', value: 'nữ'}
    ])

    const [sexOpen, setSexOpen] = useState(false)
    const [sexValue, setSexValue] = useState(null);

    const [job, setJob] = useState<string>('')
    const [intro, setIntro] = useState<string>('')
    const [want, setWant] = useState<string>('')

    const [boxRule, setBoxRule] = useState(false)
    const [boxInfo, setBoxInfo] = useState(false)
    const [phone, setPhone] = useState('')

    const addTogether = () => {
        addDoc(collection(db, 'rooms', room_id, 'together'), {
            id: currentUser.uid,
            name: registerName,
            age: registerAge,
            sex: sexValue,
            job: job,
            intro: intro,
            want: want,
            phone: phone,
            timestamp: serverTimestamp()
        })
        navigation.goBack()
    }

  return (
    <DismissKeyboard>
        <ScrollView className='flex-1' style={{backgroundColor: "#e4c17a"}}>
            <View className='flex-row items-center justify-between mx-3 mt-3'>
                <TouchableOpacity onPress={() => navigation.pop(2)}>
                    <Feather name="x-circle" size={24} color="black" />
                </TouchableOpacity>
                
                <Text className="font-bold text-xl text-center" style={{color: 'black'}}>MẪU ĐĂNG KÝ Ở GHÉP</Text>
                <Text style={{color: 'transparent'}}>ha</Text>
            </View>
            
            <View className='mt-8'>
                
                {/**Tên, tuổi, giới tính */}
                <View className='space-y-6'>
                    <View className='flex-row items-center mx-4 space-x-3'>
                        <Text className='text-lg font-semibold'>Họ và tên</Text>
                        <View className='p-3 flex-1 rounded-md' style={{
                            backgroundColor: '#FFFAF5',
                            borderWidth: 1,
                            borderColor: 'black'
                            }}>
                            <TextInput 
                                placeholder='..........'
                                value={registerName}
                                onChangeText={(value) => setRegisterName(value)}
                            />
                        </View>
                    </View>
                    <View className='flex-row items-center justify-between'>
                        <View className='flex-row items-center mx-4 space-x-3'>
                            <Text className='text-lg font-semibold'>Tuổi</Text>
                            <View className='p-3 rounded-md' style={{
                                backgroundColor: '#FFFAF5', 
                                width: 50,
                                borderWidth: 1,
                                borderColor: 'black'
                            }}>
                                <TextInput 
                                    placeholder='..........'
                                    value={registerAge}
                                    onChangeText={(value) => setRegisterAge(value)}
                                />
                            </View>
                        </View>
                        <View className='flex-row items-center mx-4 space-x-3'>
                            <Text className='text-lg font-semibold'>Giới tính</Text>
                            <View style={{width: 100}}>
                                <DropDownPicker
                                    placeholder="chọn"
                                    open={sexOpen}
                                    value={sexValue}
                                    items={sex}
                                    setOpen={setSexOpen}
                                    setValue={setSexValue}
                                    setItems={setSex}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                
                {/**Nghề nghiệp */}
                <View className='mt-6'>
                    <View className='flex-row items-center mx-4 space-x-3'>
                        <Text className='text-lg font-semibold'>Nghề nghiệp</Text>
                        <View className='p-3 rounded-md' style={{
                            backgroundColor: '#FFFAF5',
                            borderWidth: 1,
                            borderColor: 'black',
                            width: 150
                            }}>
                            <TextInput
                                placeholder='..........' 
                                value={job}
                                onChangeText={(value) => setJob(value)}
                            />
                        </View>
                    </View>
                </View>
                
                {/**Giới thiệu ngắn về bản thân */}
                <View className='mt-6'>
                    <View className='mx-3'>
                        <Text className='text-lg font-semibold'>Giới thiệu ngắn về bản thân</Text>
                        <View className='px-3 pb-3 pt-3 mt-1  rounded-md' style={{
                            backgroundColor: '#FFFAF5',
                            borderWidth: 1,
                            borderColor: 'black',
                            }}>
                            <TextInput
                                multiline={true}
                                style={{width: width * 0.9}}
                                placeholder='..........' 
                                value={intro}
                                onChangeText={(value) => setIntro(value)}
                            />
                        </View>
                    </View>
                </View>

                {/**Diều mong muốn ở bạn cùng phòng */}
                <View className='mt-6'>
                    <View className='mx-3'>
                        <Text className='text-lg font-semibold'>Điều mong muốn ở bạn cùng phòng</Text>
                        <View className='px-3 pb-3 pt-3 mt-1  rounded-md' style={{
                            backgroundColor: '#FFFAF5',
                            borderWidth: 1,
                            borderColor: 'black',
                            }}>
                            <TextInput
                                multiline={true}
                                style={{width: width * 0.9}}
                                placeholder='..........' 
                                value={want}
                                onChangeText={(value) => setWant(value)}
                            />
                        </View>
                    </View>
                </View>
                
                {/**Số điện thoại */}
                <View className='mt-6'>
                    <View className='flex-row items-center mx-3 space-x-3'>
                            <Text className='text-lg font-semibold'>Số điện thoại</Text>
                            <View className='p-3 flex-1 rounded-md' style={{
                                backgroundColor: '#FFFAF5',
                                borderWidth: 1,
                                borderColor: 'black'
                                }}>
                                <TextInput 
                                    placeholder='..........'
                                    value={phone}
                                    onChangeText={(value) => setPhone(value)}
                                />
                            </View>
                    </View>
                    <Text className='mx-3 italic mt-2'>(*FREMA sẽ không đăng số điện thoại của bạn để đảm bảo bảo mật thông tin)</Text>
                </View>

                {/** Đồng ý với điều khỏa của chúng tôi */}
                <View className='flex-row items-center mx-3 mt-6'>
                    <CheckBox
                        containerStyle={{
                            backgroundColor: '#e4c17a',
                            padding: 0
                        }}
                        checkedIcon={
                            <Icon
                            name="radio-button-checked"
                            type="material"
                            color="red"
                            size={25}

                            />
                        }
                        uncheckedIcon={
                            <Icon
                            name="radio-button-unchecked"
                            type="material"
                            color="black"
                            size={25}
                            />
                        }
                        checked={boxRule}
                        onPress={() => setBoxRule(!boxRule)}
                    /> 
                    <View style={{width: width * 0.8}}>
                        <Text className='text-lg font-bold'>Xác nhận thông tin bạn cung cấp là chính xác</Text>
                    </View> 
                    
                </View>
                <View className='flex-row items-center mx-3 mt-1'>
                    <CheckBox
                        containerStyle={{
                            backgroundColor: '#e4c17a',
                            padding: 0
                        }}
                        checkedIcon={
                            <Icon
                            name="radio-button-checked"
                            type="material"
                            color="red"
                            size={25}

                            />
                        }
                        uncheckedIcon={
                            <Icon
                            name="radio-button-unchecked"
                            type="material"
                            color="black"
                            size={25}
                            />
                        }
                        checked={boxInfo}
                        onPress={() => setBoxInfo(!boxInfo)}
                    />  
                    <Text className='text-lg font-bold'>Bạn đồng ý với nội quy chủ phòng đăng</Text>
                </View>
                
                <View className='mt-6 p-3 mb-10' style={{
                    backgroundColor: boxRule === true && boxInfo === true
                    && registerName.length > 0
                    && registerAge.length > 0
                    && sexValue && intro.length > 0 && job.length > 0 && phone.length > 0 
                    ? 'black' 
                    : 'grey',
                    marginHorizontal: 150,
                    borderRadius: 15
                }}>
                    <Button 
                        title= 'Đăng ký' 
                        color='white' 
                        disabled={
                            boxRule === true && boxInfo === true
                            && registerName.length > 0
                            && registerAge.length > 0
                            && sexValue && intro.length > 0 && job.length > 0 && phone.length > 0
                            ? false 
                            : true}
                        onPress={addTogether} 
                    />
                </View>
            </View> 
        </ScrollView>
    </DismissKeyboard>
  )
}

export default TogetherRegister