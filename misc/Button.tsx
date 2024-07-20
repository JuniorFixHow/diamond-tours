import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
type ButtonProps = {
    text:string,
    onClick:()=>void,
    margin?:boolean,
    type?:string,
    loading?:boolean
}
const Button = ({text,loading, onClick, margin, type}:ButtonProps) => {
  return (
    <TouchableOpacity disabled={loading} style={[styles.btn, {marginTop:margin?20:0, backgroundColor: loading?'dimgrey': type==='danger'?'crimson':'#cb4900'}]} onPress={onClick} >
      <Text style={{color:'white', fontSize:16}} >{loading? 'loading...':text}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    btn:{
        paddingVertical:12,
        width:'100%',
        alignItems:'center',
        borderRadius:5,
    }
})