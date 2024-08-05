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
import React, { useCallback, useEffect, useState } from "react";
import { MyStyles } from "../../utils/Styles";
import { Colours } from "../../utils/Colours";
import { Feather } from "@expo/vector-icons";
import Google from '../../assets/imgs/google.png';
import { useRouter } from "expo-router";
import {  useOAuth, useSignIn } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmBrowser";
import * as Linking from "expo-linking"

WebBrowser.maybeCompleteAuthSession();
const SignInUser = () => {
  const router = useRouter();
  const [showPass, setShowShowPass] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { signIn, setActive, isLoaded } = useSignIn();
  // if(!isLoaded) return null;

  useWarmUpBrowser();

  // let isLoaded


  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      setLoading(true);
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('(public)/(tabs)');
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      ToastAndroid.showWithGravityAndOffset(
        err?.errors[0].longMessage, 
        ToastAndroid.LONG, 
        ToastAndroid.TOP, 25, 50);
    }finally{
      setLoading(false);
    }
  }, [isLoaded, emailAddress, password]);


  const onGooglePress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const { createdSessionId,  setActive } =
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


  return (
    <View style={MyStyles.main}>
      <View
        style={{
          width: "100%",
          marginTop: 50,
          alignItems: "center",
          gap: 30,
          flexDirection: "column",
        }}
      >
        <View style={styles.input}>
          <Text style={MyStyles.welcomeText}>Welcome Back!</Text>
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
              Email<Text style={{ color: "crimson" }}>*</Text>{" "}
            </Text>
            <TextInput
              style={styles.inpText}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="enter email"
              onChangeText={(e)=>setEmailAddress(e)}
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

          <Pressable onPress={()=>router.navigate('(public)/(auth)/reset')} style={{ alignSelf: "flex-end", marginRight: 25 }}>
            <Text style={{ color: "#cb4900", fontSize: 14 }}>
              Forgot Password?
            </Text>
          </Pressable>

          <TouchableOpacity
            disabled={loading}
            style={{
              width: "90%",
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              backgroundColor: loading ? 'gainsboro':"#cb4900",
            }}
            onPress={onSignInPress}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
              {loading ? 'loading...':'Login'}
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
              Don't have an account?
            </Text>
            <Pressable onPress={()=>router.navigate('(public)/(auth)/register')} >
              <Text style={{ color: "#cb4900" }}>Sign up</Text>
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
            onPress={onGooglePress}
            style={{
              width: "90%",
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              borderWidth:1,
              gap:10,
              borderColor:Colours.grey
            }}
          >
            <Image source={Google} style={{width:30, height:30, objectFit:'contain'}} />
            <Text style={{ color: Colours.black, fontWeight: "600", fontSize: 14 }}>
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignInUser;

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
