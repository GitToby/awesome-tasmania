import { Linkd } from "./Linkd";
import { useTina } from "tinacms/dist/react";
import { useRouter } from "next/router";
import { LinkedPage, SiteDataQueryResponse } from "@/types";
import { LoginLink } from "./LogInLink";
import { PageLink } from "./PageLink";

type NavBarProps = {
  siteData: SiteDataQueryResponse;
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
      <div className="grid auto-cols-auto grid-rows-3 grid-flow-col-dense gap-2 w-min">
        <Linkd className="btn-primary" title="Home" url="/" />
        {navData.linkedPages &&
          navData.linkedPages.map((link, idx) => {
            return (
              <PageLink
                key={idx}
                page={link.linkedPage as LinkedPage}
                className="btn btn-primary "
              />
            );
          })}
      </div>
      <div className="flex gap-2">
        <LoginLink className="btn btn-outline btn-primary" />
      </div>
    </div>
  );
}
