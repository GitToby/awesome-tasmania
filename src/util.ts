import fs from "node:fs/promises";
import { getPlaiceholder, GetPlaiceholderReturn } from "plaiceholder";

export async function getImagePlaiceholder(
  imagePath: string,
): Promise<GetPlaiceholderReturn> {
  let initialPath = "public/";
  if (imagePath.startsWith("/")) {
    // ensure we don't get a public//media situation
    initialPath = "public";
  }
  const file = await fs.readFile(`${initialPath}${imagePath}`);
  return await getPlaiceholder(file);
}
