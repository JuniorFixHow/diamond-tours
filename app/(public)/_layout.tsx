import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const Layout = () => {
  return (
    <>
    <StatusBar style='auto' />
    <Stack initialRouteName='(tabs)' >
        <Stack.Screen options={{headerShown:false}} name='(tabs)' />
        <Stack.Screen options={{headerShown:false}} name='(profile)' />
        <Stack.Screen options={{headerShown:false}} name='(messages)' />
        <Stack.Screen options={{headerShown:false}} name='(flights)' />
        <Stack.Screen options={{headerShown:false}} name='(hotels)' />
        <Stack.Screen options={{headerShown:false}} name='(tours)' />
        <Stack.Screen options={{headerShown:false}} name='(auth)' />
        <Stack.Screen options={{headerShown:false}} name='index' />
    </Stack>
    </>
  )
}

export default Layout