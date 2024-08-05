import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MyStyles } from '../utils/Styles';
import {AntDesign, Feather, FontAwesome} from '@expo/vector-icons';
import SelectInput from '../misc/SelectInput';
import Slider from '@react-native-community/slider';
import Button from '../misc/Button';
import { Airlines } from '../utils/DummyData';
import { AirlineProps } from '../types/Types';
import { Colours } from '../utils/Colours';
import RNDateTimePicker, {  DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ModalSelect from '../misc/ModalSelect';
import SelectAirLine from '../misc/SelectAirLine';
import { useFetchFlights } from '../hooks/useFetchFlights';
import ViewButton from '../misc/ViewButton';
import { SearchFlights } from '../functions/search';



type FilterProps = {
    setCloseFilter:React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedAirline:React.Dispatch<React.SetStateAction<string>>,
    selectedAirline:string,
    price:number,
    setPrice:React.Dispatch<React.SetStateAction<number>>,
    selectedFrom:string,
    setSelectedFrom:React.Dispatch<React.SetStateAction<string>>,
    selectedTo:string,
    setSelectedTo:React.Dispatch<React.SetStateAction<string>>,
    sDate:Date,
    setSDate:React.Dispatch<React.SetStateAction<Date>>,
    eDate:Date,
    setEDate:React.Dispatch<React.SetStateAction<Date>>,
    search:string,
    clearFilter:()=>void
}

const FlightsFilter = ({
    setCloseFilter, selectedTo, setSelectedTo,
    setSelectedAirline, selectedFrom, setSelectedFrom,
    selectedAirline, price, setPrice, sDate, setSDate,
    eDate, setEDate, search, clearFilter
}:FilterProps) => {
    // const currentDate = new Date();
     
    // const [price, setPrice] = useState<number>(0);
    // const [sDate, setSDate] = useState<Date>(new Date);
    // const [eDate, setEDate] = useState<Date>(new Date);
    // const [selectedFrom, setSelectedFrom] = useState<string>('All');
    // const [selectedTo, setSelectedTo] = useState<string>('All');
    const [showStart, setShowStart] = useState<boolean>(false);
    const [showEnd, setShowEnd] = useState<boolean>(false);
    const [fromModal, setFromModal] = useState<boolean>(false);
    const [toModal, setToModal] = useState<boolean>(false);
    const [showAirline, setShowAirline] = useState<boolean>(false);

    const {flights} = useFetchFlights();
    // console.log(airlineArray.includes('United Airline'));
   

    const getTomorrow = (date:Date)=>{
        return new Date(date.getTime() + 0);
    }

    useEffect(()=>{
        setEDate(sDate)
    },[sDate])
    const handleChangeStart = (event: DateTimePickerEvent, date: Date | undefined) => {
        if (date) {
          setShowStart(false);
          setSDate(date);
        }
      };
    const handleChangeEnd = (event: DateTimePickerEvent, date: Date | undefined) => {
        if (date) {
          setShowEnd(false);
          setEDate(date);
        }
      };

     

  return (
    <View style={styles.container} >
      <View style={{width:'90%', marginTop:20, alignItems:'center', flexDirection:'row', justifyContent:'space-between'}} >
        <View style={{alignItems:'center', flexDirection:'row', gap:10}} >
            <Pressable onPress={()=>setCloseFilter(false)} >
                <AntDesign name="close" size={24} color="black" />
            </Pressable>
            <Text style={MyStyles.welcomeText} >Filter</Text>
        </View>
        <TouchableOpacity onPress={clearFilter} >
            <Text style={MyStyles.greyText} >Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={{width:'90%', flexDirection:'column', gap:15}} >
        <View style={{flexDirection:'column', gap:5}} >
            <Text style={styles.label}>Airline</Text>
            <TouchableOpacity onPress={()=>setShowAirline(true)} style={{flexDirection:'column', width:'100%', backgroundColor:'white', elevation:1, padding:4, borderRadius:5}} >
                <Text style={{color:Colours.grey, fontSize:13}} >select</Text>
                <View   style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}} >
                    <Text style={{fontSize:14}} >{selectedAirline}</Text>
                    <AntDesign size={12} name='down' color={Colours.grey} />
                </View>
            </TouchableOpacity>
                {
                    <SelectAirLine showAirline={showAirline} setSelectedValue={setSelectedAirline} data={Airlines} setShowAirline={setShowAirline}  />
                }
        </View>
       
        <KeyboardAvoidingView style={{flexDirection:'column', position:'relative', gap:5, width:'100%'}} >
            <Text style={styles.label} >Location</Text>
            <View style={{width:'100%', alignItems:'center', justifyContent:'space-between', flexDirection:'row'}} >
                <View style={{flexDirection:'column'}} >
                    <Text style={{color:Colours.grey, fontSize:13}} >Departure</Text>
                    <TouchableOpacity  onPress={()=>setFromModal(true)} style={{flexDirection:'row', gap:15, alignItems:'center'}} >
                        <Text style={{fontSize:14}} >{selectedFrom?.slice(0,13)}</Text>
                        <AntDesign size={12} name='down' color={Colours.grey} />
                    </TouchableOpacity>
                    {
                        (fromModal) &&
                        <ModalSelect setSelectedValue={setSelectedFrom} toModal={toModal} fromModal={fromModal} setFromModal={setFromModal} setToModal={setToModal} />
                    }
                </View>
                {/* <View style={{width:1, height:'100%', backgroundColor:'grey'}} /> */}
                <FontAwesome name="exchange" size={24} color="#cb4900" />
                <View style={{flexDirection:'column'}} >
                    <Text style={{color:Colours.grey, fontSize:13}} >Arrival</Text>
                    <TouchableOpacity onPress={()=>setToModal(true)} style={{flexDirection:'row', gap:15, alignItems:'center'}} >
                        <Text style={{fontSize:14}} >{selectedTo?.slice(0,13)}</Text>
                        <AntDesign size={12} name='down' color={Colours.grey} />
                    </TouchableOpacity>
                    {
                         (toModal) &&
                        <ModalSelect setSelectedValue={setSelectedTo} toModal={toModal} fromModal={fromModal} setFromModal={setFromModal} setToModal={setToModal} />
                    }
                </View>
            </View>
            {/* <TextInput placeholder='type here' cursorColor='black' keyboardType='name-phone-pad' style={styles.input} /> */}
        </KeyboardAvoidingView>
       
        <KeyboardAvoidingView style={{flexDirection:'column', gap:5, width:'100%'}} >
            <Text style={styles.label} >Take-off date</Text>
            <View style={{width:'100%', alignItems:'center', justifyContent:'space-between', flexDirection:'row'}} >
                <View style={{flexDirection:'column'}} >
                    <Text style={{color:Colours.grey, fontSize:13}} >Departure</Text>
                    <TouchableOpacity onPress={()=>setShowStart(true)} style={{flexDirection:'row', gap:15, alignItems:'center'}} >
                        <Text style={{fontSize:14}} >{sDate?.toDateString()}</Text>
                        <AntDesign size={12} name='down' color={Colours.grey} />
                    </TouchableOpacity>
                    {
                        showStart &&
                        <RNDateTimePicker
                        testID="dateTimePicker"
                        value={sDate}
                        mode='date'
                        is24Hour={true}
                        minimumDate={new Date()}
                        onChange={handleChangeStart}
                        />
                    }
                </View>
                {/* <View style={{width:1, height:'100%', backgroundColor:'grey'}} /> */}
                <Feather name="calendar" size={24} color="#cb4900" />
                <View style={{flexDirection:'column'}} >
                    <Text style={{color:Colours.grey, fontSize:13}} >Arrival</Text>
                    <TouchableOpacity onPress={()=>setShowEnd(true)} style={{flexDirection:'row', gap:15, alignItems:'center'}} >
                        <Text style={{fontSize:14}} >{eDate?.toDateString()}</Text>
                        <AntDesign size={12} name='down' color={Colours.grey} />
                    </TouchableOpacity>
                    {
                        showEnd &&
                        <RNDateTimePicker
                        testID="dateTimePicker"
                        value={eDate}
                        mode='date'
                        is24Hour={true}
                        minimumDate={new Date()}
                        onChange={handleChangeEnd}
                        />
                    }
                </View>
            </View>
            {/* <TextInput placeholder='type here' cursorColor='black' keyboardType='name-phone-pad' style={styles.input} /> */}
        </KeyboardAvoidingView>

        <View style={{flexDirection:'column', gap:1}} >
            <Text style={styles.label}>Price range</Text>
            <Slider
                style={{width: '100%', height: 40}}
                minimumValue={flights.length && Math.min(...flights.map(item=> item.price)) }
                maximumValue={flights.length && Math.max(...flights.map(item=> item.price)) }
                // lowerLimit={0}
                // upperLimit={50}
                step={10}
                minimumTrackTintColor="grey"
                maximumTrackTintColor="#cb4900"
                onValueChange={(e)=>setPrice(e)}
            />
            <Text style={{textAlign:'center'}} >${price?.toFixed(2)}</Text>
        </View>
        <ViewButton text={SearchFlights(flights, search, selectedAirline, price, selectedFrom, selectedTo, eDate, sDate).length+' results'} />
      </View>
    </View>
  )
}

export default FlightsFilter

const styles = StyleSheet.create({
    label:{
        fontWeight:'600',
        fontSize:20,
    },
    container:{
        position:'absolute',
        bottom:0,
        zIndex:10,
        flexDirection:'column',
        backgroundColor:'white',
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        height:'70%',
        width:'100%',
        alignItems:'center',
        padding:10,
        gap:20,
    }
})