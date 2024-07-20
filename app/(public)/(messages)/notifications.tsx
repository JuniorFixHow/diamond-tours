import { Pressable, SafeAreaView, ScrollView, Text,  View } from "react-native";
import { Colours } from "../../../utils/Colours";
import { MyStyles } from "../../../utils/Styles";
import {Ionicons, AntDesign } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { Notis } from "../../../utils/DummyData";
import { NotificationProps } from "../../../types/Types";
import { formatDateAndTime } from "../../../functions/Date";
import { useState } from "react";

const Notifications = ()=>{
  const router = useRouter();
  const [currentNoti, setCurrentNoti] = useState<number | null>(null);

  const openNoti = (noti:number)=>{
    if(currentNoti === noti){
      setCurrentNoti(null);
    }
    else{
      setCurrentNoti(noti);
    }
  }
  return(
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colours.bg}]} >

      <View style={{width:'90%', flexGrow:1, marginTop:50, alignSelf:'center',  flexDirection:'column', gap:15}} >
        <View style={{width:'100%', position:'relative', flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'center'}} >
            <Pressable style={{position:'absolute', left:0}} onPress={()=>router.back()} >
                <Ionicons name="arrow-back" size={24} color={Colours.black} />
            </Pressable>
            <Text style={MyStyles.welcomeText} >Notifications</Text>
        </View>

        <ScrollView style={{width:'100%'}} >
          <View style={{width:'100%', flexDirection:'column', gap:15, paddingBottom:100}} >
            {
              Notis.map((noti:NotificationProps)=>(
                <View key={noti.id} style={{width:'100%', alignItems:'center', justifyContent:'space-between', flexDirection:'row', borderBottomWidth:1, borderColor:'grey', paddingBottom:10, paddingHorizontal:5}} >
                  <Pressable onPress={()=>openNoti(noti.id)} style={{flexDirection:'row', alignItems:'center', gap:8}} >
                    <AntDesign name="tag" size={24} color='#cb4900' />
                    <View style={{flexDirection:'column', width:'80%', gap:4}} >
                      <Text style={{fontWeight:noti.read?'600':'700', fontSize:20}} >{noti.title.slice(0, 30)}</Text>
                      {
                        noti.id === currentNoti &&
                        <Text style={[MyStyles.blackSmall, ]} >{noti.content}</Text>
                      }
                      <Text style={{fontSize:13, color:'grey'}} >{formatDateAndTime(new Date(noti.timestamp))}</Text>
                    </View>
                  </Pressable>
                  <Pressable>
                    <AntDesign name="close" size={24} color='grey' />
                  </Pressable>
                </View>
              ))
            }
          </View>
        </ScrollView>
        
        

      </View>
      </SafeAreaView>
  )
}

export default Notifications