import { getStorage } from "firebase-admin/storage";
import firebaseAdmin from "./firebaseAdmin";

const storage = getStorage(firebaseAdmin);

export default storage;
