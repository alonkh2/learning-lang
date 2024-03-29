"use client";

import { useEffect, useState } from "react";
import SwipeableCard from "../card/card";
import styles from "./deck.module.css";

export type Word = {
  word: string;
  definition: string;
  explanation: string;
  id?: string;
};

const colors = [
  "#7BD3EA",
  "#A1EEBD",
  "#F6F7C4",
  "#F6D6D6",
  "#BEADFA",
  "#9BABB8",
  "#EEE3CB",
];

export const Deck: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentShowing, setCurrentShowing] = useState<number[]>([0]);

  useEffect(() => {
    fetch("/api/getAllWords")
      .then((response) => response.json())
      .then((data: { words: Word[] }) => {
        setWords(data.words);
      });
  }, []);

  const handleSwipe = (direction: "left" | "right") => {
    setCurrentShowing((prev) => {
      let randomIndex: number;
      do {
        randomIndex = generateRandomIndex();
      } while (currentShowing.find((v) => v == randomIndex));
      const newCurr = [...prev, randomIndex];

      return newCurr;
    });
  };

  const onFinish = () => {
    setCurrentShowing((prev) => {
      const newCurr = [...prev];
      newCurr.shift();

      return newCurr;
    });
  };

  const generateRandomIndex = () => {
    if (words.length === 0) return 0;
    return Math.floor(Math.random() * words.length);
  };

  return (
    <div className={styles.deck}>
      {!!words.length &&
        currentShowing.map((index) => {
          return (
            <SwipeableCard
              key={words[index].id}
              onSwipe={handleSwipe}
              onFinish={onFinish}
              title={words[index].word}
              translation={words[index].definition}
              explanation={words[index].explanation}
              color={colors[index % colors.length]}
            />
          );
        })}
    </div>
  );
};
