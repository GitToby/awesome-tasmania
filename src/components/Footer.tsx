import { Linkd } from "./Linkd";
import Link from "next/link";
import { SiteData } from "../../tina/__generated__/types";
import { useRouter } from "next/router";

type FooterProps = {
  siteData: SiteData;
};

export function Footer({ siteData }: FooterProps) {
  const router = useRouter();
  const submitted = router.query.submitted ? router.query.submitted : null;
  return (
    <footer className="flex flex-col md:flex-row justify-around text-sm gap-6 p-10 bg-neutral text-neutral-content">
      <nav className="basis-1/3 grow">
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
      <nav id="contact" className="flex-auto flex flex-col items-start">
        <header className="footer-title">Contact</header>
        <form
          name="contact"
          method="POST"
          action="/?submitted=1"
          className="flex flex-col gap-3 w-full"
          // @ts-ignore
          netlify
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full input-xs bg-neutral border-neutral-content"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full input-xs bg-neutral border-neutral-content"
          />
          <input type="hidden" name="_gotcha" className="hidden" />
          <textarea
            name="content"
            className="textarea textarea-bordered w-full textarea-xs bg-neutral border-neutral-content"
            placeholder="Message"
          />
          {submitted && <p>Thanks for your message! You will have an email.</p>}
          <button type="submit" className="btn btn-xs btn-neutral-content">
            Send
          </button>
        </form>
      </nav>

      <nav id="links" className="basis-1/4 flex flex-col items-start">
        <header className="footer-title">Links</header>
        {siteData.footerLinks
          ?.filter((link) => link && link.link)
          .map((link) => (
            <Linkd
              className="btn btn-link btn-xs px-0"
              // @ts-ignore
              href={link.link.url}
              // @ts-ignore
              externalFlag={link.link.externalFlag}
            >
              {/* @ts-ignore*/}
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
    </footer>
  );
}
