import express from 'express'
import { Food, createFood, deleteFood, getAllFood, updateFood } from '../controllers/food.controllers.js'
import tokenVerification from '../middleware/tokenVerification.js'
const router = express()

// create foodMenu route
router.post("/", tokenVerification, createFood)

// update foodMenu by id route
router.put("/:id", tokenVerification, updateFood)

// get unique food by id route
router.get("/:id", Food)

// get all foodMenu  route
router.get("/",  getAllFood)

// delete foodMenu by Id route
router.delete("/:id", tokenVerification, deleteFood)


export default router