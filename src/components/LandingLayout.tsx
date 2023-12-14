import Image from "next/image";
import { Linkd } from "@/components/Linkd";
import { NavBar } from "@/components/NavBar";
import { FooterBar } from "@/components/FooterBar";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ChildrenMixin, PageImage, SiteQueryResponse } from "@/types";

type LandinglayoutProps = {
  siteData: SiteQueryResponse;
  page: {
    title: string;
    description: string;
  };
  image: PageImage;
} & ChildrenMixin;

export function LandingLayout(props: LandinglayoutProps) {
  const router = useRouter();
  const canonical = `something${router.asPath}`;
  return (
    <main>
      <NextSeo title={props.page.title} description={props.page.description} />
      <div className="relative hero min-h-screen w-screen bg-accent-content">
        <Image
          src={props.image.url}
          alt={props.image.alt}
          fill
          objectFit="cover"
        ></Image>
        <div className="hero-overlay bg-opacity-20 flex flex-col justify-between items-center h-full z-10">
          <NavBar siteData={props.siteData} />
          <div className="hero-content text-center text-accent flex flex-col">
            {props.children}
          </div>
          <FooterBar siteData={props.siteData} image={props.image} />
        </div>
      </div>
    </main>
  );
}
