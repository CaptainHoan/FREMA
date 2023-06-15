import { View, Text, Image, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker';

const DismissKeyboard = ({ children }: {children: any}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);


const SignUp = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [image, setImage] = useState("https://img.freepik.com/free-icon/user_318-159711.jpg");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const signUp = async() => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
      // Signed in 
      const userId = await userCredential.user.uid;
      console.log(userId);
      setDoc(doc(db, 'users', userId), {
        email: email,
        Name: userName,
        Id: userId,
        Profile_image: image
      })
      // ...
    })
    .catch((error) => {
      console.log(error.message)
    });
  }

  return (
    <DismissKeyboard>
    <View className='flex-1' style={{backgroundColor: "#e4c17a"}} >
      
      <View className='self-center' style={{marginTop: -40}}>
        <Image 
          source={require('../../assets/man4.png')}
          style={{width: 250, height: 250, resizeMode: 'contain'}}
        />
      </View>

        <TouchableOpacity
            onPress={pickImage} 
            style={{alignSelf: 'center', marginBottom: 20, marginTop: -40}}
        >
            <Image
            style={{
                width: 120, 
                height: 120,
                borderWidth: 2,
                borderRadius: 999,
            }}
            source={{ uri: image }}
            />
        </TouchableOpacity>

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
            placeholder='Tên người dùng'
            placeholderTextColor={'gray'}
            value={userName}
            onChangeText={setUserName}
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
      </View>

      <TouchableOpacity className='bg-black rounded-md p-3 mx-5 mt-8' onPress={signUp}>
        <Text className='text-center font-bold text-white text-lg'>Đăng ký</Text>
      </TouchableOpacity>

      <View className='absolute bottom-5 mx-12 self-center'>
        <Text className='text-black font-bold text-md text-center'>
          By signing up, you agree to our Terms & Privacy Policy
        </Text>
      </View>
      </View>
    </DismissKeyboard>
  )
}

export default SignUp