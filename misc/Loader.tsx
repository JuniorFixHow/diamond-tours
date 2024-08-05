import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colours } from '../utils/Colours'

type LoaderProps = {
    small?:boolean
}

const Loader = ({small}:LoaderProps) => {
  return (
    <View style={{/*backgroundColor:Colours.bg,*/ flexGrow:1, alignItems:'center', justifyContent:'center', width:'100%', alignSelf:'center'}} >
      {/* <Text>Loader</Text> */}
      <ActivityIndicator size={small? 'small' : 'large' }/>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})