import { ReactNode, useEffect, useState } from "react";
import {
  Links,
  NavBarConnectionQuery,
  NavBarConnectionQueryVariables,
} from "../../tina/__generated__/types";
import { LinkBtn } from "./LinkBtn";
import client from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";

type NavBarProps = {
  tina: {
    data: NavBarConnectionQuery;
    variables: NavBarConnectionQueryVariables;
    query: string;
  };
};

export function NavBar(props: NavBarProps) {
  const tina = useTina({
    data: props.tina.data,
    query: props.tina.query,
    variables: props.tina.variables,
  });

  const navData = tina.data.navBarConnection.edges![0]?.node;

  return (
    <div className="flex place-content-between w-full z-50 p-4">
      <div className="flex flex-col gap-2">
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
