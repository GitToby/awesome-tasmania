import { Template } from "tinacms";
import { link } from "./commonFields";

export const iframe: Template = {
  name: "Iframe",
  label: "Iframe",
  fields: [
    {
      type: "string",
      name: "src",
      label: "Embed URL",
      description:
        "The iframe URL from the Google Maps embed share. You can pase the whole embedd HTML and we will parse it. If Nothing appears try copying again or manually provide src= field.",
      ui: {
        format: (val: string) => {
          // parse html iframe for url.
          const regex = /<iframe.*?src=["'](.*?)["'].*?>/i;
          const res = val?.match(regex);
          return res ? res[0] : val;
        },
      },
    },
  ],
};

export const pageLink: Template = {
  name: "Link",
  label: "Link",
  fields: [link],
};

