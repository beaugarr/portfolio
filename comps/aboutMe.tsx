"use client";

import React from "react";
import GraphemeSplitter from "grapheme-splitter";
import { TypeAnimation } from "react-type-animation";

const splitter = new GraphemeSplitter();

const AboutMe: React.FC = () => {
  return (
    <div style={{ color: "#000" }}>
      <TypeAnimation
        splitter={(str) => splitter.splitGraphemes(str)}
        sequence={[
          "Hello 🇬🇧",
          2000,
          "Ciao 🇮🇹",
          2000,
          "你好 🇨🇳",
          2000,
          "Здравейте 🇧🇬 ",
          2000,
          "Hola 🇪🇸",
          2000,
          "Bonjour 🇫🇷",
          2000,
          "नमस्ते 🇮🇳",
          2000,
        ]}
        repeat={Infinity}
        cursor={false}
      />
      <p>This is a placeholder component for the .</p>
      <p>
        You can replace this text with content specific to the category or add
        any other relevant information here.
      </p>
    </div>
  );
};

export default AboutMe;
