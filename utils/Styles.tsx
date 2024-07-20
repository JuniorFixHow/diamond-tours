import { StyleSheet } from "react-native"
import { Colours } from "./Colours"

export const MyStyles= StyleSheet.create({
    main:{
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        // marginTop:50,
        width:'100%',
        backgroundColor:'#fff'
    },
    welcomeText:{
        color:Colours.black,
        fontSize:24,
        fontWeight:'700'
    },
    welcomeMessage:{
        color:Colours.grey,
        fontSize:15,
        textAlign:'center',
        width:'80%'
        // fontWeight:'700'
    },
    greyText:{
        fontSize:20,
        color:'#969696',
        fontWeight:'600'
    },
    greySmall:{
        fontSize:16,
        color:'#969696',
        fontWeight:'600'
    },
    greyXsmall:{
        fontSize:13,
        color:'#969696',
        fontWeight:'600'
    },
    blackSmall:{
        fontSize:14,
        color:Colours.black,
        fontWeight:'600'
    },
    orangeBold:{
        fontSize:16,
        color:'#cb4900',
        fontWeight:'700'
    },
    orangeNormal:{
        fontSize:20,
        color:'#cb4900',
        fontWeight:'600'
    }
})