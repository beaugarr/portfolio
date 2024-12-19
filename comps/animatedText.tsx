"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";

interface AnimatedTextProps {
  text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  return (
    <TypeAnimation
      sequence={[
        text,
        1000,
      ]}
      speed={75} 
      repeat={1}
      cursor={false}
    />
  );
};

export default AnimatedText;
