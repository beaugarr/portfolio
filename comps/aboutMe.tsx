"use client";

import React from "react";
import GraphemeSplitter from "grapheme-splitter";
import { TypeAnimation } from "react-type-animation";
import styles from "@/styles/page.module.css";
import Image from "next/image";

const splitter = new GraphemeSplitter();

const WelcomeText = () => {
  return (
    <div className={styles.hello}>
      <TypeAnimation
        splitter={(str) => splitter.splitGraphemes(str)}
        sequence={[
          "Witaj 🇵🇱",
          2000,
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
    </div>
  );
};

const AboutMe: React.FC = () => {
  return (
    <div className={styles.aboutMeContainer}>
      <WelcomeText />
      <Image
        src={"/ja.jpg"}
        alt={"Ja"}
        width={1}
        height={1}
        className={styles.authorImage}
        unoptimized={true}
      />
      <span className={styles.authorDescription}>
        System: Solum ist eine interaktive Forschungslandkarte, die sich mit dem
        geologischen Bodenkörper ve Forschungslandkarte, die sich mit dem
        geologischen Bodenkörper *Solum* beschäftigt. System: Solum ist eine
        interaktive Forschungslandkarte, die sich mit dem geologischen
        Bodenkörper *Solum* beschäftigt.
      </span>
    </div>
  );
};

export default AboutMe;
