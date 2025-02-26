import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/hero.module.css";
import Link from "next/link";
import { useTheme } from "./themeContext";
import { heroTexts } from "@/utils/translations";
import { translations } from "@/utils/translations";
import useMobile from "@/utils/useMobile";

interface Position {
  top: number;
  left: number;
}

const Hero: React.FC = () => {
  const { language } = useTheme();
  const t = translations[language];
  const texts = heroTexts[language];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperBounds, setWrapperBounds] = useState({ width: 0, height: 0 });
  const textPositionsRef = useRef<{ top: number; left: number }[]>([]);
  const { isPhone, isTablet } = useMobile();

  const isOverlapping = (newPosition: Position, positions: Position[]): boolean => {
    const padding = 15; // Padding between elements
    const newRight = newPosition.left + 100; // Width of the element
    const newBottom = newPosition.top + 50; // Height of the element
  
    return positions.some((position) => {
      const existingRight = position.left + 100;
      const existingBottom = position.top + 50;
  
      // Check if the new position overlaps with any existing position
      return (
        newPosition.left < existingRight + padding &&
        newRight + padding > position.left &&
        newPosition.top < existingBottom + padding &&
        newBottom + padding > position.top
      );
    });
  };
  
  const generateRandomPositions = (
    bounds: { width: number; height: number },
    count: number
  ): Position[] => {
    const positions: Position[] = [];
    const maxRetries = 20; // Maximum number of retries to find a non-overlapping position
    const padding = 15; // Padding between elements
    const containerPadding = 50; // Padding of the .authorTextWrapper container
  
    // Calculate the available space inside the container (excluding padding)
    const availableWidth = bounds.width - 2 * containerPadding;
    const availableHeight = bounds.height - 2 * containerPadding;
  
    for (let i = 0; i < count; i++) {
      let retries = 0;
      let newPosition: Position;
      let overlap: boolean;
  
      do {
        // Generate a random position within the available space, considering element size and padding
        const randomTop = Math.random() * (availableHeight - 50 - padding * 2) + containerPadding + padding;
        const randomLeft = Math.random() * (availableWidth - 100 - padding * 2) + containerPadding + padding;
        newPosition = { top: randomTop, left: randomLeft };
  
        // Check if the new position overlaps with existing positions
        overlap = isOverlapping(newPosition, positions);
        retries++;
      } while (overlap && retries < maxRetries);
  
      if (!overlap) {
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
        textPositionsRef.current = generateRandomPositions(
          bounds,
          texts.length
        );
      }
    }
  }, [texts.length]);

  return (
    <div className={styles.heroSection}>
      <div className={styles.textContainer}>
        <h1 className={styles.name}>MICHAŁ</h1>
        <div className={styles.surnameWrapper}>
          <h1 className={styles.name}>ZAGAJEWSKI</h1>
          {!isPhone && !isTablet && (
            <div className={styles.bracketWrapper}>
              <span className={styles.name}>[</span>
              <div className={styles.bracketText}>
                {t.firstLine}
                <br />
                {t.secondLine}
                <br />
                {/* {t.thirdLine}<br /> */}
                {/* {t.fourthLine} */}
              </div>
              <span className={styles.name}>]</span>
            </div>
          )}
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
            priority
          />
        </div>
        {!isPhone && !isTablet && (
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
                        style={{ textDecoration: "underline" }}
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
        )}
      </div>
    </div>
  );
};

export default Hero;
