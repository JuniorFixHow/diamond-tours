import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const Layout = () => {
  return (
    <>
    <StatusBar style='auto' />
    <Stack>
        <Stack.Screen options={{headerShown:false}} name='chats' />
        <Stack.Screen options={{headerShown:false}} name='notifications' />
    </Stack>
    </>
  )
}

export default Layout