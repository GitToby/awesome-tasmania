import { Collection } from "tinacms";
import {
  title,
  body,
  description,
  externalLink,
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
    body,
    externalLink,
    image,
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
