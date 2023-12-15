import { useTina } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";
import {
  HomePageConnectionQuery,
  HomePageConnectionQueryVariables,
} from "../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { PageData, SiteDataQueryResponse } from "@/types";
import { PageLink } from "@/components/PageLink";
import { ContentLayout } from "@/components/ContentLayout";

type HomePageProps = {
  homeData: {
    data: HomePageConnectionQuery;
    variables: HomePageConnectionQueryVariables;
    query: string;
  };
  siteData: SiteDataQueryResponse;
};

export default function Page(props: HomePageProps) {
  const homeData = useTina({
    data: props.homeData.data,
    query: props.homeData.query,
    variables: props.homeData.variables,
  });

  const pageData = homeData.data.homePageConnection.edges![0]?.node;
  const pageLinks = pageData.linkedPages;
  return (
    <ContentLayout siteData={props.siteData} pageData={pageData as PageData}>
      {pageLinks && (
        <div className="flex flex-wrap place-content-center gap-2">
          {pageLinks &&
            pageLinks.map((link) => (
              <PageLink
                page={link.linkedPage as PageData}
                className="basis-1/3 btn-primary  btn-outline"
              />
            ))}
        </div>
      )}
    </ContentLayout>
  );
}

export const getStaticProps = async (): Promise<{ props: HomePageProps }> => {
  const pageDataResponse = await client.queries.homePageConnection();
  const siteDataResponse = await client.queries.siteDataConnection();

  return {
    props: {
      homeData: pageDataResponse,
      siteData: siteDataResponse,
    },
  };
};
