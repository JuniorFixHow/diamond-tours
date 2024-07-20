import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MyStyles } from '../utils/Styles';
import {AntDesign} from '@expo/vector-icons';
import SelectInput from '../misc/SelectInput';
import Slider from '@react-native-community/slider';
import Button from '../misc/Button';

type FilterProps = {
    setCloseFilter:React.Dispatch<React.SetStateAction<boolean>>,
}

const ToursFilter = ({setCloseFilter}:FilterProps) => {
    const Countries:string[] = ['All','Ghana', 'USA', 'Nigeria', 'Canada', 'Argentina'];
    const Ratings:string[] = ['All', '5', '4', '3'];
    const [country, setCountry] = useState<string>(Countries[0]);
    const [ratings, setRatings] = useState<string>(Ratings[0]);
    const [price, setPrice] = useState<number>(0);
  return (
    <View style={styles.container} >
      <View style={{width:'90%', marginTop:20, alignItems:'center', flexDirection:'row', justifyContent:'space-between'}} >
        <View style={{alignItems:'center', flexDirection:'row', gap:10}} >
            <Pressable onPress={()=>setCloseFilter(false)} >
                <AntDesign name="close" size={24} color="black" />
            </Pressable>
            <Text style={MyStyles.welcomeText} >Filter</Text>
        </View>
        <TouchableOpacity>
            <Text style={MyStyles.greyText} >Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={{width:'90%', flexDirection:'column', gap:15}} >
        <View style={{flexDirection:'column', gap:5}} >
            <Text style={styles.label}>Country</Text>
            <SelectInput data={Countries} onTap={setCountry} selected={country} />
        </View>
        <View style={{flexDirection:'column', gap:5}} >
            <Text style={styles.label}>Rating</Text>
            <SelectInput data={Ratings} onTap={setRatings} selected={ratings} />
        </View>
        <View style={{flexDirection:'column', gap:1}} >
            <Text style={styles.label}>Price range</Text>
            <Slider
                style={{width: '100%', height: 40}}
                minimumValue={0}
                maximumValue={100}
                // lowerLimit={0}
                // upperLimit={50}
                step={5}
                minimumTrackTintColor="grey"
                maximumTrackTintColor="#cb4900"
                onValueChange={(e)=>setPrice(e)}
            />
            <Text style={{textAlign:'center'}} >${price.toFixed(2)}</Text>
        </View>
        <Button onClick={()=>{}} text='Apply' />
      </View>
    </View>
  )
}

export default ToursFilter

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