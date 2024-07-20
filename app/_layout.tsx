import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo"
import { Slot, useRouter, useSegments } from "expo-router"
import { useContext, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import NewContextProvider, { NewContext } from '../context/NewContext';

export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => void;
}

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
}

const InitialLayout = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();
  const {isNew} = useContext(NewContext);

	// If the user is signed in, redirect them to the home page
	// If the user is not signed in, redirect them to the login page
  // if( !isLoaded){
  //   return(
  //     <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center', backgroundColor:'white'}} >
  //       <ActivityIndicator size='large' />
  //     </View>
  //   )
  // }
	useEffect(() => {
    if (!isLoaded) return;
    if(!isNew){
      const inTabsGroup = segments[0] === '(public)/(auth)';
    
      if (isSignedIn && !inTabsGroup) {
        router.replace('(public)/(tabs)');
      } else if (!isSignedIn) {
        router.replace('(public)/(auth)');
      }
    }else{
      
      router.replace('(public)')
    }
	}, [isSignedIn, isNew]);

	return <Slot />;
};

function RootLayoutNav() {
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