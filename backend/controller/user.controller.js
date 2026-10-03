import userModel from "../models/user.model.js"

export const getUserForSidebar = async(req,res) =>{
    try {
        const loggedInUserId = req.user._id

        const filtredUsers = await userModel.find({_id:{ $ne: loggedInUserId}}).select("-password")

        res.status(200).json(filtredUsers)
    } catch (error) {
        console.log("Error in getting user for sidebar",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}