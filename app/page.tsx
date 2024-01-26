import Image from "next/image";
import styles from "./page.module.css";
import SwipeableCard from "./components/card/card";
import { Deck } from "./components/deck/deck";
import { getAllWords } from "./firebase/getAllWords";

export default async function Home() {
  const words = await getAllWords();
  return (
    <div>
      <Deck words={words.words} />
    </div>
  );
}
