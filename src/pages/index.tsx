import { useTina } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";
import {
  HomePageConnectionQuery,
  HomePageConnectionQueryVariables,
} from "../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from "next/link";

type HomePageProps = {
  tina: {
    data: HomePageConnectionQuery;
    variables: HomePageConnectionQueryVariables;
    query: string;
  };
};

export default function Page(props: HomePageProps) {
  const tina = useTina({
    data: props.tina.data,
    query: props.tina.query,
    variables: props.tina.variables,
  });

  const pageData = tina.data.homePageConnection.edges![0]?.node;

  return (
    <main>
      <div
        className="hero min-h-screen w-screen bg-cover"
        style={{
          backgroundImage: `url(${pageData.image})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{pageData.title}</h1>
            <h1 className="mb-5 text-3xl font-bold">{pageData.subtitle}</h1>
            <p className="mb-5">
              <TinaMarkdown content={pageData.body} />
            </p>
            <div className="flex place-content-center gap-2">
              <Link
                href="http://github.com/GitToby"
                target="_blank"
                className="btn btn-primary"
              >
                Github
              </Link>
              <Link href="/blog" className="btn btn-secondary">
                Blog
              </Link>
              <Link
                href="/admin/index.html"
                className="btn btn-outline btn-ghost"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = async (): Promise<{ props: HomePageProps }> => {
  const indexResponse = await client.queries.homePageConnection();

  return {
    props: {
      tina: indexResponse,
    },
  };
};
