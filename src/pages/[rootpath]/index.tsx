import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";
import { RootPageQuery } from "../../../tina/__generated__/types";
import {
  ContentPageQueryResponse,
  PageData,
  RelativePathQuery,
  SiteDataQueryResponse,
} from "@/types";
import { PageCard } from "@/components/PageCard";
import { ContentLayout } from "@/components/ContentLayout";

type RootPageProps = {
  pageData: RelativePathQuery<RootPageQuery>;
  linkedContentPages: ContentPageQueryResponse;
  siteData: SiteDataQueryResponse;
};

const RootPage = (props: RootPageProps) => {
  const tinaRes = useTina({ ...props.pageData });
  const pageData = tinaRes.data.rootPage;

  const tinaResContentPages = useTina({ ...props.linkedContentPages });
  const linkedPages = tinaResContentPages.data.contentPageConnection.edges;
  const includeLinkedPages = linkedPages && linkedPages.length > 0;
  return (
    <ContentLayout
      siteData={props.siteData}
      pageData={pageData as PageData}
      downarrow={includeLinkedPages}
      bodyInHeader
    >
      {includeLinkedPages && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-base-100">
          {linkedPages.map((page, idx) => {
            const linkedPage = page.node;
            return (
              <PageCard
                key={idx}
                page={linkedPage as PageData}
                parentPage={pageData as PageData}
              />
            );
          })}
        </div>
      )}
    </ContentLayout>
  );
};

export const getStaticProps = async ({
  params,
}): Promise<{ props: RootPageProps }> => {
  const siteDataResponse = await client.queries.siteDataConnection();

  const pageDataResponse = await client.queries.rootPage({
    relativePath: `${params.rootpath}.md`,
  });

  const linkedPagesResponse = await client.queries.contentPageConnection({
    filter: {
      rootPage: {
        rootPage: {
          title: { eq: pageDataResponse.data.rootPage.title },
        },
      },
    },
  });

  return {
    props: {
      pageData: pageDataResponse,
      linkedContentPages: linkedPagesResponse,
      siteData: siteDataResponse,
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await client.queries.rootPageConnection();

  const post_routes = postsListData.data.rootPageConnection.edges!
    .filter((post) => post!.node && post!.node.publish)
    .map((post) => ({
      params: {
        // This `rootpath` matches the [rootpath]/index.tsx file param
        // the urls generated will be the same as the file name.
        rootpath: post.node._sys.filename,
        subpath: undefined,
      },
    }));
  return {
    paths: post_routes,
    fallback: false,
  };
};

export default RootPage;
