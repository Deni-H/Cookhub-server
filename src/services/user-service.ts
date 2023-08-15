import firebaseAdmin from "./firebase-admin"
import { User, UserDetails } from "../models/user"

const firestore = firebaseAdmin.firestore()

export const getUserProfile = async (uid: string): Promise<User> => {
    const user = await getUser(uid) as User
    return {
        user_name: {
            value: user.user_name?.value!
        },
        first_name: user.first_name,
        last_name: user.last_name,
        bio: user.bio, profile_image: user.profile_image
    }
}

export const getUserDetails = async (uid: string): Promise<UserDetails> => {
    const user = await getUser(uid) as UserDetails
    return {
        email: user.email,
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name,
        bio: user.bio,
        profile_image: user.profile_image
    }
}

export const addUserProfile = async (uid: string, user: UserDetails) => {
    return await firestore.collection("users").doc(uid).set(user)
}

export const updateUserProfile = async (uid: string, user: object) => {
    return await firestore.collection("users").doc(uid).update(user)
}

export const isUserExists = async (uid: string) => {
    const doc = await firestore.collection("users").doc(uid).get()
    return doc.exists
}

export const isUserNameExists = async (userName: string) => {
    const doc = await firestore.collection("user_name").doc(userName).get()
    return doc.exists
}

export const getUserNameOwner = async (userName: string) => {
    const doc = await firestore.collection("user_name").doc(userName).get()
    const data = doc.data()!
    return data.uid as string
}

export const registerUserName = async (userName: string, uid: string,) => {
    return firestore.collection("user_name").doc(userName).set({
        uid: uid
    })
}

export const deleteUserName = async (userName: string) => {
    return firestore.collection("user_name").doc(userName).delete()
}

export const updateUserName = async (uid: string, userName: string, last_changed: number) => {
    return await firestore.collection("users").doc(uid).update({
        user_name: {
            value: userName,
            last_changed: last_changed
        }
    })
}

/**
 * Becareful! if the targetUid or uid didn't exists it will automatically creating a new document
 * Make sure both uid and targetUid exists!
 * @param uid 
 * @param targetUid 
 * @returns 
 */
export const followUser = async (uid: string, targetUid: string) => {
    await firestore
        .collection("users")
        .doc(uid)
        .collection("following")
        .doc(targetUid)
        .create({
            uid: targetUid
        })

    return await firestore.
        collection("users")
        .doc(targetUid)
        .collection("followers")
        .doc(uid)
        .create({
            uid: uid
        })
}

export const unfollowUser = async (uid: string, targetUid: string) => {
    await firestore
        .collection("users")
        .doc(uid)
        .collection("following")
        .doc(targetUid)
        .delete()

    return await firestore.
        collection("users")
        .doc(targetUid)
        .collection("followers")
        .doc(uid)
        .delete()
}

export const isFollowing = async (uid: string, targetUid: string) => {
    const following = await firestore
        .collection("users")
        .doc(uid)
        .collection("following")
        .doc(targetUid)
        .get()

    return following.exists
}

const getUser = async (uid: string) => {
    const users = await firestore.collection("users").doc(uid).get()
    return users.data()
}