import { LinkBtn } from "./LinkBtn";
import { useTina } from "tinacms/dist/react";
import { useRouter } from "next/router";
import { LinkedPage, SiteQueryResponse } from "@/types";
import { LoginBtn } from "./LogInButon";
import { PageLinkBtn } from "./PageLinkBtn";

type NavBarProps = {
  siteData: SiteQueryResponse;
};

export function NavBar(props: NavBarProps) {
  const tina = useTina({
    data: props.siteData.data,
    query: props.siteData.query,
    variables: props.siteData.variables,
  });

  const navData = tina.data.siteDataConnection.edges![0]?.node;
  const router = useRouter();
  const isRoot = router.asPath === "/";

  return (
    <div className="flex place-content-between w-full z-50 p-4">
      <div className="flex flex-col gap-2">
        <LinkBtn className="btn-accent" title="Home" url="/" />
        {navData.navPages &&
          navData.navPages.map((link, idx) => {
            return (
              <PageLinkBtn
                key={idx}
                page={link.page as LinkedPage}
                className="btn-accent"
              />
            );
          })}
      </div>
      <div className="flex gap-2">
        <LoginBtn className="btn-outline btn-accent" />
      </div>
    </div>
  );
}
