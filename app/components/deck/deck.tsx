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

interface DeckProps {
  words: Word[];
}

export const Deck: React.FC<DeckProps> = ({ words }) => {
  const [currentShowing, setCurrentShowing] = useState<number[]>([0]);

  const handleSwipe = (direction: "left" | "right") => {
    setCurrentShowing((prev) => {
      let randomIndex: number;
      do {
        randomIndex = generateRandomIndex();
      } while (randomIndex === prev[prev.length - 1]);
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
            />
          );
        })}
    </div>
  );
};
