import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen options={{headerShown:false}} name='index' />
        <Stack.Screen options={{headerShown:false}} name='register' />
        <Stack.Screen options={{headerShown:true, headerTitle:'Reset Password'}} name='reset' />
    </Stack>
  )
}

export default Layout