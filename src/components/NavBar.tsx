import { Linkd } from "./Linkd";
import { useTina } from "tinacms/dist/react";
import { useRouter } from "next/router";
import { LinkedPage, SiteQueryResponse } from "@/types";
import { LoginLink } from "./LogInLink";
import { PageLink } from "./PageLink";

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
      <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
        <Linkd className="btn-accent" title="Home" url="/" />
        {navData.navPages &&
          navData.navPages.map((link, idx) => {
            return (
              <PageLink
                key={idx}
                page={link.page as LinkedPage}
                className="btn btn-accent"
              />
            );
          })}
      </div>
      <div className="flex gap-2">
        <LoginLink className="btn btn-outline btn-accent" />
      </div>
    </div>
  );
}
