import { Collection } from "tinacms";
import { title, body, image, linkedPages, description } from "../commonFields";

// This is a set of collections where there will be only one document per, with all the fields.
// Its possible thanks to singletonAlowedActions and match.include

export const notFoundPage: Collection = {
  name: "notFound",
  label: "404 Not Found",
  path: "content",
  format: "md",
  fields: [title, description, image, body],
  ui: {
    router: () => `/not-found`,
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  match: {
    include: "not-found",
  },
};
