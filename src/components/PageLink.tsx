import Link from "next/link";
import { ClassNameMixin, LinkedPage } from "@/types";
import { Linkd } from "./Linkd";

type PageLinkBtnProps = {
  parentPage?: LinkedPage;
  page: LinkedPage;
} & ClassNameMixin;

export function PageLink(props: PageLinkBtnProps) {
  const parentFilename = props.parentPage?._sys.filename;
  const pageFilename = props.page._sys.filename;
  const path = [parentFilename, pageFilename].join("/")
  return (
    <Linkd
      title={pageFilename}
      url={path}
      className={props.className}
    />
  );
}
