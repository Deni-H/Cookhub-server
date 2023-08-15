import { Response } from "express"

export class HttpReponse {
    res: Response

    constructor(res: Response) {
        this.res = res
    }

    ok(data: object) {
        return this.res.json({ data: data })
    }

    created(data: object) {
        return this.res.status(StatusCode.CREATED).json({ data: data })
    }

    accepted(data: object) {
        return this.res.status(StatusCode.ACCEPTED).json({ data: data })
    }

    badRequest(message?: string) {
        const _message = message || StatusMessage.BAD_REQUEST

        return this.res.status(StatusCode.BAD_REQUEST).json({
            message: _message
        })
    }

    unauthorized(message?: string) {
        const _message = message || StatusMessage.UNAUTHORIZED

        return this.res.status(StatusCode.UNAUTHORIZED).json({
            message: _message
        })
    }

    forbidden(message?: string) {
        const _message = message || StatusMessage.FORBIDDEN

        return this.res.status(StatusCode.FORBIDDEN).json({
            message: _message
        })
    }

    notFound(message?: string) {
        const _message = message || StatusMessage.NOT_FOUND
        return this.res.status(StatusCode.NOT_FOUND).json({
            message: _message
        })
    }

    methodNotAllowed(message?: string) {
        const _message = message || StatusMessage.METHOD_NOT_ALLOWED

        return this.res.status(StatusCode.METHOD_NOT_ALLOWED).json({
            message: _message
        })
    }

    internalServerError(message?: string) {
        const _message = message || StatusMessage.INTERNAL_SERVER_ERROR

        return this.res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: _message
        })
    }

    serviceUnavailable(message?: string) {
        const _message = message || StatusMessage.SERVICE_UNAVAILABLE

        return this.res.status(StatusCode.SERVICE_UNAVAILABLE).json({
            message: _message
        })
    }

    httpConflict(message?: string) {
        const _message = message || StatusMessage.HTTP_CONFLICT

        return this.res.status(StatusCode.HTTP_CONFLICT).json({
            message: _message
        })
    }

    tooManyRequest(message?: string) {
        const _message = message || StatusMessage.TOO_MANY_REQUEST

        return this.res.status(StatusCode.TOO_MANY_REQUEST).json({
            message: _message
        })
    }
}

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
    HTTP_CONFLICT = 409,
    TOO_MANY_REQUEST = 429
}

export enum StatusMessage {
    OK = 'OK',
    CREATED = 'Created',
    ACCEPTED = 'Accepted',
    BAD_REQUEST = 'Bad Request',
    UNAUTHORIZED = 'Unauthorized',
    FORBIDDEN = 'Forbidden',
    NOT_FOUND = 'Not Found',
    METHOD_NOT_ALLOWED = 'Method Not Allowed',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
    SERVICE_UNAVAILABLE = 'Service Unavailable',
    EMAIL_NOT_VERIFIED = 'Email Not Verified',
    TOKEN_EXPIRED = 'Token Expired',
    USERNAME_ALREADY_EXISTS = 'Username Already Exists!',
    USER_ALREADY_EXISTS = 'User already exists! use PUT method to update user profile',
    INVALID_JSON_FORMAT = 'Invalid JSON Format',
    USERNAME_RECENTLY_CHANGED = 'Username changed recently, wait until 28 days to change again!',
    HTTP_CONFLICT = 'HTTP Conflict',
    TOO_MANY_REQUEST = 'Too Many Request',
    PROFILE_INCOMPLETED = 'Profile Incompleted',
    ALREADY_FOLLOWING = 'Already Following',
    NOT_FOLLOWING = 'Not Following'
}