//get all users expect logged in user

import cloudinary from "../lib/cloudinary";
import messageModel from "../models/Message";
import io from '../server.js';

export const getUsersForSidebar = async(req,res)=>{
    try {
        const userId = req.user._id;

        const filteredUsers = await userModel.find({_id : {$ne : userId}}).select('-password');

        //count no of unseen messages

        const unseenMessage = {}
        const promises = filteredUsers.map(async(user)=>{
            const messages = await messageModel.find({senderId : user._id, receiverId : userId, seen : false});
            if(messages.length > 0){
                unseenMessage[user._id] = messages.length;
            }
        })

        const results = await Promise.all(promises);

        return res.status(200).json({success:true, message : "Users fetched successfully", userdata : filteredUsers, unseenMessage : unseenMessage});
    } catch (error) {
        console.log("Error in fetching users for sidebar",error);
        return res.status(500).json({success:false, message : error.message});
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id : selectedUserId} = req.params;
        const myId = req.user._id;

        const messages = await messageModel.find({
            $or : [
                {senderId : myId, receiverId : selectedUserId},
                {senderId : selectedUserId, receiverId : myId}
            ]
        })

        await messageModel.updateMany({senderId : selectedUserId, receiverId : myId},{seen : true})
        return res.status(200).json({success:true, message : "Messages fetched successfully", messages : messages});
    } catch (error) {
        console.log("Error in fetching messages",error);
        return res.status(500).json({success:false, message : error.message});
    }
}

export const markSeen = async(req,res)=>{
    try {
        const {id} = req.params;
        await messageModel.findByIdAndUpdate(id,{seen : true});
        return res.status(200).json({success:true, message : "Message marked as seen"});
         
    } catch (error) {
        console.log("Error in marking messages as seen",error);
        return res.status(500).json({success:false, message : error.message});
    }
}


//send message controller selected user

export const sendMessage = async(req,res)=>{

    try {
        const {text, image} = req.body;
        const receiverId= req.params.id;
        const senderId = req.user._id;

        let imageUrl;

        if(image){
            const upload = await cloudinary.uploader.upload(image);
            imageUrl = upload.secure_url;
        }

        const newMessage = messageModel.create({
                senderId,
                receiverId,
                text,
                image : imageUrl
            })

            //emit new message to receiver if online
            const receiverSocketId = userSocketMap[receiverId];
            if(receiverSocketId){
                io.to(receiverSocketId).emit('new-message', newMessage);
            }

        return res.status(200).json({success:true, message : "Message sent successfully", newMessage : newMessage});
    } catch (error) {
        console.log("Error in sending message",error);
        return res.status(500).json({success:false, message : error.message});
    }
}