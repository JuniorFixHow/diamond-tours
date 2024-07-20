import { Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colours } from '../utils/Colours';
import PhoneInput from 'react-native-phone-number-input';
import {Entypo, Ionicons} from '@expo/vector-icons';
import Button from '../misc/Button';

const EditTours = () => {
    const MyPhto  = 'https://picsum.photos/id/2/800/600';
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
    <View style={{width:'100%', alignSelf:'center', gap:8, flexDirection:'column'}} >

      <View style={{flexDirection:'column', width:'100%'}} >
            <Image source={{uri:MyPhto}} style={{width:'100%', objectFit:'cover', borderRadius:10, height:180}} />
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
                <Text style={{fontWeight:'700', fontSize:22}} >Super Star Hotel</Text>
                <Text style={{fontWeight:'700', fontSize:22, color:'#cb4900'}} >$200</Text>
            </View>
            <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
                <Text style={{fontSize:18, }} >Status</Text>
                <Text style={{fontSize:18, color:'#cb4900'}} >Pending</Text>
            </View>
      </View>



      <View style={{width:'100%', flexDirection:'column', gap:8}} >
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%'}} >
            <Text style={styles.label} >Passport name</Text>
            <TextInput placeholder='type here' cursorColor='black' style={styles.input} />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
            <Text style={styles.label} >Email</Text>
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
      <Button text='Save Changes' onClick={()=>{}} />
      <Button text='Delete' type='danger' onClick={()=>{}} />

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