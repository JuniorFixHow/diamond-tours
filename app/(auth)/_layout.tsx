import { Redirect, Stack } from 'expo-router'
import { useContext } from 'react';
import { NewContext } from '../../context/NewContext';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
  const {old, user} = useAuth();

  if(!old) return null

  if (user) {
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