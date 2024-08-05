import { Image, Pressable, SafeAreaView, StyleSheet, Text,  TouchableOpacity,  View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyStyles } from '../../../utils/Styles'
import { Colours } from '../../../utils/Colours'
import { FontAwesome6, AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import {getLocales, getCalendars, useLocales,  useCalendars} from 'expo-localization';
import { useRouter } from 'expo-router';
import { useClerk, useUser } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import TermsAndConditions from '../../../misc/TAC';

const Settings = () => {
  const {signOut} = useClerk();
  const {user} = useUser();
  const [showTerms, setShowTerms] = useState<boolean>(false);
  // const locale = useLocales();
  // const formattedAmount = new Intl.NumberFormat(locale[1].languageTag, {
  //  style:'currency',
  //  currency:locale[0].currencyCode?.toString(),
  // }).format(2000);
  // console.log('local: ',formattedAmount);
  // Intl.NumberFormat()
  // useEffect(()=>{
  //   const dat = getLocales();
  //   console.log(dat);

  // },[])
  const profilephoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPQHstFutlfl8tgZAtY8nDWucSWEvFM5AETQ&s'
  const router = useRouter();
  // console.log(user?.fullName);


  return (
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colours.bg, position:'relative'}]} >
      {
        showTerms &&
      <TermsAndConditions showTerms={showTerms} setShowTerms={setShowTerms} />
      }
      <View style={{width:'100%', marginTop:50, alignItems:'center', flexDirection:'column', gap:15}} >
        <TouchableOpacity onPress={()=>router.navigate('(public)/(profile)/(user)')} style={{flexDirection:'row', paddingHorizontal:20, paddingBottom:10, borderBottomWidth:1, borderColor:'rgb(180 180 180)', width:'100%', gap:10, alignItems:'center'}} >
          <Image style={{width:80, height:80, borderRadius:40, objectFit:'cover'}} source={{uri:user?.imageUrl || profilephoto}} />
          <View style={{flexDirection:'column', gap:2, }} >
            <Text style={styles.black} >{user?.fullName}</Text>
            <Text style={styles.greyThin} >{user?.emailAddresses[0].toString()}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.content} >
          <Text style={[styles.greyThin, {paddingLeft:20}]} >Account</Text>
          <View style={styles.list} >
            <Pressable onPress={()=>router.navigate('(public)/(profile)/(user)')} style={styles.listItem} >
              <View style={{gap:10, flexDirection:'row', alignItems:'center'}} >
                <FontAwesome6 name="user-large" size={15} color="#cb4900" />
                <Text style={styles.black} >Your Proflie</Text>
              </View>
              <AntDesign name='right' size={18} color='#cb4900' />
            </Pressable>
            {/* <Pressable onPress={()=>router.navigate('(public)/(profile)/(payment)')} style={styles.listItem} >
              <View style={{gap:10, flexDirection:'row', alignItems:'center'}} >
                <FontAwesome name="credit-card" size={15} color="#cb4900" />
                <Text style={styles.black} >Payment History</Text>
              </View>
                <AntDesign name='right' size={18} color='#cb4900' />
            </Pressable> */}
            <Pressable onPress={()=>router.navigate('(public)/(profile)/(bookings)')} style={styles.listItem} >
              <View style={{gap:10, flexDirection:'row', alignItems:'center'}} >
                <FontAwesome name="shopping-cart" size={15} color="#cb4900" />
                <Text style={styles.black} >My Bookings</Text>
              </View>
                <AntDesign name='right' size={18} color='#cb4900' />
            </Pressable>
          </View>
        </View>

        <View style={styles.content} >
          <Text style={[styles.greyThin, {paddingLeft:20}]} >Help & Legal</Text>
          <View style={styles.list} >
            <Pressable onPress={()=>setShowTerms(true)} style={styles.listItem} >
              <View style={{gap:10, flexDirection:'row', alignItems:'center'}} >
                <Ionicons name="warning" size={15} color="#cb4900" />
                <Text style={styles.black} >Terms and Conditions</Text>
              </View>
                <AntDesign name='right' size={18} color='#cb4900' />
            </Pressable>
            <Pressable onPress={()=>Linking.openURL('mailto:diamondtoursgh@gmail.com')} style={styles.listItem} >
              <View style={{gap:10, flexDirection:'row', alignItems:'center'}} >
                <MaterialCommunityIcons name="email-edit-outline" size={15} color="#cb4900" />
                <Text style={styles.black} >Contact Support</Text>
              </View>
                <AntDesign name='right' size={18} color='#cb4900' />
            </Pressable>
            <Pressable onPress={()=>signOut({redirectUrl:'(public)/(auth)'})} style={styles.listItem} >
              <View style={{gap:10, flexDirection:'row', alignItems:'center'}} >
                <AntDesign name="logout" size={15} color="#cb4900" />
                <Text style={styles.black} >Logout</Text>
              </View>
                <AntDesign name='right' size={18} color='#cb4900' />
            </Pressable>
            
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
  listItem:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:10,
    borderBottomWidth:1,
    borderColor:'rgb(180 180 180)',
    paddingHorizontal:20,
  },
  list:{
    width:'100%',
    alignSelf:'center',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'center',
  },
  content:{
    width:'100%',
    flexDirection:'column',
    gap:15,
  },
  greyThin:{
    fontSize:14,
    fontWeight:'400',
    color:'rgb(180 180 180)'
  },
  black:{
    fontSize:20,
    fontWeight:'700'
  }
})