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



type FilterProps = {
    setCloseFilter:React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedAirline:React.Dispatch<React.SetStateAction<string>>,
    selectedAirline:string,
}

const FlightsFilter = ({setCloseFilter, setSelectedAirline, selectedAirline}:FilterProps) => {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate.getTime() + 0);
    
    const Countries:string[] = ['All','Ghana', 'USA', 'Nigeria', 'Canada', 'Argentina'];
    const Ratings:string[] = ['All', '5', '4', '3'];
    const [country, setCountry] = useState<string>(Countries[0]);
    const [ratings, setRatings] = useState<string>(Ratings[0]);
    const [price, setPrice] = useState<number>(0);
    const airlineArray = Airlines.map((item:AirlineProps)=>item.name);
    const [sDate, setSDate] = useState<Date>(new Date);
    const [eDate, setEDate] = useState<Date>(tomorrow);
    const [showStart, setShowStart] = useState<boolean>(false);
    const [showEnd, setShowEnd] = useState<boolean>(false);
    const [fromModal, setFromModal] = useState<boolean>(false);
    const [toModal, setToModal] = useState<boolean>(false);
    const [showAirline, setShowAirline] = useState<boolean>(false);
    const [selectedFrom, setSelectedFrom] = useState<string>('All');
    const [selectedTo, setSelectedTo] = useState<string>('All');
    // console.log(airlineArray.includes('United Airline'));
   

    const getTomorrow = (date:Date)=>{
        return new Date(date.getTime() + 0);
    }

    useEffect(()=>{
        setEDate(getTomorrow(sDate))
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
        <TouchableOpacity>
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
                        <Text style={{fontSize:14}} >{selectedFrom.slice(0,13)}</Text>
                        <AntDesign size={12} name='down' color={Colours.grey} />
                    </TouchableOpacity>
                    {
                        (fromModal) &&
                        <ModalSelect setSelectedValue={setSelectedFrom} toModal={toModal} fromModal={fromModal} setFromModal={setFromModal} setToModal={setToModal} data={Airlines} />
                    }
                </View>
                {/* <View style={{width:1, height:'100%', backgroundColor:'grey'}} /> */}
                <FontAwesome name="exchange" size={24} color="#cb4900" />
                <View style={{flexDirection:'column'}} >
                    <Text style={{color:Colours.grey, fontSize:13}} >Arrival</Text>
                    <TouchableOpacity onPress={()=>setToModal(true)} style={{flexDirection:'row', gap:15, alignItems:'center'}} >
                        <Text style={{fontSize:14}} >{selectedTo.slice(0,13)}</Text>
                        <AntDesign size={12} name='down' color={Colours.grey} />
                    </TouchableOpacity>
                    {
                         (toModal) &&
                        <ModalSelect setSelectedValue={setSelectedTo} toModal={toModal} fromModal={fromModal} setFromModal={setFromModal} setToModal={setToModal} data={Airlines} />
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
                        <Text style={{fontSize:14}} >{sDate.toDateString()}</Text>
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
                        <Text style={{fontSize:14}} >{eDate.toDateString()}</Text>
                        <AntDesign size={12} name='down' color={Colours.grey} />
                    </TouchableOpacity>
                    {
                        showEnd &&
                        <RNDateTimePicker
                        testID="dateTimePicker"
                        value={eDate}
                        mode='date'
                        is24Hour={true}
                        minimumDate={getTomorrow(sDate)}
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
                minimumValue={0}
                maximumValue={100}
                // lowerLimit={0}
                // upperLimit={50}
                step={5}
                minimumTrackTintColor="grey"
                maximumTrackTintColor="#cb4900"
                onValueChange={(e)=>setPrice(e)}
            />
            <Text style={{textAlign:'center'}} >${price.toFixed(2)}</Text>
        </View>
        <Button onClick={()=>{}} text='Apply' />
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