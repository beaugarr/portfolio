import path from "path";
import fs from "fs";
import { marked } from "marked";
import styles from "@/styles/slug.module.css";
import Image from "next/image";

interface Metadata {
  title: string;
  location: string;
  date: string;
  category: string;
  type: string;
  url: string;
  description: string;
}

// Function to fetch metadata
const fetchMetadata = (slug: string): Metadata => {
  const directoryPath = path.join(process.cwd(), "public", "content");
  const subdirectoryPath = path.join(directoryPath, slug);
  const metadataFile = "metadata.json";
  const metadataPath = path.join(subdirectoryPath, metadataFile);

  let metadata: Metadata = {
    title: "Untitled",
    location: "",
    date: "",
    category: "",
    type: "",
    url: "",
    description: "",
  };

  if (fs.existsSync(metadataPath)) {
    const metadataContent = fs.readFileSync(metadataPath, "utf-8");
    metadata = JSON.parse(metadataContent);
  }

  return metadata;
};

// Function to generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const metadata = await fetchMetadata(slug);
  return {
    title: `${metadata.title} | Michał Zagajewski`,
  };
}

const SubPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const directoryPath = path.join(process.cwd(), "public", "content");
  const subdirectoryPath = path.join(directoryPath, slug);

  if (
    !fs.existsSync(subdirectoryPath) ||
    !fs.statSync(subdirectoryPath).isDirectory()
  ) {
    return <div>Subdirectory not found</div>;
  }

  const files = fs.readdirSync(subdirectoryPath);
  const images = files
    .filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file))
    .map((file, index) => ({
      id: index + 1,
      src: `/content/${slug}/${file}`,
    }));
  const metadata = fetchMetadata(slug);

  // Convert the description from Markdown to HTML
  const description = marked(metadata.description);

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
                unoptimized={true}
              />
            </div>
          ))}
        </div>
        <div className={styles.textSection}>
          <h1 className={styles.title}>{metadata.title}</h1>
          {/* Optionally add a button for online publication */}
          {/* <button className={styles.button}>Visit online publication</button> */}
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
        </div>

      </div>
    </div>
  );
};

export default SubPage;
