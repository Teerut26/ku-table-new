import { getFirestore } from "firebase-admin/firestore";
import firebaseAdmin from "./firebaseAdmin";

const db = getFirestore(firebaseAdmin);

export default db