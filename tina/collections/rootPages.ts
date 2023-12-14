import { Collection, TinaField } from "tinacms";
import {
  title,
  body,
  description,
  image,
  publish,
  linkedPages,
} from "../commonFields";

export const rootPages: Collection = {
  name: "rootPages",
  label: "Root Pages",
  path: "content/pages",
  fields: [title, description, body, image, publish, linkedPages],
  ui: {
    router: ({ document }) => `/${document._sys.filename}`,
    filename: {
      slugify: (values) => values?.title?.toLowerCase().replace(/ /g, "-"),
      readonly: false,
    },
  },
};
