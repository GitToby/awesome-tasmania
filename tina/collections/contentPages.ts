import { Collection } from "tinacms";
import {
  title,
  body,
  description,
  link,
  image,
  linkedrootPage,
} from "../commonFields";

const contentPages: Collection = {
  name: "contentPage",
  label: "Content Page",
  path: "content/content-pages",
  fields: [
    title,
    description,
    { ...linkedrootPage, label: "Parent Page" },
    image,
    link,
    {
      type: "string",
      name: "iframeUrl",
      label: "Embed URL",
      description:
        "The iframe URL from the Google Maps embed share. You can pase the whole embedd HTML and we will parse it. If Nothing appears try copying again or manually provide src= field.",
      ui: {
        format: (val?: string) => {
          // parse html iframe for url.
          const regex = /<iframe.*?src=["'](.*?)["'].*?>/i;
          const res = val?.match(regex);
          return res ? res[0] : val;
        },
      },
    },
    body,
  ],
  ui: {
    // currently cant place data from the document in the path.
    // router: (x) => JSON.stringify(x),
    filename: {
      slugify: (values) => values?.title?.toLowerCase().replace(/ /g, "-"),
      readonly: false,
    },
  },
};

export default contentPages;
