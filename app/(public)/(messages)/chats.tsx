import { Image, LayoutChangeEvent, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput,  View } from "react-native";
import { Colours } from "../../../utils/Colours";
import { MyStyles } from "../../../utils/Styles";
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import { useRouter } from "expo-router";
import ICON from '../../../assets/icon.png';
import { ChatsMessages } from "../../../utils/DummyData";
import { ChatProps } from "../../../types/Types";
import { formatDateAndTime } from "../../../functions/Date";
import { useRef, useState } from "react";

const Chats = ()=>{
  const router = useRouter();
  const containerRef = useRef<View>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return(
    <SafeAreaView style={[MyStyles.main, {backgroundColor:Colours.bg, position:'relative'}]} >

      <View style={{width:'90%', justifyContent:'space-between', paddingBottom:30, flexGrow:1, marginTop:50, alignSelf:'center',  flexDirection:'column', gap:15}} >
        <View style={{width:'100%', position:'relative', flexDirection:'row', gap:8, justifyContent:'center', alignItems:'center', alignSelf:'center'}} >
            <Pressable style={{position:'absolute', left:0}} onPress={()=>router.back()} >
                <Ionicons name="arrow-back" size={24} color={Colours.black} />
            </Pressable>
            <View style={{borderRadius:40, width:40, height:40, alignItems:'center', justifyContent:'center', backgroundColor:'#cb4900', padding:2}} >
              <Image source={ICON} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:40}} />
            </View>
              <Text style={MyStyles.welcomeText} >Diamond Tours</Text>
        </View>


        <View style={{height:'80%',}} >
          <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%', }} contentContainerStyle={{ flexGrow:1}} >
            <View style={{width:'100%', paddingBottom:50, flexDirection:'column', gap:10, borderRadius:20, padding:8, backgroundColor:'#FFF2F2'}} >

              {
                ChatsMessages.map((chat:ChatProps)=>(
                <View   key={chat?.id} style={chat.sent ? styles.sent :styles.received} >
                  <Text style={{fontSize:15, color:chat.sent? 'white':'black',  }} >{chat.message}</Text>
                  <View style={chat.sent ? styles.items2 : styles.items} >
                    {
                      chat.sent &&
                      <Pressable>
                        <Ionicons name="trash-bin-outline" size={14} color="white" />
                      </Pressable>
                    }
                    <Text style={{fontSize:12, color:chat.sent?'black':'grey'}} >{formatDateAndTime(new Date(chat?.time))}</Text>
                    {
                      chat.sent &&
                    <Ionicons name="checkmark-done" size={14} color={chat.read ? 'blue':'grey'} />
                    }
                  </View>
                </View>
                ))
              }
            </View>
          </ScrollView>

        </View>
        
        <View style={{width:'100%', flexDirection:'row', alignItems:'center', gap:5, justifyContent:'space-between' }} >
          <TextInput
            multiline
            numberOfLines={2}
            placeholder="type your message"
            style={{backgroundColor:'#F0F0F3', maxWidth:'85%', flexGrow:1, fontSize:16, paddingVertical:8, paddingHorizontal:10, borderRadius:8}}
           />
           <Pressable style={{width:40, alignItems:'center', justifyContent:'center', height:40, borderRadius:50, backgroundColor:'#cb4900'}} >
            <FontAwesome name="paper-plane" size={24} color="white" />
           </Pressable>
        </View>
        

      </View>
      </SafeAreaView>
  )
}

export default Chats

const styles = StyleSheet.create({
  received:{
    padding:8,
    backgroundColor:'white',
    maxWidth:'80%',
    // minWidth:'50%',
    // width:'50%',
    flexDirection:'column',
    gap:2,
    borderRadius:10,
    borderBottomLeftRadius:0,
    alignItems:'flex-start',
    alignSelf:'flex-start',
  },
  sent:{
    padding:8,
    backgroundColor:'#cb4900',
    maxWidth:'80%',
    // width:'auto',
    // minWidth:'50%',
    // width:'50%',
    flexDirection:'column',
    gap:2,
    borderRadius:10,
    alignItems:'flex-end',
    borderBottomRightRadius:0,
    alignSelf:'flex-end',
    // flexWrap:'wrap',
  },
  items2:{
    // width:'100%',
    alignItems:'center',
    gap:5,
    flexDirection:'row',
  },
  items:{
    // width:'100%',
    alignItems:'center',
    gap:5,
    flexDirection:'row',
  },
})