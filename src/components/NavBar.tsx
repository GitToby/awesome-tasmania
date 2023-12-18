import { Linkd } from "./Linkd";

import { PageLink } from "./PageLink";
import { Page } from "../../tina/__generated__/types";
import { Logo } from "@/components/svgs";

type NavButtonsProps = {
  pages: Page[];
};

export function NavButtons(props: NavButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Linkd className="btn btn-primary btn-sm" href="/">
        <Logo className="h-6 w-6 fill-primary-content" />
        Home
      </Linkd>
      {props.pages &&
        props.pages.map((page, idx) => (
          <PageLink key={idx} page={page} className="btn btn-primary btn-sm" />
        ))}
    </div>
  );
}
