import { Collection } from "tinacms";
import { title, body, description, publish, link } from "../commonFields";

const contentPages: Collection = {
  name: "contentPages",
  label: "Content Pages",
  path: "content/content-pages",
  fields: [title, description, body, publish, link],
  ui: {
    router: ({ document }) => `/${document._sys.filename}`,
    filename: {
      slugify: (values) => values?.title?.toLowerCase().replace(/ /g, "-"),
      readonly: false,
    },
  },
};

export default contentPages;
