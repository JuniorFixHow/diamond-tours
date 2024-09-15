import { ReactNode, createContext,  useEffect, useState } from "react";
import { UserProps } from "../types/Types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

type childrenProp = {
    children:ReactNode
}
type contextProps = {
    setUserData:(e:UserProps)=>void,
    logout:()=>void,
    user:UserProps | null,
    authLoading:boolean,
}

export const AuthContext = createContext<contextProps | null>(null);

export const AuthContextProvider = ({children}:childrenProp)=>{
    const [user, setUser] = useState<UserProps | null>(null);
    const [authLoading, setAuthLoading] = useState<boolean>(false);

    const setUserData=(data:UserProps)=>{
        try {
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async()=>{
        try {    
            setUser(null);
            await localStorage.removeItem('user');
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }

    }

    
    useEffect(()=>{
        fetchUser().then(()=>console.log('context run'))
    },[])

    const fetchUser = async()=>{
        try {
            setAuthLoading(true);
            const userInfo = await localStorage.getItem('user');
            // console.log(oldUser, userInfo);
            
            if(userInfo){
                setAuthLoading(false);
                setUser(JSON.parse(userInfo));
                // alert('user and old user')
            }
        } catch (error) {
            console.log(error)
            setAuthLoading(false);
        }
    }

    
   


    return(
        <AuthContext.Provider value={{authLoading, user, setUserData, logout}} >
            {children}
        </AuthContext.Provider>
    )

}

