import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { Colours } from '../../../../utils/Colours'
import { MyStyles } from '../../../../utils/Styles'
import { useRouter } from 'expo-router'
import {Ionicons} from '@expo/vector-icons';
import Button from '../../../../misc/Button'
import { useAuth } from '../../../../context/AuthContext'
import { splitfirst, splitWords } from '../../../../functions/miscfxn'
import { updatePassword, updateProfile } from 'firebase/auth'
import { auth } from '../../../../firebase'
import { validatePassword } from '../../../../functions/Validation'
import { UserProps } from '../../../../types/Types'

const index = () => {
    const {user, setUserData} = useAuth();
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
        const last = lastName || splitWords(user?.displayName!,-1);
        const first = firstName || splitfirst(user?.displayName!,2);
        await updateProfile(auth?.currentUser!,{
          displayName: first + ' ' +last,
        })
        ToastAndroid.showWithGravityAndOffset(
          'Profile updated successfully',
          ToastAndroid.LONG, 
          ToastAndroid.TOP, 25, 50);
        if(password.trim().length > 1){
          const validPass = validatePassword(password);
          if(validPass){
            if(password === cpassword){
              const profile = auth.currentUser
              profile && await updatePassword(profile, password);
              ToastAndroid.showWithGravityAndOffset(
                'Password set successfully',
                ToastAndroid.LONG, 
                ToastAndroid.TOP, 25, 50);
              }else{
                alert('Passwords mismatch!') 
              
            }
          }
        }

        const data = auth.currentUser;

        const userData :UserProps={
          id:data!.uid,
          photoURL:data?.photoURL!,
          displayName:data?.displayName!,
          phone: data?.phoneNumber!,
          emailVerified: data?.emailVerified,
          email:data?.email!
        }
        setUserData(userData);

      } catch (error:any) {
        console.log(error);
        alert('Error occured. Please retry. You may need to logout and login again');
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
              <Image source={{uri:user?.photoURL!}} style={{width:'100%', height:'100%', borderRadius:50, objectFit:'cover'}} />
              {/* <Pressable style={styles.pen} >
                <Ionicons name="pencil" size={16} color="#cb4900" />
              </Pressable> */}
            </View>

            <TextInput onChangeText={(e)=>setLastName(e)} style={styles.input} defaultValue={splitWords(user?.displayName!, -1)} />
            <TextInput onChangeText={(e)=>setFirstName(e)} style={styles.input} defaultValue={splitfirst(user?.displayName!, 2)} />
            <TextInput onChangeText={(e)=>setPassword(e)} style={styles.input}  placeholder='enter new password' />
            <TextInput onChangeText={(e)=>setCPassword(e)} style={styles.input}  placeholder='confirm new password' />
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