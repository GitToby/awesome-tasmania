import { ReactNode } from "react";
import {
  Exact,
  HomePage,
  HomePageConnectionQuery,
  HomePageConnectionQueryVariables,
  HomePageImage,
  NotFound,
  NotFoundConnection,
  NotFoundConnectionQuery,
  NotFoundConnectionQueryVariables,
  NotFoundImage,
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
export type NotFoundDataQueryResponse = QueryResponse<
  NotFoundConnectionQuery,
  NotFoundConnectionQueryVariables
>;
export type RelativePathQuery<T> = {
  data: T;
  variables: Exact<{ relativePath: string }>;
  query: string;
};

export type Image =
  | HomePageImage
  | PageImage
  | SiteDataFallbackImg
  | NotFoundImage;
export type PageData = HomePage | NotFound | Page;

export type ClassNameMixin = { className?: string };
export type ChildrenMixin = { children: ReactNode };
