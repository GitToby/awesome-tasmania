import Image from "next/image";
import { NavButtons } from "@/components/NavBar";
import { useRouter } from "next/router";
import { ChildrenMixin, PageData, SiteDataQueryResponse } from "@/types";
import { LoginLink } from "./LogInLink";
import { HeroFooterBar } from "./HeroFooterBar";

type Hero = {
  siteData: SiteDataQueryResponse;
  pageData: PageData;
} & ChildrenMixin;

export function Hero(props: Hero) {
  const router = useRouter();
  const canonical = `something${router.asPath}`;

  const image = props.pageData.image
    ? props.pageData.image
    : props.siteData.data.siteDataConnection.edges[0].node.fallbackImg;

  return (
    <div className="relative hero min-h-screen bg-primary-content shadow-xl">
      <Image src={image.url} alt={image.alt} fill objectFit="cover"></Image>
      <div className="hero-overlay bg-opacity-20 z-10 p-4 ">
        <div className="flex flex-col justify-between items-center gap-4 h-full">
          <div className="flex justify-between w-full gap-2">
            <NavButtons siteData={props.siteData} />
            <LoginLink className="md:order-1 btn btn-outline btn-sm btn-primary" />
          </div>
          <div className="hero-content text-center text-primary flex flex-col max-w-[80vw]">
            {props.children}
          </div>
          <HeroFooterBar siteData={props.siteData} image={image} />
        </div>
      </div>
    </div>
  );
}
