import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colours } from '../utils/Colours';
import PhoneInput from 'react-native-phone-number-input';
import {Entypo, Ionicons, AntDesign} from '@expo/vector-icons';
import RNDateTimePicker, {  DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MyStyles } from '../utils/Styles';
import { HotelDataProps } from '../types/Types';
import { calculateDateDifference } from '../functions/Date';


type HotelFormProps = {
    setShowForm:React.Dispatch<React.SetStateAction<boolean>>;
    data:HotelDataProps,
    children:number,
    setChildren:React.Dispatch<React.SetStateAction<number>>,
    adults:number,
    setAdults:React.Dispatch<React.SetStateAction<number>>,
    subTotal:number,
    setSubTotal:React.Dispatch<React.SetStateAction<number>>,
    total:number,
    setTotal:React.Dispatch<React.SetStateAction<number>>,

    setEmail:React.Dispatch<React.SetStateAction<string>>,
    setFullname:React.Dispatch<React.SetStateAction<string>>,
    formattedNumber:string,
    setFormattedNumber:React.Dispatch<React.SetStateAction<string>>,
    isValid:boolean,
    setIsValid:React.Dispatch<React.SetStateAction<boolean>>,
    sDate:Date,
    setSDate:React.Dispatch<React.SetStateAction<Date>>,
    eDate:Date,
    setEDate:React.Dispatch<React.SetStateAction<Date>>,
    phoneNumber:string,
    setPhoneNumber:React.Dispatch<React.SetStateAction<string>>,
    email:string,
    fullname:string,
}

