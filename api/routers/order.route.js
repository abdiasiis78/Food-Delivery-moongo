import express from 'express'
import { createOrder, deleteOrder, getAllOrders, getUniqueOrder, updateOrder } from '../controllers/order.controller.js'
import tokenVerification from '../middleware/tokenVerification.js'


const router = express()

// create new order route
router.post("/", tokenVerification, createOrder)

// update existing order
router.put("/:id", tokenVerification, updateOrder)

// get unique order by id route
router.get("/:id", getUniqueOrder)

// get all orders route
router.get("/", getAllOrders)

// delete all orders route
router.delete("/:id", tokenVerification, deleteOrder)

export default router