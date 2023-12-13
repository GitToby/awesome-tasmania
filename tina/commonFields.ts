import { TinaField } from "tinacms";

export const title: TinaField = {
  type: "string",
  name: "title",
  label: "Title",
  isTitle: true,
  required: true,
};

export const subtitle: TinaField = {
  type: "string",
  name: "subtitle",
  label: "Subtitle",
  required: true,
};

export const description: TinaField = {
  type: "string",
  name: "description",
  label: "Description",
  required: true,
};

export const body: TinaField = {
  type: "rich-text",
  name: "body",
  label: "Body",
  isBody: true,
  required: true,
};

export const image: TinaField = {
  type: "image",
  name: "image",
  label: "Image",
  required: true,
};
