import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colours } from '../utils/Colours';
import PhoneInput from 'react-native-phone-number-input';
import {Entypo, Ionicons} from '@expo/vector-icons';

type TourFormProps = {
    setShowForm:React.Dispatch<React.SetStateAction<boolean>>;
}

const TourForm = ({setShowForm}:TourFormProps) => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [formattedNumber, setFormattedNumber] = useState<string>('');
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
            <TextInput placeholder='type here' cursorColor='black' style={styles.input} />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
            <Text style={styles.label} >Email <Text style={{color:'grey', fontSize:12}} >(leave this field to use your primary email)</Text></Text>
            <TextInput placeholder='type here' cursorColor='black' keyboardType='email-address' style={styles.input} />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
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
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
            <Text style={styles.label} >Passport number</Text>
            <TextInput placeholder='type here' cursorColor='black' keyboardType='name-phone-pad' style={styles.input} />
        </KeyboardAvoidingView>
      </View>
      <TouchableOpacity style={styles.btn} >
        <Text style={{fontSize:18, color:'white'}} >Proceed</Text>
      </TouchableOpacity>
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