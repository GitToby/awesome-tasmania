import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";
import { Links, RootPagesQuery } from "../../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { LandingLayout } from "@/components/LandingLayout";
import { NavData, RelativePathQuery, SocialsData } from "@/types";

type RootPageProps = {
  pageData: RelativePathQuery<RootPagesQuery>;
  navData: NavData;
  socialsData: SocialsData;
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
      navData={props.navData}
      socialsData={props.socialsData}
      page={{
        title: pageData.title,
        description: "blah",
        links: pageData.links ? pageData.links.map((l) => l.link as Links) : [],
      }}
      image={pageData.image}
    >
      <h1 className="mb-5 text-5xl font-bold uppercase">{pageData.title}</h1>
      <div className="mb-5">
        <TinaMarkdown content={pageData.body} />
      </div>
    </LandingLayout>
  );
};

export const getStaticProps = async ({ params }) => {
  const navResponse = await client.queries.navBarConnection();
  const socialsResponse = await client.queries.socialsConnection();

  const res = await client.queries.rootPages({
    relativePath: `${params.main_path}.md`,
  });

  return {
    props: {
      pageData: res,
      navData: navResponse,
      socialsData: socialsResponse,
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await client.queries.rootPagesConnection();
  const post_routes = postsListData.data.rootPagesConnection.edges
    .filter((post) => post.node && post.node.publish)
    .map((post) => ({
      params: {
        // This `main_path` matches the [main_path]/index.tsx file param
        // the urls generated will be the same as the file name.
        main_path: post.node._sys.filename,
      },
    }));
  return {
    paths: post_routes,
    fallback: false,
  };
};

export default RootPage;
