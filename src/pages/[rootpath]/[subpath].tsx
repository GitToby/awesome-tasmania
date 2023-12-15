import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";
import { ContentPageQuery } from "../../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { PageData, RelativePathQuery, SiteDataQueryResponse } from "@/types";
import { ContentLayout } from "@/components/ContentLayout";
import { Linkd } from "@/components/Linkd";

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
      pageData={pageData as PageData}
      downarrow
    >
      <div className="flex flex-col gap-4 items-center max-w-lg my-20 text-center">
        <h1 className="text-5xl font-bold capitalize">{pageData.title}</h1>
        <div className="divider w-1/3 mx-auto"></div>
        <TinaMarkdown content={pageData.body} />
        <Linkd
          className="btn btn-wide btn-outline my-4"
          href={pageData.link.url}
          externalFlag
        >
          {pageData.link.description}
        </Linkd>
        {pageData.iframeUrl && (
          <iframe
            className="w-full shadow mb-5 h-72"
            src={pageData.iframeUrl}
          ></iframe>
        )}
      </div>
    </ContentLayout>
  );
};

export const getStaticProps = async ({
  params,
}): Promise<{ props: SubPathProps }> => {
  const siteDataResponse = await client.queries.siteDataConnection();

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
