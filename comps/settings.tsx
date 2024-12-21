import React, { useState } from "react";
import { useTheme } from "./themeContext";
import { Colors } from "@/utils/types"; // Import Colors interface

const Settings: React.FC = () => {
  const { language, setLanguage, colors, setColors } = useTheme();
  const defaultColors: Colors = {
    background: "#ffffff",
    barBackground: "#f5f5f5",
    text: "#171717",
    border: "#000000",
    hoverBorder: "#7EFC00",
  };

  // Handle language change
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  // Handle instant color change
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setColors({
      ...colors,
      [name]: value,
    });
  };

  // Reset colors to default
  const resetColors = () => {
    setColors(defaultColors);
  };

  return (
    <div style={{ color: "#000", padding: "20px" }}>
      <h1>Settings</h1>

      {/* Language Selector */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="language" style={{ display: "block", marginBottom: "10px" }}>
          Select Language:
        </label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="pl">Polish</option>
        </select>
      </div>

      {/* Color Customization */}
      <div>
        <h2>Customize Colors</h2>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="background" style={{ display: "block", marginBottom: "5px" }}>
            Background Color:
          </label>
          <input
            type="color"
            id="background"
            name="background"
            value={colors.background}
            onChange={handleColorChange}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="barBackground" style={{ display: "block", marginBottom: "5px" }}>
            Bar Background Color:
          </label>
          <input
            type="color"
            id="barBackground"
            name="barBackground"
            value={colors.barBackground}
            onChange={handleColorChange}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="text" style={{ display: "block", marginBottom: "5px" }}>
            Text Color:
          </label>
          <input
            type="color"
            id="text"
            name="text"
            value={colors.text}
            onChange={handleColorChange}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="border" style={{ display: "block", marginBottom: "5px" }}>
            Border Color:
          </label>
          <input
            type="color"
            id="border"
            name="border"
            value={colors.border}
            onChange={handleColorChange}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="hoverBorder" style={{ display: "block", marginBottom: "5px" }}>
            Hover Border Color:
          </label>
          <input
            type="color"
            id="hoverBorder"
            name="hoverBorder"
            value={colors.hoverBorder}
            onChange={handleColorChange}
          />
        </div>

        {/* Reset Colors Button */}
        <button
          onClick={resetColors}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            marginRight: "10px",
            background: "#f5f5f5",
            border: "1px solid #000",
          }}
        >
          Clear Colors
        </button>
      </div>
    </div>
  );
};

export default Settings;
