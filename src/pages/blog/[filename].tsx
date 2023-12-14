import Head from "next/head";
import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";
import {
  Exact,
  PostsConnectionQuery,
  PostsConnectionQueryVariables,
  PostsQuery,
} from "../../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { NextSeo } from "next-seo";

type BlogPageProps = {
  tina: {
    data: PostsQuery;
    variables: Exact<{ relativePath: string }>;
    query: string;
  };
};

const BlogPage = (props: BlogPageProps) => {
  const { data } = useTina({
    data: props.tina.data,
    query: props.tina.query,
    variables: props.tina.variables,
  });
  const postData = data.posts;

  return (
    <main>
      <NextSeo title={postData.title} description={postData.description} />
      <div className="hero min-h-screen bg-secondary">
        <div className="hero-content text-center text-secondary-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{postData.title}</h1>
            <h2>Published {postData.date}</h2>
            <div className="divider" />
            <div className="prose text-secondary-content">
              <TinaMarkdown content={postData.body} />
            </div>
            <div className="divider" />
          </div>
        </div>
      </div>
    </main>
  );
};

export const getStaticProps = async ({ params }) => {
  const res = await client.queries.posts({
    relativePath: `${params.filename}.md`,
  });

  return {
    props: {
      tina: res,
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await client.queries.postsConnection();
  const post_routes = postsListData.data.postsConnection.edges.map((post) => ({
    params: {
      // This matches the [filename].tsx file param
      filename: post.node._sys.filename,
    },
  }));
  return {
    paths: post_routes,
    fallback: false,
  };
};

export default BlogPage;
