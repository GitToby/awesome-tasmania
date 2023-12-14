import { Collection, Template } from "tinacms";
import { title, body, image, links, linkedPages } from "../commonFields";

// This is a set of collections where there will be only one document per, with all the fields.
// Its possible thanks to singletonAlowedActions and match.include

export const homePage: Collection = {
  name: "homePage",
  label: "Home",
  path: "content",
  format: "md",
  fields: [title, image, body, linkedPages],
  ui: {
    router: () => `/`,
    allowedActions: {
      create: false,
      delete: false,
    },
    filename: {
      slugify: (values: Record<string, any>) =>
        values?.title?.toLowerCase().replace(/ /g, "-"),
      readonly: true,
    },
  },
  match: {
    // Only one Home.json file can exist.
    // Tina only reads this file for data.
    include: "home",
  },
};
