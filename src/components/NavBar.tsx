import { LinkBtn } from "./LinkBtn";
import { useTina } from "tinacms/dist/react";
import { useRouter } from "next/router";
import { NavData } from "@/types";

type NavBarProps = {
  navData: NavData;
};

export function NavBar(props: NavBarProps) {
  const tina = useTina({
    data: props.navData.data,
    query: props.navData.query,
    variables: props.navData.variables,
  });

  const navData = tina.data.navBarConnection.edges![0]?.node;
  const router = useRouter();
  const isRoot = router.asPath === "/";

  return (
    <div className="flex place-content-between w-full z-50 p-4">
      <div className="flex flex-col gap-2">
        {!isRoot && (
          <LinkBtn className="btn-outline btn-accent" title="Home" url="/" />
        )}
        {navData.tlLinks &&
          navData.tlLinks.map((link) => (
            <LinkBtn {...link.link} className="btn-outline btn-accent" />
          ))}
      </div>
      <div className="flex gap-2">
        {navData.trLinks &&
          navData.trLinks.map((link) => (
            <LinkBtn {...link.link} className="btn-outline btn-accent" />
          ))}
      </div>
    </div>
  );
}
