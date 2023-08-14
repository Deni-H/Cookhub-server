import { Request, Response, NextFunction } from "express"
import { HttpReponse, StatusMessage } from "../utils/http-response"

export const jsonErrorMiddleware = async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const httpReponse = new HttpReponse(res)

    if (err instanceof SyntaxError && 'body' in err) {
        return httpReponse.badRequest(StatusMessage.INVALID_JSON_FORMAT)
    }

    next()
}