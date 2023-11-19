import express from 'express'
import tokenverification from '../middleware/tokenVerification.js'
import { createFeedback, deleteFeedback, getAllFeedbacks, getUniqueFeedback, updateFeedback } from '../controllers/feedback.controller.js'
const router = express()

// create new feedback route
router.post("/", tokenverification , createFeedback)

// update existing feedback by id route
router.put("/:id", tokenverification , updateFeedback)

// get unique feedback by id route
router.get("/:id" , getUniqueFeedback)

// get all feedbacks route
router.get("/" , getAllFeedbacks)

// delete existing fedback by id route
router.delete("/:id", tokenverification , deleteFeedback)



export default router