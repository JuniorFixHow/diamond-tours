import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

type ImageProp = {
    currentImage:string | null,
    setCurrentImage:React.Dispatch<React.SetStateAction<string | null>>
}
const ImageViewer = ({currentImage, setCurrentImage}:ImageProp) => {
  return (
    currentImage &&
    <View style={styles.viewer} >
        <Pressable style={{alignSelf:'flex-end'}} onPress={()=>setCurrentImage(null)} >
            <AntDesign name="close" size={24} color="crimson" />
        </Pressable>
      <Image style={{width:'100%', height:'100%'}} source={{uri:currentImage}} />
    </View>
  )
}

export default ImageViewer

const styles = StyleSheet.create({
    viewer:{
        width:'95%',
        height:'60%',
        position:'absolute',
        flexDirection:'column',
        zIndex:10,
        left:'7%',
        top:'3%',
    }
})