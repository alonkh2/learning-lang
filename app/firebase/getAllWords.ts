import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Word } from "../components/deck/deck";

export const getAllWords = async (): Promise<{ words: Word[] }> => {
  const qs = await getDocs(collection(db, "/words"));

  return {
    words: qs.docs.map((doc) => {
      return { ...doc.data({}), id: doc.id } as Word;
    }),
  };
};
