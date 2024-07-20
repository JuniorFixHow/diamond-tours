import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MyStyles } from '../utils/Styles'
import { AntDesign } from '@expo/vector-icons';
import { Colours } from '../utils/Colours';
type SelectProps = {
    data:string[],
    onTap:React.Dispatch<React.SetStateAction<string>>,
    selected:string
}

const SelectInput = ({data, onTap, selected}:SelectProps) => {
    const [openSelect, setOpenSelect] = useState<boolean>(false);
    const handleSelect = (item:string)=>{
        onTap(item);
        setOpenSelect(false);
    }
  return (
    <>
    <Pressable onPress={()=>setOpenSelect(pre=>!pre)} style={{flexDirection:'column', borderBottomWidth:openSelect?0:1, borderColor:'#FFC9B8', borderWidth:1, paddingVertical:10, paddingHorizontal:5, borderRadius:5, backgroundColor:'#FCFCFC', gap:10, width:'100%', borderBottomLeftRadius:openSelect?0:5, borderBottomRightRadius:openSelect?0:5}} >
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
            <Text style={MyStyles.greyText} >{selected}</Text>
            <AntDesign name={openSelect? 'up':'down'} size={18} color="gray" />
        </View>
    </Pressable>
    <ScrollView style={{width:'100%'}} >

        {
            openSelect &&
            <View style={{width:'100%',  marginTop:0, alignItems:'flex-start', justifyContent:'flex-start', borderBottomLeftRadius:10, borderBottomRightRadius:10, borderWidth:1, borderTopWidth:0, borderColor:'#FFC9B8', padding:5, paddingTop:0, flexDirection:'column', gap:8}} >
                {
                    data.map((item:string)=>(
                        <TouchableOpacity style={{width:'100%'}} onPress={()=>handleSelect(item)} key={item} >
                            <Text style={{fontSize:18}} >{item}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        }
    </ScrollView>
    </>
  )
}

export default SelectInput

const styles = StyleSheet.create({})