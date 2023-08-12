import { Request, Response, NextFunction } from "express"
import { StatusCode, StatusMessage } from "../utils/http-status"
import * as UserService from "../services/user-service"

export const getUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uid = res.locals.uid
    const email = res.locals.email

    const targetUid = req.params['userId']
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

}