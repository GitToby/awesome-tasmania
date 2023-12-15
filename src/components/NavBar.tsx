import { Linkd } from "./Linkd";
import { useTina } from "tinacms/dist/react";
import { PageData, SiteDataQueryResponse } from "@/types";

import { PageLink } from "./PageLink";

type NavButtonsProps = {
  siteData: SiteDataQueryResponse;
};

export function NavButtons(props: NavButtonsProps) {
  const tina = useTina({
    data: props.siteData.data,
    query: props.siteData.query,
    variables: props.siteData.variables,
  });

  const navData = tina.data.siteDataConnection.edges![0]?.node;

  return (
    <div className="flex flex-wrap gap-2">
      <Linkd className="btn btn-primary btn-sm" href="/">
        Home
      </Linkd>
      {navData.linkedPages &&
        navData.linkedPages.map((link, idx) => {
          return (
            <PageLink
              key={idx}
              page={link.linkedPage as PageData}
              className="btn btn-primary btn-sm"
            />
          );
        })}
    </div>
  );
}
