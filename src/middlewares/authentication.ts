import { Request, Response, NextFunction } from 'express'
import { verifyIdToken } from '../services/auth-service'
import { StatusCode, StatusMessage } from '../utils/http-status'

export const checkAuthHeader = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const response = {
        status: StatusCode.UNAUTHORIZED,
        message: StatusMessage.UNAUTHORIZED
    }

    const authorization = req.headers.authorization

    if (!authorization) return res.status(StatusCode.UNAUTHORIZED).json(response)

    verifyIdToken(authorization)
        .then((decodedId) => {
            res.locals.uid = decodedId.uid
            res.locals.email = decodedId.email
            res.locals.emailVerified = decodedId.email_verified
            next()
        })
        .catch((reason) => {
            console.log(reason.code)
            return res.status(StatusCode.UNAUTHORIZED).json(response)
        })
}