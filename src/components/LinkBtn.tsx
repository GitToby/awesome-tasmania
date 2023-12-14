import { useEffect, useState } from "react";
import { Links } from "../../tina/__generated__/types";
import Link from "next/link";
import { ClassNameMixin } from "@/types";

type LinkBtnProps = {
  title: string;
  url: string;
  newTab?: boolean;
  disabled?: boolean;
} & ClassNameMixin;

export function LinkBtn(props: LinkBtnProps) {
  return (
    <Link
      href={props.url}
      target={props.newTab ? "_blank" : "_self"}
      className={[
        "uppercase btn",
        props.className,
        props.disabled && "btn-disabled",
        props.newTab && "after:content-extern",
      ].join(" ")}
    >
      {props.title}
    </Link>
  );
}
