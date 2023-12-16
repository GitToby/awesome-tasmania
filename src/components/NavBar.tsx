import { Linkd } from "./Linkd";

import { PageLink } from "./PageLink";
import { Page } from "../../tina/__generated__/types";

type NavButtonsProps = {
  pages: Page[];
};

export function NavButtons(props: NavButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Linkd className="btn btn-primary btn-sm" href="/">
        Home
      </Linkd>
      {props.pages &&
        props.pages.map((page, idx) => (
          <PageLink key={idx} page={page} className="btn btn-primary btn-sm" />
        ))}
    </div>
  );
}
