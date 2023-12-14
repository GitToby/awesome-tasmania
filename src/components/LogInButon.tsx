import { ClassNameMixin } from "@/types";
import { LinkBtn } from "./LinkBtn";
import { useRouter } from "next/router";

type LoginBtnProps = ClassNameMixin;

export function LoginBtn(props: LoginBtnProps) {
  const router = useRouter();
  const path = `/admin/index.html#/~${router.asPath}`;
  return <LinkBtn title="Login" url={path} className={props.className} />;
}
