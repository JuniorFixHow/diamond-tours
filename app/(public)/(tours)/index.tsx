import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput,  View } from 'react-native'
import React, { useState } from 'react'
import { MyStyles } from '../../../utils/Styles'
import { TouristSites } from '../../../utils/DummyData'
import { useRouter } from 'expo-router'
import { Entypo, MaterialIcons, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Colours } from '../../../utils/Colours'
import { TourDataProps, TouristSiteProps } from '../../../types/Types'
import ToursFilter from '../../../common/ToursFilter'
import ToursList from '../../../common/ToursList'
import { useFetchTours } from '../../../hooks/useFetchTour'
import { UniqueTours } from '../../../functions/Unique'
import { SearchTour } from '../../../functions/search'
import Loader from '../../../misc/Loader'

const index = () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string | number>('All')
  const [search, setSearch] = useState<string>('')
  const [price, setPrice] = useState<number>(0);
  const [rate, setRate] = useState<number | string>('All');
  const [closeFilter, setCloseFilter] = useState<boolean>(false);
  const {tours, toursLoading} = useFetchTours();

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
      <ToursFilter search={search} country={selectedCountry} setCountry={setSelectedCountry} clearFilter={clearFilter} setPrice={setPrice} price={price} rate={rate} setRate={setRate} setCloseFilter={setCloseFilter} />
      }
      <View style={{width:'90%',  marginTop:50, alignSelf:'center',  flexDirection:'column', gap:20}} >
        <View style={{width:'100%', position:'relative', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'center'}} >
            <Pressable style={{position:'absolute', left:0}} onPress={()=>router.back()} >
                <Ionicons name="arrow-back" size={24} color={Colours.black} />
            </Pressable>
            <Text style={MyStyles.welcomeText} >Tourist Sites</Text>
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
          tours.length > 0 &&
          <ScrollView showsHorizontalScrollIndicator={false} horizontal >
            <View style={{flexDirection:'row', width:'100%', gap:10, alignItems:'center', paddingRight:50,}} >
              {
                UniqueTours(tours).map((item:string)=>(
                  <Pressable onPress={()=>setSelectedCountry(item)} style={{alignItems:'center', height:40, flexDirection:'column', justifyContent:'center', backgroundColor: selectedCountry === item ? '#cb4900':'white', borderRadius:30, paddingHorizontal:30}} key={item} >
                    <Text style={{color:selectedCountry === item? 'white' : Colours.black, fontSize:16}} >{item}</Text>
                  </Pressable>
                ))
              }
            </View>
          </ScrollView>
        }
            {
              (tours.length < 1 && toursLoading) ?
              <Loader />
              :
            <ToursList data={SearchTour(tours, search, selectedCountry.toString(), price, rate)} />
            }
        

      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
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
  widget:{
    height:170,
    width:150,
    backgroundColor:'white',
    padding:4,
    borderRadius:12,
    gap:8
}
})