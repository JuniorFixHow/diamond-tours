import { Dimensions, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import { MyStyles } from '../../../utils/Styles'
import { TouristSites, Hotels, Airlines } from '../../../utils/DummyData'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Entypo, MaterialIcons, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Colours } from '../../../utils/Colours'
import { TouristSiteProps, HotelProps, AirlineProps } from '../../../types/Types'
import ToursFilter from '../../../common/ToursFilter'
import FlightsFilter from '../../../common/FlightsFilter'
import { formatDateDiff } from '../../../functions/Date';
import FlightForm from '../../../common/FlightForm';
import Button from '../../../misc/Button';

const {width, height} = Dimensions.get('screen');
const Flight = () => {
  const [selectedAirline, setSelectedAirline] = useState<string>('All')
  const [closeFilter, setCloseFilter] = useState<boolean>(false);
  const Countries:string[] = ['All', 'USA', 'Europe', 'Asia', 'Canada', 'Middle East', 'Ghana'];

  const param = useLocalSearchParams();
  const [currentFlight, setCurrentFlight]=useState<AirlineProps>();
  const [currentImage, setCurrentImage]=useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const router = useRouter();
  useEffect(()=>{
      if(param.id){
          setCurrentFlight(Airlines.filter((item:AirlineProps)=>item.id === param.id)[0])
      }
  },[param.id])

  return (
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colours.bg, width}]} >
      <View style={{width:'90%', flexGrow:1, marginTop:50, alignSelf:'center',  flexDirection:'column', gap:15}} >
        <View style={{width:'100%', position:'relative', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'center'}} >
            <Pressable style={{position:'absolute', left:0}} onPress={()=>router.back()} >
                <Ionicons name="arrow-back" size={24} color={Colours.black} />
            </Pressable>
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
                    <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                      <Ionicons name="time-outline" size={16} color="grey" />
                      <Text style={MyStyles.greyXsmall}>{currentFlight && formatDateDiff(currentFlight?.departureTime, currentFlight?.arrivalTime)}</Text>
                    </View>
                    <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                  </View>

                  <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                      <View style={styles.circle} />
                      <View style={styles.line} />
                      <View style={styles.circle} />
                  </View>

                  <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                    <Text style={MyStyles.blackSmall} >{currentFlight?.from.slice(0,3).toUpperCase()}</Text>
                    <Text style={MyStyles.greyXsmall} >{currentFlight && new Date(currentFlight?.departureTime).toLocaleDateString()}</Text>
                    <Text style={MyStyles.blackSmall} >{currentFlight?.to.slice(0,3).toUpperCase()}</Text>
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
                    <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    <View style={{flexDirection:'row', gap:2, alignItems:'center'}}>
                      <Ionicons name="time-outline" size={16} color="grey" />
                      <Text style={MyStyles.greyXsmall}>{currentFlight && formatDateDiff(currentFlight?.departureTime, currentFlight?.arrivalTime)}</Text>
                    </View>
                    <Text style={MyStyles.blackSmall} >{currentFlight && new Date(currentFlight?.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                  </View>

                  <View style={{width:'80%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                      <View style={styles.circle} />
                      <View style={styles.line} />
                      <View style={styles.circle} />
                  </View>

                  <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                    <Text style={MyStyles.blackSmall} >{currentFlight?.to.slice(0,3).toUpperCase()}</Text>
                    <Text style={MyStyles.greyXsmall} >{currentFlight && new Date(currentFlight?.departureTime).toLocaleDateString()}</Text>
                    <Text style={MyStyles.blackSmall} >{currentFlight?.from.slice(0,3).toUpperCase()}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* <View style={[styles.line, {marginTop:20}]} /> */}



            <View style={[styles.line, {marginTop:20}]} />
            <FlightForm />

            <View style={{flexDirection:'column', gap:8, width:'100%', marginTop:20}} >
                    <View style={styles.pay} >
                        <Text style={MyStyles.welcomeText}>Payment Summary</Text>
                        <View style={styles.payItem} >
                            <View style={{flexDirection:'column', gap:1}} >
                                <Text style={styles.subtotal}>Flight</Text>
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
            
            <Button text='Proceed' margin onClick={()=>{}} />
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