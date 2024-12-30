import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/hero.module.css";
import Link from "next/link";
import { useTheme } from "./themeContext";
import { heroTexts } from "@/utils/translations";
import { translations } from "@/utils/translations";

const Hero: React.FC = () => {
  const { language } = useTheme();
  const t = translations[language];
  const texts = heroTexts[language];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperBounds, setWrapperBounds] = useState({ width: 0, height: 0 });
  const textPositionsRef = useRef<{ top: number; left: number }[]>([]);


  const isOverlapping = (
    newPosition: { top: number; left: number },
    positions: { top: number; left: number }[]
  ) => {
    const padding = 15;
    const newTop = newPosition.top;
    const newLeft = newPosition.left;
    const newBottom = newTop + 50;
    const newRight = newLeft + 100;

    return positions.some(({ top, left }) => {
      const existingTop = top;
      const existingLeft = left;
      const existingBottom = existingTop + 50;
      const existingRight = existingLeft + 100;

      return !(
        newRight + padding < existingLeft ||
        newLeft - padding > existingRight ||
        newBottom + padding < existingTop ||
        newTop - padding > existingBottom
      );
    });
  };

  const generateRandomPositions = (
    bounds: { width: number; height: number },
    count: number
  ) => {
    const positions: { top: number; left: number }[] = [];
    const maxRetries = 50;

    for (let i = 0; i < count; i++) {
      let retries = 0;
      let newPosition;
      do {
        const randomTop = Math.random() * (bounds.height - 50);
        const randomLeft = Math.random() * (bounds.width - 100);
        newPosition = { top: randomTop, left: randomLeft };
        retries++;
      } while (
        isOverlapping(newPosition, positions) &&
        retries < maxRetries
      );

      if (retries < maxRetries) {
        positions.push(newPosition);
      } else {
        console.warn("Max retries reached for position generation");
      }
    }

    return positions;
  };

  useEffect(() => {
    if (wrapperRef.current) {
      const bounds = wrapperRef.current.getBoundingClientRect();
      setWrapperBounds({ width: bounds.width, height: bounds.height });

      if (textPositionsRef.current.length === 0) {
        textPositionsRef.current = generateRandomPositions(bounds, texts.length);
      }
    }
  }, [texts.length]);

  return (
    <div className={styles.heroSection}>
      <div className={styles.textContainer}>
        <h1 className={styles.name}>MICHAŁ</h1>
        <div className={styles.surnameWrapper}>
          <h1 className={styles.name}>ZAGAJEWSKI</h1>
          <div className={styles.bracketWrapper}>
            <span className={styles.name}>[</span>
            <div className={styles.bracketText}>
              {t.firstLine}<br />
              {t.secondLine}<br />
              {/* {t.thirdLine}<br /> */}
              {/* {t.fourthLine} */}
            </div>
            <span className={styles.name}>]</span>
          </div>
        </div>
      </div>
      <div className={styles.authorDiv}>
        <div className={styles.authorImageWrapper}>
          <Image
            src={"/ja.jpeg"}
            alt={"Ja"}
            width={1}
            height={1}
            className={styles.authorImage}
            unoptimized={true}
          />
        </div>
        <div className={styles.authorTextWrapper} ref={wrapperRef}>
          {wrapperBounds.width > 0 &&
            texts.map((item, index) => {
              const position = textPositionsRef.current[index];
              if (!position) return null; // Fallback in case of an issue

              return (
                <div
                  key={index}
                  className={styles.textItem}
                  style={{
                    position: "absolute",
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                  }}
                >
                  {item.link ? (
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "underline"}}
                    >
                      {item.text}
                    </Link>
                  ) : (
                    item.text
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
