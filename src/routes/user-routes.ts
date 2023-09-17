import express from "express"
import * as UserController from "../controllers/user-controller"

export const userRouter = express.Router()

userRouter.get("/user/", UserController.getUserDetails)

userRouter.post("/user/", UserController.addUserProfile)

userRouter.put("/user/", UserController.updateUserProfile)

userRouter.get("/user/:userId", UserController.getUserProfile)

userRouter.get("/user/:userId/followers/", UserController.getFollowers)

userRouter.get("/user/:userId/following/", UserController.getFollowing)

userRouter.get("/user/:userId/recipes/", UserController.getRecipes)

userRouter.post("/user/follow/:userId/", UserController.followUser)

userRouter.post("/user/unfollow/:userId/", UserController.unfollowUser)

userRouter.get("/user/following/:userId/", UserController.isFollowing)

userRouter.post("/user/username/", UserController.setUserName)

userRouter.post("/username/", UserController.isUserNameExists)

    / api / v1 / users / user / unfollow / OP2sLCtkMHUoJLUkgKZkekQVop23