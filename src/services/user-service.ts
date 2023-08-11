import firebaseAdmin from "./firebase-admin"

export const getUserProfile = async (uid: string) => {
    return firebaseAdmin.auth().getUser(uid)
}