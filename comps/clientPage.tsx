"use client";

import React, { useState } from "react";
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

  return (
    <div className={styles.container}>
      <PageBar onFilterChange={setFilter} />
      {filter === "ABOUT ME" && <AboutMe />}
      {filter === "SETTINGS" && <Settings />}
      {filter !== "ABOUT ME" && filter !== "SETTINGS" && (
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
        ))
      )}
    </div>
  );
};

export default ClientPage;
