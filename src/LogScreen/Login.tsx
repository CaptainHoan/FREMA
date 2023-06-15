import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'


const DismissKeyboard = ({ children }: {children: any}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = () => {

  const navigation = useNavigation()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const signIn = async() => {
    await signInWithEmailAndPassword(auth, email, password)
    try{
      //sign in user
    }catch (err: any) {
      console.log(err.message)
    }
  }

  return (
    <DismissKeyboard>
    <View className='flex-1' style={{backgroundColor: "#e4c17a"}}>
      
      <View className='self-center'>
        <Image 
          source={require('../../assets/man4.png')}
          style={{width: 250, height: 250, resizeMode: 'contain'}}
        />
      </View>

      <View className='mx-5 space-y-5'>
        <View className='bg-white rounded-md border-2 border-gray-600 p-3'>
          <TextInput 
            placeholder='Email'
            placeholderTextColor={'gray'}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className='bg-white rounded-md border-2 border-gray-600 p-3'>
          <TextInput 
              placeholder='Mật khẩu'
              placeholderTextColor={'gray'}
              value={password}
              onChangeText={setPassword}
            />
        </View>
        <Text className='text-md font-bold text-black text-right'>Quên mật khẩu?</Text>
      </View>

      <TouchableOpacity className='bg-black rounded-md p-3 mx-5 mt-8' onPress={signIn}>
        <Text className='text-center font-bold text-white text-lg'>Đăng nhập</Text>
      </TouchableOpacity>

      <View className='absolute bottom-7 self-center'>
        <View className='flex-row align-center space-x-1 mt-5'>
          <Text className="text-black font-semibold">
            Bạn chưa có tài khoản?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className='text-black font-bold'> Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </DismissKeyboard>
  )
}

export default Login