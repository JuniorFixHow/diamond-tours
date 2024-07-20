import { Image,  SafeAreaView, ScrollView, StyleSheet, Text, Pressable, View } from 'react-native'
import React, { useState } from 'react'
import { MyStyles } from '../../../../utils/Styles'
import {Ionicons, AntDesign} from '@expo/vector-icons';
import { Colours } from '../../../../utils/Colours';
import { useRouter } from 'expo-router';
import { Bookings } from '../../../../utils/DummyData';
import { BookingProps } from '../../../../types/Types';

const index = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('All');
  return (
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colours.bg}]} >
      <View style={{width:'90%', flexDirection:'column', marginTop:50, alignSelf:'center', gap:20 }} >

        <View style={{width:'100%', position:'relative', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'center'}} >
              <Pressable style={{position:'absolute', left:0}} onPress={()=>router.back()} >
                  <Ionicons name="arrow-back" size={24} color={Colours.black} />
              </Pressable>
              <Text style={MyStyles.welcomeText} >My Bookings</Text>
        </View>

        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
          <Pressable onPress={()=>setActiveTab('All')} style={[styles.tab, {backgroundColor:activeTab==='All' ?'#cb4900':Colours.bg,}]} >
            <Text style={{color:activeTab === 'All' ? 'white':'grey', fontWeight:'700',}} >All</Text>
          </Pressable>
          <Pressable onPress={()=>setActiveTab('Pending')} style={[styles.tab, {backgroundColor:activeTab==='Pending' ?'#cb4900':Colours.bg,}]} >
            <Text style={{color:activeTab === 'Pending' ? 'white':'grey', fontWeight:'700',}} >Pending</Text>
          </Pressable>
          <Pressable onPress={()=>setActiveTab('Approved')} style={[styles.tab, {backgroundColor:activeTab==='Approved' ?'#cb4900':Colours.bg,}]} >
            <Text style={{color:activeTab === 'Approved' ? 'white':'grey', fontWeight:'700',}} >Approved</Text>
          </Pressable>
          <Pressable onPress={()=>setActiveTab('Cancelled')} style={[styles.tab, {backgroundColor:activeTab==='Cancelled' ?'#cb4900':Colours.bg,}]} >
            <Text style={{color:activeTab === 'Cancelled' ? 'white':'grey', fontWeight:'700',}} >Cancelled</Text>
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}} contentContainerStyle={{width:'100%'}} >
          <View style={{width:'100%', flexDirection:'column', gap:15, marginBottom:130}} >
            {
              Bookings.map((item:BookingProps)=>(
                <Pressable onPress={()=>router.push({pathname:`(public)/(profile)/(bookings)/${item.productId}`, params:{data:JSON.stringify(item)}})} style={{width:'100%', backgroundColor:'#fff', flexDirection:'row', gap:7, borderRadius:8, padding:4,}} key={item.id} >
                  <Image source={{uri:item?.image}} style={{width:80, height:80, borderRadius:10}} />
                  <View style={{flexDirection:'column', height:80, justifyContent:'space-between', gap:2, flexGrow:1}} >
                    <View style={{width:'85%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                      <Text style={{fontSize:14, fontWeight:'700'}} >{item?.title.slice(0,25)}</Text>
                      <View style={{backgroundColor:'#cb4900', borderRadius:6, paddingHorizontal:4, paddingVertical:4}} >
                        <Text style={{color:'#fff', fontSize:12}} >{item.status}</Text>
                      </View>
                    </View>
                    <Text style={{fontSize:11, color:'rgb(194 194 194)'}} >{item.type}</Text>
                    <View style={{width:'85%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                      <View style={{flexDirection:'row', alignItems:'center', gap:2}} >
                        <AntDesign name='calendar' size={14} color='#cb4900' />
                        <Text style={{fontSize:12, color:'#cb4900'}} >{item.date}</Text>
                      </View>
                      <View style={{flexDirection:'row', alignItems:'center', gap:2}} >
                        <Text style={{fontSize:12, color:'#cb4900'}} >View Details</Text>
                        <AntDesign name='right' size={14} color='#cb4900' />
                      </View>
                    </View>
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
  tab:{
    
    paddingHorizontal:15,
    paddingVertical:4,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center'
  }
})