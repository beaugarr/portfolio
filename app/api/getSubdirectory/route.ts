import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl; // Extract query params
  const slug = searchParams.get("slug");
  const lang = searchParams.get("lang") || "pl"; // Default to "pl"
  
  const directoryPath = path.join(process.cwd(), "public", "content", slug as string);

  // Validate the directory
  if (!fs.existsSync(directoryPath) || !fs.statSync(directoryPath).isDirectory()) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  // Fetch images
  const files = fs.readdirSync(directoryPath);

  const images = files
    .filter((file) => /\.(jpg|jpeg|png|gif|webp|mov)$/.test(file))
    .map((file, index) => ({ id: index + 1, src: `/content/${slug}/${file}` }));

  // Fetch metadata
  const metadataFile = "metadata.json";
  const metadataPath = path.join(directoryPath, metadataFile);
  let metadata = {};

  if (fs.existsSync(metadataPath)) {
    const metadataContent = fs.readFileSync(metadataPath, "utf-8");
    const data = JSON.parse(metadataContent);
    metadata = data[lang] || data["pl"]; // Default to "pl" if the lang is not found
  }

  return NextResponse.json({ metadata, images });
}
