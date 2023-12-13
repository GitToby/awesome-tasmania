import { Collection } from "tinacms";
import { title, subtitle, body, image, description } from "../commonFields";

// This is a set of collections where there will be only one document per, with all the fields.
// Its possible thanks to singletonAlowedActions and match.include

const singletonsPath = "content/singletons";
const singletonAlowedActions = {
  create: false,
  delete: false,
};

export const homePage: Collection = {
  name: "homePage",
  label: "Home",
  path: singletonsPath,
  format: "md",
  fields: [title, subtitle, image, body],
  ui: {
    router: () => `/`,
    allowedActions: singletonAlowedActions,
  },
  match: {
    // Only one Home.md file can exist.
    // Tina only reads this file for data.
    include: "Home",
  },
};

export const blogPage: Collection = {
  name: "blogPage",
  label: "Blog",
  path: singletonsPath,
  format: "md",
  fields: [title, subtitle, body],
  ui: {
    router: () => `/`,
    allowedActions: singletonAlowedActions,
  },
  match: {
    include: "Blog",
  },
};
