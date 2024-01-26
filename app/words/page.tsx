import { Height } from "@mui/icons-material";
import WordGrid from "../components/wordGrid/WordGrid";
import { getAllWords } from "../firebase/getAllWords";

export default function Words() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <WordGrid />
    </div>
  );
}
