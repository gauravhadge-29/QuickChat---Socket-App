import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    },
    text : {type : String},
    image : {type : String},
    seen : {type : Boolean, default : false}
},

{timestamps : true}
)  

const messageModel = mongoose.model('Messages',messageSchema);

export default messageModel;