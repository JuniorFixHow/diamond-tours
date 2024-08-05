import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AirlineProps, FlightDataProps } from '../types/Types'
import { MyStyles } from '../utils/Styles'
import { useFetchFlights } from '../hooks/useFetchFlights'
import { UniqueArrivals, UniqueDepartures } from '../functions/Unique'

type ModalProps = {
    fromModal:boolean,
    toModal:boolean,
    setFromModal:React.Dispatch<React.SetStateAction<boolean>>,
    setToModal:React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedValue:React.Dispatch<React.SetStateAction<string>>,
}

const ModalSelect = ({fromModal, toModal, setFromModal, setSelectedValue, setToModal}:ModalProps) => {
    const {flights} = useFetchFlights();
    const handleClose = ()=>{
        setFromModal(false);
        setToModal(false);
    }

    const handleSelect=(item:string)=>{
        if(fromModal){
            setFromModal(false);
            setSelectedValue(item);
        }
        else if(toModal){
            setToModal(false);
            setSelectedValue(item);
        }
    }

   const unique = fromModal ? UniqueDepartures(flights) : UniqueArrivals(flights)

    //   const UniqueAirlines:FlightDataProps = mapWithUniqueNames(data);
    //   console.log(UniqueAirlines)
  return (
    <Modal
    animationType='fade'
    transparent={true}
    visible={fromModal || toModal}
    onRequestClose={handleClose}
    >
        <Pressable onPress={handleClose} style={styles.mainmodal} >
        <View style={styles.content} >
            <Text style={{color:'#cb4900', fontSize:20}} >- - Select - -</Text>
            <ScrollView style={{width:'100%'}} >
                <View style={{width:'100%', paddingBottom:70, flexDirection:'column', gap:6}} >
                    {
                        unique.map((item:string)=>(
                            <TouchableOpacity onPress={()=>handleSelect(item)} style={{width:'100%', paddingBottom:4, borderColor:'rgb(182 181 181)', borderBottomWidth:1, }} key={item}>
                                <Text style={{fontSize:18}} >{item.slice(0, 25)}</Text>
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

export default ModalSelect

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