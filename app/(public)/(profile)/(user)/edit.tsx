import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { Colours } from '../../../../utils/Colours'
import { MyStyles } from '../../../../utils/Styles'
import { useRouter } from 'expo-router'
import {Ionicons} from '@expo/vector-icons';
import Button from '../../../../misc/Button'
import { useUser } from '@clerk/clerk-expo'

const index = () => {
    const {user} = useUser();
    const router = useRouter();
    const profilephoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPQHstFutlfl8tgZAtY8nDWucSWEvFM5AETQ&s';
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cpassword, setCPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const updateUser = async()=>{
      try {
        setLoading(true);
        await user?.update({
          lastName: lastName || user?.lastName?.toString(),
          firstName: firstName || user?.firstName?.toString(),
        })
        if(password.length > 8){
          // await user?.createPhoneNumber({phoneNumber:'+233541097145'});
          await user?.updatePassword({newPassword:password, currentPassword:cpassword});
        }else{
          ToastAndroid.showWithGravityAndOffset(
            'Password must be at least 8 character to be updated', 
            ToastAndroid.LONG, 
            ToastAndroid.TOP, 25, 50);
        }
        alert('Profile updated successfully');
      } catch (error:any) {
        console.log(error);
        alert(error.errors[0].longMessage);
      }finally{
        setLoading(false);
      }
    }
  return (
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colours.bg}]} >
      <View style={{width:'90%', flexGrow:1, marginTop:50, alignSelf:'center',  flexDirection:'column', gap:15}} >
      <View style={{width:'100%', position:'relative', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'center'}} >
          <Pressable style={{position:'absolute', left:0}} onPress={()=>router.back()} >
              <Ionicons name="arrow-back" size={24} color={Colours.black} />
          </Pressable>
          <Text style={MyStyles.welcomeText} >Edit Profile</Text>
        </View>

        <View style={{width:'100%', flexDirection:'column', flexGrow:1, justifyContent:'space-between', paddingBottom:20,}} >

          <View style={{flexDirection:'column', width:'100%', gap:20, alignItems:'center'}} >
            <View style={{width:100, height:100, alignItems:'center', justifyContent:'center', position:'relative'}} >
              <Image source={{uri:user?.imageUrl}} style={{width:'100%', height:'100%', borderRadius:50, objectFit:'cover'}} />
              {/* <Pressable style={styles.pen} >
                <Ionicons name="pencil" size={16} color="#cb4900" />
              </Pressable> */}
            </View>

            <TextInput onChangeText={(e)=>setLastName(e)} style={styles.input} defaultValue={user?.lastName?.toString()} />
            <TextInput onChangeText={(e)=>setFirstName(e)} style={styles.input} defaultValue={user?.firstName?.toString()} />
            <TextInput onChangeText={(e)=>setCPassword(e)} style={styles.input}  placeholder='enter current password' />
            <TextInput onChangeText={(e)=>setPassword(e)} style={styles.input}  placeholder='enter new password' />
          </View>

           <Button text='Save' loading={loading} onClick={updateUser} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  input:{
    backgroundColor:'#EDEDED',
    paddingVertical:8,
    paddingHorizontal:10,
    width:'100%',
    borderRadius:10,
  },
  pen:{
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    height:30,
    width:30,
    borderRadius:15,
    position:'absolute',
    bottom:0,
    right:0,
  }
})