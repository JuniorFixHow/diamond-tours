import { Dimensions, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput,  View } from 'react-native';
import React, { useState } from 'react'
import { MyStyles } from '../../../utils/Styles'
import { TouristSites, Hotels, Airlines } from '../../../utils/DummyData'
import { useRouter } from 'expo-router'
import { Entypo, MaterialIcons, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Colours } from '../../../utils/Colours'
import { TouristSiteProps, HotelProps, AirlineProps } from '../../../types/Types'
import ToursFilter from '../../../common/ToursFilter'
import FlightsFilter from '../../../common/FlightsFilter'
import { formatDateDiff } from '../../../functions/Date';

const {width, height} = Dimensions.get('screen');
const index = () => {
  const router = useRouter();
  const [selectedAirline, setSelectedAirline] = useState<string>('All')
  const [closeFilter, setCloseFilter] = useState<boolean>(false);
  const Countries:string[] = ['All', 'USA', 'Europe', 'Asia', 'Canada', 'Middle East', 'Ghana'];
  return (
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colours.bg, width, position:'relative'}]} >
      {
        closeFilter &&
        <FlightsFilter selectedAirline={selectedAirline} setSelectedAirline={setSelectedAirline} setCloseFilter={setCloseFilter} />
      }
      <View style={{width:'90%', flexGrow:1, marginTop:50, alignSelf:'center',  flexDirection:'column', gap:15}} >
        <View style={{width:'100%', position:'relative', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'center'}} >
            <Pressable style={{position:'absolute', left:0}} onPress={()=>router.back()} >
                <Ionicons name="arrow-back" size={24} color={Colours.black} />
            </Pressable>
            <Text style={MyStyles.welcomeText} >Flights</Text>
        </View>

        <View style={{width:'100%', alignItems:'center', justifyContent:'space-between', flexDirection:'row'}} >
          <View style={styles.searchBox} >
            <AntDesign name='search1' color='rgb(175 173 173)' size={18} />
            <TextInput placeholder='search...' style={{fontSize:16, width:'80%'}} cursorColor='black' />
          </View>
          <Pressable onPress={()=>setCloseFilter(true)} style={styles.sliders} >
            <FontAwesome name="sliders" size={24} color="white" />
          </Pressable>
        </View>

        
            
           
        <ScrollView style={{width:'100%'}} contentContainerStyle={{width:'100%'}} showsVerticalScrollIndicator={false} >
              <View style={{width:'100%', paddingBottom:200, flexDirection:'column', gap:20}} >
                {
                  Airlines.map((item:AirlineProps)=>(
                    <Pressable onPress={()=>router.navigate(`(public)/(flights)/${item.id}`)} key={item.id} style={{width:'100%', flexDirection:'column', gap:10, elevation:1, padding:20, backgroundColor:'white', borderRadius:10}} >
                      <View style={{flexDirection:'row', width:'80%', gap:5, alignItems:'flex-start'}} >
                        <Image style={{width:50, height:50, borderRadius:8}} alt='image' source={{uri:item.image}} />
                        <View  style={{flexDirection:'column', gap:5,}} >
                          <Text style={[MyStyles.greySmall, {color:Colours.black}]} >{item.name}</Text>
                          <View style={{width:'100%', alignItems:'center', flexDirection:'column'}} >
                            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                              <Text style={MyStyles.blackSmall} >{new Date(item.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                              <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                                <Ionicons name="time-outline" size={16} color="grey" />
                                <Text style={MyStyles.greyXsmall}>{formatDateDiff(item.departureTime, item.arrivalTime)}</Text>
                              </View>
                              <Text style={MyStyles.blackSmall} >{new Date(item.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                            </View>

                            <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                                <View style={styles.circle} />
                                <View style={styles.line} />
                                <View style={styles.circle} />
                            </View>

                            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                              <Text style={MyStyles.blackSmall} >{item.from.slice(0,3).toUpperCase()}</Text>
                              <Text style={MyStyles.greyXsmall} >{new Date(item.departureTime).toLocaleDateString()}</Text>
                              <Text style={MyStyles.blackSmall} >{item.to.slice(0,3).toUpperCase()}</Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={{flexDirection:'row', width:'80%', gap:5, marginTop:20, alignItems:'flex-start'}} >
                        <Image style={{width:50, height:50, borderRadius:8}} alt='image' source={{uri:item.image}} />
                        <View  style={{flexDirection:'column', gap:5,}} >
                          <Text style={[MyStyles.greySmall, {color:Colours.black}]} >{item.name}</Text>
                          <View style={{width:'100%', alignItems:'center', flexDirection:'column'}} >
                            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                              <Text style={MyStyles.blackSmall} >{new Date(item.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                              <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                                <Ionicons name="time-outline" size={16} color="grey" />
                                <Text style={MyStyles.greyXsmall}>{formatDateDiff(item.departureTime, item.arrivalTime)}</Text>
                              </View>
                              <Text style={MyStyles.blackSmall} >{new Date(item.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                            </View>

                            <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                                <View style={styles.circle} />
                                <View style={styles.line} />
                                <View style={styles.circle} />
                            </View>

                            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                              <Text style={MyStyles.blackSmall} >{item.to.slice(0,3).toUpperCase()}</Text>
                              <Text style={MyStyles.greyXsmall} >{new Date(item.departureTime).toLocaleDateString()}</Text>
                              <Text style={MyStyles.blackSmall} >{item.from.slice(0,3).toUpperCase()}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={[styles.line, {marginTop:20}]} />
                      <View style={{width:'100%', flexDirection:'row', justifyContent:'flex-end'}} >
                        <Text style={MyStyles.orangeBold} >${item.price.toLocaleString()}</Text>
                      </View>
                    </Pressable>
                  ))
                }
              </View>
            </ScrollView>
        

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