"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthHeader = void 0;
const auth_service_1 = require("../services/auth-service");
const http_response_1 = require("../utils/http-response");
const checkAuthHeader = (req, res, next) => {
    const authorization = req.headers.authorization;
    const httpReponse = new http_response_1.HttpReponse(res);
    if (!authorization)
        return httpReponse.unauthorized();
    (0, auth_service_1.verifyIdToken)(authorization)
        .then((decodedId) => {
        res.locals.uid = decodedId.uid;
        res.locals.email = decodedId.email;
        res.locals.emailVerified = decodedId.email_verified;
        if (!decodedId.email_verified) {
            return httpReponse.forbidden(http_response_1.StatusMessage.EMAIL_NOT_VERIFIED);
        }
        next();
    })
        .catch((reason) => {
        console.log(reason.code);
        if (reason.code === 'auth/id-token-expired') {
            return httpReponse.unauthorized(http_response_1.StatusMessage.TOKEN_EXPIRED);
        }
        return httpReponse.unauthorized();
    });
};
exports.checkAuthHeader = checkAuthHeader;
