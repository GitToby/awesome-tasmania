import { Collection, TinaField } from "tinacms";
import { title, body, description } from "../commonFields";

export const links: Collection = {
  name: "links",
  label: "Links",
  path: "content/links",
  format: "json",
  fields: [
    title,
    {
      type: "string",
      name: "url",
      label: "URL",
      description:
        "The URL the link will point to, can be relative to site base or absolute to external sites.",
      required: true,
      ui: {
        validate: (value) => {
          if (
            value &&
            (value.startsWith("/") || value.startsWith("https://"))
          ) {
            return "URL must be relative, starting with '/', or external, starting with 'https://'";
          }
        },
      },
    },
    {
      type: "boolean",
      name: "disabled",
      label: "Disable",
      description: "This will render a disabled buton if checked.",
    },
    {
      type: "boolean",
      name: "newTab",
      label: "Open In New Tab",
      description: "This will open the link in a new tab when clicked.",
    },
  ],
  ui: {
    filename: {
      slugify: (values) => values?.title?.toLowerCase().replace(/ /g, "-"),
    },
  },
};

// ref to a single link
export const linkReference: TinaField = {
  type: "reference",
  name: "link",
  label: "Link",
  collections: ["links"],
};

// a list of refs to links
export const listOflinks: TinaField = {
  type: "object",
  name: "links",
  label: "Links",
  list: true,
  ui: {
    itemProps: (item) => {
      return { label: item?.link };
    },
  },
  fields: [linkReference],
};
