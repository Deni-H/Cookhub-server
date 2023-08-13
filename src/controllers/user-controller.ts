import { Request, Response, NextFunction } from "express"
import { StatusCode, StatusMessage } from "../utils/http-status"
import * as UserService from "../services/user-service"
import { UserDetails } from "../models/user"

export const getUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const targetUid = req.params['userId']
    const isUserExists = await UserService.isUserExists(targetUid)

    if (!isUserExists) {
        return res.status(StatusCode.NOT_FOUND).json({
            status: StatusCode.NOT_FOUND,
            message: StatusMessage.NOT_FOUND
        })
    }

    res.json({
        status: StatusCode.OK,
        data: await UserService.getUserProfile(targetUid)
    })
    next()
}

export const getUserDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uid = res.locals.uid

    const isUserExists = await UserService.isUserExists(uid)

    if (!isUserExists) {
        return res.status(StatusCode.NOT_FOUND).json({
            status: StatusCode.NOT_FOUND,
            message: StatusMessage.NOT_FOUND
        })
    }

    res.json({
        status: StatusCode.OK,
        data: await UserService.getUserDetails(uid)
    })
    next()
}

export const addUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uid = res.locals.uid

    const user: UserDetails = {
        email: res.locals.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        bio: req.body.bio,
        profile_image: req.body.profile_image
    }

    const isUserExists = await UserService.isUserExists(uid)
    if (isUserExists) return res.status(StatusCode.HTTP_CONFLICT).json({
        status: StatusCode.HTTP_CONFLICT,
        message: StatusMessage.USER_ALREADY_EXISTS
    })

    await UserService.addUserProfile(uid, user)
        .then((result) => {
            return res.json({
                status: StatusCode.OK,
                data: result
            })
        })
        .catch((reason) => {
            console.log(reason)
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                status: StatusCode.INTERNAL_SERVER_ERROR,
                message: StatusMessage.INTERNAL_SERVER_ERROR
            })
        })
    next()
}

export const updateUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uid = res.locals.uid
    const firstName = req.body.first_name
    const lastName = req.body.last_name
    const bio = req.body.bio
    const profileImage = req.body.profile_image

    const isUserExists = await UserService.isUserExists(uid)

    if (!isUserExists) return res.status(StatusCode.NOT_FOUND).json({
        status: StatusCode.NOT_FOUND,
        message: StatusMessage.NOT_FOUND
    })

    if (firstName) await UserService.updateUserProfile(uid, { first_name: firstName })
    if (lastName) await UserService.updateUserProfile(uid, { last_name: lastName })
    if (bio) await UserService.updateUserProfile(uid, { bio: bio })
    if (profileImage) await UserService.updateUserProfile(uid, { profile_image: profileImage })

    res.json({
        status: StatusCode.OK,
        data: await UserService.getUserDetails(uid)
    })
}

export const setUserName = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uid = res.locals.uid
    const userName = req.body.user_name as string

    if (!userName) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: StatusCode.BAD_REQUEST,
            message: StatusMessage.BAD_REQUEST
        })
    }

    const isUserExists = await UserService.isUserExists(uid)

    if (!isUserExists) {
        return res.status(StatusCode.NOT_FOUND).json({
            status: StatusCode.NOT_FOUND,
            message: StatusMessage.NOT_FOUND
        })
    }

    const isUserNameExists = await UserService.isUserNameExists(userName)

    if (isUserNameExists) {
        return res.status(StatusCode.HTTP_CONFLICT).json({
            status: StatusCode.HTTP_CONFLICT,
            message: StatusMessage.USERNAME_ALREADY_EXISTS
        })
    }

    const userDetails = await UserService.getUserDetails(uid)
    const oldUserName = userDetails.user_name as string

    if (oldUserName) await UserService.deleteUserName(oldUserName)

    await UserService.registerUserName(uid, userName)

    const updateResult = await UserService.updateUserName(uid, userName)
    res.json({
        status: StatusCode.OK,
        message: updateResult
    })

    next()
}