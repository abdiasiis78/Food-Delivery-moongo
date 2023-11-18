import express from 'express'
import { curentUser, deleteUser, signIn, signup, updateUser, users } from '../controllers/user.controllers.js'
import tokenVerification from '../middleware/tokenVerification.js'
const router = express()


router.post("/signup", signup)
router.post("/signin", signIn)
router.get("/user", tokenVerification, curentUser)
router.get("/users", users)
router.put("/update", tokenVerification, updateUser)
router.delete("/delete", tokenVerification, deleteUser)




export default router 