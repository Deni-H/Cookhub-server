"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonErrorMiddleware = void 0;
const http_response_1 = require("../utils/http-response");
const jsonErrorMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const httpReponse = new http_response_1.HttpReponse(res);
    if (err instanceof SyntaxError && 'body' in err) {
        return httpReponse.badRequest(http_response_1.StatusMessage.INVALID_JSON_FORMAT);
    }
    next();
});
exports.jsonErrorMiddleware = jsonErrorMiddleware;
