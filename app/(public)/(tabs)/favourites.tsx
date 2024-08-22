import { Pressable, SafeAreaView, StyleSheet, Text,  View } from 'react-native'
import React, { useState } from 'react'
import { MyStyles } from '../../../utils/Styles'
import { Colours } from '../../../utils/Colours'
import ToursList from '../../../common/ToursList'
import HotelWidget from '../../../components/HotelWidget'
import { useFetchHotels } from '../../../hooks/useFetchHotels'
import { useFetchTours } from '../../../hooks/useFetchTour'
import Loader from '../../../misc/Loader'
import { useAuth } from '../../../context/AuthContext'

const favourites = () => {
    const [activeTab, setActiveTab] = useState<string>('Tours');
    const {hotels, hotelLoading} = useFetchHotels();
    const {tours, toursLoading} = useFetchTours();
    const {user} = useAuth();
  return (
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colours.bg}]} >
      <View style={{width:'90%', marginTop:50, alignItems:'center', flexDirection:'column', gap:15}} >
        <Text style={MyStyles.welcomeText} >Favourites</Text>
        <View style={{width:'100%', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}} >
          <Pressable onPress={()=>setActiveTab('Tours')} style={{backgroundColor:activeTab==='Tours'? '#cb4900':'rgb(194 194 194)', flex:1, alignItems:'center', paddingHorizontal:10, paddingVertical:5, borderRadius:5, borderTopRightRadius:0, borderBottomRightRadius:0,}} >
            <Text style={{color:'white', fontSize:17, fontWeight:'600'}} >Tours</Text>
          </Pressable>
          <Pressable onPress={()=>setActiveTab('Hotels')} style={{backgroundColor:activeTab==='Hotels'?'#cb4900':'rgb(194 194 194)', flex:1, alignItems:'center', paddingHorizontal:10, paddingVertical:5, borderRadius:5,  borderTopLeftRadius:0, borderBottomLeftRadius:0}} >
            <Text style={{color:'white', fontSize:17, fontWeight:'600'}} >Hotels</Text>
          </Pressable>
        </View>
        {
          (tours.length < 1 && toursLoading) ?
          <Loader /> :
          <>
            {
                activeTab === 'Tours' && user &&
                <ToursList data={tours.filter((item)=>item.favourites?.includes(user?.id))} />
            }
          </>
        }

        {
          (hotels.length < 1 && hotelLoading)?
          <Loader /> :
          <>
            {
                activeTab === 'Hotels' && user &&
                <HotelWidget data={ hotels.filter((item)=>item.favourites?.includes(user?.id))} />
            }
          </>
        }
      </View>
    </SafeAreaView>
  )
}

export default favourites

const styles = StyleSheet.create({})