import path from "path";
import fs from "fs";
import { marked } from "marked";

interface Metadata {
  title: string;
  location: string;
  date: string;
  category: string;
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
  const description = await marked(metadata.description);

  return (
    <div style={{ color: "#000" }}>
      <h1>{metadata.title}</h1>
      <p>
        <strong>Location:</strong> {metadata.location}
      </p>
      <p>
        <strong>Date:</strong> {metadata.date}
      </p>
      <p>
        <strong>Category:</strong> {metadata.category}
      </p>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <div>
        <h2>Images</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {images.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={`Image ${image.id}`}
              style={{ margin: "10px 0" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubPage;
