"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface ThemeContextType {
  language: string;
  setLanguage: (lang: string) => void;
  colors: {
    background: string;
    barBackground: string;
    text: string;
    border: string;
    hoverBorder: string;
  };
  setColors: (colors: typeof defaultColors) => void;
}

const defaultColors = {
  background: "#ffffff",
  barBackground: "#f5f5f5",
  text: "#171717",
  border: "#000000",
  hoverBorder: "#7EFC00",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(Cookies.get("language") || "en");
  const [colors, setColors] = useState(() => {
    try {
      const savedColors = Cookies.get("colors");
      return savedColors ? JSON.parse(savedColors) : defaultColors;
    } catch {
      return defaultColors;
    }
  });

  useEffect(() => {
    Cookies.set("language", language);
  }, [language]);

  useEffect(() => {
    if (colors) {
      Object.entries(colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--color-${key}`, value as string);
      });
      Cookies.set("colors", JSON.stringify(colors));
    }
  }, [colors]);

  return (
    <ThemeContext.Provider value={{ language, setLanguage, colors, setColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
