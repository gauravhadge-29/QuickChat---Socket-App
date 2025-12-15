import React, { useEffect } from 'react';
import { AuthContext } from './authContext.jsx';
import toast from 'react-hot-toast';




export const ChatContext = React.createContext();

export const ChatProvider = ({children})=>{

    const [messages, setMessages] = React.useState([]);
    const [users,setUsers] = React.useState([]);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [unseenMessages, setUnseenMessages] = React.useState({});



    const {socket, axios } = React.useContext(AuthContext);

    useEffect(()=>{
        subscribeToMessages();
        return ()=> unsubscribeFromMessages();
    },[socket, selectedUser]);

    // fetch messages whenever selected user changes
    useEffect(()=>{
        if(selectedUser?._id){
            getMessages(selectedUser._id);
        } else {
            setMessages([]);
        }
    },[selectedUser]);

    //function to fetch all users for sidebar

    const getUsers = async()=>{
        try {
            const {data} = await axios.get('/messages/users');
            console.log("Users fetch response:", data);
            if(data?.success){
                setUsers(data.userdata);
                setUnseenMessages(data.unseenMessages || {});
                console.log("Fetched users for chat:", data.userdata);
            }
            else{
                toast.error("Failed to fetch users");
            }
        } catch (error) {
            toast.error("Failed to fetch users");
            console.log("Error fetching users:", error);
            
        }
    }

    //function to get messages with selected user

    const getMessages = async(userId)=>{
        console.log("Fetching messages with user:", userId);
        
        try {
            const {data} = await axios.get(`/messages/${userId}`);
            if(data?.success){
                setMessages(data.messages);
                console.log(`Fetched messages with user ${userId}:`, data.messages);
            }
        } catch (error) {
            toast.error("Failed to fetch messages");
            console.log("Error fetching messages:", error);
        }
    }

    //funtion to send message to selected user
    const sendMessage = async(messageContent)=>{
        try {
            const {data} = await axios.post(`/messages/send/${selectedUser._id}`, messageContent);
            if(data?.success){
                toast.success("Message sent successfully");
                console.log("Sent message:", data);
                setMessages((prevMessages)=>{
                    return [...prevMessages, data.newMessage];
                });     
            }else{
                toast.error("Failed to send message");
            }
        } catch (error) {
            toast.error("Failed to send message");
            console.log("Error sending message:", error);
        }
    }

    //function to subscribe to socket events
    const subscribeToMessages = async()=>{
        if(!socket) return;

        socket.on('new-message',(newMessage)=>{
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessages)=>{
                    return [...prevMessages, newMessage];
                })

                axios.put(`/messages/mark/${newMessage._id}`)
            }else{
                setUnseenMessages((prevUnseenMessages)=>({
                   ...prevUnseenMessages, 
                    [newMessage.senderId] : (prevUnseenMessages[newMessage.senderId] || 0) + 1
                }))
            }


        })
    }

    //function to unsubscribe from socket events
    const unsubscribeFromMessages = ()=>{
        if(socket){
            socket.off('new-message');
        }
    }

    const value = {
        messages,
        users,
        getUsers,
        getMessages,
        setMessages,
        sendMessage,
        selectedUser,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}
