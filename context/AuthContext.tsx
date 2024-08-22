import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { UserProps } from "../types/Types";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {GoogleSignin} from '@react-native-google-signin/google-signin';

type childrenProp = {
    children:ReactNode
}
type contextProps = {
    setUserData:(e:UserProps)=>void,
    logout:()=>void,
    user:UserProps | null,
    onboardUser:()=>void,
    authLoading:boolean,
    old:boolean
}
export const AuthContext = createContext<contextProps | null>(null);

export const AuthContextProvider = ({children}:childrenProp)=>{
    const router = useRouter();
    const [user, setUser] = useState<UserProps | null>(null);
    const [old, setOld] = useState<boolean>(false);
    const [authLoading, setAuthLoading] = useState<boolean>(true);

    const setUserData=(data:UserProps)=>{
        try {
            setUser(data);
            SecureStore.setItem('user', JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async()=>{
        try {    
            setUser(null);
            await SecureStore.deleteItemAsync('user');
            await signOut(auth);
            router.replace('/(auth)');
            GoogleSignin.configure({});
            await GoogleSignin.signOut();
            await GoogleSignin.revokeAccess();
        } catch (error) {
            console.log(error);
        }

    }

    const onboardUser = ()=>{
        try {
            setOld(true);
            SecureStore.setItem('old', JSON.stringify(true));
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchUser().then(()=>console.log('context run'))
    },[])

    const fetchUser = async()=>{
        try {
            // setAuthLoading(true);
            const oldUser = await SecureStore.getItem('old');
            const userInfo = await SecureStore.getItem('user');
            // console.log(oldUser, userInfo);
            if(!oldUser && !userInfo){
                setAuthLoading(false);
               router.replace('/');
                // alert('no user and new user')
            }
            else if(oldUser && !userInfo){
                setAuthLoading(false);
                setOld(true);
                // alert('no user and old user')
                router.replace('/(auth)');
            }
            else if(oldUser && userInfo){
                setAuthLoading(false);
                setUser(JSON.parse(userInfo));
                setOld(true);
                // alert('user and old user')
                router.replace('/(public)/(tabs)');
            }
        } catch (error) {
            console.log(error)
        }finally{
            setAuthLoading(false);
        }
    }

    
   


    return(
        <AuthContext.Provider value={{onboardUser, authLoading, user, old, setUserData, logout}} >
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = ()=>{
    const authContext = useContext(AuthContext);
    if(!authContext){
        throw new Error('useAuth must be within auth provider')
    }
    return authContext;
}