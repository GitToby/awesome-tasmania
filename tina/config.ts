import { defineConfig } from "tinacms";
import { homePage } from "./collections/homePage";
import { siteData } from "./collections/siteData";
import { page } from "./collections/pages";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: "66c4bf3c-8a2d-42ec-aaf1-df88de5adfe5",
  // Get this from tina.io
  token: "7014f645da991faa763518a57a12719be97077d3",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [homePage, page, siteData],
  },
});
