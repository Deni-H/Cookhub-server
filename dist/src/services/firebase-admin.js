"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const config_1 = require("../../config");
exports.default = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(config_1.serviceAccount)
});
