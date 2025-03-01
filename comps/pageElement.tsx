"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/page.module.css";
import { translations } from "@/utils/translations";
import { useTheme } from "./themeContext";
import useMobile from "@/utils/useMobile";

interface PageElementProps {
  title: string;
  location: string;
  date: string;
  category: string; // New prop
  url: string; // New prop
  description: string;
  images: { id: number; src: string }[];
}

const PageElement: React.FC<PageElementProps> = ({
  title,
  location,
  date,
  url,
  images,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const { isPhone, isTablet } = useMobile();
  const { language } = useTheme();
  const t = translations[language];

  const checkScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    }
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = container.clientWidth / 2;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
    }
    return () => {
      container?.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  return (
    <Link href={url} passHref className={styles.elementContainer}>
      <div className={styles.header}>
        <div className={`${styles.spanDiv} ${styles.title}`}>
          <h3>{title}</h3>
        </div>
        <div className={styles.details}>
          <div className={styles.spanDiv}>
            <span>
              {!isPhone && !isTablet && t.location} <strong>{location}</strong>
            </span>
          </div>
          <div className={styles.spanDiv}>
            <span>
              {!isPhone && !isTablet && t.date} <strong>{date}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.imageGallery} ref={scrollRef}>
        {showLeftButton && (
          <button
            className={`${styles.scrollButton} ${styles.left}`}
            onClick={(e) => {
              e.preventDefault();
              scroll("left");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M16 19l-7-7 7-7"
                stroke="var(--color-text)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {images.map((image) => (
          <div key={image.id} className={styles.imageSection}>
            {image.src.endsWith(".mov") ||
            image.src.endsWith(".mp4") ||
            image.src.endsWith(".webm") ? (
              <video
                width={250}
                height={400}
                className={styles.imageSectionImage}
                muted
                loop
                autoPlay
                playsInline
              >
                <source src={image.src} type="video/mp4" />
                <source src={image.src} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={image.src}
                alt={`Gallery Image ${image.id}`}
                width={250}
                height={400}
                className={styles.imageSectionImage}
                unoptimized={true}
              />
            )}
          </div>
        ))}
        {showRightButton && (
          <button
            className={`${styles.scrollButton} ${styles.right}`}
            onClick={(e) => {
              e.preventDefault();
              scroll("right");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M8 5l7 7-7 7"
                stroke="var(--color-text)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </Link>
  );
};

export default PageElement;
