import express from "express"
import { addUserProfile, getUserDetails, getUserProfile, setUserName, updateUserProfile, followUser, unfollowUser, isFollowing, getFollowers } from "../controllers/user-controller"

export const userRouter = express.Router()

userRouter.get("/user/", getUserDetails)

userRouter.get("/user/:userId", getUserProfile)

userRouter.post("/user/", addUserProfile)

userRouter.put("/user/", updateUserProfile)

userRouter.post("/user/username/", setUserName)

userRouter.post("/user/:userId/follow", followUser)

userRouter.post("/user/:userId/unfollow", unfollowUser)

userRouter.get("/user/following/:userId", isFollowing)

userRouter.get("/user/:userId/followers", getFollowers)