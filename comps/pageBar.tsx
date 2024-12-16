// components/PageBar.tsx
"use client"; // This enables client-side rendering

import React, { useState } from "react";
import styles from "../styles/page.module.css";

interface PageBarProps {
  onFilterChange: (filter: string | null) => void;
}

const PageBar: React.FC<PageBarProps> = ({ onFilterChange }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    const newActiveIndex = activeIndex === index ? null : index; // Toggle selection
    setActiveIndex(newActiveIndex);

    const filter = newActiveIndex !== null 
    ? (newActiveIndex === 0 ? "WORK" 
      : newActiveIndex === 1 ? "LIFE" 
      : newActiveIndex === 2 ? "ABOUT ME" 
      : newActiveIndex === 3 ? "SETTINGS" 
      : null)
    : null;

    onFilterChange(filter); // Update filter
  };

  return (
    <div className={styles.bar}>
      <div
        className={styles.barSection}
        style={{ flex: activeIndex === 0 ? 2 : 1 }} // 40% width if active, 20% if not
        onClick={() => handleClick(0)}
      >
        <h3 className={styles.barText}>WORK</h3>
      </div>
      <div
        className={styles.barSection}
        style={{ flex: activeIndex === 1 ? 2 : 1 }} // 40% width if active, 20% if not
        onClick={() => handleClick(1)}
      >
        <h3 className={styles.barText}>LIFE</h3>
      </div>
      <div
        className={styles.barSection}
        style={{ flex: activeIndex === 2 ? 2 : 1 }} // 40% width if active, 20% if not
        onClick={() => handleClick(2)}
      >
        <h3 className={styles.barText}>ABOUT ME</h3>
      </div>
      <div
        className={styles.barSection}
        style={{ flex: activeIndex === 3 ? 2 : 1 }} // 40% width if active, 20% if not
        onClick={() => handleClick(3)}
      >
        <h3 className={styles.barText}>SETTINGS</h3>
      </div>
    </div>
  );
};

export default PageBar;
