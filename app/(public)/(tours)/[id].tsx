import { Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { MyStyles } from '../../../utils/Styles';
import { TouristSiteProps } from '../../../types/Types';
import { TouristSites } from '../../../utils/DummyData';
import {AntDesign, Ionicons, MaterialIcons} from '@expo/vector-icons';
import { Colours } from '../../../utils/Colours';
import ImageViewer from '../../../common/ImageViewer';
import TourForm from '../../../common/TourForm';
import Button from '../../../misc/Button';

const Tour = () => {
    const param = useLocalSearchParams();
    const [currentTour, setCurrentTour]=useState<TouristSiteProps>();
    const [currentImage, setCurrentImage]=useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const router = useRouter();
    useEffect(()=>{
        if(param.id){
            setCurrentTour(TouristSites.filter((item:TouristSiteProps)=>item.id === param.id)[0])
        }
    },[param.id])
  return (
      <ImageBackground source={{uri:currentTour?.image}} style={MyStyles.main} >
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
                                <Text style={MyStyles.greySmall} >{currentTour?.location}</Text>
                            </View>

                            <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between'}} >
                                <View style={{flexDirection:'column',}} >
                                    <Text style={MyStyles.welcomeText} >{currentTour?.name}</Text>
                                    <Text style={MyStyles.greySmall}>{currentTour?.from} - {currentTour?.to}</Text>
                                </View>

                                <View style={{flexDirection:'column'}} >
                                    <Text style={{color:'#cb4900', fontSize:22}} >${currentTour?.price}<Text style={{color:'rgb(92 91 91)'}} >/Visit</Text> </Text>
                                    <Text style={MyStyles.greySmall} >Estimated</Text>
                                </View>
                            </View>

                            <View style={{flexDirection:'column', width:'100%',}} >
                                <Text style={MyStyles.welcomeText} >Trip plan</Text>
                                <Text style={MyStyles.greySmall} >{currentTour?.tripPlan}</Text>
                            </View>

                            <View style={{flexDirection:'column', width:'100%', gap:10}} >
                                <Text style={MyStyles.welcomeText} >Photo Gallery</Text>
                                <View style={{width:'100%', gap:10, flexDirection:'column'}} >
                                    <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between',}} >
                                        <Pressable onPress={()=> currentTour && setCurrentImage(currentTour?.image)} style={{width:'30%'}} >
                                            <Image source={{uri:currentTour?.image}} style={{width:'100%', height:100, borderRadius:10,}} />
                                        </Pressable>
                                        <Pressable onPress={()=> currentTour && setCurrentImage(currentTour?.image)} style={{width:'30%'}} >
                                            <Image source={{uri:currentTour?.image}} style={{width:'100%', height:100, borderRadius:10,}} />
                                        </Pressable>
                                        <Pressable onPress={()=> currentTour && setCurrentImage(currentTour?.image)} style={{width:'30%'}} >
                                            <Image source={{uri:currentTour?.image}} style={{width:'100%', height:100, borderRadius:10,}} />
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={{width:'100%', gap:10, flexDirection:'column'}} >
                                    <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between',}} >
                                        <Pressable onPress={()=> currentTour && setCurrentImage(currentTour?.image)} style={{width:'30%'}} >
                                            <Image source={{uri:currentTour?.image}} style={{width:'100%', height:100, borderRadius:10,}} />
                                        </Pressable>
                                        <Pressable onPress={()=> currentTour && setCurrentImage(currentTour?.image)} style={{width:'30%'}} >
                                            <Image source={{uri:currentTour?.image}} style={{width:'100%', height:100, borderRadius:10,}} />
                                        </Pressable>
                                        <Pressable onPress={()=> currentTour && setCurrentImage(currentTour?.image)} style={{width:'30%'}} >
                                            <Image source={{uri:currentTour?.image}} style={{width:'100%', height:100, borderRadius:10,}} />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                            <Button text='Check out' onClick={()=>setShowForm(true)} margin />
                        </>
                        :
                        <TourForm setShowForm={setShowForm} />
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