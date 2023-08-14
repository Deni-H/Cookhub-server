import { ServiceAccount } from "firebase-admin"
import dotenv from 'dotenv'

dotenv.config()

export const serviceAccount: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
}