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
    location: "LOCATION",
    date: "DATE",
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
    location: "LOKALIZACJA",
    date: "DATA",
    version: "Wersja",
    imprint: "Oświadczenie",
    privacy: "Polityka prywatności",
    resetColors: "Resetuj kolory",
    language: "Język",
    background: "Kolor Podstawowy",
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
    { text: "Innovator", link: null },
    { text: "Marketer", link: null },
    { text: "Driven by Data", link: null },
    { text: "Let's Collaborate", link: "https://linkedin.com" },
    { text: "Coffee Enthusiast", link: null },
    { text: "Meta Certified", link: null },
    { text: "Strategy First", link: null },
    { text: "Portfolio", link: "https://yourportfolio.com" },
  ],
  pl: [
    { text: "Innowator", link: null },
    { text: "Marketingowiec", link: null },
    { text: "Napędzany Danymi", link: null },
    { text: "Współpracujmy", link: "https://linkedin.com" },
    { text: "Miłośnik Kawy", link: null },
    { text: "Certyfikowany przez Meta", link: null },
    { text: "Strategia na Pierwszym Miejscu", link: null },
    { text: "Portfolio", link: "https://yourportfolio.com" },
  ],
};
