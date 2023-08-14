import firebaseAdmin, { ServiceAccount } from "firebase-admin"
import { serviceAccount } from "../../config"

export default firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
})