import firebaseAdmin from "firebase-admin"

const serviceAccount = "./serviceAccountKey.json"

export default firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
})