import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/hero.module.css";

const Hero: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperBounds, setWrapperBounds] = useState({ width: 0, height: 0 });
  const textPositionsRef = useRef<{ top: number; left: number }[]>([]);

  const texts = [
    { text: "Innovator", link: null },
    { text: "Marketer", link: null },
    { text: "Driven by Data", link: null },
    { text: "Let's Collaborate", link: "https://linkedin.com" },
    { text: "Coffee Enthusiast", link: null },
    { text: "Meta Certified", link: null },
    { text: "Strategy First", link: null },
    { text: "Portfolio", link: "https://yourportfolio.com" },
  ];

  useEffect(() => {
    if (wrapperRef.current) {
      const bounds = wrapperRef.current.getBoundingClientRect();
      setWrapperBounds({ width: bounds.width, height: bounds.height });

      if (textPositionsRef.current.length === 0) {
        textPositionsRef.current = texts.map(() => {
          const randomTop = Math.max(
            0,
            Math.random() * (bounds.height - 50)
          );
          const randomLeft = Math.max(
            0,
            Math.random() * (bounds.width - 100)
          );
          return { top: randomTop, left: randomLeft };
        });
      }
    }
  }, []);

  return (
    <div className={styles.heroSection}>
      <div className={styles.textContainer}>
        <h1 className={styles.name}>MICHAŁ</h1>
        <div className={styles.surnameWrapper}>
          <h1 className={styles.name}>ZAGAJEWSKI</h1>
          <div className={styles.bracketWrapper}>
            <span className={styles.name}>[</span>
            <div className={styles.bracketText}>
              CERTIFIED META ADS SPECIALIST
              <br />
              TARGETED ADVERTISING <br />
              ON FACEBOOK & INSTAGRAM, LINKEDIN
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
              const { top, left } = textPositionsRef.current[index];
              return (
                <div
                  key={index}
                  className={styles.textItem}
                  style={{
                    position: "absolute",
                    top: `${top}px`,
                    left: `${left}px`,
                  }}
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.text}
                    </a>
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
