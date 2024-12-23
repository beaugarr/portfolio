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
