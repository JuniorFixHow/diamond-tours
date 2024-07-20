import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colours } from '../utils/Colours';
import PhoneInput from 'react-native-phone-number-input';
import {Entypo, Ionicons, AntDesign} from '@expo/vector-icons';
import DropDown from '../misc/DropDown';


const FlightForm = () => {
    const TRIPS:string[] = ['One Way', 'Round Trip', 'Multicity'];
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [formattedNumber, setFormattedNumber] = useState<string>('');
    const [passengers, setPassengers] = useState<number>(0);
    const [selectedTrip, setSelectedTrip] = useState<string>(TRIPS[0]);
    const [isValid, setIsValid] = useState<boolean>(false);
    const phone = useRef<PhoneInput>(null);

    useEffect(()=>{
        if(formattedNumber !== '' && phone){

            const checkValid = phone?.current?.isValidNumber(phoneNumber)
            if(checkValid){
            setIsValid(true);
            setFormattedNumber('+'+phone?.current?.state?.code+phoneNumber);
            }
            else{
                setIsValid(false);
            }
        }
        else{
            setIsValid(false);
        }
    }, [phoneNumber, phone, formattedNumber])

  return (
    <View style={{width:'100%', alignSelf:'center', gap:8, flexDirection:'column'}} >
      <View style={{width:'100%', alignItems:'center', flexDirection:'row', justifyContent:'space-between'}} >
            <Text style={{fontSize:26, color:'#cb4900', fontWeight:'700'}} >Personal Information</Text>
            {/* <Pressable onPress={()=>setShowForm(false)} >
                <Entypo name="cross" size={24} color="crimson" />
            </Pressable> */}
        </View>
      <View style={{width:'100%', flexDirection:'column', gap:8}} >
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%'}} >
            <Text style={styles.label} >Passport name</Text>
            <TextInput placeholder='type here' cursorColor='black' style={styles.input} />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', }} >
            <Text style={styles.label} >Email <Text style={{color:'grey', fontSize:12}} >(leave this field to use your primary email)</Text></Text>
            <TextInput placeholder='type here' cursorColor='black' keyboardType='email-address' style={styles.input} />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', }} >
            <Text style={styles.label} >Trip type</Text>
            <DropDown selected={selectedTrip} onTap={setSelectedTrip} data={TRIPS} />
        </KeyboardAvoidingView>
        <View style={{flexDirection:'column', gap:5, width:'100%', }} >
            <Text style={styles.label} >Phone number</Text>
            <View style={styles.valid} >
                <PhoneInput
                    ref={phone}
                    defaultValue={phoneNumber}
                    defaultCode="GH"
                    layout="first"
                    onChangeText={(text) => {
                    setPhoneNumber(text);
                    }}
                    onChangeFormattedText={(text:string) => 
                        setFormattedNumber(text)
                    }
                    withDarkTheme
                    // withShadow
                    // autoFocus
                    containerStyle={styles.inputWrap}
                    textContainerStyle={{backgroundColor:'white'}}
                />
                
                {
                    !isValid ?
                    <Entypo name="cross" size={24} color="crimson" />
                    :
                    <Ionicons name="checkmark-circle-outline" size={24} color="green" />
                }
        </View>
        </View>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
            <Text style={styles.label} >Passport number</Text>
            <TextInput placeholder='type here' cursorColor='black' keyboardType='name-phone-pad' style={styles.input} />
        </KeyboardAvoidingView>
        <View style={styles.increase} >
            <View style={{flexDirection:'column', gap:2}} >
                <Text style={styles.label} >Passengers</Text>
                {/* <Text style={[MyStyles.greySmall, {fontSize:12}]}>18 and above</Text> */}
            </View>
            <View style={{gap:10, flexDirection:'row', alignItems:'center'}} >
                <TouchableOpacity onPress={()=>passengers >=1 && setPassengers(pre=>pre-1) } >
                    <AntDesign name="minuscircleo" size={20} color="black" />
                </TouchableOpacity>
                <Text>{passengers}</Text>
                <TouchableOpacity onPress={()=>setPassengers(pre=>pre+1)}  >
                    <AntDesign name="pluscircleo" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
      </View>
      
    </View>
  )
}

export default FlightForm

const styles = StyleSheet.create({
    inputWrap:{
        borderRadius:6,
        borderWidth:1,
        borderColor:Colours.grey,
        paddingRight:5,
        width:'93%',
        padding:0,
        // paddingVertical:6,
        // paddingHorizontal:8,
        fontSize:16,
        height:50,
    },
    increase: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        elevation: 5,
        backgroundColor: "white",
        borderRadius:5,
      },
    valid:{
        flexDirection:'row',
        // gap:2,
        alignItems:'center',
        width:'100%',
        justifyContent:'space-between',
        // borderRadius:6,
        // borderWidth:1,
        // borderColor:Colours.grey,
        // paddingHorizontal:8,
    },
    btn:{
        borderRadius:8,
        backgroundColor:'#cb4900',
        paddingVertical:10,
        alignItems:'center'
    },
    input:{
        borderRadius:6,
        borderWidth:1,
        borderColor:Colours.grey,
        paddingVertical:6,
        paddingHorizontal:8,
        fontSize:16
    },
    label:{
        color:Colours.black,
        fontSize:17,
    }
})