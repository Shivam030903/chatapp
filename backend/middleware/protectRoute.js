import jwt from "jsonwebtoken"

import userModel from "../models/user.model.js"

const protectRoute = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message:"Unauthorized - No Token Provided "})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decoded){
            res.status(401).json({error: "Invalid Token"})
        }
        const user = await userModel.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({error:"user not found"})
        }
        req.user = user
        next()
    } catch (error) {
        console.log("Error message ", error)
        res.status(500).json({message:"Server error"})
    }
}

export default protectRoute