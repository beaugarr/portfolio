import path from "path";
import fs from "fs";
import { marked } from "marked";
import styles from "@/styles/slug.module.css";
import Image from "next/image";
import Footer from "@/comps/footer";
import AnimatedText from "@/comps/animatedText";

interface Metadata {
  title: string;
  location: string;
  date: string;
  category: string;
  type: string;
  url: string;
  description: string;
}

const fetchMetadata = (slug: string): Metadata => {
  const directoryPath = path.join(process.cwd(), "public", "content");
  const subdirectoryPath = path.join(directoryPath, slug);
  const metadataPath = path.join(subdirectoryPath, "metadata.json");

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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const metadata = fetchMetadata(slug);
  return {
    title: `${metadata.title} | Name`,
  };
}

interface SubPageProps {
  params: {
    slug: string;
  };
}

const SubPage = async ({ params }: SubPageProps) => {
  const { slug } = params;
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

  const descriptionHTML = marked(metadata.description);

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

export default SubPage;
