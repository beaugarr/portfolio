type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    work: "PROJECTS",
    life: "LIFE",
    aboutMe: "ABOUT ME",
    settings: "SETTINGS",
    location: "LOCATION:",
    date: "DATE:",
    version: "Version",
    imprint: "Imprint",
    privacy: "Privacy",
    resetColors: "Clear Colors",
    language: "Language",
    background: "Background",
    barBackground: "Secondary Background",
    text: "Text Color",
    border: "Border Color",
    hoverBorder: "Hover Border Color",
    colorSettings: "Color Settings",
    firstLine: "STUDENT OF CS & AI/ML",
    secondLine: "SOFTWARE DEVELOPER",
    thirdLine: "STOCK INVESTOR FOR 2 YEARS",
    fourthLine: "START-UPS FOUNDER",
  },
  pl: {
    work: "PROJEKTY",
    life: "ŻYCIE",
    aboutMe: "O MNIE",
    settings: "USTAWIENIA",
    location: "LOKALIZACJA:",
    date: "DATA:",
    version: "Wersja",
    imprint: "Oświadczenie",
    privacy: "Polityka prywatności",
    resetColors: "Resetuj kolory",
    language: "Język",
    background: "Tło",
    barBackground: "Kolor Dodatkowy",
    text: "Kolor Tekstu",
    border: "Kolor Obramowania",
    hoverBorder: "Kolor Obramowania po Najechaniu",
    colorSettings: "Ustawienia Kolorów",
    firstLine: "STUDENT INFORMATYKI I SZTUCZNEJ INTELIGENCJI",
    secondLine: "DEWELOPER OPROGRAMOWANIA",
    thirdLine: "INWESTOR GIEŁDOWY OD 2 LAT",
    fourthLine: "ZAŁOŻYCIEL START-UPÓW",
  },
};

type HeroTexts = {
  [key: string]: {
    text: string;
    link: string | null;
  }[];
};

export const heroTexts: HeroTexts = {
  en: [
    { text: "LinkedIn", link: "https://www.linkedin.com/in/michał-zagajewski-a02855272/" },
    { text: "Instagram", link: "https://www.instagram.com/michal_zagajewski/" },
    { text: "ComputerScience", link: "" },
    { text: "AI/ML", link: "" },
    { text: "Trading", link: "" },
    { text: "Cycling", link: "" },
  ],
  pl: [
    { text: "Linkedin", link: "https://www.linkedin.com/in/michał-zagajewski-a02855272/" },
    { text: "Instagram", link: "https://www.instagram.com/michal_zagajewski/" },
    { text: "AI/ML", link: "" },
    { text: "Trading", link: "" },
    { text: "Kolarstwo", link: "" },
    { text: "Quantative Trading", link: "" },
    { text: "Skitouring", link: "" },
    { text: "Freeride", link: "" },
    { text: "Góry", link: "" },
    { text: "ć̶w̶i̶e̶r̶ć̶półmaratończyk", link: "" },
    { text: "Sztuczna Inteligencja", link: "" },
    { text: "Kraków/Warszawa", link: "" },
    { text: "Start-upy", link: "" },
    { text: "Fullstack", link: "" },
    { text: "Aplikacje mobilne", link: "" },
    { text: "Web Development", link: "" },
  ],
};
