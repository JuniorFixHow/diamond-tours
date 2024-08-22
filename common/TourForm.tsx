import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colours } from '../utils/Colours';
import PhoneInput from 'react-native-phone-number-input';
import {Entypo, Ionicons} from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import Button from '../misc/Button';
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { TourDataProps } from '../types/Types';
import { calculateDateDifference } from '../functions/Date';
import { useAuth } from '../context/AuthContext';

type TourFormProps = {
    setShowForm:React.Dispatch<React.SetStateAction<boolean>>;
    itemId: string,
}

type DataProps = {
    email:string,
    passport:string,
    passportNum:string,
    phone: string
}
const TourForm = ({setShowForm, itemId}:TourFormProps) => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [formattedNumber, setFormattedNumber] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [passport, setPassport] = useState<string>('');
    const [passportNum, setPassportNum] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const phone = useRef<PhoneInput>(null);
    const {user} = useAuth();
    const [currentTour, setCurrentTour]=useState<TourDataProps>();

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
        const FetchData = ()=>{
          if(itemId && user){
            const unsub = onSnapshot(doc(db, "Tours", itemId), (doc) => {
              const data = doc.data() as TourDataProps;
              setCurrentTour({...data, id:doc.id});
            });
            return ()=>{
              unsub();
            }
          }
        }
        FetchData();
    },[itemId, user])

//    console.log(formattedNumber)

    const clearData = ()=>{
        setPhoneNumber('');
        setEmail('');
        setPassport('');
        setPassportNum('');
    }
    const addTour = async() =>{
        try {
            setLoading(true);
            if(passport.trim() === '' || passportNum.trim().length < 8  || !isValid){
                ToastAndroid.showWithGravityAndOffset(
                    'Please enter valid details', 
                    ToastAndroid.LONG, 
                    ToastAndroid.BOTTOM, 25, 50);
            }else{
                const data = {
                    userId: user?.id,
                    itemId, type:'tour',
                    email:email.trim().length > 5 ? email : user?.email, 
                    passport, passportNum, 
                    phone:formattedNumber,
                    status:'Pending', 
                    title: currentTour?.name,
                    tip: currentTour && (calculateDateDifference(new Date(currentTour?.from), new Date(currentTour?.to))),
                    extras:{
                        image:currentTour?.photos.split(',')[0].trim(),
                        amount:currentTour?.price
                    },
                    createdAt:serverTimestamp()
                }
                await addDoc(collection(db, 'Orders'), data);
                clearData();
                alert('Order placed successfully ✅');
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.showWithGravityAndOffset(
                'Error occured. Please retry', 
                ToastAndroid.LONG, 
                ToastAndroid.TOP, 25, 50);
        }finally{
            setLoading(false);
        }
    }

  return (
    <View style={{width:'95%', alignSelf:'center', gap:8, flexDirection:'column'}} >
      <View style={{width:'100%', alignItems:'center', flexDirection:'row', justifyContent:'space-between'}} >
            <Text style={{fontSize:26, color:'#cb4900', fontWeight:'700'}} >Check out</Text>
            <Pressable onPress={()=>setShowForm(false)} >
                <Entypo name="cross" size={24} color="crimson" />
            </Pressable>
        </View>
      <View style={{width:'100%', flexDirection:'column', gap:8}} >
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%'}} >
            <Text style={styles.label} >Passport name</Text>
            <TextInput value={passport} onChangeText={(e)=>setPassport(e)} placeholder='type here' cursorColor='black' style={styles.input} />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
            <Text style={styles.label} >Passport number</Text>
            <TextInput value={passportNum} onChangeText={(e)=>setPassportNum(e)} placeholder='type here' cursorColor='black' keyboardType='name-phone-pad' style={styles.input} />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
            <Text style={styles.label} >Email <Text style={{color:'grey', fontSize:12}} >(leave this field to use your primary email)</Text></Text>
            <TextInput value={email} onChangeText={(e)=>setEmail(e)} placeholder='type here' cursorColor='black' keyboardType='email-address' style={styles.input} />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
            <Text style={styles.label} >Phone number</Text>
            <View style={styles.valid} >
                <PhoneInput
                    ref={phone}
                    defaultValue={phoneNumber}
                    defaultCode="GH"
                    value={phoneNumber}
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
      <Button loading ={loading} onClick={addTour} text='Proceed' />
    </View>
  )
}

export default TourForm

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
        color:Colours.black,
        fontSize:17,
    }
})