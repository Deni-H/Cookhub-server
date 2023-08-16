import express from "express"
import * as UserController from "../controllers/user-controller"

export const userRouter = express.Router()

userRouter.get("/user/", UserController.getUserDetails)

userRouter.get("/user/:userId", UserController.getUserProfile)

userRouter.post("/user/", UserController.addUserProfile)

userRouter.put("/user/", UserController.updateUserProfile)

userRouter.post("/user/username/", UserController.setUserName)

userRouter.post("/user/:userId/follow", UserController.followUser)

userRouter.post("/user/:userId/unfollow", UserController.unfollowUser)

userRouter.get("/user/following/:userId", UserController.isFollowing)

userRouter.get("/user/:userId/followers", UserController.getFollowers)

userRouter.get("/user/:userId/following", UserController.getFollowing)