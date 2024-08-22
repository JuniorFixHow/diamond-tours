import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, {  useRef, useState } from "react";
  import { MyStyles } from "../../utils/Styles";
  import { Colours } from "../../utils/Colours";
  // import { Feather } from "@expo/vector-icons";
  // import OTPTextInput from 'react-native-otp-textinput';
  // import { useSignIn } from "@clerk/clerk-expo";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "expo-router";
  
  
  const reset = () => {
    // const [showPass, setShowShowPass] = useState<boolean>(true);
    // const [otp, setOtp] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    // const otpInput = useRef(null);
    // const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();

  
  
    
  
    const onResetRequest = async () => {
      if(email.trim()===''){
          ToastAndroid.showWithGravityAndOffset(
              'Please enter email', 
              ToastAndroid.LONG, 
              ToastAndroid.TOP, 25, 50);
              
          }else{
              try {
              setLoading(true);
              await sendPasswordResetEmail(auth, email);
              router.navigate('/(auth)')
              alert('Verification email sent. Check your email to proceed');
          } catch (err: any) {
           console.log(err.message);
           alert('Error occured. Please retry');
          }finally{
              setLoading(false)
          }
  
      }
  
    };

   
  
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
                    <Text style={MyStyles.welcomeText}>Confirm email</Text>
                    <Text style={[MyStyles.welcomeMessage, { textAlign: "left" }]}>
                    Please enter your email below
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
              
  
              <TouchableOpacity
                  style={{
                  width: "90%",
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: "center",
                  backgroundColor: loading?Colours.grey : "#cb4900",
                  }}
                  disabled={loading}
                  onPress={onResetRequest}
              >
                  <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
                  Proceed
                  </Text>
              </TouchableOpacity>
  
             
  
              
  
              
              </View>
          
          {/* {
              isVerifying &&
              <>
              <Text style={{fontSize:20, color:'#cb4900', fontWeight:'700'}} >Create new password</Text>
              <Text style={MyStyles.welcomeMessage} >Please check your inbox for the code and create a new password</Text>
              <View style={{width:'100%', gap:15, flexDirection:'column', alignSelf:'center',}} >

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
                    
                    <View style={styles.input}>
                        <Text style={styles.label}>
                        New Password<Text style={{ color: "crimson" }}>*</Text>{" "}
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
                    alignSelf:'center',
                    backgroundColor: loading?Colours.grey : "#cb4900",
                    }}
                    disabled={loading}
                    onPress={onPressVerify}
                >
                    <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
                    Proceed
                    </Text>
                </TouchableOpacity>
              </View>
              </>
          } */}
  
        </View>
      </View>
    );
  };
  
  export default reset;
  
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
  