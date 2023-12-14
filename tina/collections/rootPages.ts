import { Collection } from "tinacms";
import { title, body, description, image } from "../commonFields";
import { listOflinks } from "./links";

const rootPages: Collection = {
  name: "rootPages",
  label: "Root Pages",
  path: "content/pages",
  fields: [
    title,
    description,
    body,
    image,
    {
      type: "boolean",
      name: "publish",
      label: "Publish",
    },
    listOflinks,
  ],
  ui: {
    router: ({ document }) => `/${document._sys.filename}`,
    filename: {
      slugify: (values) => values?.title?.toLowerCase().replace(/ /g, "-"),
      readonly: false,
    },
  },
};

export default rootPages;
