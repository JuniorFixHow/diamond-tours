import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colours } from '../../../../utils/Colours'
import { MyStyles } from '../../../../utils/Styles'
import { useRouter } from 'expo-router'
import {Ionicons} from '@expo/vector-icons';
import { useAuth } from '../../../../context/AuthContext'
import { splitWords } from '../../../../functions/miscfxn'

const index = () => {
  const {user} = useAuth();
    const router = useRouter();
    const profilephoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPQHstFutlfl8tgZAtY8nDWucSWEvFM5AETQ&s'
  return (
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colours.bg}]} >
      <View style={{width:'90%', flexGrow:1, marginTop:50, alignSelf:'center',  flexDirection:'column', gap:15}} >
        <View style={{width:'100%', position:'relative', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'center'}} >
              <Pressable style={{position:'absolute', left:0}} onPress={()=>router.back()} >
                  <Ionicons name="arrow-back" size={24} color={Colours.black} />
              </Pressable>
              <Text style={MyStyles.welcomeText} >Profile</Text>
        </View>
        <View style={{flexDirection:'column', flexGrow:1, width:'100%', justifyContent:'space-between'}} >
          <View style={{width:'100%', flexDirection:'column',}} >

            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
              <View style={{flexDirection:'column'}} >
                <Text style={{fontSize:20, fontWeight:'700'}}>{user?.displayName}</Text>
                <Text style={{fontSize:14, fontWeight:'300', color:'dimgrey'}}>{user?.email}</Text>
              </View>
              <Image source={{uri:user?.photoURL||profilephoto}} style={{width:80, height:80, borderRadius:40, objectFit:'cover'}} />
            </View>

            <View style={{width:'100%', flexDirection:'column', gap:5, marginTop:20,}} >
              <View style={styles.content} >
                <Text style={styles.label} >Email</Text>
                <Text style={styles.text} >{user?.email}</Text>
              </View>
              {/* <View style={styles.content} >
                <Text style={styles.label} >Phone number</Text>
                <Text style={styles.text} >{user?.phoneNumbers[0]?.toString()}</Text>
              </View> */}
              <View style={styles.content} >
                <Text style={styles.label} >Last name</Text>
                <Text style={styles.text} >{user?.displayName!?.split(' ')[0]}</Text>
              </View>
              <View style={styles.content} >
                <Text style={styles.label} >First name</Text>
                <Text style={styles.text} >{splitWords(user?.displayName!, 2)}</Text>
              </View>
            </View>
          </View>
          {
            !user?.isSocial &&
            <Pressable onPress={()=>router.navigate('(public)/(profile)/(user)/edit')} style={{width:'100%',  alignItems:'center', marginBottom:20, justifyContent:'center', paddingVertical:10, borderWidth:1, borderColor:'#cb4900', borderRadius:8}} >
              <Text style={styles.label} >Edit Profile</Text>
            </Pressable>
          }
        </View>

      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  content:{
    width:'100%', 
    flexDirection:'column', 
    gap:2,
    paddingVertical:8,
    borderBottomWidth:1,
    borderColor:'rgb(221 221 221)',
  },
  text:{
    fontSize:18,
    color:'rgb(155 155 155)'
  },
  label:{
    fontSize:20,
    color:'#cb4900',
  }
})