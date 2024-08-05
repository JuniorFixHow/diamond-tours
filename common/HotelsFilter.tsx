import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MyStyles } from '../utils/Styles';
import {AntDesign} from '@expo/vector-icons';
import SelectInput from '../misc/SelectInput';
import Slider from '@react-native-community/slider';
import Button from '../misc/Button';
import { useFetchHotels } from '../hooks/useFetchHotels';
import { UniqueHotels } from '../functions/Unique';
import ViewButton from '../misc/ViewButton';
import { SearchHotel } from '../functions/search';

type FilterProps = {
    setCloseFilter:React.Dispatch<React.SetStateAction<boolean>>,
    rate:number | string,
    setRate: React.Dispatch<React.SetStateAction<string | number>>,
    price:number,
    setPrice: React.Dispatch<React.SetStateAction<number>>,
    clearFilter:()=>void,
    country:string | number,
    setCountry: React.Dispatch<React.SetStateAction<string | number>>,
    search:string,
}

const HotelsFilter = ({setCloseFilter, search, rate, setRate, country, setCountry, price, setPrice, clearFilter}:FilterProps) => {
    const Ratings: (string | number)[] = ['All', 5, 4, 3];
    const {hotels} = useFetchHotels();

  return (
    <View style={styles.container} >
      <View style={{width:'90%', marginTop:20, alignItems:'center', flexDirection:'row', justifyContent:'space-between'}} >
        <View style={{alignItems:'center', flexDirection:'row', gap:10}} >
            <Pressable onPress={()=>setCloseFilter(false)} >
                <AntDesign name="close" size={24} color="black" />
            </Pressable>
            <Text style={MyStyles.welcomeText} >Filter</Text>
        </View>
        <TouchableOpacity onPress={clearFilter} >
            <Text style={MyStyles.greyText} >Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={{width:'90%', flexDirection:'column', gap:15}} >
        <View style={{flexDirection:'column', gap:5}} >
            <Text style={styles.label}>Country</Text>
            <SelectInput data={UniqueHotels(hotels)} onTap={setCountry} selected={country} />
        </View>
        <View style={{flexDirection:'column', gap:5}} >
            <Text style={styles.label}>Rating</Text>
            <SelectInput data={Ratings} onTap={setRate} selected={rate} />
        </View>
        <View style={{flexDirection:'column', gap:1}} >
            <Text style={styles.label}>Price range</Text>
            <Slider
                style={{width: '100%', height: 40}}
                minimumValue={hotels.length && Math.min(...hotels.map(item=>item.adultPrice))}
                maximumValue={hotels.length && Math.max(...hotels.map(item=>item.adultPrice))}
                // lowerLimit={0}
                // upperLimit={50}
                step={10}
                minimumTrackTintColor="grey"
                maximumTrackTintColor="#cb4900"
                onValueChange={(e)=>setPrice(e)}
            />
            <Text style={{textAlign:'center'}} >${price.toFixed(2)}</Text>
        </View>
        {
            hotels.length > 0 &&
            <ViewButton text={SearchHotel(hotels, search, country.toString(), price, rate).length.toString() + ' results'} />
        }
      </View>
    </View>
  )
}

export default HotelsFilter

const styles = StyleSheet.create({
    label:{
        fontWeight:'600',
        fontSize:20,
    },
    container:{
        position:'absolute',
        bottom:0,
        zIndex:10,
        flexDirection:'column',
        backgroundColor:'white',
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        height:'70%',
        width:'100%',
        alignItems:'center',
        padding:10,
        gap:20,
    }
})