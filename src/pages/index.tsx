import { useTina } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";
import { Page } from "../../tina/__generated__/types";
import {
  HomeDataQueryResponse,
  PageData,
  SiteDataQueryResponse,
} from "@/types";
import { ContentLayout } from "@/components/ContentLayout";
import { PageCard } from "@/components/PageCard";
import { getImagePlaiceholder } from "@/util";

type HomePageProps = {
  homeData: HomeDataQueryResponse;
  plaiceholderReturn: string | undefined;
  siteData: SiteDataQueryResponse;
};

export default function Page(props: HomePageProps) {
  const homeData = useTina({
    data: props.homeData.data,
    query: props.homeData.query,
    variables: props.homeData.variables,
  });

  const pageData = homeData.data.homePageConnection.edges![0]?.node;
  // @ts-ignore
  const linkedPages = pageData.linkedPages
    ? // @ts-ignore
      pageData.linkedPages.map((link) => link.page && link.page)
    : [];

  return (
    <ContentLayout
      siteData={props.siteData}
      pageData={pageData as PageData}
      plaiceholderBase64={props.plaiceholderReturn}
      bodyInHeader
    >
      {linkedPages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-base-100 w-full">
          {linkedPages
            .filter((page) => page)
            .map((page, idx) => (
              <PageCard key={idx} page={page as Page} />
            ))}
        </div>
      )}
    </ContentLayout>
  );
}

export const getStaticProps = async (): Promise<{ props: HomePageProps }> => {
  const pageDataResponse = await client.queries.homePageConnection();

  const siteDataResponse = await client.queries.siteDataConnection();

  const res = await getImagePlaiceholder(
    // @ts-ignore
    pageDataResponse.data.homePageConnection.edges[0].node.image.srcURL,
  );

  return {
    props: {
      homeData: pageDataResponse,
      plaiceholderReturn: res.base64,
      siteData: siteDataResponse,
    },
  };
};
