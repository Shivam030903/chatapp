import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    userName: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
        minlength: 6
    },
    
    gender: {
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:"",
    }
},{timestamps:true})

const userModel = mongoose.model("User",userSchema)

export default userModel