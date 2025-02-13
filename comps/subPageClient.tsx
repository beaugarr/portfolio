"use client";

import { useState, useEffect } from "react";
import { marked } from "marked";
import styles from "@/styles/slug.module.css";
import Image from "next/image";
import Footer from "@/comps/footer";
import { TypeAnimation } from "react-type-animation";
import { LanguageMetadata } from "@/utils/types";
import { useTheme } from "./themeContext";
import { translations } from "@/utils/translations";
import { useRouter } from "next/navigation";
import useMobile from "@/utils/useMobile";

interface SubPageClientProps {
  slug: string;
}

const SubPageClient = ({ slug }: SubPageClientProps) => {
  const router = useRouter();
  const [metadata, setMetadata] = useState<LanguageMetadata | null>(null);
  const [images, setImages] = useState<{ id: number; src: string }[]>([]);
  const { language, setLanguage } = useTheme();
  const { isPhone, isTablet } = useMobile();
  const t = translations[language];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/getSubdirectory?slug=${slug}&lang=${language}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();

        setMetadata(data.metadata || null);
        setImages(data.images || []);

        if (data.metadata && data.metadata.title) {
          document.title = `${data.metadata.title} | Michał Zagajewski`;
        }
      } catch (error) {
        console.error("Error fetching subdirectory data:", error);
        setMetadata(null);
        setImages([]);
      }
    };

    fetchData();
  }, [slug, language]);

  if (!metadata) {
    return <div />;
  }

  const descriptionHTML = marked(metadata.description || "");

  function handleGoBack() {
    if (document.referrer && document.referrer.startsWith(window.location.origin)) {
      router.back();
    } else {
      router.push("/");
    }
  }  

  function handleLanguageChange(lang: string) {
    setLanguage(lang);
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <button className={styles.backButton} onClick={handleGoBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M16 19l-7-7 7-7"
              stroke="var(--color-text)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className={styles.header}>
          <div className={styles.spanDiv}>
            <h3>{metadata.title}</h3>
          </div>
          <div className={styles.details}>
            <div className={styles.spanDiv}>
              <span>
                {!isPhone && !isTablet && t.location} <strong>{metadata.location}</strong>
              </span>
            </div>
            <div className={styles.spanDiv}>
              <span>
              {!isPhone && !isTablet && t.date} <strong>{metadata.date}</strong>
              </span>
            </div>
            <div className={styles.languageButtons}>
              <button
                className={language === "pl" ? styles.activeButton : ""}
                onClick={() => handleLanguageChange("pl")}
              >
                PL
              </button>
              <button
                className={language === "en" ? styles.activeButton : ""}
                onClick={() => handleLanguageChange("en")}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.gallery}>
          {images.map((image) => (
            <div key={image.id} className={styles.imageSection}>
              <Image
                src={image.src}
                alt={`Gallery Image ${image.id}`}
                width={100}
                height={100}
                className={styles.imageSectionImage}
                unoptimized
              />
            </div>
          ))}
        </div>
        <div className={styles.textSection}>
          <div className={styles.title}>
            <TypeAnimation
              key={metadata.title}
              sequence={[metadata.title, 1000]}
              speed={75}
              repeat={1}
              cursor={false}
            />
          </div>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: descriptionHTML }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubPageClient;
