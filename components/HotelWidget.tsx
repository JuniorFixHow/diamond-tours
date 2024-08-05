import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HotelDataProps } from '../types/Types'
import { Colours } from '../utils/Colours'
import {Entypo} from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import { useFetchHotels } from '../hooks/useFetchHotels';
import { MyStyles } from '../utils/Styles';

type HotelWidgetProps ={
    margins?:boolean,
    data:HotelDataProps[]
}

const HotelWidget = ({ margins, data}:HotelWidgetProps) => {
    const router = useRouter();
    const {hotels} = useFetchHotels();
    // console.log(hotels)
  return (
    <ScrollView style={{width:'100%'}} contentContainerStyle={{width:'100%'}} showsVerticalScrollIndicator={false} >
      <View style={{width:'100%', paddingBottom:margins? 750 :150, flexDirection:'column', gap:10}} >
        {
            data.length ?
            data.map((hotel:HotelDataProps)=>(
                <TouchableOpacity onPress={()=>router.navigate(`(public)/(hotels)/${hotel?.id}`)} key={hotel.id} style={styles.widget} >
                    <Image source={{uri:hotel?.photos?.split(',')[0]}} style={{height:'100%', width:120, borderRadius:10, objectFit:'cover'}} />
                    <View style={{flexDirection:'column', gap:5, flexGrow:1}} >
                        <Text style={styles.hotelName} >{hotel.name.slice(0, 30)}</Text>
                        <Text style={styles.hotelDesc} >{hotel.location.slice(0, 50)}</Text>
                        <View style={{flexDirection:'row', gap:5, alignItems:'center'}} >
                            <Entypo name="star" size={15} color="gold" />
                            <Text style={styles.hotelDesc} >{hotel.rating}-Star Hotel</Text>
                        </View>

                        <View style={{flexGrow:1, alignItems:'flex-end', justifyContent:'center',  flexDirection:'row'}} >
                            <Text style={{fontSize:13, color:'#cb4900'}} >${hotel.adultPrice}</Text>
                            <Text style={{color:Colours.black}}>/night</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))
            :
            <Text style={MyStyles.welcomeText2} >No Data</Text>
        }
      </View>
    </ScrollView>
  )
}

export default HotelWidget

const styles = StyleSheet.create({
    hotelDesc:{
        color:Colours.grey,
        fontSize:13,
        width: '90%'
    },
    hotelName:{
        fontSize:20,
        fontWeight:'600'
    },
    widget:{
        width:'100%',
        backgroundColor:'white',
        padding:4,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'flex-start',
        height:120,
        gap:8
    }
})