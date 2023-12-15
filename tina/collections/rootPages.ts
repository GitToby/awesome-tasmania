import { Collection } from "tinacms";
import {
  title,
  body,
  description,
  image,
  publish,
  linkedPage,
} from "../commonFields";

export const rootPages: Collection = {
  name: "rootPage",
  label: "Root Page",
  path: "content/pages",
  fields: [title, description, body, image, publish],
  ui: {
    router: ({ document }) => `/${document._sys.filename}`,
    filename: {
      slugify: (values) => values?.title?.toLowerCase().replace(/ /g, "-"),
      readonly: false,
    },
  },
};
