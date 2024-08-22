import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput,  View } from 'react-native'
import React, { useState } from 'react'
import { MyStyles } from '../../../utils/Styles'
import { useRouter } from 'expo-router'
import { Entypo, MaterialIcons, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Colours } from '../../../utils/Colours'
import {  HotelDataProps } from '../../../types/Types'
import { useFetchHotels } from '../../../hooks/useFetchHotels'
import HotelsFilter from '../../../common/HotelsFilter'
import { UniqueHotels } from '../../../functions/Unique';
import { SearchHotel } from '../../../functions/search';
import Loader from '../../../misc/Loader';

const index = () => {
  const router = useRouter();
  const {hotels, hotelLoading} = useFetchHotels();
  const [selectedCountry, setSelectedCountry] = useState<string | number>('All')
  const [closeFilter, setCloseFilter] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('')
  const [price, setPrice] = useState<number>(0);
  const [rate, setRate] = useState<number | string>('All');

  const clearFilter = ()=>{
    setSearch('');
    setPrice(0);
    setRate('All');
    setSelectedCountry('All');
  }

  return (
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colours.bg, position:'relative'}]} >
      {
        closeFilter &&
      <HotelsFilter search={search} country={selectedCountry} setCountry={setSelectedCountry} clearFilter={clearFilter} setPrice={setPrice} price={price} rate={rate} setRate={setRate} setCloseFilter={setCloseFilter} />
      }
      <View style={{width:'90%',  gap:20, marginTop:50, alignSelf:'center',  flexDirection:'column',}} >
        <View style={{width:'100%', position:'relative', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'center'}} >
            <Pressable style={{position:'absolute', left:0}} onPress={()=>router.back()} >
                <Ionicons name="arrow-back" size={24} color={Colours.black} />
            </Pressable>
            <Text style={MyStyles.welcomeText} >Hotels</Text>
        </View>

        <View style={{width:'100%', alignItems:'center', justifyContent:'space-between', flexDirection:'row'}} >
          <View style={styles.searchBox} >
            <AntDesign name='search1' color='rgb(175 173 173)' size={18} />
            <TextInput value={search} onChangeText={(e)=>setSearch(e)} placeholder='search...' style={{fontSize:16, width:'80%'}} cursorColor='black' />
          </View>
          <Pressable onPress={()=>setCloseFilter(true)} style={styles.sliders} >
            <FontAwesome name="sliders" size={24} color="white" />
          </Pressable>
        </View>

      {
        hotels.length > 0 &&
        <ScrollView style={{width:'100%'}} showsHorizontalScrollIndicator={false} horizontal >
          <View style={{flexDirection:'row', width:'100%', gap:10, alignItems:'center', paddingRight:50,}} >
            {
              UniqueHotels(hotels).map((item:string)=>(
                <Pressable onPress={()=>setSelectedCountry(item)} style={{alignItems:'center', height:40, flexDirection:'column', justifyContent:'center', backgroundColor: selectedCountry === item ? '#cb4900':'white', borderRadius:30, paddingHorizontal:30}} key={item} >
                  <Text style={{color:selectedCountry === item? 'white' : Colours.black, fontSize:16}} >{item}</Text>
                </Pressable>
              ))
            }
          </View>
        </ScrollView>
      }
            
         {
           hotels?.length < 1 && hotelLoading ?
           <Loader />
           :
          <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{width:'100%', paddingBottom:200, flexDirection:'column', gap:10}} >
                  {
                    hotels?.length > 0 ?
                      SearchHotel(hotels, search, selectedCountry.toString(), price, rate).map((hotel:HotelDataProps)=>(
                          <Pressable onPress={()=>router.navigate(`(public)/(hotels)/${hotel.id}`)} key={hotel.id} style={styles.widget} >
                              <Image source={{uri:hotel?.photos.split(',')[0]}} style={{height:'100%', width:120, borderRadius:10, objectFit:'cover'}} />
                              <View style={{flexDirection:'column', gap:5, flexGrow:1}} >
                                  <Text style={styles.hotelName} >{hotel.name.slice(0, 30)}</Text>
                                  <Text style={styles.hotelDesc} >{hotel.location.slice(0, 50)}</Text>
                                  <View style={{flexDirection:'row', gap:5, alignItems:'center'}} >
                                      <Entypo name="star" size={15} color="gold" />
                                      <Text style={styles.hotelDesc} >{hotel.rating}-Star Hotel</Text>
                                  </View>

                                  <View style={{flexGrow:1, alignItems:'flex-end', justifyContent:'center',  flexDirection:'row'}} >
                                      <Text style={{fontSize:13, color:'#cb4900'}} >${hotel.adultPrice}</Text>
                                      <Text style={{color:Colours.black}}>/night</Text>
                                  </View>
                              </View>
                          </Pressable>
                      ))
                      :
                    <Text style={MyStyles.welcomeText2} >No Data</Text>
                  }
                </View>
          </ScrollView>
         }  
        

      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({

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