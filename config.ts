import { ServiceAccount } from "firebase-admin"
import dotenv from 'dotenv'

dotenv.config()

const firebaseCert = JSON.parse(process.env.FIREBASE_CERT!)

export const serviceAccount: ServiceAccount = firebaseCert