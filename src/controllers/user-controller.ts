import { Request, Response, NextFunction } from "express"
import { StatusCode } from "../utils/http-status"

export const getUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uid = res.locals.uid
    const email = res.locals.email
    const emailVerified = res.locals.emailVerified

    res.json({
        status: StatusCode.OK,
        data: {
            uid: uid,
            email: email,
            emailVerified: emailVerified
        }
    })
    next()
}