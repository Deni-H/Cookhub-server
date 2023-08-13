import express from "express"
import { addUserProfile, getUserDetails, getUserProfile, setUserName, updateUserProfile } from "../controllers/user-controller"

export const userRouter = express.Router()

userRouter.get("/user/", getUserDetails)

userRouter.get("/user/:userId", getUserProfile)

userRouter.post("/user/", addUserProfile)

userRouter.put("/user/", updateUserProfile)

userRouter.post("/user/username/", setUserName)