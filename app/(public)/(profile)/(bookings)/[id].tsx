import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { BookingProps } from '../../../../types/Types';
import { Bookings } from '../../../../utils/DummyData';
import { Colours } from '../../../../utils/Colours';
import { MyStyles } from '../../../../utils/Styles';
import {Ionicons} from '@expo/vector-icons';
import EditHotel from '../../../../common/EditHotel';
import EditTours from '../../../../common/EditTours';
import EditFlight from '../../../../common/EditFlight';

const Booking = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  if(!params.id) return;


  const [currentBooking, setCurrentBooking] = useState<BookingProps>();
  // console.log(params.id);
  
  useEffect(()=>{
    if(params?.data){
      setCurrentBooking(JSON.parse(params.data.toString()));
    }
  },[params?.data])

  return (
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colours.bg}]} >
      <View style={{width:'90%', flexDirection:'column', marginTop:50, alignSelf:'center', gap:20 }} >

        <View style={{width:'100%', position:'relative', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'center'}} >
              <Pressable style={{position:'absolute', left:0}} onPress={()=>router.back()} >
                  <Ionicons name="arrow-back" size={24} color={Colours.black} />
              </Pressable>
              <Text style={MyStyles.welcomeText} >Booking Info</Text>
        </View>

        <ScrollView style={{width:'100%'}} contentContainerStyle={{width:'100%'}} >
          <View style={{paddingBottom:100, padding:20, backgroundColor:'#fff', borderRadius:10, flexDirection:'column', gap:10, width:'100%'}} >
            {
              currentBooking?.mode === 'Hotel' &&
              <EditHotel />
            }
            {
              currentBooking?.mode === 'Flight' &&
              <EditFlight flightId={params?.id.toString()} />
            }
            {
              currentBooking?.mode === 'Tour' &&
              <EditTours />
            }

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Booking

const styles = StyleSheet.create({})