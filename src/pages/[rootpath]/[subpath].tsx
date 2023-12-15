import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";
import {
  ContentPageQuery,
  RootPageQuery,
} from "../../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { LandingLayout } from "@/components/LandingLayout";
import { RelativePathQuery, SiteDataQueryResponse } from "@/types";
import { ContentLayout } from "@/components/ContentLayout";

type SubPathProps = {
  pageData: RelativePathQuery<ContentPageQuery>;
  siteData: SiteDataQueryResponse;
};

const SubPathPage = (props: SubPathProps) => {
  const { data } = useTina({
    data: props.pageData.data,
    query: props.pageData.query,
    variables: props.pageData.variables,
  });
  const pageData = data.contentPage;

  return (
    <ContentLayout
      siteData={props.siteData}
      page={{
        title: pageData.title,
        description: pageData.description,
      }}
      image={pageData.image}
    >
      <h1 className="text-5xl font-bold uppercase mb-5 ">{pageData.title}</h1>
      <div className="prose-invert  mb-5">
        <h2>{pageData.description}</h2>
        <TinaMarkdown content={pageData.body} />
      </div>
    </ContentLayout>
  );
};

export const getStaticProps = async ({
  params,
}): Promise<{ props: SubPathProps }> => {
  const siteDataResponse = await client.queries.siteDataConnection();

  // the props are pulled purly from the content page
  // todo: link the upstream page somehow.
  const pageDataResponse = await client.queries.contentPage({
    relativePath: `${params.subpath}.md`,
  });

  return {
    props: {
      pageData: pageDataResponse,
      siteData: siteDataResponse,
    },
  };
};

export const getStaticPaths = async () => {
  const contentPages = await client.queries.contentPageConnection();

  const contentPathParams = contentPages.data.contentPageConnection.edges
    // only include those with linked and published root pages
    .filter((page) => page.node.rootPage && page.node.rootPage.publish)
    // form the correct paths
    .map((page) => ({
      params: {
        rootpath: page.node.rootPage._sys.filename,
        subpath: page.node._sys.filename,
      },
    }));

  return {
    paths: contentPathParams,
    fallback: false,
  };
};

export default SubPathPage;
