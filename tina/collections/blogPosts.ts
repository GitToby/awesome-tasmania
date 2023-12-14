import { Collection } from "tinacms";
import { title, body, description } from "../commonFields";

const blogPosts: Collection = {
  name: "posts",
  label: "Posts",
  path: "content/posts",
  fields: [
    title,
    description,
    body,
    {
      type: "boolean",
      name: "publish",
      label: "Publish",
      required: true,
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
      required: true,
    },
  ],

  ui: {
    router: ({ document }) => `/blog/${document._sys.filename}`,
    filename: {
      slugify: (values) => values?.title.toLowerCase().replace(/ /g, "-")
    },
  },
};

export default blogPosts;
