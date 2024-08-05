import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'
import { useContext } from 'react';
import { NewContext } from '../../context/NewContext';

const Layout = () => {
  const { isSignedIn } = useAuth();
  const {isNew} = useContext(NewContext);

  if(isNew) return <Redirect href={'/'} />

  if (isSignedIn) {
    return <Redirect href={'/(public)/(tabs)'} />
  }
  return (
    <Stack>
        <Stack.Screen options={{headerShown:false}} name='index' />
        <Stack.Screen options={{headerShown:false}} name='register' />
        <Stack.Screen options={{headerShown:true, headerTitle:'Reset Password'}} name='reset' />
    </Stack>
  )
}

export default Layout