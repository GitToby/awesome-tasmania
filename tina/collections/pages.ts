import { Collection } from "tinacms";
import {
  description,
  image,
  linkedPages,
  publish,
  title,
} from "../commonFields";
import { iframe, pageLink } from "../commonTemplates";

export const page: Collection = {
  name: "page",
  label: "Pages",
  path: "content/pages",
  format: "mdx",
  fields: [
    // These are required for a page to be generated
    title,
    description,
    image,
    publish,
    // These are all optional and add content below the hero
    {
      type: "boolean",
      name: "includeBody",
      label: "Include Body in page",
      description:
        "Disabling this will remove the body from the center of the page",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true,
      description: "the body of the content",
      templates: [iframe, pageLink],
    },
    linkedPages,
  ],
  ui: {
    router: (x) => `/${x.document._sys.filename}`,
    filename: {
      slugify: (values) => values?.title?.toLowerCase().replace(/ /g, "-"),
      readonly: false,
    },
  },
};
