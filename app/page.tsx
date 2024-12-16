import path from "path";
import fs from "fs";
import { marked } from "marked";
import ClientPage from "@/comps/clientPage";

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

const Home = async () => {
  const directoryPath = path.join(process.cwd(), "public", "content");
  const subdirs = fs.readdirSync(directoryPath);

  const subdirectories: Subdirectory[] = (await Promise.all(
    subdirs.map(async (subdir) => {
      const subdirPath = path.join(directoryPath, subdir);

      const stats = fs.statSync(subdirPath);
      if (!stats.isDirectory()) return null;

      const files = fs.readdirSync(subdirPath);

      const images = files
        .filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file))
        .map((file, index) => ({ id: index + 1, src: `/content/${subdir}/${file}` }));

      const metadataFile = "metadata.json";
      const metadataPath = path.join(subdirPath, metadataFile);
      let metadata: Metadata = { title: "", location: "", date: "", category: "", url: "", description: "" };

      if (fs.existsSync(metadataPath)) {
        const metadataContent = fs.readFileSync(metadataPath, "utf-8");
        metadata = JSON.parse(metadataContent);
      } else {
        console.error(`Metadata file not found: ${metadataPath}`);
      }

      const description = await marked(metadata.description);

      return {
        name: subdir,
        images,
        metadata: { ...metadata, description },
      };
    })
  )).filter((subdir): subdir is Subdirectory => subdir !== null);

  return <ClientPage subdirectories={subdirectories} />;
};

export default Home;
