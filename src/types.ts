import { ReactNode } from "react";
import {
  Exact,
  HomePageImage,
  NavBarConnectionQuery,
  NavBarConnectionQueryVariables,
  RootPages,
  RootPagesImage,
  SocialsConnectionQuery,
  SocialsConnectionQueryVariables,
} from "../tina/__generated__/types";

export type NavData = {
  data: NavBarConnectionQuery;
  variables: NavBarConnectionQueryVariables;
  query: string;
};

export type SocialsData = {
  data: SocialsConnectionQuery;
  variables: SocialsConnectionQueryVariables;
  query: string;
};

export type RelativePathQuery<T> = {
  data: T;
  variables: Exact<{ relativePath: string }>;
  query: string;
};
export type ImageDataWrap = HomePageImage | RootPagesImage;

export type ClassNameMixin = { className?: string };
export type ChildrenMixin = { children: ReactNode };
