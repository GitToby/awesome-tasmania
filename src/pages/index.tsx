import { useTina } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";
import {
  HomePageConnectionQuery,
  HomePageConnectionQueryVariables,
} from "../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { LandingLayout } from "@/components/LandingLayout";
import { LinkedPage, SiteDataQueryResponse } from "@/types";
import { PageLink } from "@/components/PageLink";

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
    <LandingLayout
      siteData={props.siteData}
      page={{
        title: pageData.title,
        description: "blah",
      }}
      image={pageData.image}
    >
      <h1 className="text-5xl font-bold uppercase mb-5">{pageData.title}</h1>
      <div className="prose-invert mb-5">
        <TinaMarkdown content={pageData.body} />
      </div>
      {pageLinks && (
        <div className="flex flex-wrap place-content-center gap-2">
          {pageLinks &&
            pageLinks.map((link) => (
              <PageLink
                page={link.linkedPage as LinkedPage}
                className="basis-1/3 btn-primary  btn-outline"
              />
            ))}
        </div>
      )}
    </LandingLayout>
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
