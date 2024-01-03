import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ChildrenMixin, PageData, SiteDataQueryResponse } from "@/types";
import { Hero } from "./Hero";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { HeroTitle } from "./HeroTitle";
import { Footer } from "./Footer";
import { SiteData } from "../../tina/__generated__/types";
import { useTina } from "tinacms/dist/react";

type ContentLayoutProps = {
  siteData: SiteDataQueryResponse;
  pageData: PageData;
  downArrow?: boolean;
  bodyInHeader?: boolean;
  plaiceholderBase64?: string | null;
} & ChildrenMixin;

export function ContentLayout(props: ContentLayoutProps) {
  const router = useRouter();
  const canonical = `something${router.asPath}`;

  const _siteData = useTina({
    data: props.siteData.data,
    query: props.siteData.query,
    variables: props.siteData.variables,
  });
  let edges = _siteData.data.siteDataConnection.edges;
  let siteData: SiteData | undefined = undefined;
  if (edges) {
    siteData = edges[0]?.node as SiteData;
  }

  return (
    <main>
      <NextSeo
        title={props.pageData.title}
        description={props.pageData.description}
        openGraph={{
          images: [
            {
              url: props.pageData.image.srcURL,
              alt: props.pageData.image.altText,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <Hero
        siteData={siteData as SiteData}
        pageData={props.pageData}
        plaiceholderBase64={props.plaiceholderBase64}
      >
        <HeroTitle
          title={props.pageData.title}
          description={props.pageData.description}
          downarrow={props.downArrow}
        >
          {props.bodyInHeader && <TinaMarkdown content={props.pageData.body} />}
        </HeroTitle>
      </Hero>
      <div
        id="content"
        className="flex flex-col items-center bg-base-100 text-base-content shadow-xl"
      >
        {props.children}
      </div>
      <Footer siteData={siteData as SiteData} />
    </main>
  );
}
