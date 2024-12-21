"use client";

import { useState, useEffect } from "react";
import { marked } from "marked";
import styles from "@/styles/slug.module.css";
import Image from "next/image";
import Footer from "@/comps/footer";
import AnimatedText from "@/comps/animatedText";
import Cookies from "js-cookie";
import { LanguageMetadata } from "@/utils/types";

interface SubPageClientProps {
  slug: string;
}

const SubPageClient = ({ slug }: SubPageClientProps) => {
  // State management
  const [metadata, setMetadata] = useState<LanguageMetadata | null>(null);
  const [images, setImages] = useState<{ id: number; src: string }[]>([]);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lang = Cookies.get("language") || "pl";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/getSubdirectory?slug=${slug}&lang=${lang}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();

        setMetadata(data.metadata || null);
        setImages(data.images || []);
      } catch (error) {
        console.error("Error fetching subdirectory data:", error);
        setMetadata(null);
        setImages([]);
      }
    };

    fetchData();
  }, [slug]); // Dependency is `slug`

  // Render error state
  if (!metadata) {
    return <div></div>;
  }

  // Render parsed description HTML
  const descriptionHTML = marked(metadata.description || "");

  return (
    <div className={styles.container}>
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
            <AnimatedText text={metadata.title} />
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
