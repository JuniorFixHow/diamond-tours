import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TourDataProps } from '../types/Types'
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Colours } from '../utils/Colours';
import { useRouter } from 'expo-router';
import { useFetchTours } from '../hooks/useFetchTour';
import { MyStyles } from '../utils/Styles';
import { makeFavourite, removeFavourite } from '../functions/firestore';
import { useAuth } from '../context/AuthContext';

const TourWidget = () => {
    const router = useRouter();
    const {tours} = useFetchTours();
    const {user} = useAuth();
    const handleRemove = (id:string)=>{
        if(user){
            removeFavourite(id, 'Tours', user?.id); 
        }
    }
    const handleAdd = (id:string)=>{
        if(user){
            makeFavourite(id, 'Tours', user?.id); 
        }
    }
    
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{width:'100%'}} >
        <View style={{gap:10, paddingRight:30, flexDirection:'row'}} >

        {
            tours.filter(item=>item.featured).length ?
            tours.filter(item=>item.featured).map((site:TourDataProps)=>(   
            <Pressable onPress={()=>router.navigate(`(public)/(tours)/${site.id}`)} key={site.id} style={styles.widget} >
                <Image style={{width:'100%', height:90, borderRadius:12, objectFit:'cover'}} source={{uri:site?.photos?.split(',')[0]}} />
                <View style={{width:'90%', alignSelf:'center', flexDirection:'column', gap:5}} >
                    <View style={{flexDirection:'row', justifyContent:'space-between'}} >
                        <Text style={{fontWeight:'600', fontSize:14}} >{site.name.slice(0,30)}</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}} >
                            <Entypo name="star" size={15} color="gold" />
                            <Text style={{color:'grey', fontSize:14}} >{site.rating}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', gap:10, alignItems:'center'}} >
                        <MaterialIcons name="place" size={15} color={Colours.black} />
                        <Text style={{fontSize:12, color:'grey'}} >{site.location}</Text>
                    </View>
                    <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{color:'#cb4900', fontSize:12}} >${site.price} <Text style={{color:'grey'}} >/Visit</Text> </Text>
                        {
                            user &&
                            site.favourites?.includes(user?.id) ?
                            <Pressable onPress={()=>handleRemove(site?.id)} >
                                <AntDesign name="heart" size={12} color='#cb4900' />
                            </Pressable>:
                            <Pressable onPress={()=>handleAdd(site?.id)} >
                                <AntDesign name="hearto" size={12} color='#cb4900' />
                            </Pressable>
                           
                        }
                        {/* <AntDesign name="hearto" size={12} color='#cb4900' /> */}
                    </View>
                </View>
            </Pressable>
        ))
        :
        <Text style={MyStyles.welcomeText2} >No Data</Text>
    }
    </View>
    </ScrollView>
  )
}

export default TourWidget

const styles = StyleSheet.create({
    widget:{
        height:170,
        width:150,
        backgroundColor:'white',
        padding:4,
        borderRadius:12,
        gap:8
    }
})