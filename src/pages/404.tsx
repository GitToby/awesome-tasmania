import { useTina } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";
import { Page } from "../../tina/__generated__/types";
import {
  NotFoundDataQueryResponse,
  PageData,
  SiteDataQueryResponse,
} from "@/types";
import { ContentLayout } from "@/components/ContentLayout";
import { PageCard } from "@/components/PageCard";

type NotFoundPageProps = {
  homeData: NotFoundDataQueryResponse;
  siteData: SiteDataQueryResponse;
};

export default function Page(props: NotFoundPageProps) {
  const homeData = useTina({
    data: props.homeData.data,
    query: props.homeData.query,
    variables: props.homeData.variables,
  });

  const pageData = homeData.data.notFoundConnection.edges![0]?.node;
  // @ts-ignore
  const linkedPages = pageData.linkedPages
    ? // @ts-ignore
      pageData.linkedPages.map((link) => link.page && link.page)
    : [];

  return (
    <ContentLayout
      siteData={props.siteData}
      pageData={pageData as PageData}
      bodyInHeader
    >
      <></>
    </ContentLayout>
  );
}

export const getStaticProps = async (): Promise<{ props: NotFoundPageProps }> => {
  const notFoundPageData = await client.queries.notFoundConnection();
  const siteDataResponse = await client.queries.siteDataConnection();

  return {
    props: {
      homeData: notFoundPageData,
      siteData: siteDataResponse,
    },
  };
};
