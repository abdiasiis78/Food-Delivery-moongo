import express from 'express'
import { Food, createFood, deleteFood, getAllFood, updateFood } from '../controllers/food.controllers.js'
import tokenVerification from '../middleware/tokenVerification.js'
const router = express()

router.post("/", tokenVerification, createFood)
router.put("/:id", tokenVerification, updateFood)
router.get("/:id", Food)
router.get("/",  getAllFood)
router.delete("/:id", tokenVerification, deleteFood)


export default router