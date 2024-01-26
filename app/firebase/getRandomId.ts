import { collection, doc } from "firebase/firestore";
import { db } from "./firebase";

export const getFirebaseId = () => {
  return doc(collection(db, "/words")).id;
};

