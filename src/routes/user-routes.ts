import express from "express"
import { getUserDetails, getUserProfile } from "../controllers/user-controller"

export const userRouter = express.Router()

userRouter.get("/user/:userId", getUserProfile)

userRouter.get("/user/:userId/details", getUserDetails)