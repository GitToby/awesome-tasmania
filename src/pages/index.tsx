import { useTina } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";
import {
  HomePageConnectionQuery,
  HomePageConnectionQueryVariables,
  NavBarConnectionQuery,
  NavBarConnectionQueryVariables,
  SocialsConnectionQuery,
  SocialsConnectionQueryVariables,
} from "../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import { LinkBtn } from "@/components/LinkBtn";
import { NavBar } from "@/components/NavBar";
import { FooterBar } from "@/components/FooterBar";

type HomePageProps = {
  homeData: {
    data: HomePageConnectionQuery;
    variables: HomePageConnectionQueryVariables;
    query: string;
  };
  navData: {
    data: NavBarConnectionQuery;
    variables: NavBarConnectionQueryVariables;
    query: string;
  };
  socialsData: {
    data: SocialsConnectionQuery;
    variables: SocialsConnectionQueryVariables;
    query: string;
  };
};

export default function Page(props: HomePageProps) {
  const tina = useTina({
    data: props.homeData.data,
    query: props.homeData.query,
    variables: props.homeData.variables,
  });

  const pageData = tina.data.homePageConnection.edges![0]?.node;

  return (
    <main>
      <div className="hero min-h-screen w-screen">
        <Image
          src={pageData.image}
          alt="image for home page"
          fill
          objectFit="cover"
        ></Image>
        <div className="hero-overlay bg-opacity-20 flex flex-col justify-between items-center h-full z-10">
          <NavBar tina={props.navData} />
          <div className="hero-content text-center text-accent flex flex-col">
            <h1 className="mb-5 text-5xl font-bold uppercase">
              {pageData.title}
            </h1>
            <div className="mb-5">
              <TinaMarkdown content={pageData.body} />
            </div>
            <div className="flex flex-wrap place-content-center gap-2">
              {pageData.featuredLink1 && (
                <LinkBtn
                  {...pageData.featuredLink1}
                  className="basis-1/3 btn-accent  btn-outline"
                />
              )}
              {pageData.featuredLink2 && (
                <LinkBtn
                  {...pageData.featuredLink2}
                  className="basis-1/3 btn-accent btn-outline"
                />
              )}
              {pageData.featuredLink3 && (
                <LinkBtn
                  {...pageData.featuredLink3}
                  className="basis-1/3 btn-accent btn-outline"
                />
              )}
              {pageData.featuredLink4 && (
                <LinkBtn
                  {...pageData.featuredLink4}
                  className="basis-1/3 btn-accent btn-outline"
                />
              )}
            </div>
          </div>
          <FooterBar socials={props.socialsData} />
        </div>
      </div>
    </main>
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
