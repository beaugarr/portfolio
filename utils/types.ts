export interface LanguageMetadata {
  title: string;
  location: string;
  date: string;
  category: string;
  type: string;
  url: string;
  description: string;
}

export interface Subdirectory {
  name: string;
  images: { id: number; src: string }[];
  metadata: { [key: string]: LanguageMetadata }; // Metadata can have multiple languages
}

export interface Colors {
  background: string;
  barBackground: string;
  text: string;
  border: string;
  hoverBorder: string;
}

export interface ThemeContextType {
  language: string;
  setLanguage: (lang: string) => void;
  colors: Colors;
  setColors: (colors: Colors) => void;
}

export interface SubPageProps {
  params: Promise<{
    slug: string;
  }>;
}