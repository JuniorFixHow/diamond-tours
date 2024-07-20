import { Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { MyStyles } from '../../../utils/Styles';
import {  HotelProps} from '../../../types/Types';
import { Hotels } from '../../../utils/DummyData';
import {AntDesign, Ionicons, MaterialIcons} from '@expo/vector-icons';
import { Colours } from '../../../utils/Colours';
import ImageViewer from '../../../common/ImageViewer';
import TourForm from '../../../common/TourForm';
import HotelForm from '../../../common/HotelForm';
import Button from '../../../misc/Button';

const Tour = () => {
    const param = useLocalSearchParams();
    const [currentHotel, setCurrentHotel]=useState<HotelProps>();
    const [currentImage, setCurrentImage]=useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const router = useRouter();
    useEffect(()=>{
        if(param.id){
            setCurrentHotel(Hotels.filter((item:HotelProps)=>item.id === param.id)[0])
        }
    },[param.id])
  return (
      <ImageBackground source={{uri:currentHotel?.image}} style={MyStyles.main} >
        <SafeAreaView style={{marginTop:50, width:'100%', height:'100%', gap:70, flexDirection:'column'}} >
            <View style={{width:'90%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', alignSelf:'center'}} >
                <Pressable onPress={()=>router.back()} >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
                <Pressable>
                    <AntDesign name="heart" size={20} color='white' />
                </Pressable>
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
                                    <Text style={{color:'#cb4900', fontSize:22}} >${currentHotel?.price}<Text style={{color:'rgb(92 91 91)'}} >/Visit</Text> </Text>
                                    <Text style={MyStyles.greySmall} >Estimated</Text>
                                </View>
                            </View>

                            <View style={{flexDirection:'column', width:'100%',}} >
                                <Text style={MyStyles.welcomeText} >Trip plan</Text>
                                <Text style={MyStyles.greySmall} >{currentHotel?.description}</Text>
                            </View>
                            <View style={{flexDirection:'column', width:'100%', gap:10}} >
                                <Text style={MyStyles.welcomeText} >Photo Gallery</Text>
                                <View style={{width:'100%', gap:10, flexDirection:'column'}} >
                                    <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between',}} >
                                        <Pressable onPress={()=> currentHotel && setCurrentImage(currentHotel?.image)} style={{width:'30%'}} >
                                            <Image source={{uri:currentHotel?.image}} style={{width:'100%', height:100, borderRadius:10,}} />
                                        </Pressable>
                                        <Pressable onPress={()=> currentHotel && setCurrentImage(currentHotel?.image)} style={{width:'30%'}} >
                                            <Image source={{uri:currentHotel?.image}} style={{width:'100%', height:100, borderRadius:10,}} />
                                        </Pressable>
                                        <Pressable onPress={()=> currentHotel && setCurrentImage(currentHotel?.image)} style={{width:'30%'}} >
                                            <Image source={{uri:currentHotel?.image}} style={{width:'100%', height:100, borderRadius:10,}} />
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={{width:'100%', gap:10, flexDirection:'column'}} >
                                    <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between',}} >
                                        <Pressable onPress={()=> currentHotel && setCurrentImage(currentHotel?.image)} style={{width:'30%'}} >
                                            <Image source={{uri:currentHotel?.image}} style={{width:'100%', height:100, borderRadius:10,}} />
                                        </Pressable>
                                        <Pressable onPress={()=> currentHotel && setCurrentImage(currentHotel?.image)} style={{width:'30%'}} >
                                            <Image source={{uri:currentHotel?.image}} style={{width:'100%', height:100, borderRadius:10,}} />
                                        </Pressable>
                                        <Pressable onPress={()=> currentHotel && setCurrentImage(currentHotel?.image)} style={{width:'30%'}} >
                                            <Image source={{uri:currentHotel?.image}} style={{width:'100%', height:100, borderRadius:10,}} />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                            <Button margin text='Check out' onClick={()=>setShowForm(true)} />
                            </>
                            :
                            <HotelForm setShowForm={setShowForm} />
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
                                                <Text style={{fontSize:10, color:Colours.grey}} >16 x 2 x ${currentHotel?.price}</Text>
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
                                <Button text='Proceed' onClick={()=>{}} />
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