import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase'
import LogNavigation from './LogNavigation'
import RenteeNavigation from './RenteeNavigation'

const RootStack = () => {

    const [isLogged, setIsLogged] = useState<boolean>(false)

    const auth = getAuth()

    auth.onAuthStateChanged((user) => {
      user ? setIsLogged(true) : setIsLogged(false)
    })
    

  return (
    <>
      {
        isLogged === true
      ? (
          <RenteeNavigation />
        )
      : (
          <LogNavigation />
        )
      }
    </>
    
  )
}

export default RootStack