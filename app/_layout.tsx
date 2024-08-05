// import 'expo-firestore-offline-persistence'

import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo"
import { Slot, useRouter } from "expo-router"
import NewContextProvider, { NewContext } from '../context/NewContext';
import { useContext, useEffect } from 'react';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => void;
}

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item;
      // console.log('data, ', item)
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },

  async saveToken(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value);;
    } catch (err) {
      return;
    }
  },
  async clearToken(key:string){
    try {
      return await SecureStore.deleteItemAsync(key)
    } catch (error) {
      return null;
    }
  }
};


if (!publishableKey) {
  throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
}

export const InitialLayout = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const router = useRouter();
  const {isNew} = useContext(NewContext);

  // console.log(isNew)
	
	useEffect(() => {
    if (!isLoaded){
      return
    }
    if(isNew){
      router.replace('/')   
    }
	}, [isNew]);

	return <Slot />;
};

const RootLayoutNav =() =>{
  return (
    
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <NewContextProvider>

        <InitialLayout />
        </NewContextProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default RootLayoutNav;