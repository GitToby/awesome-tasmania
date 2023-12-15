import Link from "next/link";
import { ClassNameMixin, PageData } from "@/types";
import { Linkd } from "./Linkd";

type PageLinkBtnProps = {
  parentPage?: PageData;
  page: PageData;
  title?: string;
} & ClassNameMixin;

export function PageLink(props: PageLinkBtnProps) {
  const parentFilename = props.parentPage?._sys.filename;
  const pageFilename = props.page._sys.filename;
  const path = [parentFilename, pageFilename].join("/");
  return (
    <Linkd href={path} className={props.className}>
      {props.title ? props.title : pageFilename}
    </Linkd>
  );
}
