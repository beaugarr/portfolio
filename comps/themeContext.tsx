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
  hoverBorder: "#00d9ff",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>("pl");  // Default value for SSR
  const [colors, setColors] = useState(defaultColors);  // Default value for SSR
  const [isHydrated, setIsHydrated] = useState(false); // Track hydration status

  useEffect(() => {
    // Set language and colors from cookies only on the client
    const savedLanguage = Cookies.get("language");
    const savedColors = Cookies.get("colors");
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    if (savedColors) {
      setColors(JSON.parse(savedColors));
    }

    setIsHydrated(true);  // Mark hydration as complete
  }, []);

  useEffect(() => {
    // Set language cookie on change
    Cookies.set("language", language);
  }, [language]);

  useEffect(() => {
    // Set colors cookies and update CSS variables on change
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