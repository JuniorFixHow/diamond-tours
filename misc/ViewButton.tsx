import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
type ButtonProps = {
    text:string,
    margin?:boolean,
}
const ViewButton = ({text,  margin}:ButtonProps) => {
  return (
    <View  style={[styles.btn, {marginTop:margin?20:0, backgroundColor: 'gainsboro'}]}  >
      <Text style={{color:'rgb(141 141 141)', fontSize:16}} >{text}</Text>
    </View>
  )
}

export default ViewButton

const styles = StyleSheet.create({
    btn:{
        paddingVertical:12,
        width:'100%',
        alignItems:'center',
        borderRadius:5,
    }
})