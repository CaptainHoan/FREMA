import { View, Text, Dimensions, Image, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { Feather, AntDesign  } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Dialog from "react-native-dialog";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Foundation } from '@expo/vector-icons';

const {width, height}: {width: number; height: number} = Dimensions.get('window')

const DismissKeyboard = ({ children }: {children: any}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const RenteMap = () => {

  const [mapInput, setMapInput] = useState<string>('')
  const [location, setLocation] = useState(null);
  const [longitude, setLongitude] = useState(105.8342)
  const [latitude, setLatitude] = useState(21.0278) 
  const [errorMsg, setErrorMsg] = useState(null);

  const [isVisible, setIsvisible] = useState(false)

  const mapRef = useRef(null)

  const toggleFolderAlert = () => {
    setIsvisible(!isVisible)
  }

  const getLocation = async() => {
    
    const {status} = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        toggleFolderAlert()
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLongitude(location.coords.longitude)
      setLatitude(location.coords.latitude)
  }

  useMemo(() => {
    getLocation()
  }, []);


  return (
    <DismissKeyboard>
    <SafeAreaView style={{ backgroundColor: "#FFFAF5"}}>
      <View className='flex-row items-center justify-between ' style={{ backgroundColor: "#FFFAF5"}}>
        <View>
          <Image 
            source={require('../../assets/logo.png')}
            style={{width: 80, height: 50, resizeMode: 'cover'}}
          />
        </View>
        
        <View className="self-center mr-7">
          <Text className="font-bold text-lg" style={{color: '#b48c3c'}}>BẢN ĐỒ</Text>
        </View>

        <View className='mr-10'></View>
      </View>
      
      <Dialog.Container visible={isVisible}>
        <Dialog.Title>Chú ý</Dialog.Title>
        <Dialog.Description>
          Cho phép FREMA truy cập vị trí hiện tại của bạn nhé !!!
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={toggleFolderAlert} />
        <Dialog.Button label="OK" onPress={toggleFolderAlert} />
      </Dialog.Container>

      <View className='flex-row items-start justify-between mx-4 mt-2 mb-3' 
        style={{
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 10,
          paddingTop: 6,
          paddingHorizontal: 15,
          paddingBottom: 3
        }}
      >

          <View style={{marginTop: 7}}>
              <Feather name="search" size={24} color="black" />
          </View>
          
              <GooglePlacesAutocomplete
              placeholder='Tìm kiếm địa điểm'
              minLength={2}
              autoFocus={false}
              returnKeyType={'default'}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(details?.geometry.location);
                setLongitude(details?.geometry?.location?.lng)
                setLatitude(details?.geometry?.location?.lat)
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: '#FFFAF5',
                },
                textInput: {
                  height: 38,
                  color: 'black',
                  fontSize: 16,
                  backgroundColor: '#FFFAF5'
                },
                row: {
                  backgroundColor: '#FFFAF5',
                }
              }}
              enablePoweredByContainer={false}
              fetchDetails={true }
              query={{
                key: 'AIzaSyC1jExSJKu8UZjr6jBmf7e_rASSOlF0GRU',
                language: 'en',
              }}
              
            />
          
          
          <View style={{marginTop: 7}}>
              <Foundation name="filter" size={24} color="black" />
          </View>
          
      </View>

      <View style={{flex: 1}}>
        <MapView
            mapType="mutedStandard"
            ref={mapRef}
            showsCompass={false}
            initialRegion={{
              latitude: 21.02,
              longitude: 105.83,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }} 
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            style={{
                width: width ,
                height: height,
            }} 
        >
          {longitude && latitude && (
            <Marker
              identifier='haha' 
              coordinate={{
                latitude: latitude,
                longitude: longitude
              }}
            />

          )}
        </MapView>
      </View>
    </SafeAreaView>
    </DismissKeyboard>
  )
}

export default RenteMap