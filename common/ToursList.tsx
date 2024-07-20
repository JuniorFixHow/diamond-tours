import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouristSiteProps } from '../types/Types'
import { useRouter } from 'expo-router'
import {Entypo, MaterialIcons, AntDesign} from '@expo/vector-icons';
import { Colours } from '../utils/Colours';

type TourListProps = {
    data:TouristSiteProps[]
}

const ToursList = ({data}:TourListProps) => {
    const router = useRouter();
  return (
    <FlatList
    data={data}
    numColumns={2}
    style={{width:'100%', paddingBottom:70}}
    contentContainerStyle={{alignItems:'center', width:'100%',  gap:10, paddingBottom:200}}
    showsVerticalScrollIndicator={false}
    columnWrapperStyle={{justifyContent:'space-between', width:'100%'}}
    keyExtractor={(site:TouristSiteProps)=>site.id.toString()}
    renderItem={({item})=>(

      <Pressable onPress={()=>router.navigate(`(public)/(tours)/${item.id}`)} key={item.id} style={styles.widget} >
          <Image style={{width:'100%', height:90, borderRadius:12, objectFit:'cover'}} source={{uri:item?.image}} />
          <View style={{width:'90%', alignSelf:'center', flexDirection:'column', gap:5}} >
              <View style={{flexDirection:'row', justifyContent:'space-between'}} >
                  <Text style={{fontWeight:'600', fontSize:14}} >{item.name.slice(0,30)}</Text>
                  <View style={{flexDirection:'row', alignItems:'center'}} >
                      <Entypo name="star" size={15} color="gold" />
                      <Text style={{color:'grey', fontSize:14}} >{item.rating}</Text>
                  </View>
              </View>
              <View style={{flexDirection:'row', gap:10, alignItems:'center'}} >
                  <MaterialIcons name="place" size={15} color={Colours.black} />
                  <Text style={{fontSize:12, color:'grey'}} >{item.location}</Text>
              </View>
              <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                  <Text style={{color:'#cb4900', fontSize:12}} >${item.price} <Text style={{color:'grey'}} >/Visit</Text> </Text>
                  <Pressable>
                      <AntDesign name="heart" size={12} color='#cb4900' />
                  </Pressable>
                  {/* <AntDesign name="hearto" size={12} color='#cb4900' /> */}
              </View>
          </View>
      </Pressable>
    )}
  />
  )
}

export default ToursList

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