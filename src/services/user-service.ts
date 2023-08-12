import firebaseAdmin from "./firebase-admin"
import { User } from "../models/user"

export const getUserProfile = async (uid: string): Promise<User> => {
    const firestore = firebaseAdmin.firestore()
    const users = await firestore.collection("users").doc(uid).get()
    const userData = users.data() as User
    const user: User = {
        user_name: userData.user_name,
        first_name: userData.first_name,
        last_name: userData.last_name,
        bio: userData.bio,
        profile_image: userData.profile_image
    }

    return user
}