import { Word } from "@/app/components/deck/deck";
import { db } from "@/app/firebase/firebase";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const id: string = await request.text();

    await deleteDoc(doc(collection(db, "/words"), id));
    return Response.json({});
  } catch (e) {
    return Response.error();
  }
}
