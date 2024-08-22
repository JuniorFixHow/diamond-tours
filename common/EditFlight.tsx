import { Image, KeyboardAvoidingView,  StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colours } from '../utils/Colours';
import PhoneInput from 'react-native-phone-number-input';
import {Entypo, Ionicons, AntDesign} from '@expo/vector-icons';

import Button from '../misc/Button';
import {  FlightDataProps, OrderProps } from '../types/Types';

import {  deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

type EditFlightProps = {
    itemId:string,
    data:OrderProps
}

const EditFlight = ({itemId, data}:EditFlightProps) => {
    const [currentFlight, setCurrentFlight] = useState<FlightDataProps | null>(null);
    const TRIPS:string[] = ['One Way', 'Round Trip', 'Multicity'];
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [formattedNumber, setFormattedNumber] = useState<string>('');
    const [selectedTrip, setSelectedTrip] = useState<string>(TRIPS[0]);
    const [isValid, setIsValid] = useState<boolean>(false);

    const [total, setTotal] = useState<number>(0);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [passengers, setPassengers] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [passport, setPassport] = useState<string>('');
    const [passportNum, setPassportNum] = useState<string>('');

    const [delLoading, setDelLoading] = useState<boolean>(false);


    const phone = useRef<PhoneInput>(null);
    const router = useRouter();
    const {user} = useAuth();

    useEffect(()=>{
        const FetchData = ()=>{
          if(itemId){
            const unsub = onSnapshot(doc(db, "Flights", itemId), (doc) => {
                if(!doc.exists()){
                  
                    alert('Sorry, the flight you booked for has been deleted');
                    router.back();
                }else{
                    const res = doc.data() as FlightDataProps;
                    setCurrentFlight({...res, id:doc.id});
                }
               
            });
            return ()=>{
              unsub();
            }
          }
        }
        FetchData();
    },[itemId])


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


    useEffect(()=>{
        if(currentFlight){
            const price = passengers * currentFlight.price;
            setSubTotal(price);
            // const t = st + currentFlight?.charges - discount
            if(currentFlight?.charges){
                setTotal(price + currentFlight.charges);
            }else{
                setTotal(price);
            }
        }
      },[passengers, currentFlight])

      const updatelightOrder = async()=>{
        try {
            setLoading(true);
            
            const info = {
                email:email || data?.email, 
                phone:formattedNumber || data?.phone,
                passport: passport || data?.passport, 
                passportNum: passportNum.length > 8 ? passportNum : data?.passportNum,
                userId: user?.id,
                tip:currentFlight?.tripType,
                extras:{
                  image:currentFlight?.image?.trim(),
                  amount: passengers > 1 ? total : data?.extras.amount,
                  charges:currentFlight?.charges ? currentFlight.charges : 0,
                  passengers: passengers>1 ? passengers : data?.extras.passengers,
                  tripType:currentFlight?.tripType,
                },
                createdAt: serverTimestamp()
            }
            // console.log(info)
            await updateDoc(doc(db, 'Orders', data?.id), info);
            alert('Order updated successfully ✅');
        } catch (error) {
            console.log(error);
            ToastAndroid.showWithGravityAndOffset(
                'Error occured. Please retry', 
                ToastAndroid.LONG, 
                ToastAndroid.BOTTOM, 25, 50);
        }finally{
            setLoading(false);
        }
    }

    const deleteFlightOrder = async() =>{
        try {
            setDelLoading(true);  
            await deleteDoc(doc(db, 'Orders', data?.id));
            alert('Booking deleted successfully ✅');
            router.back();
            
        } catch (error) {
            console.log(error);
            ToastAndroid.showWithGravityAndOffset(
                'Error occured. Please retry', 
                ToastAndroid.LONG, 
                ToastAndroid.BOTTOM, 25, 50);
        }finally{
            setDelLoading(false);
        }
    }


  return (
    <View style={{width:'100%', alignSelf:'center', gap:8, flexDirection:'column'}} >

<View style={{flexDirection:'column', width:'100%'}} >
            <Image source={{uri:currentFlight?.image}} style={{width:'100%', objectFit:'contain', borderRadius:10, height:180}} />
            <Text style={{fontWeight:'700', fontSize:22}} >{data?.title.slice(0,25)}</Text>
            <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
                <Text style={{fontSize:18, }} >Status</Text>
                <Text style={{fontSize:18, color:'#cb4900'}} >{data?.status}</Text>
            </View>
            <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
                <Text style={{fontSize:18, color:Colours.grey }} >{currentFlight?.tripType}</Text>
                <TouchableOpacity onPress={()=>router.navigate(`(public)/(flights)/${currentFlight?.id}`)} >
                    <Text style={{fontSize:18, color:'#cb4900', textDecorationLine:'underline', textShadowColor:'#cb4900'}} >View flight</Text>
                </TouchableOpacity>
            </View>
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
            <TextInput defaultValue={data?.passport} onChangeText={(e)=>setPassport(e)} placeholder='type here' cursorColor='black' style={styles.input} />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
            <Text style={styles.label} >Passport number</Text>
            <TextInput defaultValue={data?.passportNum} onChangeText={(e)=>setPassportNum(e)} placeholder='type here' cursorColor='black' keyboardType='name-phone-pad' style={styles.input} />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', }} >
            <Text style={styles.label} >Email</Text>
            <TextInput defaultValue={data?.email} onChangeText={(e)=>setEmail(e)} placeholder='type here' cursorColor='black' keyboardType='email-address' style={styles.input} />
        </KeyboardAvoidingView>
        {/* <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', }} >
            <Text style={styles.label} >Trip type</Text>
            <DropDown selected={selectedTrip} onTap={setSelectedTrip} data={TRIPS} />
        </KeyboardAvoidingView> */}
        <View style={{flexDirection:'column', gap:5, width:'100%', }} >
            <Text style={styles.label} >Phone number</Text>
            <View style={styles.valid} >
                <PhoneInput
                    ref={phone}
                    defaultValue={data?.phone.replace('+','')}
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
        {/* <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
            <Text style={styles.label} >Passport number</Text>
            <TextInput placeholder='type here' cursorColor='black' keyboardType='name-phone-pad' style={styles.input} />
        </KeyboardAvoidingView> */}
        <View style={styles.increase} >
            <View style={{flexDirection:'column', gap:2}} >
                <Text style={styles.label} >Passengers</Text>
                {/* <Text style={[MyStyles.greySmall, {fontSize:12}]}>18 and above</Text> */}
            </View>
            <View style={{gap:10, flexDirection:'row', alignItems:'center'}} >
                <TouchableOpacity onPress={()=>passengers >=2 && setPassengers(pre=>pre-1) } >
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
                    <Text style={{fontSize:12, color:'grey'}}>({passengers} x ${currentFlight?.price})</Text>
                </View>
                <Text style={styles.subtotal} >${currentFlight?.price}</Text>
            </View>
        </View>
        <View style={styles.pay} >
            <View style={styles.payItem} >
                <View style={{flexDirection:'column', gap:1}} >
                    <Text style={styles.subtotal}>Subtotal</Text>
                </View>
                <Text style={styles.subtotal} >${subTotal}</Text>
            </View>
            <View style={styles.payItem} >
                <View style={{flexDirection:'column', gap:1}} >
                    <Text style={styles.subtotal}>Service charge</Text>
                </View>
                <Text style={styles.subtotal} >${currentFlight?.charges ? currentFlight?.charges : 0}</Text>
            </View>
            {/* <View style={styles.payItem} >
                <View style={{flexDirection:'column', gap:1}} >
                    <Text style={styles.subtotal}>Discount</Text>
                </View>
                <Text style={styles.subtotal} >$0</Text>
            </View> */}
        </View>
        <View style={styles.pay} >
            <View style={styles.payItem} >
                <View style={{flexDirection:'column', gap:1}} >
                    <Text style={styles.subtotal}>Current Amount</Text>
                </View>
                <Text style={styles.subtotal} >${total}</Text>
            </View>     
            <View style={styles.payItem} >
                <View style={{flexDirection:'column', gap:1}} >
                    <Text style={styles.subtotal}>Booked Amount</Text>
                </View>
                <Text style={styles.subtotal} >${data?.extras?.amount}</Text>
            </View>     
        </View>
      </View>
        <Button text='Save Changes' loading={loading} onClick={updatelightOrder} />
        <Button text='Delete' type='danger' loading={delLoading} onClick={deleteFlightOrder} />
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