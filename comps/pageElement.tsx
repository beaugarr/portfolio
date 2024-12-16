"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/page.module.css";

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
  images,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

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
    <div className={styles.elementContainer}>
      <div className={styles.header}>
        <div className={styles.spanDiv}>
          <h3>{title}</h3>
        </div>
        <div className={styles.details}>
          <div className={styles.spanDiv}>
            <span>
              LOCATION <strong>{location}</strong>
            </span>
          </div>
          <div className={styles.spanDiv}>
            <span>
              DATE <strong>{date}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.imageGallery} ref={scrollRef}>
        {showLeftButton && (
          <Link href="">
            <button
              className={`${styles.scrollButton} ${styles.left}`}
              onClick={() => scroll("left")}
            >
              &#8592;
            </button>
          </Link>
        )}
        {images.map((image) => (
          <div key={image.id} className={styles.imageSection}>
            <Image
              src={image.src}
              alt={`Gallery Image ${image.id}`}
              width={100}
              height={100}
              className={styles.imageSectionImage}
              unoptimized={true}
            />
          </div>
        ))}
        {showRightButton && (
          <Link href="">
            <button
              className={`${styles.scrollButton} ${styles.right}`}
              onClick={() => scroll("right")}
            >
              &#8594;
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PageElement;
