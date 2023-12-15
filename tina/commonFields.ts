import { TinaField } from "tinacms";

export const title: TinaField = {
  type: "string",
  name: "title",
  label: "Title",
  description:
    "The main title of the content, will double as the page title when relevent",
  required: true,
};

export const subtitle: TinaField = {
  type: "string",
  name: "subtitle",
  label: "Subtitle",
  description: "A subtitle for the content",
  required: true,
};

export const description: TinaField = {
  type: "string",
  name: "description",
  label: "Description",
  description:
    "A bried description of the content, will double as the page description when relevent",
  required: true,
};

export const body: TinaField = {
  type: "rich-text",
  name: "body",
  label: "Body",
  isBody: true,
  description: "the body of the content, will be rendered as HTML",
};

export const publish: TinaField = {
  type: "boolean",
  name: "publish",
  label: "Publish",
  description:
    "This data will be ignored if this is not toggled to the publish state",
  required: true,
};

const _image: TinaField = {
  type: "image",
  name: "url",
  label: "Image",
  required: true,
};

const imageAlt: TinaField = {
  type: "string",
  name: "alt",
  label: "Image Alt",
  description:
    "used in accessable screen readers and when image is not rendered.",
  required: true,
};

const imageTooltipText: TinaField = {
  type: "string",
  name: "text",
  label: "Image Tooltip Text",
  description: "Helper tooltip in various locations the image is used.",
};

const imageTooltipLink: TinaField = {
  type: "string",
  name: "link",
  label: "Image Tooltip Link",
  description:
    "When the user clicks the icon that displays the tooltip they are taken to this link",
};

const imageTooltip: TinaField = {
  type: "object",
  name: "tooltip",
  label: "Tooltip",
  fields: [imageTooltipText, imageTooltipLink],
};

export const image: TinaField = {
  type: "object",
  name: "image",
  label: "Image",
  fields: [_image, imageAlt, imageTooltip],
};

const url: TinaField = {
  type: "string",
  name: "url",
  label: "URL",
  description:
    "The URL the link will point to, can be relative to site base or absolute to external sites.",
  required: true,
};
export const externalFlag: TinaField = {
  type: "boolean",
  name: "externalFlag",
  label: "External",
  description: "a tag for an exernal item",
};

export const link: TinaField = {
  type: "object",
  name: "link",
  label: "Link",
  description: "Link to a page.",
  fields: [description, url, externalFlag],
};

export const listOfLinks: TinaField = {
  type: "object",
  name: "links",
  label: "Links",
  list: true,
  description: "A list of Links",
  fields: [link],
  ui: {
    itemProps: (item) => {
      return { label: `${item?.link?.description} -> ${item?.link?.url}` };
    },
  },
};

export const linkedrootPage: TinaField = {
  type: "reference",
  name: "rootPage",
  label: "Linked Root Page",
  required: true,
  collections: ["rootPage"],
};

export const linkedPage: TinaField = {
  type: "reference",
  name: "linkedPage",
  label: "Linked Page",
  collections: ["rootPage", "contentPage"],
};

export const linkedPages: TinaField = {
  type: "object",
  name: "linkedPages",
  label: "Linked Pages",
  list: true,
  fields: [linkedPage],
  ui: {
    itemProps: (item) => {
      return { label: `Linked page: ${item.linkedPage}` };
    },
  },
};
