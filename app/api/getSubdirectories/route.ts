import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const directoryPath = path.join(process.cwd(), "public", "content");
  const subdirs = fs.readdirSync(directoryPath);

  const subdirectories = subdirs
    .map((subdir) => {
      const subdirPath = path.join(directoryPath, subdir);
      const stats = fs.statSync(subdirPath);
      if (!stats.isDirectory()) return null;

      const files = fs.readdirSync(subdirPath);
      const images = files
        .filter((file) => /\.(jpg|jpeg|png|gif|webp|mov|mp4|webm)$/.test(file))
        .map((file, index) => ({ id: index + 1, src: `/content/${subdir}/${file}` }));

      const metadataFile = "metadata.json";
      const metadataPath = path.join(subdirPath, metadataFile);
      let metadata = {};

      if (fs.existsSync(metadataPath)) {
        const metadataContent = fs.readFileSync(metadataPath, "utf-8");
        metadata = JSON.parse(metadataContent);
      }

      return {
        name: subdir,
        images,
        metadata,
      };
    })
    .filter((subdir) => subdir !== null);

  return NextResponse.json({ subdirectories });
}
