import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MyStyles } from "../../utils/Styles";
import { Colours } from "../../utils/Colours";
import { Feather } from "@expo/vector-icons";
import Google from "../../assets/imgs/google.png";
import { useRouter } from "expo-router";

import {validData} from '../../functions/Validation';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import { UserProps } from "../../types/Types";
import { useAuth } from "../../context/AuthContext";




const register = () => {
  const [showPass, setShowShowPass] = useState<boolean>(true);
  // const [otp, setOtp] = useState<string>('');
  const [fname, setFname] = useState<string>('');
  const [lname, setLname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  // const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const otpInput = useRef(null);
  const router = useRouter();
  const {setUserData} = useAuth();



  GoogleSignin.configure({
    webClientId:process.env.EXPO_PUBLIC_CLIENT_ID,
  })

  const onGooglePress = async () => {
    try {
      setGoogleLoading(true);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;
      const userData :UserProps={
          id:user.id,
          photoURL:user?.photo!,
          displayName:user?.name!,
          emailVerified: true,
          email:user?.email!,
          isSocial:true,
      }
      setUserData(userData);
      router.push('/(public)/(tabs)')
    } catch (error:any) {
      if (error.code) {
        switch (error.code) {
          // Handle specific error codes here
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            alert('Play Services not available');
            console.log('Play Services not available');
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            // alert('Sign-in cancelled');
            console.log('Sign-in cancelled');
            break;
            case statusCodes.IN_PROGRESS:
            // alert('Sign-in cancelled');
            console.log('Sign-in in progress');
            break;
            case statusCodes.SIGN_IN_REQUIRED:
            // alert('Sign-in required');
            console.log('Sign-in required');
            break;
          default:
            console.log('Unknown error');
            break;
        }
      } else {
        console.log('Error:', error);
      }
      alert('Error occurred in the process');
    } finally {
      setGoogleLoading(false);
    }
  };




  const onSignUpPress = async()=>{
    try {
      setLoading(true);
      const valid = validData(email, password);
      if(valid){
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await updateProfile(user, {
          displayName:fname + ' '+lname,
          photoURL:'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'
        })
        await sendEmailVerification(user);
        router.navigate('/(auth)');
        alert('Check your email for a verification link');
        // console.log('');
      }
      
    } catch (error) {
      console.log(error);
      alert('Error occured. Please retry');
    }finally{
      setLoading(false);
    }
  }



  return (
    <View style={MyStyles.main}>
      <View
        style={{
          width: "100%",
          marginTop: 60,
          alignItems: "center",
          gap: 30,
          flexDirection: "column",
        }}
      >
        <View style={styles.input}>
          <Text style={MyStyles.welcomeText}>Create an account</Text>
          <Text style={[MyStyles.welcomeMessage, { textAlign: "left" }]}>
            Please enter your details below
          </Text>
        </View>
        
            <View
            style={{
                width: "100%",
                flexDirection: "column",
                gap: 20,
                alignItems: "center",
                alignSelf: "center",
            }}
            >
            <View style={styles.input}>
                <Text style={styles.label}>
                First name<Text style={{ color: "crimson" }}>*</Text>{" "}
                </Text>
                <TextInput
                style={styles.inpText}
                keyboardType="default"
                autoCapitalize="none"
                placeholder="enter first name"
                onChangeText={(e)=>setFname(e)}
                />
            </View>
            <View style={styles.input}>
                <Text style={styles.label}>
                Last name<Text style={{ color: "crimson" }}>*</Text>{" "}
                </Text>
                <TextInput
                style={styles.inpText}
                keyboardType="default"
                autoCapitalize="none"
                placeholder="enter last name"
                onChangeText={(e)=>setLname(e)}
                />
            </View>
            <View style={styles.input}>
                <Text style={styles.label}>
                Email<Text style={{ color: "crimson" }}>*</Text>{" "}
                </Text>
                <TextInput
                style={styles.inpText}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="enter email"
                onChangeText={(e)=>setEmail(e)}
                />
            </View>
            <View style={styles.input}>
                <Text style={styles.label}>
                Password<Text style={{ color: "crimson" }}>*</Text>{" "}
                </Text>
                <View style={styles.inpWrap}>
                <TextInput
                    style={styles.passText}
                    keyboardType="default"
                    secureTextEntry={showPass}
                    autoCapitalize="none"
                    placeholder="enter password"
                    onChangeText={(e)=>setPassword(e)}
                />
                {showPass ? (
                    <Pressable
                    onPress={() => setShowShowPass((pre) => !pre)}
                    style={styles.eye}
                    >
                    <Feather name="eye" size={18} color={Colours.grey} />
                    </Pressable>
                ) : (
                    <Pressable
                    onPress={() => setShowShowPass((pre) => !pre)}
                    style={styles.eye}
                    >
                    <Feather name="eye-off" size={18} color={Colours.grey} />
                    </Pressable>
                )}
                </View>
            </View>

            <TouchableOpacity
                style={{
                width: "90%",
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
                backgroundColor: loading?Colours.grey : "#cb4900",
                }}
                disabled={loading}
                onPress={onSignUpPress}
            >
                <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
                Register
                </Text>
            </TouchableOpacity>

            <View
                style={{
                width: "100%",
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
                }}
            >
                <Text style={[MyStyles.welcomeMessage, { width: "auto" }]}>
                Have an account?
                </Text>
                <Pressable onPress={() => router.navigate("/(auth)")}>
                <Text style={{ color: "#cb4900" }}>Login</Text>
                </Pressable>
            </View>

            <View
                style={{
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                }}
            >
                <View
                style={{ backgroundColor: Colours.grey, height: 1, flexGrow: 1 }}
                />
                <Text style={[MyStyles.welcomeMessage, { width: "auto" }]}>
                or continue with
                </Text>
                <View
                style={{ backgroundColor: Colours.grey, height: 1, flexGrow: 1 }}
                />
            </View>

            <TouchableOpacity
                style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "center",
                paddingVertical: 6,
                borderRadius: 8,
                alignItems: "center",
                borderWidth: 1,
                gap: 10,
                borderColor: Colours.grey,
                }}
                onPress={onGooglePress}
            >
              {
                googleLoading ? 
                <ActivityIndicator size='small' style={{borderColor:'black'}} />
                :
                <Image source={Google} style={{width:30, height:30, objectFit:'contain'}} />
              }
                <Text
                style={{ color: Colours.black, fontWeight: "600", fontSize: 14 }}
                >
                Sign in with Google
                </Text>
            </TouchableOpacity>
            </View>
        
        {/* {
            isVerifying &&
            <>
            <Text style={{fontSize:20, color:'#cb4900', fontWeight:'700'}} >Enter OTP Code</Text>
            <Text style={MyStyles.welcomeMessage} >Please check your inbox for the code</Text>
            <OTPTextInput ref={otpInput}
                handleTextChange={(e)=>setOtp(e)}
                inputCount ={6}
                inputCellLength={1}
                // autoFocus={true}
                tintColor='#3c74b3'
                offTintColor='#b1b6b6'
                containerStyle={{width:'90%', alignSelf:'center', alignItems:'center', justifyContent:'center',}}
                textInputStyle={{ backgroundColor:'rgb(248, 247, 252)', borderRadius:10, elevation:5, width:40, height:40,}}
                />
                 <TouchableOpacity
                style={{
                width: "90%",
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
                backgroundColor: loading?Colours.grey : "#cb4900",
                }}
                disabled={loading}
                onPress={onPressVerify}
            >
                <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
                Verify
                </Text>
            </TouchableOpacity>
            </>
        } */}

      </View>
    </View>
  );
};

export default register;

const styles = StyleSheet.create({
  eye: {
    color: Colours.grey,
    position: "absolute",
    right: 5,
    top: 12,
  },
  inpText: {
    fontSize: 14,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colours.black,
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  inpWrap: {
    fontSize: 14,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colours.black,
  },
  passText: {
    fontSize: 14,
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: Colours.black,
  },
  input: {
    flexDirection: "column",
    gap: 5,
    width: "90%",
    alignItems: "flex-start",
    alignSelf: "center",
  },
});
