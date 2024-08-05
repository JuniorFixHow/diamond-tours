import { Image, LayoutChangeEvent, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput,  ToastAndroid,  TouchableOpacity,  View } from "react-native";
import { Colours } from "../../../utils/Colours";
import { MyStyles } from "../../../utils/Styles";
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import { useRouter } from "expo-router";
import ICON from '../../../assets/icon.png';
import { ChatsMessages } from "../../../utils/DummyData";
import { ChatDataProps, ChatProps } from "../../../types/Types";
import { formatDateAndTime } from "../../../functions/Date";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Loader from "../../../misc/Loader";

const Chats = ()=>{
  const router = useRouter();
  const containerRef = useRef<View>(null);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chats, setChats] = useState<ChatDataProps[]>([]);
  const [currentId, setCurrentId] = useState<string>('');
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  const scrollViewRef = useRef<ScrollView>(null);
  
  const {userId} = useAuth();
  const {user} = useUser();

  

  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    // Scroll to the end of the chat when the component mounts
    scrollToEnd();
  }, [chats]);
  

  const sendChat = async()=>{
    if(message.trim()!==''){
      try {
          setIsLoading(true);
            await addDoc(collection(db, 'Chats'), {
                message, userId, time:serverTimestamp(), read:false, sent:true,
                lastMessage:message,
                user:{
                    email:user?.emailAddresses[0].emailAddress,
                    hasImage:user?.hasImage,
                    image: user?.imageUrl,
                    name: user?.fullName
                }
            })
            scrollToEnd();
            setMessage('');
        } catch (error) {
            console.log(error);
            ToastAndroid.showWithGravityAndOffset(
              'Error occured. Please retry', 
              ToastAndroid.LONG, 
              ToastAndroid.BOTTOM, 25, 50);
        }finally{
            setIsLoading(false);
        }
    }else{
      ToastAndroid.showWithGravityAndOffset(
        'Please type something', 
        ToastAndroid.LONG, 
        ToastAndroid.BOTTOM, 25, 50);
    }
  }


  useEffect(()=>{
    setChatLoading(true);
    const reference = collection(db, 'Chats');
    const q = query(reference, where('userId', '==', userId))
    const unsub = onSnapshot(
        q,  (snapshot)=>{
            const list:ChatDataProps[] = [];
            snapshot.docs.forEach((doc)=>{
                list.push({id:doc.id, ...doc.data()} as ChatDataProps )
            })
            // console.log(list)
            setChatLoading(false);
            if(list.length){
                setChats(list.sort((a, b)=> a?.time?.toDate() < b?.time?.toDate() ? -1:1));
            }
            
        },
        (error)=>{
            console.log(error)
        },
    )
    // user && unsub();
    return()=>{
        unsub()
    }
    
  },[userId])


    const deleteChat = async(id:string)=>{
      setCurrentId(id);
      try {
          await deleteDoc(doc(db, 'Chats', id))
      } catch (error) {
          console.log(id);
      }finally{
          setCurrentId('')
      }
    }

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


        <View style={{height:'80%',flexGrow:1}} >
          <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} style={{width:'100%', }} contentContainerStyle={{ flexGrow:1, gap:20,  flexDirection:'column', justifyContent:'space-between'}} >
            <View style={{width:'100%',  paddingBottom:50, flexGrow:1, flexDirection:'column', gap:10, borderRadius:20, padding:8, backgroundColor:'#FFF2F2'}} >
             {
              (chats.length < 1 && chatLoading) ?
              <Loader />
              :
              <>
                {
                  chats.map((chat:ChatDataProps)=>(
                  <View   key={chat?.id} style={chat.sent ? styles.sent :styles.received} >
                    <Text style={{fontSize:15, color:chat.sent? 'white':'black',  }} >{chat.message}</Text>
                    <View style={chat.sent ? styles.items2 : styles.items} >
                      {
                        chat.sent &&
                        <TouchableOpacity onPress={()=>deleteChat(chat.id)} >
                          <Ionicons name="trash-bin-outline" size={14} color="white" />
                        </TouchableOpacity>
                      }
                      <Text style={{fontSize:12, color:chat.sent?'black':'grey'}} >{chat?.time?.toDate() && formatDateAndTime(chat?.time?.toDate())}</Text>
                      {
                        chat.sent &&
                      <Ionicons name="checkmark-done" size={14} color={chat.read ? 'blue':'grey'} />
                      }
                    </View>
                  </View>
                  ))
                }
              </>
             }
            </View>
            {/* toLocaleDate */}
          </ScrollView>
              <View style={{width:'100%', flexDirection:'row', alignItems:'center', gap:5, marginTop:20, justifyContent:'space-between' }} >
                <TextInput
                  multiline
                  numberOfLines={2}
                  value={message}
                  onChangeText={(e)=>setMessage(e)}
                  placeholder="type your message"
                  style={{backgroundColor:'#F0F0F3', maxWidth:'85%', flexGrow:1, fontSize:16, paddingVertical:8, paddingHorizontal:10, borderRadius:8}}
                />
                <TouchableOpacity onPress={sendChat} disabled={isLoading} style={{width:40, alignItems:'center', justifyContent:'center', height:40, borderRadius:50, backgroundColor: isLoading? 'gainsboro':'#cb4900'}} >
                  <FontAwesome name="paper-plane" size={24} color="white" />
                </TouchableOpacity>
              </View>

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