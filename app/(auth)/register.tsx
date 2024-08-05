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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MyStyles } from "../../utils/Styles";
import { Colours } from "../../utils/Colours";
import { Feather } from "@expo/vector-icons";
import Google from "../../assets/imgs/google.png";
import { useRouter } from "expo-router";
import OTPTextInput from 'react-native-otp-textinput';
import { useAuth, useClerk, useOAuth, useSignUp, useUser } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmBrowser";
import * as Linking from "expo-linking"

WebBrowser.maybeCompleteAuthSession();


const register = () => {
  const [showPass, setShowShowPass] = useState<boolean>(true);
  const [otp, setOtp] = useState<string>('');
  const [fname, setFname] = useState<string>('');
  const [lname, setLname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSignedUp, setHasSignedUp] = useState<boolean>(false);
  const otpInput = useRef(null);
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { user } = useUser();
  const {isSignedIn}= useAuth();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });


  useEffect(()=>{
    if(isSignedIn && hasSignedUp){
      user?.update({lastName:lname, firstName:fname});
      router.replace('(public)/(tabs)');
    }
  },[isSignedIn, hasSignedUp])


  const onGooglePress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({ redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" })});

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);


  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    if(fname.trim()==='' || lname.trim()==='' || email.trim()===''|| password.trim()===''){
        ToastAndroid.showWithGravityAndOffset(
            'Please complete the fields', 
            ToastAndroid.LONG, 
            ToastAndroid.TOP, 25, 50);
            
        }else{
            try {
            setLoading(true);
          await signUp.create({
            emailAddress:email,
            password,
          });
    
          await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    
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
            const completeSignUp = await signUp.attemptEmailAddressVerification({
              code:otp,
            });
      
            if (completeSignUp.status === 'complete') {
              await setActive({ session: completeSignUp.createdSessionId })
              setHasSignedUp(true);
            } else {
              console.error(JSON.stringify(completeSignUp, null, 2));
            }
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
        <View style={styles.input}>
          <Text style={MyStyles.welcomeText}>Create an account</Text>
          <Text style={[MyStyles.welcomeMessage, { textAlign: "left" }]}>
            Please enter your details below
          </Text>
        </View>
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
                <Pressable onPress={() => router.navigate("(public)/(auth)")}>
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
                <Image
                source={Google}
                style={{ width: 30, height: 30, objectFit: "contain" }}
                />
                <Text
                style={{ color: Colours.black, fontWeight: "600", fontSize: 14 }}
                >
                Sign in with Google
                </Text>
            </TouchableOpacity>
            </View>
        }
        {
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
