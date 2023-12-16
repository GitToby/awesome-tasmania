import { useTina } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";
import { Page, PageQuery } from "../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import {
  PageData,
  PageQueryResponse,
  RelativePathQuery,
  SiteDataQueryResponse,
} from "@/types";
import { ContentLayout } from "@/components/ContentLayout";
import { tinaComponents } from "@/components/TinaComponents";
import { PageCard } from "@/components/PageCard";

type SubPathProps = {
  pageData: RelativePathQuery<PageQuery>;
  siteData: SiteDataQueryResponse;
  pageBackLinks: PageQueryResponse;
};

export default function SubPathPage(props: SubPathProps) {
  const { data } = useTina({
    data: props.pageData.data,
    query: props.pageData.query,
    variables: props.pageData.variables,
  });

  const pageData = data.page;

  const linkedPages = pageData.linkedPages
    ? pageData.linkedPages.map((link) => link.page && (link.page as Page))
    : [];

  const includeBody =
    pageData.includeBody &&
    pageData.body &&
    pageData.body.children &&
    pageData.body.children.length > 0;

  return (
    <ContentLayout
      siteData={props.siteData}
      pageData={pageData as PageData}
      downArrow={includeBody || linkedPages.length > 0}
    >
      {includeBody && (
        <div className="flex flex-col gap-4 items-center max-w-lg text-center mt-14">
          <h1 className="text-3xl font-bold capitalize">{pageData.title}</h1>
          <div className="divider w-1/3 mx-auto"></div>
          <TinaMarkdown content={pageData.body} components={tinaComponents} />
          <div className="divider w-1/3 mx-auto"></div>
        </div>
      )}
      {linkedPages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-base-100 w-full">
          {linkedPages.map((page, idx) => (
            <PageCard key={idx} page={page} />
          ))}
        </div>
      )}
    </ContentLayout>
  );
}

export async function getStaticProps({
  params,
}): Promise<{ props: SubPathProps }> {
  const pageDataResponse = await client.queries.page({
    relativePath: `${params.fileName}.mdx`,
  });

  const pageBacklinks = await client.queries.pageConnection({
    filter: {
      linkedPages: {
        page: {
          page: {
            title: {
              eq: pageDataResponse.data.page.title,
            },
          },
        },
      },
    },
  });

  const siteDataResponse = await client.queries.siteDataConnection();

  return {
    props: {
      pageData: pageDataResponse,
      siteData: siteDataResponse,
      pageBackLinks: pageBacklinks,
    },
  };
}

export async function getStaticPaths() {
  const contentPages = await client.queries.pageConnection();

  const pages = contentPages.data.pageConnection.edges;

  if (pages) {
    const pagePaths = pages
      .filter((page) => page?.node?.publish)
      .map((page) => ({
        params: {
          fileName: page!.node!._sys.filename,
        },
      }));
    return {
      paths: pagePaths,
      fallback: false,
    };
  } else {
    return {};
  }
}
