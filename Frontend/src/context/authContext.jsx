import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-hot-toast';
import {io} from "socket.io-client";


export const AuthContext = createContext()

const backendUrl = import.meta.env.VITE_BACKEND_URL
const URL = import.meta.env.VITE_URL

axios.defaults.baseURL = backendUrl

export const AuthProvider = ({children})=>{

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([])
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null)


    const checkAuth = async()=>{
        try {
            const response = await axios.get("/auth/check-auth");
            const data = response.data;
            console.log("Auth check response:", data);
            if(data?.success){
                setAuthUser(data.userdata);
                connectSocket(data.userdata);
            }
        } catch (error) {
            toast.error("Authentication check failed. Please login again.");
            console.log("Auth check failed", error);
        }
    }

    //connect socket function to handle socket connection

    const connectSocket = async(userData)=>{
        if(!userData || socket?.connected) return;
        console.log("User data for socket connection:", userData);
        console.log("Connecting socket to URL:", URL);

        try {
            const newSocket = io(URL, {
                query : {
                    userId : userData._id
                }
            });
            console.log("Connecting socket...");

            console.log("Socket connected:", newSocket);
            newSocket.connect();
            setSocket(newSocket);
            newSocket.on("online-users", (usersList)=>{
                setOnlineUsers(usersList);
            });
        } catch (error) {
            console.log("Socket connection error:", error);
        }
    }

    


    //login function 

    const login = async(state, credintials)=>{
        try {
            const response = await axios.post(`/auth/${state}`, credintials);
            const data = response.data;
            if(data?.success){
                setAuthUser(data.userdata);
                connectSocket(data.userdata);
                axios.defaults.headers.common["token"] = data.token;
                setToken(data.token);
                localStorage.setItem("token", data.token);
                toast.success(data.message);
                navigate("/") ;
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Login error:", error);
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        }
    }

    //logout function to logout user and handle socket disconnection
    const logout = async()=>{
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        axios.defaults.headers.common["token"] = null;

        toast.success("Logged out successfully.");

        socket?.disconnect();
    }


    //update profile funtion
    const updateProfile = async(updatedData)=>{
        try {
        
            const {data} = await axios.put("/auth/update-profile", updatedData);
            if(data.success){
                setAuthUser(data.userdata);
                toast.success(data.message);
            }
        }
        catch (error) {
            console.log("Profile update error:", error);
            toast.error(error.response?.data?.message || "Profile update failed. Please try again.");
        }
    }

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"] = token;
            checkAuth();
        }
    }, [token])



    const value = {
        axios,
        token,
        authUser,
        onlineUsers,
        socket,
        updateProfile,
        login,
        logout,
        checkAuth
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}