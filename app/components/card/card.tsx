"use client";

import { animated, useSpring } from "react-spring";
import { useGesture } from "react-use-gesture";
import styles from "./card.module.css";
import { useState } from "react";

interface SwipeableCardProps {
  onSwipe: (direction: "left" | "right") => void; // Callback to inform the parent component of the swipe direction
  onFinish: () => void;
  title: string;
  translation: string;
  explanation: string;
  color: string;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  onSwipe,
  title,
  translation,
  explanation,
  onFinish,
  color,
}) => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useGesture({
    onDrag: ({ down, movement: [mx, my], velocity, direction: [dx] }) => {
      if (down) {
        api.start({ x: mx, y: my });
      } else {
        const swipeVelocity = 0.9; // Adjust this threshold as needed
        if (velocity > swipeVelocity) {
          const offScreenX =
            (dx > 0 ? window.innerWidth : -window.innerWidth) * 1.2;

          onSwipe(dx > 0 ? "right" : "left");

          api.start({
            x: offScreenX,
            y: 0,
            onStart: () => {},
            onResolve: () => {
              onFinish();
              setIsShowing(false);
              api.start({ x: 0, y: 0, immediate: true });
            },
          });
        } else {
          // Return to the initial position if velocity is low
          api.start({ x: 0, y: 0 });
        }
      }
    },
  });

  const [isShowing, setIsShowing] = useState(false);

  return (
    <animated.div
      onClick={() => setIsShowing(!isShowing)}
      {...bind()}
      className={styles.card}
      style={{
        x,
        y,
        background: color,
      }}
    >
      <div className={styles.container}>
        <h2>{title}</h2>
        <h3 className={`${styles.sub} ${isShowing && styles.showing}`}>
          {translation}
        </h3>
      </div>
      <p className={`${styles.sub} ${isShowing && styles.showing}`}>
        {explanation}
      </p>
    </animated.div>
  );
};

export default SwipeableCard;
