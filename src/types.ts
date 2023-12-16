import { ReactNode } from "react";
import {
  Exact,
  HomePage,
  HomePageConnectionQuery,
  HomePageConnectionQueryVariables,
  HomePageImage,
  Page,
  PageConnectionQuery,
  PageConnectionQueryVariables,
  PageImage,
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

export type SiteDataQueryResponse = QueryResponse<
  SiteDataConnectionQuery,
  SiteDataConnectionQueryVariables
>;
export type HomeDataQueryResponse = QueryResponse<
  HomePageConnectionQuery,
  HomePageConnectionQueryVariables
>;
export type PageQueryResponse = QueryResponse<
  PageConnectionQuery,
  PageConnectionQueryVariables
>;

export type RelativePathQuery<T> = {
  data: T;
  variables: Exact<{ relativePath: string }>;
  query: string;
};

export type Image = HomePageImage | PageImage | SiteDataFallbackImg;
export type PageData = HomePage | Page;

export type ClassNameMixin = { className?: string };
export type ChildrenMixin = { children: ReactNode };
