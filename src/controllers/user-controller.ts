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
    const targetUid = req.params['userId']

    if (uid !== targetUid) return res.status(StatusCode.FORBIDDEN)
        .json({
            status: StatusCode.FORBIDDEN,
            message: StatusMessage.FORBIDDEN
        })

    res.json({
        status: StatusCode.OK,
        data: await UserService.getUserDetails(targetUid)
    })
    next()
}