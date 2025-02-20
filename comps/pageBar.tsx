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

  const sections = [
    { label: t.work, filter: "WORK" },
    { label: t.life, filter: "LIFE" },
    { label: t.settings, filter: "SETTINGS" },
  ];

  const handleClick = (index: number) => {
    const newActiveIndex = activeIndex === index ? null : index;
    setActiveIndex(newActiveIndex);
    onFilterChange(newActiveIndex !== null ? sections[newActiveIndex].filter : null);
  };

  return (
    <div id="pageBar" className={`${styles.bar} ${isExpanded ? styles.expandedBar : ""}`}>
      {sections.map((section, index) => (
        <div
          key={index}
          className={styles.barSection}
          style={{
            flex: activeIndex === index ? 2 : 1,
            fontWeight: activeIndex === index ? 800 : 400,
          }}
          onClick={() => handleClick(index)}
        >
          <h3 className={styles.barText}>{section.label}</h3>
        </div>
      ))}
    </div>
  );
};

export default PageBar;