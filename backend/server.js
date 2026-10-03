import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToMongoDB from "./db/connectToMongodb.js"


const app = express()

dotenv.config()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("heloo world")

})

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/users",userRoutes)



app.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`App running on port ${PORT}`);
    
})