const HotelForm = ({setShowForm, data, 
    children, setChildren, adults, 
    setAdults,  setSubTotal, 
    setTotal,  setEmail,
    email, fullname,
    setFullname, formattedNumber,
    setFormattedNumber, isValid, setIsValid,
    eDate, setEDate, sDate, setSDate,
    phoneNumber, setPhoneNumber
}:HotelFormProps) => {
    // DateTimePickerAndroid.open(params: AndroidNativeProps)
    // DateTimePickerAndroid.dismiss(mode: AndroidNativeProps['mode'])
    // const currentDate = new Date();
    // const tomorrow = new Date(new Date());
    // const [phoneNumber, setPhoneNumber] = useState<string>('');
  
    const [showStart, setShowStart] = useState<boolean>(false);
    const [showEnd, setShowEnd] = useState<boolean>(false);
    const phone = useRef<PhoneInput>(null)
    
    

    const getTomorrow = (date:Date)=>{
        return new Date(date.getTime() + (24 * 60 * 60 * 1000));
    }

    useEffect(()=>{
        setEDate(sDate)
    },[sDate])
    const handleChangeStart = (event: DateTimePickerEvent, date: Date | undefined) => {
        if (date) {
          setShowStart(false);
          setSDate(date);
        }
      };
    const handleChangeEnd = (event: DateTimePickerEvent, date: Date | undefined) => {
        if (date) {
          setShowEnd(false);
          setEDate(date);
        }
      };
    
      useEffect(()=>{
        if(data){
            const stayDays = calculateDateDifference(eDate, sDate);
            const child = children * data.childPrice * stayDays;
            const adult = adults * data.adultPrice * stayDays;
            const st = child + adult + (data.adultPrice * calculateDateDifference(eDate, sDate))
            setSubTotal(st);
            // const t = st + data?.charges - discount
            const t = st - ((data.discount/100) * st);
            if(data?.charges){
                setTotal(t + data.charges);
            }else{
                setTotal(t);
            }
        }
      },[children, adults,sDate, eDate, data])

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
    <View style={{width:'95%', alignSelf:'center', gap:15, flexDirection:'column'}} >
        <View style={{width:'100%', alignItems:'center', flexDirection:'row', justifyContent:'space-between'}} >
            <Text style={{fontSize:26, color:'#cb4900', fontWeight:'700'}} >Check out</Text>
            <Pressable onPress={()=>setShowForm(false)} >
                <Entypo name="cross" size={24} color="crimson" />
            </Pressable>
        </View>
      
      <View style={styles.content} >
        <Text style={MyStyles.welcomeText} >Personal information</Text>
        <View style={{width:'100%', flexDirection:'column', gap:8}} >
            <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%'}} >
                <Text style={styles.label} >Full name</Text>
                <TextInput value={fullname} onChangeText={(e)=>setFullname(e)} placeholder='type here' cursorColor='black' style={styles.input} />
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
      </View>
      <View style={styles.content} >
      <Text style={MyStyles.welcomeText} >Additional information</Text>
        <View style={{flexDirection:'column', gap:8, width:'100%'}} >
            <Text style={styles.label} >Guests</Text>
            <View style={styles.increase} >
                <View style={{flexDirection:'column', gap:2}} >
                    <Text style={{fontWeight:'700', fontSize:13}} >Adults</Text>
                    <Text style={[MyStyles.greySmall, {fontSize:12}]}>18 and above</Text>
                </View>
                <View style={{gap:10, flexDirection:'row', alignItems:'center'}} >
                    <TouchableOpacity onPress={()=>adults >=1 && setAdults(pre=>pre-1) } >
                        <AntDesign name="minuscircleo" size={20} color="black" />
                    </TouchableOpacity>
                    <Text>{adults}</Text>
                    <TouchableOpacity onPress={()=>setAdults(pre=>pre+1)}  >
                        <AntDesign name="pluscircleo" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.increase} >
                <View style={{flexDirection:'column', gap:2}} >
                    <Text style={{fontWeight:'700', fontSize:13}} >Children</Text>
                    <Text style={[MyStyles.greySmall, {fontSize:12}]}>Below 18</Text>
                </View>
                <View style={{gap:10, flexDirection:'row', alignItems:'center'}} >
                    <TouchableOpacity onPress={()=>children >=1 && setChildren(pre=>pre-1) } >
                        <AntDesign name="minuscircleo" size={20} color="black" />
                    </TouchableOpacity>
                    <Text>{children}</Text>
                    <TouchableOpacity onPress={()=>setChildren(pre=>pre+1)} >
                        <AntDesign name="pluscircleo" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
            <Text style={styles.label} >Check date</Text>
            <View style={{width:'100%', alignItems:'center', justifyContent:'space-between', flexDirection:'row'}} >
                <View style={{flexDirection:'column'}} >
                    <Text style={{color:Colours.grey, fontSize:13}} >Check in</Text>
                    <TouchableOpacity onPress={()=>setShowStart(true)} style={{flexDirection:'row', gap:15, alignItems:'center'}} >
                        <Text style={{fontSize:14}} >{sDate.toDateString()}</Text>
                        <AntDesign size={12} name='down' color={Colours.grey} />
                    </TouchableOpacity>
                    {
                        showStart &&
                        <RNDateTimePicker
                        testID="dateTimePicker"
                        value={sDate}
                        mode='date'
                        is24Hour={true}
                        minimumDate={new Date()}
                        onChange={handleChangeStart}
                        />
                    }
                </View>
                <View style={{width:1, height:'100%', backgroundColor:'grey'}} />
                <View style={{flexDirection:'column'}} >
                    <Text style={{color:Colours.grey, fontSize:13}} >Check out</Text>
                    <TouchableOpacity onPress={()=>setShowEnd(true)} style={{flexDirection:'row', gap:15, alignItems:'center'}} >
                        <Text style={{fontSize:14}} >{eDate.toDateString()}</Text>
                        <AntDesign size={12} name='down' color={Colours.grey} />
                    </TouchableOpacity>
                    {
                        showEnd &&
                        <RNDateTimePicker
                        testID="dateTimePicker"
                        value={eDate}
                        mode='date'
                        is24Hour={true}
                        minimumDate={sDate}
                        onChange={handleChangeEnd}
                        />
                    }
                </View>
            </View>
            {/* <TextInput placeholder='type here' cursorColor='black' keyboardType='name-phone-pad' style={styles.input} /> */}
        </KeyboardAvoidingView>
      </View>
      {/* <TouchableOpacity style={styles.btn} >
        <Text style={{fontSize:18, color:'white'}} >Proceed</Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default HotelForm

const styles = StyleSheet.create({
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
  content: {
    width: "100%",
    flexDirection: "column",
    gap: 13,
  },
  inputWrap: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colours.grey,
    paddingRight: 5,
    // paddingVertical:6,
    // paddingHorizontal:8,
    fontSize: 16,
    height: 50,
  },
  valid: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    // borderRadius:6,
    // borderWidth:1,
    // borderColor:Colours.grey,
    // paddingHorizontal:8,
  },
  btn: {
    borderRadius: 8,
    backgroundColor: "#cb4900",
    paddingVertical: 10,
    alignItems: "center",
  },
  input: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colours.grey,
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  label: {
    color: Colours.black,
    fontSize: 17,
  },
});