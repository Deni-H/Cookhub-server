import firebaseAdmin from "./firebase-admin"
import { User, UserDetails } from "../models/user"

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
        bio: user.bio, profile_image: user.profile_image
    }
}

const getUser = async (uid: string) => {
    const firestore = firebaseAdmin.firestore()
    const users = await firestore.collection("users").doc(uid).get()
    return users.data()
}