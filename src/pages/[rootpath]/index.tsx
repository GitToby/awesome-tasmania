import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";
import { RootPageQuery } from "../../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { LandingLayout } from "@/components/LandingLayout";
import {
  ContentPageQueryResponse,
  LinkedPage,
  RelativePathQuery,
  SiteDataQueryResponse,
} from "@/types";
import { PageLink } from "@/components/PageLink";
import { PageCard } from "@/components/PageCard";

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

  return (
    <LandingLayout
      siteData={props.siteData}
      page={{
        title: pageData.title,
        description: pageData.description,
      }}
      image={pageData.image}
    >
      <h1 className="text-5xl font-bold uppercase mb-5">{pageData.title}</h1>
      <div className="prose-invert mb-5">
        <TinaMarkdown content={pageData.body} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {linkedPages &&
          linkedPages.map((page, idx) => {
            const linkedPage = page.node;
            return (
              <PageCard
                page={linkedPage as LinkedPage}
                parentPage={pageData as LinkedPage}
              />
            );
          })}
      </div>
    </LandingLayout>
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

  const post_routes = postsListData.data.rootPageConnection.edges
    .filter((post) => post.node && post.node.publish)
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
