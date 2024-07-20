import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const Layout = () => {
  return (
    <>
    <StatusBar style='auto' />
    <Stack>
        <Stack.Screen options={{headerShown:false}} name='index' />
        <Stack.Screen options={{headerShown:false}} name='[id]' />
    </Stack>
    </>
  )
}

export default Layout