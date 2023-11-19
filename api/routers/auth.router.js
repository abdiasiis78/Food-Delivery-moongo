import express from 'express'
import { curentUser, deleteUser, signIn, signup, updateUser, users } from '../controllers/user.controllers.js'
import tokenVerification from '../middleware/tokenVerification.js'
const router = express()

//create new user route
router.post("/signup", signup)

// login existing user route 
router.post("/signin", signIn)

// get current user route
router.get("/user", tokenVerification, curentUser)

// get all users route
router.get("/users", users)

// update existing user rout
router.put("/update", tokenVerification, updateUser)

// delete existing user route
router.delete("/delete", tokenVerification, deleteUser)




export default router 