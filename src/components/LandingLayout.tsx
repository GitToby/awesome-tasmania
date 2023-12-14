import Image from "next/image";
import { LinkBtn } from "@/components/LinkBtn";
import { NavBar } from "@/components/NavBar";
import { FooterBar } from "@/components/FooterBar";
import { ReactNode } from "react";
import {
  Links,
  NavBarConnectionQuery,
  NavBarConnectionQueryVariables,
  SocialsConnectionQuery,
  SocialsConnectionQueryVariables,
} from "../../tina/__generated__/types";
import { link } from "fs";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ChildrenMixin } from "@/types";

type LandinglayoutProps = {
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
  page: {
    title: string;
    description: string;
    links: Links[];
  };
  image: {
    url: string;
    alt?: string;
    tooltip?: string;
  };
} & ChildrenMixin;

export function LandingLayout(props: LandinglayoutProps) {
  const router = useRouter();
  const canonical = `something${router.asPath}`;
  return (
    <main>
      <NextSeo title={props.page.title} description={props.page.description} />
      <div className="hero min-h-screen w-screen bg-accent-content">
        <Image
          src={props.image.url}
          alt={props.image.alt}
          fill
          objectFit="cover"
        ></Image>
        <div className="hero-overlay bg-opacity-20 flex flex-col justify-between items-center h-full z-10">
          <NavBar navData={props.navData} />
          <div className="hero-content text-center text-accent flex flex-col">
            {props.children}
            {props.page.links && (
              <div className="flex flex-wrap place-content-center gap-2">
                {props.page.links
                  // only  valid enabled links
                  .filter((link) => link && !link.disabled)
                  .map((link) => (
                    <LinkBtn
                      {...link}
                      className="basis-1/3 btn-accent  btn-outline"
                    />
                  ))}
              </div>
            )}
          </div>
          <FooterBar socials={props.socialsData} />
        </div>
      </div>
    </main>
  );
}
