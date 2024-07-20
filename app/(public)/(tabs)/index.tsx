import { Pressable, SafeAreaView, StyleSheet, Text,  View } from 'react-native'
import React from 'react'
import { MyStyles } from '../../../utils/Styles'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { FontAwesome } from '@expo/vector-icons';
import HomeButn from '../../../common/HomeButn';
import { FontAwesome5, Entypo, MaterialIcons } from '@expo/vector-icons';
import TourWidget from '../../../components/TourWidget';
import HotelWidget from '../../../components/HotelWidget';
import { useRouter } from 'expo-router';
import { Hotels } from '../../../utils/DummyData';
import { Greetings } from '../../../functions/Date';
import { useAuth, useUser } from '@clerk/clerk-expo';

const index = () => {
  const router = useRouter();
  const {isSignedIn} = useAuth();
  const {user} = useUser();
  if(!isSignedIn) return null;
  return (
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colors.bg}]} >
      <View style={{flexGrow:1, marginTop:50, flexDirection:'column', gap:10, width:'90%', alignSelf:'center'}} >
        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}} >
          <View style={{ flexDirection:'column'}} >
            <Text style={MyStyles.greyText} >{Greetings()}</Text>
            <Text style={MyStyles.welcomeText} >{user?.fullName?.split(' ')[0]}</Text>
          </View>
          <View style={{alignItems:'center', flexDirection:'row', gap:10}} >

            <Pressable onPress={()=>router.navigate('(public)/(messages)/chats')} style={{position:'relative'}} >
              <Entypo name="chat" size={20} color="teal" />
            </Pressable>
            <Pressable onPress={()=>router.navigate('(public)/(messages)/notifications')} style={{position:'relative'}} >
              <FontAwesome name="bell" size={20} color="black" />
              <View style={styles.dot} />
            </Pressable>
          </View>
        </View>
        <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >

          <HomeButn text='Flights' onTap={()=>router.navigate('(public)/(flights)')} icon={<FontAwesome5 name="plane-departure" size={18} color="white" />} />
          <HomeButn text='Hotels' onTap={()=>router.navigate('(public)/(hotels)')} icon={<MaterialIcons name="other-houses" size={18} color="white" />} />
          <HomeButn text='Tours' onTap={()=>router.navigate('(public)/(tours)')} icon={<MaterialIcons name="place" size={18} color="white" />} />
        </View>

        <View style={{gap:7, flexDirection:'column', width:'100%'}} >
          <View style={{width:'100%', alignItems:'center', justifyContent:'space-between', flexDirection:'row'}} >
            <Text style={MyStyles.welcomeText} >Tourist Packages</Text>
            <Pressable onPress={()=>router.navigate('(public)/(tours)')} >
              <Text style={MyStyles.greyText} >See All</Text>
            </Pressable>
          </View>
          <TourWidget />
        </View>
        <View style={{gap:7, flexDirection:'column', width:'100%'}} >
          <View style={{width:'100%', alignItems:'center', justifyContent:'space-between', flexDirection:'row'}} >
            <Text style={MyStyles.welcomeText} >Hotels</Text>
            <Pressable onPress={()=>router.navigate('(public)/(hotels)')} >
              <Text style={MyStyles.greyText} >See All</Text>
            </Pressable>
          </View>
          <HotelWidget margins data={Hotels} />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  dot: {
    width: 12,
    height: 12,
    position: "absolute",
    top:0,
    right:0,
    backgroundColor:'#cb4900',
    borderRadius:8,
    borderWidth:1,
    borderColor:'white'
  },
});