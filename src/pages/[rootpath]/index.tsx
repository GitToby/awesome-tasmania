import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";
import { RootPagesQuery } from "../../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { LandingLayout } from "@/components/LandingLayout";
import { LinkedPage, RelativePathQuery, SiteQueryResponse } from "@/types";
import { PageLink } from "@/components/PageLink";

type RootPageProps = {
  pageData: RelativePathQuery<RootPagesQuery>;
  siteData: SiteQueryResponse;
};

const RootPage = (props: RootPageProps) => {
  const { data } = useTina({
    data: props.pageData.data,
    query: props.pageData.query,
    variables: props.pageData.variables,
  });
  const pageData = data.rootPages;

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pageData.linkedPages &&
          pageData.linkedPages.map((linkedPage, idx) => (
            <div key={idx} className="card bg-base-100 shadow-xl image-full">
              <figure>
                <img src={linkedPage.page.image.url} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{linkedPage.page.title}</h2>
                <p>{linkedPage.page.description}</p>
                <PageLink
                  parentPage={pageData as LinkedPage}
                  page={linkedPage.page as LinkedPage}
                  className=""
                />
              </div>
            </div>
          ))}
      </div>
    </LandingLayout>
  );
};

export const getStaticProps = async ({
  params,
}): Promise<{ props: RootPageProps }> => {
  const siteDataResponse = await client.queries.siteDataConnection();
  const pageDataResponse = await client.queries.rootPages({
    relativePath: `${params.rootpath}.md`,
  });

  return {
    props: {
      pageData: pageDataResponse,
      siteData: siteDataResponse,
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await client.queries.rootPagesConnection();
  const post_routes = postsListData.data.rootPagesConnection.edges
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
