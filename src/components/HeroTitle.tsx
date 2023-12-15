import { ChildrenMixin } from "@/types";
import { DownArrowSVG } from "./svgs";
import Link from "next/link";
import { useRouter } from "next/router";

type HeroTitleProps = {
  title: string;
  description: string;
  downarrow?: boolean;
} & ChildrenMixin;

export function HeroTitle(props: HeroTitleProps) {
  const router = useRouter();
  return (
    <>
      <div className="divider divider-primary"></div>
      <h1 className="text-5xl font-bold uppercase mb-5 ">{props.title}</h1>
      <div className="prose-invert mb-5">
        <h2>{props.description}</h2>
        <div className="divider divider-primary"></div>
        {props.children}
        {props.downarrow && (
          <Link href="#content">
            <DownArrowSVG className="h-8 w-8 mt-5 mx-auto fill-primary animate-bounce " />
          </Link>
        )}
      </div>
    </>
  );
}
