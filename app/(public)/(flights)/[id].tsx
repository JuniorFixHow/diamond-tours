import { Dimensions, Image,  SafeAreaView, ScrollView, StyleSheet, Text,  ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import { MyStyles } from '../../../utils/Styles'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {Ionicons } from '@expo/vector-icons';
import { Colours } from '../../../utils/Colours'
import { FlightDataProps } from '../../../types/Types'
import { formatDateDiff } from '../../../functions/Date';
import FlightForm from '../../../common/FlightForm';
import Button from '../../../misc/Button';
import { useFetchFlights } from '../../../hooks/useFetchFlights';
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useAuth } from '../../../context/AuthContext';

const Flight = () => {
  
  const param = useLocalSearchParams();
  const [currentFlight, setCurrentFlight]=useState<FlightDataProps>();
  const [total, setTotal] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [passengers, setPassengers] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [formattedNumber, setFormattedNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passport, setPassport] = useState<string>('');
  const [passportNum, setPassportNum] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  
  const {flights} = useFetchFlights();
  const router = useRouter();
  const {user} = useAuth();

  useEffect(()=>{
    const FetchData = ()=>{
      if(param.id){
        const unsub = onSnapshot(doc(db, "Flights", param?.id.toString()), (doc) => {
          if(doc.exists()){
            const data = doc.data() as FlightDataProps;
            setCurrentFlight({...data, id:doc.id});
          }else{
            alert('Sorry, the flight you booked has been deleted');
            router.back();
          }
            
        });
        return ()=>{
          unsub();
        }
      }
    }
    FetchData();
  },[param.id])


  const clearData = ()=>{
    setEmail('');
    setPassport('');
    setPassportNum('');
    setFormattedNumber('');
    setPassengers(0);
  }


  const addFlightOrder = async()=>{
    try {
        setLoading(true);
        if(passport.trim() === '' || passportNum.trim().length < 8 ||  !isValid){
            ToastAndroid.showWithGravityAndOffset(
                'Please enter valid details', 
                ToastAndroid.LONG, 
                ToastAndroid.BOTTOM, 25, 50);
        }else{
            const info = {
                email: email.trim().length > 5 ? email : user?.email, 
                phone:formattedNumber,
                itemId: currentFlight?.id,
                status:'Pending',
                passport, passportNum,
                title:currentFlight?.name,
                type:'flight',
                tip: currentFlight?.tripType,
                userId: user?.id,
                extras:{
                  image:currentFlight?.image?.trim(),
                  amount:total,
                  charges:currentFlight?.charges ? currentFlight.charges : 0,
                  passengers,
                  tripType:currentFlight?.tripType,
                },
                createdAt: serverTimestamp()
            }
            // console.log(info)
            await addDoc(collection(db, 'Orders'), info);
            alert('Order placed successfully ✅');
            clearData();
        }
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


  return (
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colours.bg, width:'100%'}]} >
      <View style={{width:'90%', flexGrow:1, marginTop:50, alignSelf:'center',  flexDirection:'column', gap:15}} >
        <View style={{width:'100%', position:'relative', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'center'}} >
            <TouchableOpacity style={{position:'absolute', left:0}} onPress={()=>router.back()} >
                <Ionicons name="arrow-back" size={24} color={Colours.black} />
            </TouchableOpacity>
            <Text style={MyStyles.welcomeText} >Book Flight</Text>
        </View>

        
        <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false} contentContainerStyle={{width:'100%'}} >

          <View  style={{width:'100%', paddingBottom:100, flexDirection:'column', gap:10, elevation:1, padding:20, backgroundColor:'white', borderRadius:10}} >
            <View style={{flexDirection:'row', width:'80%', gap:5, alignItems:'flex-start'}} >
              <Image style={{width:50, height:50, borderRadius:8}} alt='image' source={{uri:currentFlight?.image}} />
              <View  style={{flexDirection:'column', gap:5,}} >
                <Text style={[MyStyles.greySmall, {color:Colours.black}]} >{currentFlight?.name}</Text>
                <View style={{width:'100%', alignItems:'center', flexDirection:'column'}} >
                  <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                    <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.departureTimestamps).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                      <Ionicons name="time-outline" size={16} color="grey" />
                      <Text style={MyStyles.greyXsmall}>{currentFlight && formatDateDiff(currentFlight?.departureTimestamps, currentFlight?.arrivalTimestamps)}</Text>
                    </View>
                    <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.arrivalTimestamps).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                  </View>

                  <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                      <View style={styles.circle} />
                      <View style={styles.line} />
                      <View style={styles.circle} />
                  </View>

                  <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                    <Text style={MyStyles.blackSmall} >{currentFlight?.departure?.slice(0,3).toUpperCase()}</Text>
                    <Text style={MyStyles.greyXsmall} >{currentFlight && new Date(currentFlight?.departureTimestamps)?.toLocaleDateString()}</Text>
                    <Text style={MyStyles.blackSmall} >{currentFlight?.arrival?.slice(0,3).toUpperCase()}</Text>
                  </View>
                </View>
              </View>
            </View>

            {
              currentFlight?.tripType === 'Round Trip' &&
              <View style={{flexDirection:'row', width:'80%', gap:5, marginTop:20, alignItems:'flex-start'}} >
                <Image style={{width:50, height:50, borderRadius:8}} alt='image' source={{uri:currentFlight?.image}} />
                <View  style={{flexDirection:'column', gap:5,}} >
                  <Text style={[MyStyles.greySmall, {color:Colours.black}]} >{currentFlight?.name}</Text>
                  <View style={{width:'100%', alignItems:'center', flexDirection:'column'}} >
                    <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                      <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.departureTimestamps).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                      <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                        <Ionicons name="time-outline" size={16} color="grey" />
                        <Text style={MyStyles.greyXsmall}>{currentFlight && formatDateDiff(currentFlight?.departureTimestamps, currentFlight?.retturnTimestamps)}</Text>
                      </View>
                      <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.retturnTimestamps).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </View>

                    <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                        <View style={styles.circle} />
                        <View style={styles.line} />
                        <View style={styles.circle} />
                    </View>

                    <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                      <Text style={MyStyles.blackSmall} >{currentFlight?.arrival?.slice(0,3).toUpperCase()}</Text>
                      <Text style={MyStyles.greyXsmall} >{currentFlight && new Date(currentFlight?.retturnTimestamps).toLocaleDateString()}</Text>
                      <Text style={MyStyles.blackSmall} >{currentFlight?.departure?.slice(0,3).toUpperCase()}</Text>
                    </View>
                  </View>
                </View>
              </View>
            }


            {
              currentFlight?.tripType === 'Multicity' &&
              <>
              <View style={{flexDirection:'row', width:'80%', gap:5, marginTop:20, alignItems:'flex-start'}} >
                <Image style={{width:50, height:50, borderRadius:8}} alt='image' source={{uri:currentFlight?.image}} />
                <View  style={{flexDirection:'column', gap:5,}} >
                  <Text style={[MyStyles.greySmall, {color:Colours.black}]} >{currentFlight?.name}</Text>
                  <View style={{width:'100%', alignItems:'center', flexDirection:'column'}} >
                    <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                      <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.arrivalTimestamps).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                      <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                        <Ionicons name="time-outline" size={16} color="grey" />
                        <Text style={MyStyles.greyXsmall}>{currentFlight && formatDateDiff(currentFlight?.arrivalTimestamps, currentFlight?.secondArrivalTimestamps)}</Text>
                      </View>
                      <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.secondArrivalTimestamps).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </View>

                    <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                        <View style={styles.circle} />
                        <View style={styles.line} />
                        <View style={styles.circle} />
                    </View>

                    <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                      <Text style={MyStyles.blackSmall} >{currentFlight?.arrival?.slice(0,3).toUpperCase()}</Text>
                      <Text style={MyStyles.greyXsmall} >{currentFlight && new Date(currentFlight?.arrivalTimestamps).toLocaleDateString()}</Text>
                      <Text style={MyStyles.blackSmall} >{currentFlight?.secondArrival?.slice(0,3).toUpperCase()}</Text>
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
                      <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.secondArrivalTimestamps).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                      <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                        <Ionicons name="time-outline" size={16} color="grey" />
                        <Text style={MyStyles.greyXsmall}>{currentFlight && formatDateDiff(currentFlight?.secondArrivalTimestamps, currentFlight?.thirdArrivalTimestamps)}</Text>
                      </View>
                      <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.thirdArrivalTimestamps).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </View>

                    <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                        <View style={styles.circle} />
                        <View style={styles.line} />
                        <View style={styles.circle} />
                    </View>

                    <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                      <Text style={MyStyles.blackSmall} >{currentFlight?.secondArrival?.slice(0,3).toUpperCase()}</Text>
                      <Text style={MyStyles.greyXsmall} >{currentFlight && new Date(currentFlight?.secondArrivalTimestamps).toLocaleDateString()}</Text>
                      <Text style={MyStyles.blackSmall} >{currentFlight?.thirdArrival?.slice(0,3).toUpperCase()}</Text>
                    </View>
                  </View>
                </View>
              </View>
              </>
            }



            <Text style={{textAlign:'center'}} >{currentFlight?.departure +'  ➡️  '+ currentFlight?.arrival}  
              {/* {(currentFlight?.tripType==='Round Trip' || currentFlight?.tripType === 'Multicity') && + ' => '} */}
              {currentFlight?.tripType === 'Round Trip' && '  ➡️  '+ currentFlight?.departure}
              {currentFlight?.tripType === 'Multicity' && '  ➡️  '+ currentFlight.secondArrival}
              {currentFlight?.tripType === 'Multicity' && '  ➡️  '+ currentFlight.thirdArrival}
            </Text>
            <View style={[styles.line, {marginTop:20}]} />
            {
              currentFlight &&
            <FlightForm 
              data={currentFlight}
              passengers={passengers}
              setPassengers={setPassengers}
              setTotal={setTotal}
              setSubTotal={setSubTotal}
              email={email}
              setEmail={setEmail}
              formattedNumber={formattedNumber}
              setFormattedNumber={setFormattedNumber}
              isValid={isValid} setIsValid={setIsValid}
              passport={passport}
              setPassport={setPassport}
              passportNum={passportNum}
              setPassportNum={setPassportNum}
            />
            }

            <View style={{flexDirection:'column', gap:8, width:'100%', marginTop:20}} >
                    <View style={styles.pay} >
                        <Text style={MyStyles.welcomeText}>Payment Summary</Text>
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
                                <Text style={styles.subtotal}>Total</Text>
                            </View>
                            <Text style={styles.subtotal} >${total}</Text>
                        </View>
                        
                    </View>
            </View>
            
            <Button text='Proceed' loading={loading} margin onClick={addFlightOrder} />
          </View>
        </ScrollView>
        
            
           
        
        

      </View>
    </SafeAreaView>
  )
}

export default Flight

const styles = StyleSheet.create({
  subtotal:{
    fontSize:15,
    fontWeight:'700'
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
hotelName:{
    fontSize:20,
    fontWeight:'600'
},
widget:{
    width:'100%',
    backgroundColor:'white',
    padding:4,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'flex-start',
    height:120,
    gap:8,
    zIndex:10,
    alignSelf:'center'
},

  sliders:{
    backgroundColor:'#cb4900',
    padding:10,
    borderRadius:5,
    zIndex:10,
  },
  searchBox:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
    flexGrow:1,
    padding:10,
  },
//   widget:{
//     height:170,
//     width:150,
//     backgroundColor:'white',
//     padding:4,
//     borderRadius:12,
//     gap:8
// }
})