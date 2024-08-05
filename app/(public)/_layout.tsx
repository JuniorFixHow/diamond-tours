import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAuth } from '@clerk/clerk-expo'

const Layout = () => {
  const {isSignedIn} = useAuth();
  if (!isSignedIn) {
    return <Redirect href={'/(auth)'} />
  }
  return (
    <>
    <StatusBar style='auto' />
    <Stack initialRouteName='(tabs)' >
        <Stack.Screen redirect={!isSignedIn} options={{headerShown:false}} name='(tabs)' />
        <Stack.Screen redirect={!isSignedIn} options={{headerShown:false}} name='(profile)' />
        <Stack.Screen redirect={!isSignedIn} options={{headerShown:false}} name='(messages)' />
        <Stack.Screen redirect={!isSignedIn} options={{headerShown:false}} name='(flights)' />
        <Stack.Screen redirect={!isSignedIn} options={{headerShown:false}} name='(hotels)' />
        <Stack.Screen redirect={!isSignedIn} options={{headerShown:false}} name='(tours)' />
        {/* <Stack.Screen  options={{headerShown:false}} name='(auth)' /> */}
        {/* <Stack.Screen  options={{headerShown:false}} name='index' /> */}
    </Stack>
    </>
  )
}

export default Layout