import { ReactNode } from "react";
import {
  ContentPagesImage,
  Exact,
  HomePageImage,
  HomePageLinkedPagesPage,
  RootPagesImage,
  RootPagesLinkedPagesPage,
  SiteDataConnectionQuery,
  SiteDataConnectionQueryVariables,
} from "../tina/__generated__/types";

export type SiteQueryResponse = {
  data: SiteDataConnectionQuery;
  errors?: {
    message: string;
    locations: { line: number; column: number }[];
    path: string[];
  }[];
  variables: SiteDataConnectionQueryVariables;
  query: string;
};

export type RelativePathQuery<T> = {
  data: T;
  variables: Exact<{ relativePath: string }>;
  query: string;
};

export type PageImage = HomePageImage | RootPagesImage | ContentPagesImage;
export type LinkedPage = HomePageLinkedPagesPage | RootPagesLinkedPagesPage;
export type ClassNameMixin = { className?: string };
export type ChildrenMixin = { children: ReactNode };
