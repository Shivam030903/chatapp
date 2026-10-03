import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    reciverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps: true})

const messageModel = mongoose.model("Message", messageSchema)

export default messageModel