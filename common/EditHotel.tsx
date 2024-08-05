import { Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colours } from '../utils/Colours';
import PhoneInput from 'react-native-phone-number-input';
import {Entypo, Ionicons, AntDesign} from '@expo/vector-icons';
import RNDateTimePicker, {  DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MyStyles } from '../utils/Styles';
import Button from '../misc/Button';
import { HotelDataProps, OrderProps } from '../types/Types';
import { deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'expo-router';
import { calculateDateDifference } from '../functions/Date';

type EditProps = {
    itemId:string,
    data:OrderProps
}

const EditHotel = ({itemId, data}:EditProps) => {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [formattedNumber, setFormattedNumber] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const [sDate, setSDate] = useState<Date>(new Date());
    const [eDate, setEDate] = useState<Date>(new Date());
    const [showStart, setShowStart] = useState<boolean>(false);
    const [showEnd, setShowEnd] = useState<boolean>(false);
    const [children, setChildren] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [adults, setAdults] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [fullname, setFullname] = useState<string>('');
    const [currentHotel, setCurrentHotel] = useState<HotelDataProps>();
    const [delLoading, setDelLoading] = useState<boolean>(false);
    const phone = useRef<PhoneInput>(null);
    const MyPhto  = 'https://picsum.photos/id/2/800/600';

    const router = useRouter();
    const getTomorrow = (date:Date)=>{
        return new Date(date.getTime() + (24 * 60 * 60 * 1000));
    }

    useEffect(()=>{
        const FetchData = ()=>{
          if(itemId){
            const unsub = onSnapshot(doc(db, "Hotels", itemId), (doc) => {
                if(!doc.exists()){
                  
                    alert('Sorry, the hotel you booked for has been deleted');
                    router.back();
                }else{
                    const res = doc.data() as HotelDataProps;
                    setCurrentHotel({...res, id:doc.id});
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
        setEDate(sDate)
    },[sDate])

    // console.log(currentHotel);


    useEffect(()=>{
        if(currentHotel){
            const child = children * currentHotel.childPrice;
            const adult = adults * currentHotel.adultPrice;
            const st = child + adult + currentHotel.adultPrice
            setSubTotal(st);
            // const t = st + currentHotel?.charges - discount
            const t = st - ((currentHotel.discount/100) * st);
            if(currentHotel?.charges){
                setTotal(t + currentHotel.charges);
            }else{
                setTotal(t);
            }
        }
      },[children, adults, currentHotel])

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


    const updateHotelOrder = async()=>{
        const hasDatechanged = sDate.toLocaleDateString() !== new Date().toLocaleDateString(); 
        try {
            setLoading(true);
            const info = {
                email: email || data?.email, 
                fullname: fullname || data?.fullname, 
                phone:isValid ? formattedNumber : data?.phone,
                tip: hasDatechanged ? calculateDateDifference(sDate, eDate) : data?.tip,
                extras:{
                    adults:adults > 0 ? adults : data?.extras.adults,
                    children:children > 0 ? children : data?.extras.children,
                    checkin: sDate.toLocaleDateString() !== new Date().toLocaleDateString() ? sDate.toDateString(): data?.extras?.checkin,
                    checkout: eDate.toLocaleDateString() !== new Date().toLocaleDateString() ? eDate.toDateString(): data?.extras?.checkout,
                    amount:(children>0 || adults > 0) ? total:data.extras.amount,
                    image:currentHotel?.photos?.split(',')[0].trim()
                },

                createdAt:serverTimestamp()
            }
            await updateDoc(doc(db, 'Orders', data?.id), info);
            alert('Booking updated successfully ✅');
            // console.log(hasDatechanged);
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

    const deleteHotelOrder = async() =>{
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
            <Image source={{uri:currentHotel?.photos?.split(',')[0].trim()}} style={{width:'100%', objectFit:'cover', borderRadius:10, height:180}} />
            <Text style={{fontWeight:'700', fontSize:22}} >{data?.title.slice(0,25)}</Text>
            <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
                <Text style={{fontSize:18, }} >Status</Text>
                <Text style={{fontSize:18, color:'#cb4900'}} >{data?.status}</Text>
            </View>
        </View>
      

        <View style={styles.content} >
        <Text style={styles.head} >Personal information</Text>
        <View style={{width:'100%', flexDirection:'column', gap:8}} >
            <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%'}} >
                <Text style={styles.label} >Full name</Text>
                <TextInput defaultValue={data?.fullname} placeholder='type here' cursorColor='black' style={styles.input} />
            </KeyboardAvoidingView>
            <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
                <Text style={styles.label} >Email</Text>
                <TextInput defaultValue={data?.email} placeholder='type here' cursorColor='black' keyboardType='email-address' style={styles.input} />
            </KeyboardAvoidingView>
            <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%', flex:1}} >
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
            </KeyboardAvoidingView>
        </View>
      </View>
      <View style={styles.content} >
      <Text style={styles.head} >Additional information</Text>
        <View style={{flexDirection:'column', gap:8, width:'100%'}} >
            <Text style={styles.label} >Guests</Text>
            <View style={styles.increase} >
                <View style={{flexDirection:'column', gap:2}} >
                    <Text style={{fontWeight:'700', fontSize:13, color:'dimgrey'}} >Adults ({data?.extras?.adults})</Text>
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
                    <Text style={{fontWeight:'700', fontSize:13, color:'dimgrey'}} >Children ({data?.extras?.children})</Text>
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
                    <Text style={{color:Colours.grey, fontSize:13}} >{data?.extras?.checkin}</Text>
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
                    <Text style={{color:Colours.grey, fontSize:13}} >{data?.extras?.checkout}</Text>
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
                        minimumDate={getTomorrow(sDate)}
                        onChange={handleChangeEnd}
                        />
                    }
                </View>
            </View>
            {/* <TextInput placeholder='type here' cursorColor='black' keyboardType='name-phone-pad' style={styles.input} /> */}
        </KeyboardAvoidingView>

    
        <View style={{flexDirection:'column', gap:8, width:'100%', marginTop:20}} >
            <View style={styles.pay} >
                <Text style={styles.head}>Payment Summary</Text>
                <View style={styles.payItem} >
                    <View style={{flexDirection:'column', gap:1}} >
                        <Text style={styles.subtotal}>{currentHotel?.name?.slice(0,40)}</Text>
                        <Text style={{fontSize:10, color:Colours.grey}} >({adults} x ${currentHotel?.adultPrice}) + ({children} x ${currentHotel?.childPrice})  + ${currentHotel?.adultPrice}</Text>
                    </View>
                    <Text style={styles.subtotal} >${currentHotel?.adultPrice}</Text>
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
                    <Text style={styles.subtotal} >${currentHotel?.charges ? currentHotel?.charges : 0}</Text>
                </View>
                <View style={styles.payItem} >
                    <View style={{flexDirection:'column', gap:1}} >
                        <Text style={styles.subtotal}>Discount</Text>
                    </View>
                    <Text style={styles.subtotal} >-${currentHotel?.discount}</Text>
                </View>
            </View>
            <View style={styles.pay} >
                <View style={styles.payItem} >
                    <View style={{flexDirection:'column', gap:1}} >
                        <Text style={styles.subtotal}>Cuurent Amount</Text>
                    </View>
                    <Text style={styles.subtotal} >${total}</Text>
                </View>
                <View style={styles.payItem} >
                    <View style={{flexDirection:'column', gap:1}} >
                        <Text style={styles.subtotal}>Booked Amount</Text>
                    </View>
                    <Text style={styles.subtotal} >${data?.extras.amount}</Text>
                </View>
                
            </View>
        </View>
        <View style={{width:'100%', flexDirection:'column', gap:10, }} >
            <Button text='Save Changes' loading={loading} onClick={updateHotelOrder} />
            <Button type='danger' text='Delete' loading={delLoading} onClick={deleteHotelOrder} />
        </View>

      </View>

    </View>
  )
}

export default EditHotel

const styles = StyleSheet.create({
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
    // container:{
    //     width:'100%', padding:15, backgroundColor:'white',
    //     borderTopLeftRadius:20,
    //     borderTopRightRadius:20,
    //     flexDirection:'column',
    //     position:'relative',
    //     // gap:10,
    //     flexGrow:1,
    //     // height:
    // },
    head:{
        fontSize:22,
        color:'dimgrey',
        fontWeight:'700'
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
      content: {
        width: "100%",
        flexDirection: "column",
        gap: 13,
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
        // color:Colours.black,
        fontSize:17,
        color:'dimgrey'
    }
})