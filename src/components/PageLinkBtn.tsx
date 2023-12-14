import Link from "next/link";
import { ClassNameMixin, LinkedPage } from "@/types";
import { LinkBtn } from "./LinkBtn";

type PageLinkBtnProps = {
  page: LinkedPage;
} & ClassNameMixin;

export function PageLinkBtn(props: PageLinkBtnProps) {
  const pageFilename = props.page._sys.filename;
  const pagePath = props.page._sys.breadcrumbs.join("/");
  return (
    <LinkBtn
      title={pageFilename}
      url={`/${pagePath}`}
      className={props.className}
    />
  );
}
