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

interface TextItem {
  text: string;
  link?: string | null;
}

const Hero: React.FC = () => {
  const { language } = useTheme();
  const t = translations[language];
  const texts: TextItem[] = heroTexts[language];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sampleTextRef = useRef<HTMLDivElement>(null);
  const [wrapperBounds, setWrapperBounds] = useState({ width: 0, height: 0 });
  const [elementSize, setElementSize] = useState({ width: 100, height: 50 }); // Default size
  const textPositionsRef = useRef<Position[]>([]);
  const { isPhone, isTablet } = useMobile();

  // Measure the size of a sample text element
  useEffect(() => {
    if (sampleTextRef.current) {
      const { width, height } = sampleTextRef.current.getBoundingClientRect();
      setElementSize({ width, height });
    }
  }, []);

  const isOverlapping = (
    newPosition: Position,
    positions: Position[],
    elementWidth: number,
    elementHeight: number
  ): boolean => {
    const padding = 15; // Padding between elements
    const newRight = newPosition.left + elementWidth;
    const newBottom = newPosition.top + elementHeight;

    return positions.some((position) => {
      const existingRight = position.left + elementWidth;
      const existingBottom = position.top + elementHeight;

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
    texts: TextItem[],
    elementWidth: number,
    elementHeight: number
  ): Position[] => {
    const positions: Position[] = [];
    const maxRetries = 50; // Maximum number of retries to find a non-overlapping position
    const padding = 15; // Padding between elements
    const containerPadding = 50; // Padding of the .authorTextWrapper container

    // Calculate the available space inside the container (excluding padding)
    const availableWidth = bounds.width - 2 * containerPadding;
    const availableHeight = bounds.height - 2 * containerPadding;

    for (let i = 0; i < texts.length; i++) {
      let retries = 0;
      let newPosition: Position;
      let overlap: boolean;

      do {
        // Generate a random position within the available space, considering element size and padding
        const randomTop =
          Math.random() * (availableHeight - elementHeight - padding * 2) +
          containerPadding +
          padding;
        const randomLeft =
          Math.random() * (availableWidth - elementWidth - padding * 2) +
          containerPadding +
          padding;
        newPosition = { top: randomTop, left: randomLeft };

        // Check if the new position overlaps with existing positions
        overlap = isOverlapping(newPosition, positions, elementWidth, elementHeight);
        retries++;
      } while (overlap && retries < maxRetries);

      if (!overlap) {
        positions.push(newPosition);
      } else {
        console.warn("Max retries reached for position generation");
        // Fallback: Place the element at the bottom-right corner
        positions.push({
          top: bounds.height - elementHeight - containerPadding,
          left: bounds.width - elementWidth - containerPadding,
        });
      }
    }

    return positions;
  };

  // Generate random positions when the container bounds or text length changes
  useEffect(() => {
    if (wrapperRef.current) {
      const bounds = wrapperRef.current.getBoundingClientRect();
      setWrapperBounds({ width: bounds.width, height: bounds.height });

      if (textPositionsRef.current.length === 0) {
        textPositionsRef.current = generateRandomPositions(
          bounds,
          texts,
          elementSize.width,
          elementSize.height
        );
      }
    }
  }, [texts.length, elementSize]);

  return (
    <div className={styles.heroSection}>
      {/* Hidden sample text element for measuring size */}
      <div
        ref={sampleTextRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        Sample Text
      </div>

      {/* Rest of the component */}
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
              </div>
              <span className={styles.name}>]</span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.authorDiv}>
        <div className={styles.authorImageWrapper}>
          <Image
            src={"/ja.webp"}
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