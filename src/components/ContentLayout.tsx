import { HeroFooterBar } from "@/components/HeroFooterBar";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ChildrenMixin, PageData, SiteDataQueryResponse } from "@/types";
import { Hero } from "./Hero";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { HeroTitle } from "./HeroTitle";
import { Footer } from "./Footer";
type ContentLayoutProps = {
  siteData: SiteDataQueryResponse;
  pageData: PageData;
  downarrow?: boolean;
  bodyInHeader?: boolean;
} & ChildrenMixin;

export function ContentLayout(props: ContentLayoutProps) {
  const router = useRouter();
  const canonical = `something${router.asPath}`;

  const image = props.pageData.image
    ? props.pageData.image
    : props.siteData.data.siteDataConnection.edges[0].node.fallbackImg;

  return (
    <main>
      <NextSeo
        title={props.pageData.title}
        description={props.pageData.description}
      />
      <Hero siteData={props.siteData} pageData={props.pageData}>
        <HeroTitle
          title={props.pageData.title}
          description={props.pageData.description}
          downarrow={props.downarrow}
        >
          {props.bodyInHeader && <TinaMarkdown content={props.pageData.body} />}
        </HeroTitle>
      </Hero>
      <div id="content" className="flex flex-col items-center bg-base-100 text-base-content shadow-xl">{props.children}</div>
      <Footer siteData={props.siteData} />
    </main>
  );
}
