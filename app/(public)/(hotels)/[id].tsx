import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { MyStyles } from '../../../utils/Styles';
import {  HotelDataProps} from '../../../types/Types';
import {AntDesign, Ionicons, MaterialIcons} from '@expo/vector-icons';
import { Colours } from '../../../utils/Colours';
import ImageViewer from '../../../common/ImageViewer';
import HotelForm from '../../../common/HotelForm';
import Button from '../../../misc/Button';
import { addDoc, collection, doc, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import { makeFavourite, removeFavourite } from '../../../functions/firestore';
import { calculateDateDifference } from '../../../functions/Date';
import { db } from '../../../firebase';
import { useAuth } from '../../../context/AuthContext';

const Tour = () => {
    const param = useLocalSearchParams();
    const [currentHotel, setCurrentHotel]=useState<HotelDataProps>();
    const [currentImage, setCurrentImage]=useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [IMAGES, setIMAGES] = useState<string[]>([]);
    const [children, setChildren] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [adults, setAdults] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [formattedNumber, setFormattedNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [fullname, setFullname] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const [sDate, setSDate] = useState<Date>(new Date());
    const [eDate, setEDate] = useState<Date>(new Date());
    const [phoneNumber, setPhoneNumber] = useState<string>('');


    // const phone = useRef<PhoneInput>(null);


    const router = useRouter();
    const [isFav, setIsFav] = useState<boolean>(false);
    const {user} = useAuth();

    useEffect(()=>{
        const FetchData = ()=>{
          if(param?.id && user){
            const unsub = onSnapshot(doc(db, "Hotels", param?.id.toString()), (doc) => {
              const data = doc.data() as HotelDataProps;
              setIMAGES(data.photos.trim().split(','));
              setCurrentHotel({...data, id:doc.id});
              setIsFav(data.favourites.includes(user.id))
            });
            return ()=>{
              unsub();
            }
          }
        }
        FetchData();
    },[param?.id, user])



    //   console.log(isFav)
    const handleFavourite = ()=>{
        if(user){
            if(isFav && currentHotel){
                removeFavourite(currentHotel?.id, 'Hotels', user?.id);
            }
            else if(!isFav && currentHotel){
                makeFavourite(currentHotel?.id, 'Hotels', user?.id);
            }
        }
    }

    const clearData = ()=>{
        setEmail('');
        setFullname('');
        setFormattedNumber('');
        setPhoneNumber('');
        setAdults(0);
        setChildren(0);
        setSDate(new Date);
        setEDate(new Date);
    }

    const addHotelOrder = async()=>{
        try {
            if(fullname.trim() === '' || !isValid){
                ToastAndroid.showWithGravityAndOffset(
                    'Please enter valid details', 
                    ToastAndroid.LONG, 
                    ToastAndroid.BOTTOM, 25, 50);
            }else{
                const info = {
                    fullname, 
                    email: email.trim().length > 5 ? email : user?.email, 
                    phone:formattedNumber,
                    itemId: currentHotel?.id,
                    status:'Pending',
                    title:currentHotel?.name,
                    type:'hotel',
                    tip: calculateDateDifference(sDate, eDate),
                    userId: user?.id,
                    extras:{
                        image:currentHotel?.photos.split(',')[0].trim(),
                        amount:total,
                        charges:currentHotel?.charges ? currentHotel.charges : 0,
                        discount:currentHotel?.discount,
                        adults, children,
                        adultPrice:currentHotel?.adultPrice,
                        childPrice: currentHotel?.childPrice,
                        checkin:sDate.toDateString(),
                        checkout:eDate.toDateString(),
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
      <ImageBackground source={{uri:currentHotel?.photos.split(',')[0]}} style={MyStyles.main} >
        <SafeAreaView style={{marginTop:50, width:'100%', height:'100%', gap:70, flexDirection:'column'}} >
            <View style={{width:'90%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', alignSelf:'center'}} >
                <Pressable onPress={()=>router.back()} >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
                <TouchableOpacity onPress={handleFavourite} >
                    <AntDesign name="heart" size={20} color={isFav ? '#cb4900':'white'} />
                </TouchableOpacity>
            </View>

            <View style={styles.container} >
                {
                    currentImage &&
                    <ImageViewer currentImage={currentImage} setCurrentImage={setCurrentImage} />
                }
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{width:'100%', flexDirection:'column', gap:10, paddingBottom:300}} >
                        {
                            !showForm ?
                            <>
                            <View style={{flexDirection:'row', gap:8, alignItems:'center'}} >
                                <MaterialIcons name="place" size={15} color={Colours.black} />
                                <Text style={MyStyles.greySmall} >{currentHotel?.location}</Text>
                            </View>

                            <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between'}} >
                                <View style={{flexDirection:'column',}} >
                                    <Text style={MyStyles.welcomeText} >{currentHotel?.name}</Text>
                                </View>

                                <View style={{flexDirection:'column'}} >
                                    <Text style={{color:'#cb4900', fontSize:22}} >${currentHotel?.adultPrice}<Text style={{color:'rgb(92 91 91)'}} >/Night</Text> </Text>
                                    {/* <Text style={MyStyles.greySmall} >Estimated</Text> */}
                                </View>
                            </View>

                            <View style={{flexDirection:'column', width:'100%',}} >
                                <Text style={MyStyles.welcomeText} >Description</Text>
                                <Text style={MyStyles.greySmall} >{currentHotel?.description}</Text>
                            </View>
                            <View style={{flexDirection:'column', width:'100%', gap:10}} >
                                <Text style={MyStyles.welcomeText} >Photo Gallery</Text>
                                <View style={{width:'100%', gap:10, flexDirection:'column'}} >
                                    <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between',}} >
                                        <FlatList
                                            data={IMAGES}
                                            numColumns={3}
                                            style={{width:'100%', }}
                                            contentContainerStyle={{alignItems:'flex-start', width:'100%',  gap:10}}
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            columnWrapperStyle={{justifyContent:'flex-start', gap:10, width:'100%'}}
                                            keyExtractor={(link:string)=>link}
                                            renderItem={({item})=>(

                                            <Pressable onPress={()=> currentHotel && setCurrentImage(item.trim())} style={{width:'30%'}} >
                                                <Image source={{uri:item.trim()}} style={{width:'100%', height:100, borderRadius:10,}} />
                                            </Pressable>
                                            )}
                                        />
                                       
                                    </View>
                                </View>
                               
                            </View>
                            <Button margin text='Check out' onClick={()=>setShowForm(true)} />
                            </>
                            :
                            <>
                            {
                                currentHotel &&
                                <HotelForm 
                                    total={total} 
                                    setTotal={setTotal}
                                    subTotal={subTotal}  
                                    setSubTotal={setSubTotal}
                                    data={currentHotel } 
                                    setShowForm={setShowForm} 
                                    children={children}
                                    setChildren={setChildren}
                                    adults={adults}
                                    setAdults={setAdults}
                                    setFullname={setFullname}
                                    setEmail={setEmail}
                                    formattedNumber={formattedNumber}
                                    setFormattedNumber={setFormattedNumber}
                                    isValid={isValid} 
                                    setIsValid={setIsValid}
                                    eDate={eDate}
                                    setEDate={setEDate}
                                    sDate={sDate}
                                    setSDate={setSDate}
                                    phoneNumber={phoneNumber}
                                    setPhoneNumber={setPhoneNumber}
                                    email={email}
                                    fullname={fullname}
                                />
                            }
                            </>
                        }
                        {
                            showForm &&
                            <>
                                <View style={{flexDirection:'column', gap:8, width:'100%', marginTop:20}} >
                                    <View style={styles.pay} >
                                        <Text style={MyStyles.welcomeText}>Payment Summary</Text>
                                        <View style={styles.payItem} >
                                            <View style={{flexDirection:'column', gap:1}} >
                                                <Text style={styles.subtotal}>{currentHotel?.name}</Text>
                                                    <Text style={{fontSize:10, color:Colours.grey}} >({adults} x ${currentHotel?.adultPrice} x {calculateDateDifference(eDate, sDate)}) + ({children} x ${currentHotel?.childPrice} x {calculateDateDifference(eDate, sDate)})  + (${currentHotel?.adultPrice} x {calculateDateDifference(eDate, sDate)} )</Text>
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
                                            <Text style={styles.subtotal} >${currentHotel?.charges ? currentHotel.charges : 0}</Text>
                                        </View>
                                        <View style={styles.payItem} >
                                            <View style={{flexDirection:'column', gap:1}} >
                                                <Text style={styles.subtotal}>Discount</Text>
                                            </View>
                                            <Text style={styles.subtotal} > - %{currentHotel?.discount}</Text>
                                        </View>
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
                                <Button text='Proceed' loading={loading} onClick={addHotelOrder} />
                            </>
                        }

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
      </ImageBackground>
  )
}

export default Tour

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
    container:{
        width:'100%', padding:15, backgroundColor:'white',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        flexDirection:'column',
        position:'relative',
        // gap:10,
        flexGrow:1,
        // height:
    }
})