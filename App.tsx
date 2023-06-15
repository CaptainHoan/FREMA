import { useEffect } from 'react';
import RootStack from './src/Navigation/RootStack';
import {LogBox } from 'react-native'
import { ModalPortal } from 'react-native-modals';

export default function App() {

  useEffect(() => {
    LogBox.ignoreLogs([
      " Sending `onAnimatedValueUpdate` with no listeners registered.",
      "Non-serializable values were found in the navigation state."
    ])
  },[])
  
  return (
    <>
      <RootStack/>
      <ModalPortal />
    </>
  
  )

}

