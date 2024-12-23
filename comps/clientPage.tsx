"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/comps/themeContext";
import PageBar from "@/comps/pageBar";
import PageElement from "@/comps/pageElement";
import Settings from "./settings";
import Footer from "./footer";
import styles from "@/styles/page.module.css";
import { Subdirectory } from "@/utils/types";
import Hero from "./hero";

const ClientPage: React.FC = () => {
  const { language } = useTheme();
  const [subdirectories, setSubdirectories] = useState<Subdirectory[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Set up the observer to monitor the sentinel above PageBar
    const sentinel = document.querySelector("#sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Expand PageBar when the sentinel is out of view (above the viewport)
        setIsExpanded(!entry.isIntersecting);
      },
      { root: null, threshold: 0 } // Trigger as soon as the sentinel intersects
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchSubdirectories = async () => {
      try {
        const response = await fetch("/api/getSubdirectories");
        const data = await response.json();
        setSubdirectories(data.subdirectories);
      } catch (error) {
        console.error("Error fetching subdirectories:", error);
      }
    };

    fetchSubdirectories();
  }, []);

  const filteredSubdirectories =
    filter === null
      ? subdirectories
      : subdirectories.filter(
          (subdir) => subdir.metadata[language]?.category === filter
        );

  return (
    <div className={styles.container}>
      <Hero />
      {/* Sentinel above PageBar */}
      <div id="sentinel" style={{ height: "1px" }}></div>
      <PageBar onFilterChange={setFilter} isExpanded={isExpanded} />
      <div className={styles.mainContent}>
        {filter === "SETTINGS" && <Settings />}
        {filter !== "SETTINGS" &&
          filteredSubdirectories.map((subdir, index) => {
            const metadata = subdir.metadata[language] || subdir.metadata["en"]; // Fallback to English

            return (
              <PageElement
                key={index}
                title={metadata.title}
                location={metadata.location}
                date={metadata.date}
                category={metadata.category}
                url={metadata.url}
                description={metadata.description}
                images={subdir.images}
              />
            );
          })}
      </div>
      <Footer />
    </div>
  );
};

export default ClientPage;
