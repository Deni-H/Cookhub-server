import { Request, Response, NextFunction } from 'express'
import { verifyIdToken } from '../services/auth-service'
import { StatusCode, StatusMessage } from '../utils/http-status'

export const checkAuthHeader = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authorization = req.headers.authorization

    if (!authorization) {
        return errorResponse(
            res,
            StatusCode.UNAUTHORIZED,
            StatusMessage.UNAUTHORIZED
        )
    }

    verifyIdToken(authorization)
        .then((decodedId) => {
            res.locals.uid = decodedId.uid
            res.locals.email = decodedId.email
            res.locals.emailVerified = decodedId.email_verified
            if (!decodedId.email_verified) {
                return errorResponse(
                    res,
                    StatusCode.FORBIDDEN,
                    StatusMessage.EMAIL_NOT_VERIFIED
                )
            }
            next()
        })
        .catch((reason) => {
            console.log(reason.code)
            if (reason.code === 'auth/id-token-expired') {
                return errorResponse(
                    res,
                    StatusCode.UNAUTHORIZED,
                    StatusMessage.TOKEN_EXPIRED
                )
            }
            return errorResponse(
                res,
                StatusCode.UNAUTHORIZED,
                StatusMessage.UNAUTHORIZED
            )
        })
}

const errorResponse = (
    res: Response,
    statusCode: StatusCode,
    statusMessage: StatusMessage
) => {
    return res.status(statusCode).json({
        status: statusCode,
        message: statusMessage
    })
}