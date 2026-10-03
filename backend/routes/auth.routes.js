import express from "express"
import { createUser, loginUser, logoutUser } from "../controller/auth.controller.js"


const router = express.Router()

router.post("/signup",createUser)
router.post("/signin",loginUser)
router.post("/logout",logoutUser)

export default router