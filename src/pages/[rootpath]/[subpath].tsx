import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";
import {
  ContentPagesQuery,
  RootPagesQuery,
} from "../../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { LandingLayout } from "@/components/LandingLayout";
import { RelativePathQuery, SiteQueryResponse } from "@/types";

type SubPathProps = {
  pageData: RelativePathQuery<ContentPagesQuery>;
  siteData: SiteQueryResponse;
};

const SubPathPage = (props: SubPathProps) => {
  const { data } = useTina({
    data: props.pageData.data,
    query: props.pageData.query,
    variables: props.pageData.variables,
  });
  const pageData = data.contentPages;

  return (
    <LandingLayout
      siteData={props.siteData}
      page={{
        title: pageData.title,
        description: pageData.description,
      }}
      image={pageData.image}
    >
      <h1 className="text-5xl font-bold uppercase mb-5 ">{pageData.title}</h1>
      <div className="prose-invert  mb-5">
        <TinaMarkdown content={pageData.body} />
      </div>
    </LandingLayout>
  );
};

export const getStaticProps = async ({
  params,
}): Promise<{ props: SubPathProps }> => {
  const siteDataResponse = await client.queries.siteDataConnection();

  // the props are pulled purly from the content page
  // todo: link the upstream page somehow.
  const pageDataResponse = await client.queries.contentPages({
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
  const rootPages = await client.queries.rootPagesConnection();
  // subpaths are defined off linked documents in root pages
  const contentPathParams = rootPages.data.rootPagesConnection.edges
    .filter((page) => page.node && page.node.publish)
    .map((page) => {
      const linkedPages = page.node.linkedPages;
      let subpagePaths: string[] = [];
      // each linked page maps to subpath
      if (linkedPages) {
        subpagePaths = page.node.linkedPages.map(
          (linkedPage) => linkedPage.page._sys.filename
        );
      }
      // format the correct paremeter object to put back int paths
      return subpagePaths.map((pagePath) => ({
        params: {
          rootpath: page.node._sys.filename,
          subpath: pagePath,
        },
      }));
    })
    .flat();
  return {
    paths: contentPathParams,
    fallback: false,
  };
};

export default SubPathPage;
