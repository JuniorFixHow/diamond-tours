// import 'expo-firestore-offline-persistence'
import 'expo-dev-client';
import * as SecureStore from 'expo-secure-store';
import { Redirect, Slot, useRouter } from "expo-router"
import {  AuthContextProvider } from '../context/AuthContext';
import Loader from '../misc/Loader';



// if (!publishableKey) {
//   throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
// }



const RootLayoutNav =() =>{
  return (
    // <NewContextProvider>
      <AuthContextProvider>
        <Slot/>
      </AuthContextProvider>
    // </NewContextProvider>
  )
}

export default RootLayoutNav;