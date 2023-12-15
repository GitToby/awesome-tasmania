import { ClassNameMixin } from "@/types";
import { Linkd } from "./Linkd";
import { useRouter } from "next/router";

type LoginBtnProps = ClassNameMixin;

export function LoginLink(props: LoginBtnProps) {
  const router = useRouter();
  const path = `/admin/index.html#/~${router.asPath}`;
  return (
    <Linkd href={path} className={props.className}>
      Login
    </Linkd>
  );
}
