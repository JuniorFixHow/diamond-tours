import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AirlineProps } from '../types/Types'
import { MyStyles } from '../utils/Styles'

type ModalProps = {
    showAirline:boolean,
    setShowAirline:React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedValue:React.Dispatch<React.SetStateAction<string>>,
    data:AirlineProps[]
}

const SelectAirLine = ({showAirline, setShowAirline, setSelectedValue, data}:ModalProps) => {


    const handleSelect=(item:AirlineProps)=>{
        setShowAirline(false);
        setSelectedValue(item.name);
        
    }

    function mapWithUniqueNames(arr: AirlineProps[]) {
        const uniqueNames = new Map<string, AirlineProps>();
      
        // Iterate through the array and store unique names
        arr.forEach(item => {
          if (!uniqueNames.has(item.name)) {
            uniqueNames.set(item.name, item);
          }
        });
        
        // Create a new array with unique items
        return Array.from(uniqueNames.values());
      }

      const UniqueAirlines = mapWithUniqueNames(data);
    //   console.log(UniqueAirlines)
  return (
    <Modal
    animationType='fade'
    transparent={true}
    visible={showAirline}
    onRequestClose={()=>setShowAirline(false)}
    >
        <Pressable onPress={()=>setShowAirline(false)} style={styles.mainmodal} >
        <View style={styles.content} >
            <Text style={{color:'#cb4900', fontSize:20}} >- - Select - -</Text>
            <ScrollView style={{width:'100%'}} >
                <View style={{width:'100%', paddingBottom:70, flexDirection:'column', gap:6}} >
                    {
                        UniqueAirlines.map((item:AirlineProps)=>(
                            <TouchableOpacity onPress={()=>handleSelect(item)} style={{width:'100%', paddingBottom:4, borderColor:'rgb(182 181 181)', borderBottomWidth:1, }} key={item.id}>
                                <Text style={{fontSize:18}} >{item.name.slice(0, 25)}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
        </Pressable>
    </Modal>
  )
}

export default SelectAirLine

const styles = StyleSheet.create({
    content:{
        width:'70%',
        maxHeight:'50%',
        alignItems:'center',
        flexDirection:'column',
        gap:8,
        backgroundColor:'white',
        padding:8,
        borderRadius:15,
    },
    mainmodal:{
        position:'absolute',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#000000aa'
    },
})