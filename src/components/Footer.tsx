import { useTina } from "tinacms/dist/react";
import { SiteDataQueryResponse } from "@/types";
import { Linkd } from "./Linkd";
import { link } from "fs";

type FooterProps = {
  siteData: SiteDataQueryResponse;
};

export function Footer(props: FooterProps) {
  const tina = useTina({
    data: props.siteData.data,
    query: props.siteData.query,
    variables: props.siteData.variables,
  });

  const siteData = tina.data.siteDataConnection.edges![0]?.node;

  return (
    <footer className="flex flex-col md:flex-row justify-around text-sm gap-6 p-10 bg-neutral text-neutral-content">
      <nav id="contact" className="basis-1/2">
        <header className="footer-title">Links</header>
        {siteData.footerLinks
          ?.filter((link) => link.link)
          .map((link) => (
            <Linkd
              className="btn btn-link btn-xs px-0"
              href={link.link.url}
              externalFlag={link.link.externalFlag}
            >
              {link.link.description}
            </Linkd>
          ))}
      </nav>
      <nav className="basis-1/2">
        <header className="footer-title">Acknowledgement of Country</header>
        <div className="prose-invert">
          <p>
            We acknowledge the Tasmanian Aboriginal people and their enduring
            custodianship of lutruwita (Tasmania).
          </p>
          <br />
          <p>
            We acknowledge the Traditional Owners of the land where we work and
            live. We pay our respects to their Elders, past and emerging. We
            honour their stories, songs, art, and culture, and their aspirations
            for the future of their people and these lands.
          </p>
        </div>
      </nav>
    </footer>
  );
}
