import { NextRequest } from "next/server";

// Import the functions you need from the SDKs you need
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

export async function GET(request: NextRequest) {
  const n = Number.parseInt(request.nextUrl.searchParams.get("n") ?? "20");

  const qs = await getDocs(query(collection(db, "/words"), limit(n)));

  return Response.json({
    words: qs.docs.map((doc) => {
      return { ...doc.data({}), id: doc.id };
    }),
  });
}
