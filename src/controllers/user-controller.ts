import { Request, Response, NextFunction } from "express"
import { StatusMessage, HttpReponse } from "../utils/http-response"
import * as UserService from "../services/user-service"
import { UserDetails } from "../models/user"
import { dayToTimestamp, getCurrentTime } from "../utils/util"

export const getUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const httpReponse = new HttpReponse(res)

    const targetUid = req.params['userId']
    const isUserExists = await UserService.isUserExists(targetUid)

    if (!isUserExists) return httpReponse.notFound()

    const userProfile = await UserService.getUserProfile(targetUid)

    httpReponse.ok(userProfile)
    next()
}

export const getUserDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const httpReponse = new HttpReponse(res)

    const uid = res.locals.uid
    const isUserExists = await UserService.isUserExists(uid)

    if (!isUserExists) return httpReponse.notFound()

    const userDetails = await UserService.getUserDetails(uid)

    httpReponse.ok(userDetails)
    next()
}

export const addUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const httpReponse = new HttpReponse(res)

    const uid = res.locals.uid

    const user: UserDetails = {
        email: res.locals.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        bio: req.body.bio,
        profile_image: req.body.profile_image
    }

    const isUserExists = await UserService.isUserExists(uid)

    if (isUserExists) return httpReponse.httpConflict(StatusMessage.USER_ALREADY_EXISTS)

    await UserService.addUserProfile(uid, user)
        .then((result) => httpReponse.created(result))
        .catch(() => httpReponse.internalServerError())
    next()
}

export const updateUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const httpReponse = new HttpReponse(res)

    const uid = res.locals.uid
    const firstName = req.body.first_name
    const lastName = req.body.last_name
    const bio = req.body.bio
    const profileImage = req.body.profile_image

    const isUserExists = await UserService.isUserExists(uid)

    if (!isUserExists) return httpReponse.notFound()

    if (firstName) await UserService.updateUserProfile(uid, { first_name: firstName })
    if (lastName) await UserService.updateUserProfile(uid, { last_name: lastName })
    if (bio) await UserService.updateUserProfile(uid, { bio: bio })
    if (profileImage) await UserService.updateUserProfile(uid, { profile_image: profileImage })

    const userDeatils = await UserService.getUserDetails(uid)
    httpReponse.ok(userDeatils)
    next()
}

export const setUserName = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const httpReponse = new HttpReponse(res)

    const uid = res.locals.uid
    const userName = req.body.user_name as string

    if (!userName) return httpReponse.badRequest()

    const isUserExists = await UserService.isUserExists(uid)

    if (!isUserExists) return httpReponse.notFound()

    const userDetails = await UserService.getUserDetails(uid)
    const oldUserName = userDetails.user_name?.value as string
    const lastChanged = userDetails.user_name?.last_changed as number
    const currentTime = getCurrentTime()
    const changeDelay = dayToTimestamp(28)

    if (currentTime - lastChanged <= changeDelay) {
        return httpReponse.tooManyRequest(StatusMessage.USERNAME_RECENTLY_CHANGED)
    }

    const isUserNameExists = await UserService.isUserNameExists(userName)

    if (isUserNameExists) {
        return httpReponse.httpConflict(StatusMessage.USERNAME_ALREADY_EXISTS)
    }

    if (oldUserName) await UserService.deleteUserName(oldUserName)

    await UserService.registerUserName(userName, uid)

    const updateResult = await UserService.updateUserName(uid, userName, currentTime)
    httpReponse.ok(updateResult)

    next()
}

export const followUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uid = res.locals.uid
    const targetUid = req.params['userId']
    const httpReponse = new HttpReponse(res)

    const isUidExists = await UserService.isUserExists(uid)
    if (!isUidExists) return httpReponse.badRequest(StatusMessage.PROFILE_INCOMPLETED)

    const isTargetUidExists = await UserService.isUserExists(targetUid)
    if (!isTargetUidExists) return httpReponse.notFound()

    const isFollowing = await UserService.isFollowing(uid, targetUid)
    if (isFollowing) return httpReponse.badRequest(StatusMessage.ALREADY_FOLLOWING)

    const currentTime = getCurrentTime()
    return httpReponse.ok(await UserService.followUser(uid, targetUid, currentTime))

    next()
}

export const unfollowUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uid = res.locals.uid
    const targetUid = req.params['userId']
    const httpReponse = new HttpReponse(res)

    const isUidExists = await UserService.isUserExists(uid)
    if (!isUidExists) return httpReponse.badRequest(StatusMessage.PROFILE_INCOMPLETED)

    const isTargetUidExists = await UserService.isUserExists(targetUid)
    if (!isTargetUidExists) return httpReponse.notFound()

    const isFollowing = await UserService.isFollowing(uid, targetUid)
    if (!isFollowing) return httpReponse.badRequest(StatusMessage.NOT_FOLLOWING)

    return httpReponse.ok(await UserService.unfollowUser(uid, targetUid))

    next()
}

export const isFollowing = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uid = res.locals.uid
    const targetUid = req.params['userId']
    const httpReponse = new HttpReponse(res)

    const isUidExists = await UserService.isUserExists(uid)
    if (!isUidExists) return httpReponse.badRequest(StatusMessage.PROFILE_INCOMPLETED)

    const isTargetUidExists = await UserService.isUserExists(targetUid)
    if (!isTargetUidExists) return httpReponse.notFound()

    const isFollowing = await UserService.isFollowing(uid, targetUid)
    return httpReponse.ok({
        following: isFollowing
    })

    next()
}