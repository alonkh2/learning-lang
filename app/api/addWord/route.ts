import { Word } from "@/app/components/deck/deck";
import { db } from "@/app/firebase/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: Word = await request.json();

    const { id, definition, explanation, word } = body;

    const newObj = { word, definition, explanation };

    await setDoc(doc(collection(db, "/words"), id), newObj);
    return Response.json({});
  } catch (e) {
    return Response.error();
  }
}
