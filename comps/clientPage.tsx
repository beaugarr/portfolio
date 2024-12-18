"use client";

import React, { useState, useEffect } from "react";
import PageBar from "@/comps/pageBar";
import PageElement from "@/comps/pageElement";
import styles from "@/styles/page.module.css";
import Link from "next/link";
import AboutMe from "./aboutMe";
import Settings from "./settings";

interface Metadata {
  title: string;
  location: string;
  date: string;
  category: string;
  url: string;
  description: string;
}

interface Subdirectory {
  name: string;
  images: { id: number; src: string }[];
  metadata: Metadata;
}

interface ClientPageProps {
  subdirectories: Subdirectory[];
}

const ClientPage: React.FC<ClientPageProps> = ({ subdirectories }) => {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredSubdirectories =
    filter === null
      ? subdirectories
      : subdirectories.filter((subdir) => subdir.metadata.category === filter);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const pageBar = document.querySelector("#pageBar");

    if (!pageBar) return;

    const sentinel = document.createElement("div");
    sentinel.style.height = "1px";
    sentinel.style.width = "100%";
    sentinel.style.position = "absolute";
    pageBar.parentElement?.insertBefore(sentinel, pageBar);

    const observer = new IntersectionObserver(
      ([entry]) => setIsExpanded(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <div className={styles.container}>
      <PageBar onFilterChange={setFilter} isExpanded={isExpanded} />
      <div style={{ padding: "40px" }}>
        {filter === "ABOUT ME" && <AboutMe />}
        {filter === "SETTINGS" && <Settings />}
        {filter !== "ABOUT ME" &&
          filter !== "SETTINGS" &&
          filteredSubdirectories.map((subdir, index) => (
            <PageElement
              key={index}
              title={subdir.metadata.title}
              location={subdir.metadata.location}
              date={subdir.metadata.date}
              category={subdir.metadata.category}
              url={subdir.metadata.url}
              description={subdir.metadata.description}
              images={subdir.images}
            />
          ))}
      </div>
    </div>
  );
};

export default ClientPage;
