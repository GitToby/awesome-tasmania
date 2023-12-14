import { TinaField } from "tinacms";

export const title: TinaField = {
  type: "string",
  name: "title",
  label: "Title",
  description:
    "The main title of the content, will double as the page title when relevent",
  isTitle: true,
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
  required: true,
};

const imageURL: TinaField = {
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

const imageTooltip: TinaField = {
  type: "string",
  name: "tooltip",
  label: "Image Tooltip Text",
  description: "Helper tooltip in various locations the image is used.",
};

export const image: TinaField = {
  type: "object",
  name: "image",
  label: "Image",
  required: true,
  fields: [imageURL, imageAlt, imageTooltip],
};
