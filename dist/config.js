"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceAccount = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);
exports.serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey
};
