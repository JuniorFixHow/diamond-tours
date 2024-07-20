import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const Layout = () => {
  return (
    <>
    <StatusBar style='auto' />
    <Stack>
        <Stack.Screen options={{headerShown:false}} name='(user)' />
        <Stack.Screen options={{headerShown:false}} name='(payment)' />
        <Stack.Screen options={{headerShown:false}} name='(bookings)' />
    </Stack>
    </>
  )
}

export default Layout