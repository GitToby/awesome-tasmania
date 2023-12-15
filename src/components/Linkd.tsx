import Link from "next/link";
import { ChildrenMixin, ClassNameMixin } from "@/types";
import { OpenExternalSVG } from "./svgs";

type LinkBtnProps = {
  href: string;
  externalFlag?: boolean;
} & ClassNameMixin &
  ChildrenMixin;

export function Linkd(props: LinkBtnProps) {
  return (
    <Link
      href={props.href}
      target={props.externalFlag ? "_blank" : "_self"}
      className={["uppercase", props.className].join(" ")}
    >
      {props.children}{" "}
      {props.externalFlag && <OpenExternalSVG className="h-4 w-4" />}
    </Link>
  );
}
