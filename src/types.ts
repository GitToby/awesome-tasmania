import { ReactNode } from "react";
import {
  ContentPage,
  ContentPageConnectionQuery,
  ContentPageConnectionQueryVariables,
  ContentPageImage,
  Exact,
  HomePage,
  HomePageImage,
  HomePageLinkedPagesLinkedPage,
  RootPage,
  RootPageImage,
  SiteDataConnectionQuery,
  SiteDataConnectionQueryVariables,
  SiteDataFallbackImg,
} from "../tina/__generated__/types";

type QueryResponse<Q, QV> = {
  data: Q;
  errors?: {
    message: string;
    locations: { line: number; column: number }[];
    path: string[];
  }[];
  variables: QV;
  query: string;
};

export type ContentPageQueryResponse = QueryResponse<
  ContentPageConnectionQuery,
  ContentPageConnectionQueryVariables
>;

export type SiteDataQueryResponse = QueryResponse<
  SiteDataConnectionQuery,
  SiteDataConnectionQueryVariables
>;

export type RelativePathQuery<T> = {
  data: T;
  variables: Exact<{ relativePath: string }>;
  query: string;
};

export type PageImage =
  | HomePageImage
  | RootPageImage
  | ContentPageImage
  | SiteDataFallbackImg;
export type PageData = HomePage | RootPage | ContentPage;
export type ClassNameMixin = { className?: string };
export type ChildrenMixin = { children: ReactNode };
