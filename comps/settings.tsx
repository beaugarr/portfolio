"use client";

import React from "react";
import { useTheme } from "./themeContext";
import { Colors } from "@/utils/types";
import styles from "@/styles/page.module.css";
import { translations } from "@/utils/translations";

const defaultColors: Colors = {
  background: "#ffffff",
  barBackground: "#f5f5f5",
  text: "#171717",
  border: "#000000",
  hoverBorder: "#00d9ff",
};

export default function Settings() {
  const { language, setLanguage, colors, setColors } = useTheme();
  const t = translations[language];

  const handleColorChange = (name: keyof Colors, value: string) => {
    setColors({
      ...colors,
      [name]: value,
    });
  };

  const resetColors = () => {
    setColors(defaultColors);
  };

  return (
    <div className={styles.selectNone}>
      <div className="space-y-8">
        <div className="space-y-4">
          <label className={styles.languageLabel}>{t.language}</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              backgroundColor: "var(--color-barBackground)",
              color: "var(--color-text)",
              borderColor: "var(--color-border)",
              appearance: "none"
            }}
            className="w-full p-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="pl">Polski</option>
          </select>
        </div>

        <div className="space-y-4 ">
          <div className="flex items-center space-x-4">
            <h2 className={styles.languageLabel}>{t.colorSettings}</h2>
            <button onClick={resetColors} className={styles.resetButton}>
              {t.resetColors}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(Object.keys(colors) as Array<keyof Colors>).map((colorKey) => (
              <div key={colorKey} className="space-y-2">
                <label className={styles.colorLabel}>
                  {t[colorKey]}
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    id={`color-${colorKey}`}
                    type="color"
                    value={colors[colorKey]}
                    onChange={(e) =>
                      handleColorChange(colorKey, e.target.value)
                    }
                    className="w-16 h-16 p-1 rounded border border-gray-300"
                    style={{
                      backgroundColor: "#fff",
                      color: "var(--color-text)",
                      borderColor: "var(--color-border)",
                    }}
                  />
                  <input
                    type="text"
                    value={colors[colorKey]}
                    onChange={(e) =>
                      handleColorChange(colorKey, e.target.value)
                    }
                    className="flex-grow p-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${colorKey} color hex`}
                    style={{
                      backgroundColor: "var(--color-barBackground)",
                      color: "var(--color-text)",
                      borderColor: "var(--color-border)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
