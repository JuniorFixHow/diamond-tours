import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAuth } from '../../context/AuthContext';
import Loader from '../../misc/Loader';

const Layout = () => {
  const {user, authLoading} = useAuth();
  if(authLoading) return <Loader />
  // console.log(user)
  if (!user) {
    return <Redirect href={'/(auth)'} />
  }
  return (
    <>
    <StatusBar style='auto' />
    <Stack initialRouteName='(tabs)' >
        <Stack.Screen redirect={!user} options={{headerShown:false}} name='(tabs)' />
        <Stack.Screen redirect={!user} options={{headerShown:false}} name='(profile)' />
        <Stack.Screen redirect={!user} options={{headerShown:false}} name='(messages)' />
        <Stack.Screen redirect={!user} options={{headerShown:false}} name='(flights)' />
        <Stack.Screen redirect={!user} options={{headerShown:false}} name='(hotels)' />
        <Stack.Screen redirect={!user} options={{headerShown:false}} name='(tours)' />
        {/* <Stack.Screen  options={{headerShown:false}} name='(auth)' /> */}
        {/* <Stack.Screen  options={{headerShown:false}} name='index' /> */}
    </Stack>
    </>
  )
}

export default Layout