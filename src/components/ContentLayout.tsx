import Image from "next/image";
import { Linkd } from "@/components/Linkd";
import { NavBar } from "@/components/NavBar";
import { FooterBar } from "@/components/FooterBar";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ChildrenMixin, PageImage, SiteDataQueryResponse } from "@/types";

type ContentLayoutProps = {
  siteData: SiteDataQueryResponse;
  page: {
    title: string;
    description: string;
  };
  image?: PageImage;
} & ChildrenMixin;

export function ContentLayout(props:ContentLayoutProps) {
  const router = useRouter();
  const canonical = `something${router.asPath}`;

  const image = props.image
    ? props.image
    : props.siteData.data.siteDataConnection.edges[0].node.fallbackImg;

  return (
    <main>
      <NextSeo title={props.page.title} description={props.page.description} />
      <div className="relative hero min-h-screen w-screen bg-primary-content">
        <Image src={image.url} alt={image.alt} fill objectFit="cover"></Image>
        <div className="hero-overlay bg-opacity-20 flex flex-col justify-between items-center h-full z-10">
          <NavBar siteData={props.siteData} />
          <div className="hero-content text-center text-primary flex flex-col w-[70vw]">
            {props.children}
          </div>
          <FooterBar siteData={props.siteData} image={image} />
        </div>
      </div>
    </main>
  );
}
