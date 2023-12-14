import { Collection } from "tinacms";
import { title, subtitle, body, image } from "../commonFields";
import { linkReference, listOflinks } from "./links";

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
  fields: [
    title,
    image,
    body,
    { ...linkReference, name: "featuredLink1", label: "Featured Link 1" },
    { ...linkReference, name: "featuredLink2", label: "Featured Link 2" },
    { ...linkReference, name: "featuredLink3", label: "Featured Link 3" },
    { ...linkReference, name: "featuredLink4", label: "Featured Link 4" },
  ],
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

export const navBar: Collection = {
  name: "navBar",
  label: "Site Wide Nav Data",
  path: singletonsPath,
  format: "json",
  fields: [
    { ...listOflinks, name: "tlLinks", label: "Top Left Links" },
    { ...listOflinks, name: "trLinks", label: "Top Right Links" },
  ],
  ui: {
    router: null,
    allowedActions: singletonAlowedActions,
    global: true,
  },
  match: {
    include: "nav",
  },
};

export const socials: Collection = {
  name: "socials",
  label: "Site Wide Socials",
  path: singletonsPath,
  format: "json",
  fields: [
    {
      type: "string",
      name: "facebook",
    },
    {
      type: "string",
      name: "instagram",
    },
    {
      type: "string",
      name: "youtube",
    },
    {
      type: "string",
      name: "twitter",
    },
  ],
  ui: {
    router: null,
    allowedActions: singletonAlowedActions,
    global: true,
  },
  match: {
    include: "socials",
  },
};

export const blogPage: Collection = {
  name: "blogPage",
  label: "Blog",
  path: singletonsPath,
  format: "md",
  fields: [title, subtitle, body],
  ui: {
    allowedActions: singletonAlowedActions,
  },
  match: {
    include: "Blog",
  },
};
