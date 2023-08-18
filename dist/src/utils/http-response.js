"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusMessage = exports.StatusCode = exports.HttpReponse = void 0;
class HttpReponse {
    constructor(res) {
        this.res = res;
    }
    ok(data) {
        return this.res.json({ data: data });
    }
    created(data) {
        return this.res.status(StatusCode.CREATED).json({ data: data });
    }
    accepted(data) {
        return this.res.status(StatusCode.ACCEPTED).json({ data: data });
    }
    badRequest(message) {
        const _message = message || StatusMessage.BAD_REQUEST;
        return this.res.status(StatusCode.BAD_REQUEST).json({
            message: _message
        });
    }
    unauthorized(message) {
        const _message = message || StatusMessage.UNAUTHORIZED;
        return this.res.status(StatusCode.UNAUTHORIZED).json({
            message: _message
        });
    }
    forbidden(message) {
        const _message = message || StatusMessage.FORBIDDEN;
        return this.res.status(StatusCode.FORBIDDEN).json({
            message: _message
        });
    }
    notFound(message) {
        const _message = message || StatusMessage.NOT_FOUND;
        return this.res.status(StatusCode.NOT_FOUND).json({
            message: _message
        });
    }
    methodNotAllowed(message) {
        const _message = message || StatusMessage.METHOD_NOT_ALLOWED;
        return this.res.status(StatusCode.METHOD_NOT_ALLOWED).json({
            message: _message
        });
    }
    internalServerError(message) {
        const _message = message || StatusMessage.INTERNAL_SERVER_ERROR;
        return this.res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: _message
        });
    }
    serviceUnavailable(message) {
        const _message = message || StatusMessage.SERVICE_UNAVAILABLE;
        return this.res.status(StatusCode.SERVICE_UNAVAILABLE).json({
            message: _message
        });
    }
    httpConflict(message) {
        const _message = message || StatusMessage.HTTP_CONFLICT;
        return this.res.status(StatusCode.HTTP_CONFLICT).json({
            message: _message
        });
    }
    tooManyRequest(message) {
        const _message = message || StatusMessage.TOO_MANY_REQUEST;
        return this.res.status(StatusCode.TOO_MANY_REQUEST).json({
            message: _message
        });
    }
}
exports.HttpReponse = HttpReponse;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    StatusCode[StatusCode["ACCEPTED"] = 202] = "ACCEPTED";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    StatusCode[StatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    StatusCode[StatusCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    StatusCode[StatusCode["HTTP_CONFLICT"] = 409] = "HTTP_CONFLICT";
    StatusCode[StatusCode["TOO_MANY_REQUEST"] = 429] = "TOO_MANY_REQUEST";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
var StatusMessage;
(function (StatusMessage) {
    StatusMessage["OK"] = "OK";
    StatusMessage["CREATED"] = "Created";
    StatusMessage["ACCEPTED"] = "Accepted";
    StatusMessage["BAD_REQUEST"] = "Bad Request";
    StatusMessage["UNAUTHORIZED"] = "Unauthorized";
    StatusMessage["FORBIDDEN"] = "Forbidden";
    StatusMessage["NOT_FOUND"] = "Not Found";
    StatusMessage["METHOD_NOT_ALLOWED"] = "Method Not Allowed";
    StatusMessage["INTERNAL_SERVER_ERROR"] = "Internal Server Error";
    StatusMessage["SERVICE_UNAVAILABLE"] = "Service Unavailable";
    StatusMessage["EMAIL_NOT_VERIFIED"] = "Email Not Verified";
    StatusMessage["TOKEN_EXPIRED"] = "Token Expired";
    StatusMessage["USERNAME_ALREADY_EXISTS"] = "Username Already Exists!";
    StatusMessage["USER_ALREADY_EXISTS"] = "User already exists! use PUT method to update user profile";
    StatusMessage["INVALID_JSON_FORMAT"] = "Invalid JSON Format";
    StatusMessage["USERNAME_RECENTLY_CHANGED"] = "Username changed recently, wait until 28 days to change again!";
    StatusMessage["HTTP_CONFLICT"] = "HTTP Conflict";
    StatusMessage["TOO_MANY_REQUEST"] = "Too Many Request";
    StatusMessage["PROFILE_INCOMPLETED"] = "Profile Incompleted";
    StatusMessage["ALREADY_FOLLOWING"] = "Already Following";
    StatusMessage["NOT_FOLLOWING"] = "Not Following";
})(StatusMessage || (exports.StatusMessage = StatusMessage = {}));
