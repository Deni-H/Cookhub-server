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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const firebase_admin_1 = __importDefault(require("./firebase-admin"));
const getUserProfile = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const firestore = firebase_admin_1.default.firestore();
    const users = yield firestore.collection("users").doc(uid).get();
    const userData = users.data();
    const user = {
        user_name: userData.user_name,
        first_name: userData.first_name,
        last_name: userData.last_name,
        bio: userData.bio,
        profile_image: userData.profile_image
    };
    return user;
});
exports.getUserProfile = getUserProfile;
