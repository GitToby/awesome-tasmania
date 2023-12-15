import Link from "next/link";
import { ClassNameMixin } from "@/types";

type LinkBtnProps = {
  title: string;
  url: string;
  newTab?: boolean;
  disabled?: boolean;
} & ClassNameMixin;

export function Linkd(props: LinkBtnProps) {
  return (
    <Link
      href={props.url}
      target={props.newTab ? "_blank" : "_self"}
      className={[
        "uppercase",
        props.className,
        props.disabled && "btn-disabled",
        props.newTab && "after:content-extern",
      ].join(" ")}
    >
      {props.title}
    </Link>
  );
}
