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
exports.getFirstPageRecipes = exports.getRecipes = exports.getFirstFollowing = exports.getFollowing = exports.getFirstFollower = exports.getFollowers = exports.isFollowing = exports.unfollowUser = exports.followUser = exports.updateUserName = exports.deleteUserName = exports.registerUserName = exports.getUserNameOwner = exports.isUserNameExists = exports.isUserExists = exports.updateUserProfile = exports.addUserProfile = exports.getUserDetails = exports.getUserProfile = void 0;
const firebase_admin_1 = __importDefault(require("./firebase-admin"));
const firestore = firebase_admin_1.default.firestore();
const getUserProfile = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield getUser(uid);
    return {
        user_name: {
            value: (_a = user.user_name) === null || _a === void 0 ? void 0 : _a.value
        },
        first_name: user.first_name,
        last_name: user.last_name,
        bio: user.bio, profile_image: user.profile_image
    };
});
exports.getUserProfile = getUserProfile;
const getUserDetails = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(uid);
    return {
        email: user.email,
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name,
        bio: user.bio,
        profile_image: user.profile_image
    };
});
exports.getUserDetails = getUserDetails;
const addUserProfile = (uid, user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firestore.collection("users").doc(uid).set(user);
});
exports.addUserProfile = addUserProfile;
const updateUserProfile = (uid, user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firestore.collection("users").doc(uid).update(user);
});
exports.updateUserProfile = updateUserProfile;
const isUserExists = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firestore.collection("users").doc(uid).get();
    return doc.exists;
});
exports.isUserExists = isUserExists;
const isUserNameExists = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firestore.collection("user_name").doc(userName).get();
    return doc.exists;
});
exports.isUserNameExists = isUserNameExists;
const getUserNameOwner = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firestore.collection("user_name").doc(userName).get();
    const data = doc.data();
    return data.uid;
});
exports.getUserNameOwner = getUserNameOwner;
const registerUserName = (userName, uid) => __awaiter(void 0, void 0, void 0, function* () {
    return firestore.collection("user_name").doc(userName).set({
        uid: uid
    });
});
exports.registerUserName = registerUserName;
const deleteUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    return firestore.collection("user_name").doc(userName).delete();
});
exports.deleteUserName = deleteUserName;
const updateUserName = (uid, userName, last_changed) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firestore.collection("users").doc(uid).update({
        user_name: {
            value: userName,
            last_changed: last_changed
        }
    });
});
exports.updateUserName = updateUserName;
/**
 * Becareful! if the targetUid or uid didn't exists it will automatically creating a new document
 * Make sure both uid and targetUid exists!
 * @param uid
 * @param targetUid
 * @returns
 */
const followUser = (uid, targetUid) => __awaiter(void 0, void 0, void 0, function* () {
    yield firestore
        .collection("users").doc(uid)
        .collection("following").doc(targetUid)
        .create({
        uid: targetUid
    });
    return yield firestore
        .collection("users").doc(targetUid)
        .collection("followers").doc(uid)
        .create({
        uid: uid
    });
});
exports.followUser = followUser;
const unfollowUser = (uid, targetUid) => __awaiter(void 0, void 0, void 0, function* () {
    yield firestore
        .collection("users").doc(uid)
        .collection("following").doc(targetUid)
        .delete();
    return yield firestore.
        collection("users").doc(targetUid)
        .collection("followers").doc(uid)
        .delete();
});
exports.unfollowUser = unfollowUser;
const isFollowing = (uid, targetUid) => __awaiter(void 0, void 0, void 0, function* () {
    const following = yield firestore
        .collection("users").doc(uid)
        .collection("following").doc(targetUid)
        .get();
    return following.exists;
});
exports.isFollowing = isFollowing;
const getFollowers = (uid, last) => __awaiter(void 0, void 0, void 0, function* () {
    const followers = yield firestore
        .collection("users")
        .doc(uid)
        .collection("followers")
        .orderBy("uid")
        .startAfter(last)
        .limit(10)
        .get();
    return followers.docs.map((doc) => doc.data());
});
exports.getFollowers = getFollowers;
const getFirstFollower = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const follower = yield firestore
        .collection("users")
        .doc(uid)
        .collection("followers")
        .orderBy("uid")
        .limit(1)
        .get();
    return follower.docs.map((doc) => doc.data());
});
exports.getFirstFollower = getFirstFollower;
const getFollowing = (uid, last) => __awaiter(void 0, void 0, void 0, function* () {
    const followers = yield firestore
        .collection("users")
        .doc(uid)
        .collection("following")
        .orderBy("uid")
        .startAfter(last)
        .limit(10)
        .get();
    return followers.docs.map((doc) => doc.data());
});
exports.getFollowing = getFollowing;
const getFirstFollowing = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const follower = yield firestore
        .collection("users")
        .doc(uid)
        .collection("following")
        .orderBy("uid")
        .limit(1)
        .get();
    return follower.docs.map((doc) => doc.data());
});
exports.getFirstFollowing = getFirstFollowing;
const getRecipes = (uid, last) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield firestore
        .collection("users")
        .doc(uid)
        .collection("recipes")
        .orderBy("created_at")
        .startAfter(last)
        .limit(10)
        .get();
    return recipes.docs.map((doc) => doc.data());
});
exports.getRecipes = getRecipes;
const getFirstPageRecipes = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield firestore
        .collection("users")
        .doc(uid)
        .collection("recipes")
        .orderBy("created_at")
        .limit(10)
        .get();
    return recipes.docs.map((doc) => doc.data());
});
exports.getFirstPageRecipes = getFirstPageRecipes;
const getUser = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield firestore.collection("users").doc(uid).get();
    return users.data();
});
