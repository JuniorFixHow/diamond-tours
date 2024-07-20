import { StyleSheet, Text, Pressable,  View } from 'react-native'
import React, { ReactNode } from 'react'

type BtnProps = {
    text:string,
    onTap:()=>void,
    icon:ReactNode
}

const HomeButn = ({text, onTap, icon}:BtnProps) => {
  return (
    <Pressable style={styles.btn} onPress={onTap} >
      {icon}
      <Text style={{color:'white', fontSize:18}} >{text}</Text>
    </Pressable>
  )
}

export default HomeButn

const styles = StyleSheet.create({
    btn:{
        backgroundColor:'#cb4900',
        flexDirection:'row',
        gap:8,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:8,
        paddingHorizontal:8,
        borderRadius:8,
    }
})