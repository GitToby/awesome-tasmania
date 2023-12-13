import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import {
  BlogPageConnectionQuery,
  BlogPageConnectionQueryVariables,
  PostConnectionQuery,
  PostConnectionQueryVariables,
} from "../../../tina/__generated__/types";
import Link from "next/link";

type BlogPageProps = {
  tina: {
    data: BlogPageConnectionQuery;
    variables: BlogPageConnectionQueryVariables;
    query: string;
  };
  postsData: {
    data: PostConnectionQuery;
    variables: PostConnectionQueryVariables;
    query: string;
  };
};

export default function Page(props: BlogPageProps) {
  const tina = useTina({
    data: props.tina.data,
    query: props.tina.query,
    variables: props.tina.variables,
  });
  const postsData = useTina({
    data: props.postsData.data,
    query: props.postsData.query,
    variables: props.postsData.variables,
  });

  const pageData = tina.data.blogPageConnection.edges[0]?.node;
  const posts = postsData.data.postConnection.edges;

  return (
    <main>
      <div className="hero min-h-screen bg-primary">
        <div className="hero-content text-center text-primary-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{pageData.title}</h1>
            <h1 className="mb-5 text-3xl font-bold">{pageData.subtitle}</h1>
            <p className="mb-5">
              <TinaMarkdown content={pageData.body} />
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/" className="btn btn-secondary">
                &larr; Back Home
              </Link>

              {posts.map((post, idx) => (
                <div key={idx} className="btn">
                  {idx} -{" "}
                  <Link href={`/blog/${post.node._sys.filename}`}>
                    {post.node.title} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = async (): Promise<{ props: BlogPageProps }> => {
  const indexResponse = await client.queries.blogPageConnection();
  const postsResponse = await client.queries.postConnection();
  postsResponse.data.postConnection.edges =
    postsResponse.data.postConnection.edges
      // include only published posts
      .filter((post) => post.node.publish)
      // sort in descending order, doing this in the graphql is a pain.
      .sort((p1, p2) => {
        return p1.node.date > p2.node.date ? -1 : 1;
      })
      // lighten post data for this page
      .map((post) => {
        post.node.body = null;
        return post;
      });

  return {
    props: {
      tina: indexResponse,
      postsData: postsResponse,
    },
  };
};
