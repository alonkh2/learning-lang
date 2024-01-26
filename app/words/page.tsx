import { Height } from "@mui/icons-material";
import WordGrid from "../components/wordGrid/WordGrid";
import { getAllWords } from "../firebase/getAllWords";

export default async function Words() {
  const { words } = await getAllWords();

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <WordGrid words={words} />
    </div>
  );
}
