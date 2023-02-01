import { env } from "@/env/server.mjs";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(env.FIREBASE_ADMIN as string);
const config = {
    credential: admin.credential.cert(serviceAccount),
};
let firebaseAdmin: admin.app.App;

if (!admin.apps.length) {
    firebaseAdmin = admin.initializeApp(config);
} else {
    firebaseAdmin = admin.app();
}

export default firebaseAdmin;