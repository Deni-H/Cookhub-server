import express from "express"
import { addUserProfile, getUserDetails, getUserProfile, setUserName } from "../controllers/user-controller"

export const userRouter = express.Router()

userRouter.get("/user/:userId", getUserProfile)

userRouter.get("/user/", getUserDetails)

userRouter.post("/user/", addUserProfile)

userRouter.post("/user/username", setUserName)
