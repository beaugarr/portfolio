// components/PageBar.tsx
"use client";

import React, { useState } from "react";
import styles from "../styles/page.module.css";
import { translations } from "@/utils/translations";
import { useTheme } from "./themeContext";

interface PageBarProps {
  onFilterChange: (filter: string | null) => void;
  isExpanded: boolean;
}

const PageBar: React.FC<PageBarProps> = ({ onFilterChange, isExpanded }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { language } = useTheme();
  const t = translations[language];

  const handleClick = (index: number) => {
    const newActiveIndex = activeIndex === index ? null : index; // Toggle selection
    setActiveIndex(newActiveIndex);

    const filter =
      newActiveIndex !== null
        ? newActiveIndex === 0
          ? "WORK"
          : newActiveIndex === 1
          ? "LIFE"
          : newActiveIndex === 2
          ? "ABOUT ME"
          : newActiveIndex === 3
          ? "SETTINGS"
          : null
        : null;
    onFilterChange(filter);
  };

  return (
    <div
      id="pageBar"
      className={`${styles.bar} ${isExpanded ? styles.expandedBar : ""}`}
    >
      <div
        className={styles.barSection}
        style={{
          flex: activeIndex === 1 ? 2 : 1,
          fontWeight: activeIndex === 1 ? 800 : 400,
        }} // 40% width if active, 20% if not
        onClick={() => handleClick(1)}
      >
        <h3 className={styles.barText}>{t.life}</h3>
      </div>
      <div
        className={styles.barSection}
        style={{
          flex: activeIndex === 0 ? 2 : 1,
          fontWeight: activeIndex === 0 ? 800 : 400,
        }} // 40% width if active, 20% if not
        onClick={() => handleClick(0)}
      >
        <h3 className={styles.barText}>{t.work}</h3>
      </div>
      <div
        className={styles.barSection}
        style={{
          flex: activeIndex === 2 ? 2 : 1,
          fontWeight: activeIndex === 2 ? 800 : 400,
        }} // 40% width if active, 20% if not
        onClick={() => handleClick(2)}
      >
        <h3 className={styles.barText}>{t.aboutMe}</h3>
      </div>
      <div
        className={styles.barSection}
        style={{
          flex: activeIndex === 3 ? 2 : 1,
          fontWeight: activeIndex === 3 ? 800 : 400,
        }} // 40% width if active, 20% if not
        onClick={() => handleClick(3)}
      >
        <h3 className={styles.barText}>{t.settings}</h3>
      </div>
    </div>
  );
};

export default PageBar;
