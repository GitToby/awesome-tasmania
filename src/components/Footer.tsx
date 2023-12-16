import { useTina } from "tinacms/dist/react";
import { SiteDataQueryResponse } from "@/types";
import { Linkd } from "./Linkd";
import { link } from "fs";
import Link from "next/link";
import { SiteData } from "../../tina/__generated__/types";

type FooterProps = {
  siteData: SiteData;
};

export function Footer({ siteData }: FooterProps) {
  return (
    <footer className="flex flex-col md:flex-row justify-around text-sm gap-6 p-10 bg-neutral text-neutral-content">
      <nav id="contact" className="basis-1/2 flex flex-col items-start">
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
        <span className="mt-5">
          Made by{" "}
          <Link className="link" href="https://tobydevlin.com">
            Toby Devlin
          </Link>
        </span>
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
