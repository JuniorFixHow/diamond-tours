import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  import { MyStyles } from "../../../utils/Styles";
  import { Colours } from "../../../utils/Colours";
  import { Feather } from "@expo/vector-icons";
  import Google from "../../../assets/imgs/google.png";
  import { useRouter } from "expo-router";
  import OTPTextInput from 'react-native-otp-textinput';
  import { useAuth, useClerk, useSignIn, useSignUp, useUser } from "@clerk/clerk-expo";
  
  
  const register = () => {
    const [showPass, setShowShowPass] = useState<boolean>(true);
    const [otp, setOtp] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const otpInput = useRef(null);
    const { isLoaded, signIn, setActive } = useSignIn();

  
  
    
  
    const onResetRequest = async () => {
      if (!isLoaded) {
        return;
      }
      if(email.trim()===''){
          ToastAndroid.showWithGravityAndOffset(
              'Please email', 
              ToastAndroid.LONG, 
              ToastAndroid.TOP, 25, 50);
              
          }else{
              try {
              setLoading(true);
              await signIn.create({
                strategy:'reset_password_email_code',
                identifier:email
              })
            
            setIsVerifying(true);
          } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            alert(err?.errors[0].longMessage);
            console.error(JSON.stringify(err?.errors[0]));
          }finally{
              setLoading(false)
          }
  
      }
  
    };
  
    const onPressVerify = async () => {
      if (!isLoaded) {
        return;
      }
      if(otp.trim().length < 6){
          ToastAndroid.showWithGravityAndOffset(
              'Please enter a valid code', 
              ToastAndroid.LONG, 
              ToastAndroid.TOP, 25, 50);
          }else{
              try {
              setLoading(true);
              const res =  await signIn!.attemptFirstFactor({
                strategy:'reset_password_email_code',
                code:otp, password
              })
              console.log(res);
              await setActive!({session:res.createdSessionId})
              setIsVerifying(false);
              alert('Password reset successfully');
             
            } catch (err: any) {
              // See https://clerk.com/docs/custom-flows/error-handling
              // for more info on error handling
              ToastAndroid.showWithGravityAndOffset(
                  err?.errors[0].longMessage, 
                  ToastAndroid.LONG, 
                  ToastAndroid.TOP, 25, 50);
              console.error(JSON.stringify(err, null, 2));
            }finally{
                setLoading(false);
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
            {
                !isVerifying &&
                <View style={styles.input}>
                    <Text style={MyStyles.welcomeText}>Confirm email</Text>
                    <Text style={[MyStyles.welcomeMessage, { textAlign: "left" }]}>
                    Please enter your email below
                    </Text>
                </View>
            }
          {
              !isVerifying &&
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
          }
          {
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
          }
  
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
  