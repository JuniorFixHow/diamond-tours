import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs, useRouter } from 'expo-router'
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Colours } from '../../../utils/Colours';


const Layout = () => {
 

  return (
    <Tabs initialRouteName='index' screenOptions={{tabBarStyle:{backgroundColor:Colours.bg}}} >
        <Tabs.Screen name='index' options={{
            tabBarShowLabel:false,
            headerShown:false,
            tabBarIcon:({focused})=> <AntDesign name='home' size={24} color={focused?'#cb4900':'grey'} />
        }} />
        <Tabs.Screen name='favourites' options={{
          tabBarShowLabel:false,
          headerShown:false,
          tabBarIcon:({focused})=> <AntDesign name='hearto' size={24} color={focused?'#cb4900':'grey'} />
        }} />
        <Tabs.Screen name='settings' options={{
            tabBarShowLabel:false,
            headerShown:false,
            tabBarIcon:({focused})=> <AntDesign name='setting' size={24} color={focused?'#cb4900':'grey'} />
        }} />
    </Tabs>
  )
}

export default Layout