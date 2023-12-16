import Link from "next/link";
import { ClassNameMixin, PageData } from "@/types";
import { Linkd } from "./Linkd";
import { Page } from "../../tina/__generated__/types";

type PageLinkBtnProps = {
  page: Page;
  title?: string;
} & ClassNameMixin;

export function PageLink(props: PageLinkBtnProps) {
  if (!props.page) {
    return null;
  }
  const pageFilename = props.page._sys.filename;
  return (
    <Linkd href={`/${pageFilename}`} className={props.className}>
      {props.title ? props.title : pageFilename}
    </Linkd>
  );
}
