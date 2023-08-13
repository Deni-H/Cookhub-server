import firebaseAdmin from "./firebase-admin"
import { User, UserDetails } from "../models/user"

const firestore = firebaseAdmin.firestore()

export const getUserProfile = async (uid: string): Promise<User> => {
    const user = await getUser(uid) as User
    return {
        user_name: user.user_name,
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

/**
 * Caution! Make sure userName exists before get userNameOwner
 * @param userName 
 * @returns 
 */
export const getUserNameOwner = async (userName: string) => {
    const doc = await firestore.collection("user_name").doc(userName).get()
    const data = doc.data()!
    return data.uid as string
}

export const registerUserName = async (userName: string, uid: string, currentTime: number) => {
    return firestore.collection("user_name").doc(userName).set({
        uid: uid,
        last_changed: currentTime
    })
}

export const deleteUserName = async (userName: string) => {
    return firestore.collection("user_name").doc(userName).delete()
}

export const updateUserName = async (uid: string, userName: string) => {
    return await firestore.collection("users").doc(uid).update({
        user_name: userName
    })
}

const getUser = async (uid: string) => {
    const users = await firestore.collection("users").doc(uid).get()
    return users.data()
}