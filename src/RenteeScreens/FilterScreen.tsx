import { View, Text, Keyboard, TouchableWithoutFeedback, ScrollView, TextInput, Dimensions, LogBox } from 'react-native'
import React, {useState, useEffect} from 'react'
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CheckBox, Icon } from '@rneui/base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DropDownPicker from 'react-native-dropdown-picker';

const DismissKeyboard = ({ children }: {children: any}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const {width, height}: {width: number; height: number} = Dimensions.get('window')


const FilterScreen = () => {

     useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
      }, [])

  const navigation = useNavigation()

  const [prices, setPrices] = useState([1,7])
  const [apartmentMini, setApartmentMini] = useState(false)
  const [apartment, setApartment] = useState(false)
  const [fullhouse, setFullhouse] = useState(false)
  const [house, setHouse] = useState(false)
  const [uni, setUni] = useState('')
  const [places, setPlaces] = useState('')
  const [chungchu, setChungchu] = useState(false)
  const [pet, setPet] = useState(false)
  const [toilet, setToilet] = useState(false)
  const [balcony, setBalcony] = useState(false)

  const [furnitures, setFurnitures] = useState([
    {label: 'Giường', value: 'Giường'},
    {label: 'Tủ', value: 'Tủ'},
    {label: 'Bếp', value: 'Bếp'},
    {label: 'Điều hòa', value: 'Điều hòa'},
    {label: 'Máy giặt', value: 'Máy giặt'},
    {label: 'Bình nóng lạnh', value: 'Bình nóng lạnh'},
    {label: 'Bàn ghế', value: 'Bàn ghế'},
  ])

  const [values, setValues] = useState(null)
  const [open, setOpen] = useState(false)

  return (
    <DismissKeyboard >
      <ScrollView className='flex-1' style={{backgroundColor: "#e4c17a"}} showsVerticalScrollIndicator={false}>

          <View className='flex-row items-center justify-between mx-3 mt-5' >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="x-circle" size={24} color="black" />
                </TouchableOpacity>
                
                <Text className="font-bold text-xl text-center" style={{color: 'black'}}>Lọc kết quả</Text>
                <Text style={{color: 'transparent'}}>hhaa</Text>
          </View>

          <View style={{height: 1, backgroundColor: 'transparent'}} className='mt-5'></View>

          <Text className='font-bold mx-3 mb-2' style={{color: 'grey', fontSize: 17}}>GIÁ PHÒNG</Text>
          <View className=' px-3 py-3' style={{
            backgroundColor: '#f8efd5'
          }}>
            <Text className='text-md font-bold'>Giao động: {prices[0]} triệu VNĐ - {prices[1]} triệu VNĐ</Text>
            <MultiSlider 
              values={[prices[0], prices[1]]}
              sliderLength={width * 0.94}
              min={1}
              max={10}
              onValuesChange={(values) => setPrices(values)}
              step={0.5}
            />
          </View>

          <Text className=' font-bold mx-3 mb-2 mt-5' style={{color: 'grey', fontSize: 17}}>LOẠI PHÒNG</Text>
          <View className=' px-3' style={{
            backgroundColor: '#f8efd5'
          }}>
            <View className='flex-row items-center justify-between'>
              <Text style={{fontSize: 16}} className='font-semibold'>Phòng trọ giá rẻ</Text>
              <CheckBox
                checked={house}
                checkedColor="red"
                containerStyle={{ backgroundColor: '#f8efd5', width: '0%' }}
                onIconPress={() => setHouse(!house)}
                size={25}
                uncheckedColor="black"
              />
            </View>
            <View className='flex-row items-center justify-between'>
              <Text style={{fontSize: 16}} className='font-semibold'>Chung cư mini</Text>
              <CheckBox
                checked={apartmentMini}
                checkedColor="red"
                containerStyle={{ backgroundColor: '#f8efd5', width: '0%' }}
                onIconPress={() => setApartmentMini(!apartmentMini)}
                size={25}
                uncheckedColor="black"
              />
            </View>
            <View className='flex-row items-center justify-between'>
              <Text style={{fontSize: 16}} className='font-semibold'>Căn hộ</Text>
              <CheckBox
                checked={apartment}
                checkedColor="red"
                containerStyle={{ backgroundColor: '#f8efd5', width: '0%' }}
                onIconPress={() => setApartment(!apartment)}
                size={25}
                uncheckedColor="black"
              />
            </View>
            <View className='flex-row items-center justify-between'>
              <Text style={{fontSize: 16}} className='font-semibold'>Nhà nguyên căn</Text>
              <CheckBox
                checked={fullhouse}
                checkedColor="red"
                containerStyle={{ backgroundColor: '#f8efd5', width: '0%' }}
                onIconPress={() => setFullhouse(!fullhouse)}
                size={25}
                uncheckedColor="black"
              />
            </View>
          </View>


          <Text className=' font-bold mx-3 mb-2 mt-5' style={{color: 'grey', fontSize: 17}}>ĐỊA ĐIỂM</Text>
          <View className=' px-3 py-5 space-y-4' style={{
            backgroundColor: '#f8efd5'
          }}>
              <View className='flex-row items-center'>
                <Text style={{fontSize: 16}} className='font-semibold'>Gần trường đại học: </Text>
                <View style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  flex: 1
                }}>
                    <TextInput 
                      placeholder='Đại học......'
                      value={uni}
                      onChangeText={value => setUni(value)}
                    />
                </View>
              </View>

              <View className='flex-row items-center'>
                <Text style={{fontSize: 16}} className='font-semibold'>Địa điểm khác: </Text>
                <View style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  flex: 1
                }}>
                    <TextInput 
                      placeholder='Chợ, bệnh viện........'
                      value={places}
                      onChangeText={value => setPlaces(value)}
                    />
                </View>
              </View>
          </View>

          <Text className=' font-bold mx-3 mb-2 mt-5' style={{color: 'grey', fontSize: 17}}>TIỆN ÍCH</Text>
          <View className=' px-3' style={{
            backgroundColor: '#f8efd5'
          }}>
              <View className='flex-row items-center justify-between'>
              <Text style={{fontSize: 16}} className='font-semibold'>Không chung chủ</Text>
              <CheckBox
                checked={chungchu}
                checkedColor="red"
                containerStyle={{ backgroundColor: '#f8efd5', width: '0%' }}
                onIconPress={() => setChungchu(!chungchu)}
                size={25}
                uncheckedColor="black"
              />
            </View>
            <View className='flex-row items-center justify-between'>
              <Text style={{fontSize: 16}} className='font-semibold'>Nuôi động vật trong nhà</Text>
              <CheckBox
                checked={pet}
                checkedColor="red"
                containerStyle={{ backgroundColor: '#f8efd5', width: '0%' }}
                onIconPress={() => setPet(!pet)}
                size={25}
                uncheckedColor="black"
              />
            </View>
            <View className='flex-row items-center justify-between'>
              <Text style={{fontSize: 16}} className='font-semibold'>Vệ sinh khép kín</Text>
              <CheckBox
                checked={toilet}
                checkedColor="red"
                containerStyle={{ backgroundColor: '#f8efd5', width: '0%' }}
                onIconPress={() => setToilet(!toilet)}
                size={25}
                uncheckedColor="black"
              />
            </View>
            <View className='flex-row items-center justify-between'>
              <Text style={{fontSize: 16}} className='font-semibold'>Ban công, gác xép</Text>
              <CheckBox
                checked={balcony}
                checkedColor="red"
                containerStyle={{ backgroundColor: '#f8efd5', width: '0%' }}
                onIconPress={() => setBalcony(!balcony)}
                size={25}
                uncheckedColor="black"
              />
            </View>
          </View>

          <Text className=' font-bold mx-3 mb-2 mt-5' style={{color: 'grey', fontSize: 17}}>NỘI THẤT</Text>
          <View className=' px-3 py-5 space-y-4' style={{
            backgroundColor: '#f8efd5',
            zIndex: 99999
          }}>
              <DropDownPicker 
                placeholder= 'Chọn nội thất mong muốn'
                multiple={true}
                open={open}
                value={values}
                items={furnitures}
                setOpen={setOpen}
                setValue={setValues}
                setItems={setFurnitures}
                dropDownDirection="BOTTOM"
                listMode="MODAL"
                searchable={true}
                searchPlaceholder="Tìm kiếm..."
                modalTitle="Chọn đồ đạc mong muốn"
                modalAnimationType="slide"
                modalTitleStyle={{
                  fontWeight: "bold"
                }}
                modalContentContainerStyle={{
                  backgroundColor: "#f8efd5",
                }}
                mode="BADGE"
                badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
              />
            </View>

          <TouchableOpacity className='p-4' 
          style={{
            marginTop: 50, 
            backgroundColor: '#f8efd5',
            marginHorizontal: 80,
            borderRadius: 20,
            marginBottom: 50
          }}>
            <Text className='text-center font-bold text-lg'>Áp dụng</Text>
          </TouchableOpacity>


      </ScrollView>
    </DismissKeyboard>
    
  )
}

export default FilterScreen
