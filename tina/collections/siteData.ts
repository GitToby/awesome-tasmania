import { Collection } from "tinacms";
import { image, linkedPages, listOfLinks } from "../commonFields";

// This is a set of collections where there will be only one document per, with all the fields.
// Its possible thanks to singletonAlowedActions and match.include
export const siteData: Collection = {
  name: "siteData",
  label: "Site Data",
  path: "content",
  format: "json",
  fields: [
    {
      ...image,
      name: "fallbackImg",
      label: "Fallback Image",
      description: "The image to use when theres a place an image should be.",
    },
    {
      type: "string",
      name: "facebook",
      label: "Facebook Username",
    },
    {
      type: "string",
      name: "instagram",
      label: "Instagram Username",
    },
    {
      type: "string",
      name: "youtube",
      label: "Youtube Username",
    },
    {
      type: "string",
      name: "twitter",
      label: "Twitter Username",
    },
    { ...linkedPages, name: "navLinks", label: "Nav Links" },
    { ...listOfLinks, name: "footerLinks", label: "Footer Links" },
  ],
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
    global: true,
  },
  match: {
    include: "site-data",
  },
};
