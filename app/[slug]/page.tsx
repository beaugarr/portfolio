// app/[slug]/page.tsx
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

const SubPage = async ({ params }: { params: { slug: string } }) => {
  const directoryPath = path.join(process.cwd(), "public", "content");
  
  // Determine the correct subdirectory based on the slug
  const subdirectoryPath = path.join(directoryPath, params.slug);
  
  // Check if the specified directory exists
  if (!fs.existsSync(subdirectoryPath) || !fs.statSync(subdirectoryPath).isDirectory()) {
    return <div>Subdirectory not found</div>; // Handle non-existing directory
  }

  const files = fs.readdirSync(subdirectoryPath);
  
  // Get images from the subdirectory
  const images = files
    .filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file))
    .map((file, index) => ({ id: index + 1, src: `/content/${params.slug}/${file}` }));

  // Load metadata
  const metadataFile = "metadata.json";
  const metadataPath = path.join(subdirectoryPath, metadataFile);
  let metadata: Metadata = { title: "", location: "", date: "", category: "", url: "", description: "" };

  if (fs.existsSync(metadataPath)) {
    const metadataContent = fs.readFileSync(metadataPath, "utf-8");
    metadata = JSON.parse(metadataContent);
  } else {
    console.error(`Metadata file not found: ${metadataPath}`);
  }

  // Convert the description from Markdown to HTML
  const description = await marked(metadata.description);

  // Render the subdirectory content directly
  return (
    <div style={{color: "#000"}}>
      <h1>{metadata.title}</h1>
      <p><strong>Location:</strong> {metadata.location}</p>
      <p><strong>Date:</strong> {metadata.date}</p>
      <p><strong>Category:</strong> {metadata.category}</p>
      <p><strong>URL:</strong> <a href={metadata.url}>{metadata.url}</a></p>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <div>
        <h2>Images</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {images.map((image) => (
            <img key={image.id} src={image.src} alt={`Image ${image.id}`} style={{ margin: '10px 0' }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubPage;
