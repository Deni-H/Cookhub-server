import { Request, Response, NextFunction, Errback } from "express"
import { StatusCode, StatusMessage } from "../utils/http-status"

export const jsonErrorMiddleware = async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({
            status: StatusCode.BAD_REQUEST,
            message: StatusMessage.INVALID_JSON_FORMAT
        })
    }
    next()
}