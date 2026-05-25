import axios from "axios"
import React, { useEffect } from "react"
import { createContext, useState } from "react"
import { toast } from "react-toastify";


export const AppContent = createContext()

export const AppContextProvider=(props)=>{

    axios.defaults.withCredentials=true;

    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin]= useState(false)
    const [userData, setUserData]= useState(false)


    const getAuthState=async ()=>{
        try {
            

            const {data}=await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setIsLoggedin(true)
                await getUserData()
            }


        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserData=async ()=>{
        try {
            //token
            const token = localStorage.getItem('token');
            const {data} =await axios.get(backendUrl + '/api/user/data',{
            headers: {
                // 🚀 Send the token securely in the Authorization header
                Authorization: `Bearer ${token}` 
            }})
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
         getAuthState();
    },[])

    const value={
          backendUrl,
          isLoggedin,setIsLoggedin,
          userData,setUserData,
          getUserData

    }

        return(
            <AppContent.Provider value={value}>
                {props.children}

            </AppContent.Provider>
        )
}
