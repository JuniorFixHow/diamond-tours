import { Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colours } from '../utils/Colours';
import PhoneInput from 'react-native-phone-number-input';
import {Entypo, Ionicons, AntDesign} from '@expo/vector-icons';
import DropDown from '../misc/DropDown';
import { MyStyles } from '../utils/Styles';
import Button from '../misc/Button';
import { AirlineProps } from '../types/Types';
import { formatDateDiff } from '../functions/Date';
import { Airlines } from '../utils/DummyData';

type EditFlightProps = {
    flightId:string,
}

const EditFlight = ({flightId}:EditFlightProps) => {
    const [currentFlight, setCurrentFlight] = useState<AirlineProps | null>(null);
    const TRIPS:string[] = ['One Way', 'Round Trip', 'Multicity'];
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [formattedNumber, setFormattedNumber] = useState<string>('');
    const [passengers, setPassengers] = useState<number>(0);
    const [selectedTrip, setSelectedTrip] = useState<string>(TRIPS[0]);
    const [isValid, setIsValid] = useState<boolean>(false);
    const phone = useRef<PhoneInput>(null);

    useEffect(()=>{
        if(flightId){
            setCurrentFlight(Airlines.filter((item:AirlineProps)=>item.id.toString() === flightId)[0]);
        }
    },[flightId])

    // console.log(currentFlight);
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

    <View style={{flexDirection:'row', width:'80%', gap:5, alignItems:'flex-start'}} >
        <Image style={{width:50, height:50, borderRadius:8}} alt='image' source={{uri:currentFlight?.image}} />
        <View  style={{flexDirection:'column', gap:5,}} >
        <Text style={[MyStyles.greySmall, {color:Colours.black}]} >{currentFlight?.name}</Text>
        <View style={{width:'100%', alignItems:'center', flexDirection:'column'}} >
            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
            <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                <Ionicons name="time-outline" size={16} color="grey" />
                <Text style={MyStyles.greyXsmall}>{currentFlight && formatDateDiff(currentFlight?.departureTime, currentFlight?.arrivalTime)}</Text>
            </View>
            <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>

            <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                <View style={styles.circle} />
                <View style={styles.line} />
                <View style={styles.circle} />
            </View>

            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
            <Text style={MyStyles.blackSmall} >{currentFlight?.from.slice(0,3).toUpperCase()}</Text>
            <Text style={MyStyles.greyXsmall} >{currentFlight && new Date(currentFlight?.departureTime).toLocaleDateString()}</Text>
            <Text style={MyStyles.blackSmall} >{currentFlight?.to.slice(0,3).toUpperCase()}</Text>
            </View>
        </View>
        </View>
    </View>     

    <View style={{flexDirection:'row', width:'80%', gap:5, marginTop:20, alignItems:'flex-start'}} >
        <Image style={{width:50, height:50, borderRadius:8}} alt='image' source={{uri:currentFlight?.image}} />
        <View  style={{flexDirection:'column', gap:5,}} >
        <Text style={[MyStyles.greySmall, {color:Colours.black}]} >{currentFlight?.name}</Text>
        <View style={{width:'100%', alignItems:'center', flexDirection:'column'}} >
            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
            <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                <Ionicons name="time-outline" size={16} color="grey" />
                <Text style={MyStyles.greyXsmall}>{currentFlight && formatDateDiff(currentFlight?.departureTime, currentFlight?.arrivalTime)}</Text>
            </View>
            <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>

            <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                <View style={styles.circle} />
                <View style={styles.line} />
                <View style={styles.circle} />
            </View>

            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
            <Text style={MyStyles.blackSmall} >{currentFlight?.to.slice(0,3).toUpperCase()}</Text>
            <Text style={MyStyles.greyXsmall} >{currentFlight && new Date(currentFlight?.departureTime).toLocaleDateString()}</Text>
            <Text style={MyStyles.blackSmall} >{currentFlight?.from.slice(0,3).toUpperCase()}</Text>
            </View>
        </View>
        </View>
    </View>

    <View style={{width:'100%', alignItems:'center', flexDirection:'row', marginVertical:20, justifyContent:'space-between'}} >
        <Text style={{fontSize:20,}} >Status</Text>
        <Text style={{fontSize:20, color:'#cb4900'}} >Pending</Text>
    </View>
      <View style={{width:'100%', alignItems:'center', flexDirection:'row', justifyContent:'space-between'}} >
            <Text style={{fontSize:22, color:'dimgrey', fontWeight:'700'}} >Personal Information</Text>
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
            <Text style={styles.label} >Email</Text>
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
      
      <View style={{flexDirection:'column', gap:8, width:'100%', marginTop:20}} >
        <View style={styles.pay} >
            <Text style={{fontSize:22, color:'dimgrey', fontWeight:'700'}}>Payment Summary</Text>
            <View style={styles.payItem} >
                <View style={{flexDirection:'column', gap:1}} >
                    <Text style={styles.subtotal}>Flight</Text>
                </View>
                <Text style={styles.subtotal} >$1,600</Text>
            </View>
        </View>
        <View style={styles.pay} >
            <View style={styles.payItem} >
                <View style={{flexDirection:'column', gap:1}} >
                    <Text style={styles.subtotal}>Subtotal</Text>
                </View>
                <Text style={styles.subtotal} >$1,600</Text>
            </View>
            <View style={styles.payItem} >
                <View style={{flexDirection:'column', gap:1}} >
                    <Text style={styles.subtotal}>Service charge</Text>
                </View>
                <Text style={styles.subtotal} >$20</Text>
            </View>
            <View style={styles.payItem} >
                <View style={{flexDirection:'column', gap:1}} >
                    <Text style={styles.subtotal}>Discount</Text>
                </View>
                <Text style={styles.subtotal} >$0</Text>
            </View>
        </View>
        <View style={styles.pay} >
            <View style={styles.payItem} >
                <View style={{flexDirection:'column', gap:1}} >
                    <Text style={styles.subtotal}>Total</Text>
                </View>
                <Text style={styles.subtotal} >$1,620</Text>
            </View>     
        </View>
      </View>
        <Button text='Save Changes' onClick={()=>{}} />
        <Button text='Delete' type='danger' onClick={()=>{}} />
    </View>
  )
}

export default EditFlight

const styles = StyleSheet.create({
    line:{
        flexGrow:1,
        height:1,
        backgroundColor:'grey'
      },
    circle:{
        width:12,
        height:12,
        borderWidth:2,
        borderColor:'grey',
        borderRadius:8,
      },
      hotelDesc:{
        color:Colours.grey,
        fontSize:13,
        width: '90%'
    },
    subtotal:{
        fontSize:15,
        fontWeight:'700',
        color:'dimgrey'
    },
    payItem:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
    
    },
    pay:{
        width:'100%',
        paddingVertical:10,
        borderColor:Colours.grey,
        borderTopWidth:1,
        flexDirection:'column',
        gap:5
    },
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
        color:'dimgrey',
        fontSize:17,
    }
})