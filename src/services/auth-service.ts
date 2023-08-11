import firebaseAdmin from "./firebase-admin"

export const verifyIdToken = async (idToken: string) =>
  await firebaseAdmin.auth().verifyIdToken(idToken)