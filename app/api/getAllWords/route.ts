import { getAllWords } from "@/app/firebase/getAllWords";

export async function GET() {
  return Response.json(getAllWords());
}
