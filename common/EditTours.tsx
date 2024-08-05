import { Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colours } from '../utils/Colours';
import PhoneInput from 'react-native-phone-number-input';
import {Entypo, Ionicons} from '@expo/vector-icons';
import Button from '../misc/Button';
import { OrderProps } from '../types/Types';
import { db } from '../firebase';
import { deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

type EditProps = {
    itemId:string,
    data:OrderProps
}
const EditTours = ({itemId, data}:EditProps) => {
    const MyPhto  = 'https://picsum.photos/id/2/800/600';
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [formattedNumber, setFormattedNumber] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const phone = useRef<PhoneInput>(null);
    const [delLoading, setDelLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [passport, setPassport] = useState<string>('');
    const [passportNum, setPassportNum] = useState<string>('');
    const router = useRouter();

    useEffect(()=>{
        const FetchData = ()=>{
          if(itemId){
            const unsub = onSnapshot(doc(db, "Tours", itemId), (doc) => {
                if(!doc.exists()){
                  
                    alert('Sorry, the site you booked for has been deleted');
                    router.back();
                }
               
            });
            return ()=>{
              unsub();
            }
          }
        }
        FetchData();
    },[itemId])

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


    const updateTour = async() =>{
        try {
            setLoading(true);
            
                const info = {
                    email: email || data?.email, 
                    passport: passport || data?.passport, 
                    passportNum:passportNum || data?.passportNum, 
                    phone:isValid ? formattedNumber : data?.phone,
                    createdAt:serverTimestamp()
                }
                await updateDoc(doc(db, 'Orders', data?.id), info);
                alert('Booking updated successfully ✅');
            
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
    const deleteTour = async() =>{
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
            <Image source={{uri:data?.extras.image}} style={{width:'100%', objectFit:'cover', borderRadius:10, height:180}} />
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
                <Text style={{fontWeight:'700', fontSize:22}} >{data?.title?.slice(0, 25)}</Text>
                <Text style={{fontWeight:'700', fontSize:22, color:'#cb4900'}} >${data?.extras?.amount}</Text>
            </View>
            <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
                <Text style={{fontSize:18, }} >Status</Text>
                <Text style={{fontSize:18, color:'#cb4900'}} >{data?.status}</Text>
            </View>
      </View>



      <View style={{width:'100%', flexDirection:'column', gap:8}} >
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%'}} >
            <Text style={styles.label} >Passport name</Text>
            <TextInput onChangeText={(e)=>setPassport(e)} defaultValue={data?.passport} placeholder='type here' cursorColor='black' style={styles.input} />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
            <Text style={styles.label} >Passport number</Text>
            <TextInput onChangeText={(e)=>setPassportNum(e)} defaultValue={data?.passportNum} placeholder='type here' cursorColor='black' keyboardType='name-phone-pad' style={styles.input} />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
            <Text style={styles.label} >Email</Text>
            <TextInput onChangeText={(e)=>setEmail(e)} defaultValue={data?.email} placeholder='type here' cursorColor='black' keyboardType='email-address' style={styles.input} />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
            <Text style={styles.label} >Phone number</Text>
            <View style={styles.valid} >
                <PhoneInput
                    ref={phone}
                    defaultValue={data?.phone.replace('+', '')}
                    defaultCode="GH"
                    // placeholder=''
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
        </KeyboardAvoidingView>
      </View>
      <Button text='Save Changes' loading={loading} onClick={updateTour} />
      {
        data.status !== 'Approved' &&
      <Button text='Delete' type='danger' loading={delLoading} onClick={deleteTour} />
      }

    </View>
  )
}

export default EditTours

const styles = StyleSheet.create({
    inputWrap:{
        borderRadius:6,
        borderWidth:1,
        borderColor:Colours.grey,
        paddingRight:5,
        // paddingVertical:6,
        // paddingHorizontal:8,
        fontSize:16,
        height:50,
        width:'93%'
    },
    valid:{
        flexDirection:'row',
        gap:4,
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