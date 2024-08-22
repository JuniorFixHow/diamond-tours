import {  Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput,  View } from 'react-native';
import React, { useState } from 'react'
import { MyStyles } from '../../../utils/Styles'
import { useRouter } from 'expo-router'
import {  AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Colours } from '../../../utils/Colours'
import { FlightDataProps } from '../../../types/Types'
import FlightsFilter from '../../../common/FlightsFilter'
import { formatDateDiff } from '../../../functions/Date';
import { useFetchFlights } from '../../../hooks/useFetchFlights';
import { SearchFlights } from '../../../functions/search';
import Loader from '../../../misc/Loader';

const index = () => {
  const router = useRouter();
  const {flights, flightLoading} = useFetchFlights();
  const [selectedAirline, setSelectedAirline] = useState<string>('All')
  const [closeFilter, setCloseFilter] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [sDate, setSDate] = useState<Date>(new Date());
  const [eDate, setEDate] = useState<Date>(new Date());
  const [search, setSearch] = useState<string>('');
  const [selectedFrom, setSelectedFrom] = useState<string>('All');
  const [selectedTo, setSelectedTo] = useState<string>('All');

  const clearFliter = () =>{
    setPrice(0);
    setSearch('');
    setSelectedFrom('All');
    setSelectedTo('All');
    setSelectedAirline('All')
    setEDate(new Date());
    setSDate(new Date());
  }

  // console.log(sDate.toLocaleDateString() === new Date(flights[0]?.departureTimestamps)?.toLocaleDateString());
  // console.log(search);
  // if( flights.length < 1 && flightLoading){
  //   return(
  //     <View style={{flex:1, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}} >
  //       <ActivityIndicator size='large' />
  //     </View>
  //   )
  // }
  return (
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colours.bg, width:'100%', position:'relative'}]} >
      {
        closeFilter &&
        <FlightsFilter 
          selectedAirline={selectedAirline} 
          setSelectedAirline={setSelectedAirline} 
          setCloseFilter={setCloseFilter} 
          price={price} setPrice={setPrice}
          selectedFrom={selectedFrom} setSelectedFrom={setSelectedFrom}
          selectedTo={selectedTo} setSelectedTo={setSelectedTo}
          sDate={sDate} setSDate={setSDate}
          eDate={eDate} setEDate={setEDate}
          search={search}
          clearFilter={clearFliter}
        />
      }
      <View style={{width:'90%',  marginTop:50, alignSelf:'center',  flexDirection:'column', gap:20}} >
        <View style={{width:'100%', position:'relative', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'center'}} >
            <Pressable style={{position:'absolute', left:0}} onPress={()=>router.back()} >
                <Ionicons name="arrow-back" size={24} color={Colours.black} />
            </Pressable>
            <Text style={MyStyles.welcomeText} >Flights</Text>
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
          (flights.length < 1 && flightLoading) ?
          <Loader />
          :
          <ScrollView style={{width:'100%'}} contentContainerStyle={{width:'100%'}} showsVerticalScrollIndicator={false} >
                <View style={{width:'100%', paddingBottom:200, flexDirection:'column', gap:20}} >
                  {
                    // flights.
                    flights?.length > 0 ?
                    SearchFlights(flights, search, selectedAirline, price, selectedFrom, selectedTo, eDate, sDate)
                    .map((item:FlightDataProps)=>(
                      <Pressable onPress={()=>router.navigate(`(public)/(flights)/${item.id}`)} key={item.id} style={{width:'100%', flexDirection:'column', gap:10, elevation:1, padding:20, backgroundColor:'white', borderRadius:10}} >
                        <View style={{flexDirection:'row', width:'80%', gap:5, alignItems:'flex-start'}} >
                          <Image style={{width:50, height:50, borderRadius:8, objectFit:'cover'}} alt='image' source={{uri:item?.image}} />
                          <View  style={{flexDirection:'column', gap:5,}} >
                            <Text style={[MyStyles.greySmall, {color:Colours.black}]} >{item.name}</Text>
                            <View style={{width:'100%', alignItems:'center', flexDirection:'column'}} >
                              <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                                <Text style={MyStyles.blackSmall} >{new Date(item?.departureTimestamps)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                                  <Ionicons name="time-outline" size={16} color="grey" />
                                  <Text style={MyStyles.greyXsmall}>{formatDateDiff(item?.departureTimestamps, item.arrivalTimestamps)}</Text>
                                </View>
                                <Text style={MyStyles.blackSmall} >{new Date(item.arrivalTimestamps)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                              </View>

                              <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                                  <View style={styles.circle} />
                                  <View style={styles.line} />
                                  <View style={styles.circle} />
                              </View>

                              <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                                <Text style={MyStyles.blackSmall} >{item.departure?.slice(0,3).toUpperCase()}</Text>
                                <Text style={MyStyles.greyXsmall} >{new Date(item.departureTimestamps)?.toLocaleDateString()}</Text>
                                <Text style={MyStyles.blackSmall} >{item.arrival?.slice(0,3).toUpperCase()}</Text>
                              </View>
                            </View>
                          </View>
                        </View>

                        {
                          item?.tripType ===  'Round Trip' &&
                          <View style={{flexDirection:'row', width:'80%', gap:5, marginTop:20, alignItems:'flex-start'}} >
                            <Image style={{width:50, height:50, borderRadius:8, objectFit:'cover'}} alt='image' source={{uri:item?.image}} />
                            <View  style={{flexDirection:'column', gap:5,}} >
                              <Text style={[MyStyles.greySmall, {color:Colours.black}]} >{item.name}</Text>
                              <View style={{width:'100%', alignItems:'center', flexDirection:'column'}} >
                                <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                                  <Text style={MyStyles.blackSmall} >{new Date(item.retturnTimestamps)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                  <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                                    <Ionicons name="time-outline" size={16} color="grey" />
                                    <Text style={MyStyles.greyXsmall}>{formatDateDiff(item?.retturnTimestamps, item.secondArrivalTimestamps)}</Text>
                                  </View>
                                  <Text style={MyStyles.blackSmall} >{new Date(item?.secondArrivalTimestamps)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                </View>

                                <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                                    <View style={styles.circle} />
                                    <View style={styles.line} />
                                    <View style={styles.circle} />
                                </View>

                                <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                                  <Text style={MyStyles.blackSmall} >{item?.arrival?.slice(0,3).toUpperCase()}</Text>
                                  <Text style={MyStyles.greyXsmall} >{new Date(item?.retturnTimestamps)?.toLocaleDateString()}</Text>
                                  <Text style={MyStyles.blackSmall} >{item?.departure?.slice(0,3).toUpperCase()}</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        }
                        {
                          item?.tripType ===  'Multicity' &&
                          <>
                          <View style={{flexDirection:'row', width:'80%', gap:5, marginTop:20, alignItems:'flex-start'}} >
                            <Image style={{width:50, height:50, borderRadius:8, objectFit:'cover'}} alt='image' source={{uri:item?.image}} />
                            <View  style={{flexDirection:'column', gap:5,}} >
                              <Text style={[MyStyles.greySmall, {color:Colours.black}]} >{item.name}</Text>
                              <View style={{width:'100%', alignItems:'center', flexDirection:'column'}} >
                                <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                                  <Text style={MyStyles.blackSmall} >{new Date(item.arrivalTimestamps)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                  <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                                    <Ionicons name="time-outline" size={16} color="grey" />
                                    <Text style={MyStyles.greyXsmall}>{formatDateDiff(item?.arrivalTimestamps, item.secondArrivalTimestamps)}</Text>
                                  </View>
                                  <Text style={MyStyles.blackSmall} >{new Date(item?.secondArrivalTimestamps)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                </View>

                                <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                                    <View style={styles.circle} />
                                    <View style={styles.line} />
                                    <View style={styles.circle} />
                                </View>

                                <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                                  <Text style={MyStyles.blackSmall} >{item?.arrival?.slice(0,3).toUpperCase()}</Text>
                                  <Text style={MyStyles.greyXsmall} >{new Date(item?.arrivalTimestamps)?.toLocaleDateString()}</Text>
                                  <Text style={MyStyles.blackSmall} >{item?.secondArrival?.slice(0,3).toUpperCase()}</Text>
                                </View>
                              </View>
                            </View>
                          </View>

                          <View style={{flexDirection:'row', width:'80%', gap:5, marginTop:20, alignItems:'flex-start'}} >
                            <Image style={{width:50, height:50, borderRadius:8, objectFit:'cover'}} alt='image' source={{uri:item?.image}} />
                            <View  style={{flexDirection:'column', gap:5,}} >
                              <Text style={[MyStyles.greySmall, {color:Colours.black}]} >{item.name}</Text>
                              <View style={{width:'100%', alignItems:'center', flexDirection:'column'}} >
                                <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                                  <Text style={MyStyles.blackSmall} >{new Date(item.secondArrivalTimestamps)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                  <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                                    <Ionicons name="time-outline" size={16} color="grey" />
                                    <Text style={MyStyles.greyXsmall}>{formatDateDiff(item?.secondArrivalTimestamps, item.thirdArrivalTimestamps)}</Text>
                                  </View>
                                  <Text style={MyStyles.blackSmall} >{new Date(item?.thirdArrivalTimestamps)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                </View>

                                <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                                    <View style={styles.circle} />
                                    <View style={styles.line} />
                                    <View style={styles.circle} />
                                </View>

                                <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                                  <Text style={MyStyles.blackSmall} >{item?.secondArrival?.slice(0,3).toUpperCase()}</Text>
                                  <Text style={MyStyles.greyXsmall} >{new Date(item?.secondArrivalTimestamps)?.toLocaleDateString()}</Text>
                                  <Text style={MyStyles.blackSmall} >{item?.thirdArrival?.slice(0,3).toUpperCase()}</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          </>
                        }

                        <View style={[styles.line, {marginTop:20}]} />
                        <View style={{width:'100%', flexDirection:'row', justifyContent:'flex-end'}} >
                          <Text style={MyStyles.orangeBold} >${item.price.toLocaleString()}</Text>
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