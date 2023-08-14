import { Request, Response, NextFunction } from 'express'
import { verifyIdToken } from '../services/auth-service'
import { HttpReponse, StatusMessage } from '../utils/http-response'

export const checkAuthHeader = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authorization = req.headers.authorization
    const httpReponse = new HttpReponse(res)

    if (!authorization) return httpReponse.unauthorized()

    verifyIdToken(authorization)
        .then((decodedId) => {
            res.locals.uid = decodedId.uid
            res.locals.email = decodedId.email
            res.locals.emailVerified = decodedId.email_verified

            if (!decodedId.email_verified) {
                return httpReponse.forbidden(StatusMessage.EMAIL_NOT_VERIFIED)
            }

            next()
        })
        .catch((reason) => {
            console.log(reason.code)
            if (reason.code === 'auth/id-token-expired') {
                return httpReponse.unauthorized(StatusMessage.TOKEN_EXPIRED)
            }
            return httpReponse.unauthorized()
        })
}