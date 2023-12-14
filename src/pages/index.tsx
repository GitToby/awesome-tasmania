import { useTina } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";
import {
  HomePageConnectionQuery,
  HomePageConnectionQueryVariables,
  Links,
} from "../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { LandingLayout } from "@/components/LandingLayout";
import { NavData, SocialsData } from "@/types";

type HomePageProps = {
  homeData: {
    data: HomePageConnectionQuery;
    variables: HomePageConnectionQueryVariables;
    query: string;
  };
  navData: NavData;
  socialsData: SocialsData;
};

export default function Page(props: HomePageProps) {
  const homeData = useTina({
    data: props.homeData.data,
    query: props.homeData.query,
    variables: props.homeData.variables,
  });

  const pageData = homeData.data.homePageConnection.edges![0]?.node;

  return (
    <LandingLayout
      navData={props.navData}
      socialsData={props.socialsData}
      page={{
        title: pageData.title,
        description: "blah",
        links: [
          pageData.featuredLink1,
          pageData.featuredLink2,
          pageData.featuredLink3,
          pageData.featuredLink4,
        ] as Links[],
      }}
      image={pageData.image}
    >
      <h1 className="mb-5 text-5xl font-bold uppercase">{pageData.title}</h1>
      <div className="mb-5">
        <TinaMarkdown content={pageData.body} />
      </div>
    </LandingLayout>
  );
}

export const getStaticProps = async (): Promise<{ props: HomePageProps }> => {
  const indexResponse = await client.queries.homePageConnection();
  const navResponse = await client.queries.navBarConnection();
  const socialsResponse = await client.queries.socialsConnection();

  return {
    props: {
      homeData: indexResponse,
      navData: navResponse,
      socialsData: socialsResponse,
    },
  };
};
