import fs from "node:fs/promises";
import { getPlaiceholder, GetPlaiceholderReturn } from "plaiceholder";

export async function getImagePlaiceholder(
  imagePath: string,
): Promise<GetPlaiceholderReturn> {
  if (imagePath.startsWith("http")) {
    // web based
    const buffer = await fetch(imagePath).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );
    return await getPlaiceholder(buffer);
  } else {
    //  file based
    let initialPath = "public/";
    if (imagePath.startsWith("/")) {
      // ensure we don't get a public//media situation
      initialPath = "public";
    }
    const buffer = await fs.readFile(`${initialPath}${imagePath}`);
    return await getPlaiceholder(buffer);
  }
}
