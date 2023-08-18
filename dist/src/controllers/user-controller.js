"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getRecipes = exports.getFollowing = exports.getFollowers = exports.isFollowing = exports.unfollowUser = exports.followUser = exports.setUserName = exports.updateUserProfile = exports.addUserProfile = exports.getUserDetails = exports.getUserProfile = void 0;
const http_response_1 = require("../utils/http-response");
const UserService = __importStar(require("../services/user-service"));
const util_1 = require("../utils/util");
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const httpReponse = new http_response_1.HttpReponse(res);
    const targetUid = req.params['userId'];
    const isUserExists = yield UserService.isUserExists(targetUid);
    if (!isUserExists)
        return httpReponse.notFound();
    const userProfile = yield UserService.getUserProfile(targetUid);
    httpReponse.ok(userProfile);
    next();
});
exports.getUserProfile = getUserProfile;
const getUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const httpReponse = new http_response_1.HttpReponse(res);
    const uid = res.locals.uid;
    const isUserExists = yield UserService.isUserExists(uid);
    if (!isUserExists)
        return httpReponse.notFound();
    const userDetails = yield UserService.getUserDetails(uid);
    httpReponse.ok(userDetails);
    next();
});
exports.getUserDetails = getUserDetails;
const addUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const httpReponse = new http_response_1.HttpReponse(res);
    const uid = res.locals.uid;
    const user = {
        email: res.locals.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        bio: req.body.bio,
        profile_image: req.body.profile_image
    };
    const isUserExists = yield UserService.isUserExists(uid);
    if (isUserExists)
        return httpReponse.httpConflict(http_response_1.StatusMessage.USER_ALREADY_EXISTS);
    yield UserService.addUserProfile(uid, user)
        .then((result) => httpReponse.created(result))
        .catch(() => httpReponse.internalServerError());
    next();
});
exports.addUserProfile = addUserProfile;
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const httpReponse = new http_response_1.HttpReponse(res);
    const uid = res.locals.uid;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const bio = req.body.bio;
    const profileImage = req.body.profile_image;
    const isUserExists = yield UserService.isUserExists(uid);
    if (!isUserExists)
        return httpReponse.notFound();
    if (firstName)
        yield UserService.updateUserProfile(uid, { first_name: firstName });
    if (lastName)
        yield UserService.updateUserProfile(uid, { last_name: lastName });
    if (bio)
        yield UserService.updateUserProfile(uid, { bio: bio });
    if (profileImage)
        yield UserService.updateUserProfile(uid, { profile_image: profileImage });
    const userDeatils = yield UserService.getUserDetails(uid);
    httpReponse.ok(userDeatils);
    next();
});
exports.updateUserProfile = updateUserProfile;
const setUserName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const httpReponse = new http_response_1.HttpReponse(res);
    const uid = res.locals.uid;
    const userName = req.body.user_name;
    if (!userName)
        return httpReponse.badRequest();
    const isUserExists = yield UserService.isUserExists(uid);
    if (!isUserExists)
        return httpReponse.notFound();
    const userDetails = yield UserService.getUserDetails(uid);
    const oldUserName = (_a = userDetails.user_name) === null || _a === void 0 ? void 0 : _a.value;
    const lastChanged = (_b = userDetails.user_name) === null || _b === void 0 ? void 0 : _b.last_changed;
    const currentTime = (0, util_1.getCurrentTime)();
    const changeDelay = (0, util_1.dayToTimestamp)(28);
    if (currentTime - lastChanged <= changeDelay) {
        return httpReponse.tooManyRequest(http_response_1.StatusMessage.USERNAME_RECENTLY_CHANGED);
    }
    const isUserNameExists = yield UserService.isUserNameExists(userName);
    if (isUserNameExists) {
        return httpReponse.httpConflict(http_response_1.StatusMessage.USERNAME_ALREADY_EXISTS);
    }
    if (oldUserName)
        yield UserService.deleteUserName(oldUserName);
    yield UserService.registerUserName(userName, uid);
    const updateResult = yield UserService.updateUserName(uid, userName, currentTime);
    httpReponse.ok(updateResult);
    next();
});
exports.setUserName = setUserName;
const followUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = res.locals.uid;
    const targetUid = req.params['userId'];
    const httpReponse = new http_response_1.HttpReponse(res);
    const isUidExists = yield UserService.isUserExists(uid);
    if (!isUidExists)
        return httpReponse.badRequest(http_response_1.StatusMessage.PROFILE_INCOMPLETED);
    const isTargetUidExists = yield UserService.isUserExists(targetUid);
    if (!isTargetUidExists)
        return httpReponse.notFound();
    const isFollowing = yield UserService.isFollowing(uid, targetUid);
    if (isFollowing)
        return httpReponse.badRequest(http_response_1.StatusMessage.ALREADY_FOLLOWING);
    return httpReponse.ok(yield UserService.followUser(uid, targetUid));
    next();
});
exports.followUser = followUser;
const unfollowUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = res.locals.uid;
    const targetUid = req.params['userId'];
    const httpReponse = new http_response_1.HttpReponse(res);
    const isUidExists = yield UserService.isUserExists(uid);
    if (!isUidExists)
        return httpReponse.badRequest(http_response_1.StatusMessage.PROFILE_INCOMPLETED);
    const isTargetUidExists = yield UserService.isUserExists(targetUid);
    if (!isTargetUidExists)
        return httpReponse.notFound();
    const isFollowing = yield UserService.isFollowing(uid, targetUid);
    if (!isFollowing)
        return httpReponse.badRequest(http_response_1.StatusMessage.NOT_FOLLOWING);
    return httpReponse.ok(yield UserService.unfollowUser(uid, targetUid));
    next();
});
exports.unfollowUser = unfollowUser;
const isFollowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = res.locals.uid;
    const targetUid = req.params['userId'];
    const httpReponse = new http_response_1.HttpReponse(res);
    const isUidExists = yield UserService.isUserExists(uid);
    if (!isUidExists)
        return httpReponse.badRequest(http_response_1.StatusMessage.PROFILE_INCOMPLETED);
    const isTargetUidExists = yield UserService.isUserExists(targetUid);
    if (!isTargetUidExists)
        return httpReponse.notFound();
    const isFollowing = yield UserService.isFollowing(uid, targetUid);
    return httpReponse.ok({
        following: isFollowing
    });
    next();
});
exports.isFollowing = isFollowing;
const getFollowers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const targetUid = req.params['userId'];
    const last = req.query.last;
    const httpReponse = new http_response_1.HttpReponse(res);
    const isTargetUidExists = yield UserService.isUserExists(targetUid);
    if (!isTargetUidExists)
        return httpReponse.notFound();
    let result;
    if (last)
        result = yield UserService.getFollowers(targetUid, last);
    else
        result = yield UserService.getFirstFollower(targetUid);
    return httpReponse.ok(result);
    next();
});
exports.getFollowers = getFollowers;
const getFollowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const targetUid = req.params['userId'];
    const last = req.query.last;
    const httpReponse = new http_response_1.HttpReponse(res);
    const isTargetUidExists = yield UserService.isUserExists(targetUid);
    if (!isTargetUidExists)
        return httpReponse.notFound();
    let result;
    if (last)
        result = yield UserService.getFollowing(targetUid, last);
    else
        result = yield UserService.getFirstFollowing(targetUid);
    return httpReponse.ok(result);
    next();
});
exports.getFollowing = getFollowing;
const getRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const targetUid = req.params['userId'];
    const last = req.query.last;
    const httpReponse = new http_response_1.HttpReponse(res);
    const isTargetUidExists = yield UserService.isUserExists(targetUid);
    if (!isTargetUidExists)
        return httpReponse.notFound();
    let result;
    if (last)
        result = yield UserService.getRecipes(targetUid, Number(last));
    else
        result = yield UserService.getFirstPageRecipes(targetUid);
    return httpReponse.ok(result);
    next();
});
exports.getRecipes = getRecipes;
