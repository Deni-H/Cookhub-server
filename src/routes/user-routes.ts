import express from "express"
import { getUserProfile } from "../controllers/user-controller"

export const userRouter = express.Router()

userRouter.get("/user/:userId", getUserProfile)