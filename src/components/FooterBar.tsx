import { ReactNode, useEffect, useState } from "react";
import {
  Links,
  SocialsConnectionQuery,
  SocialsConnectionQueryVariables,
} from "../../tina/__generated__/types";
import { LinkBtn } from "./LinkBtn";
import client from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import {
  SocialFacebook,
  SocialInstagram,
  SocialTwitter,
  SocialYoutube,
} from "./socials";
import Link from "next/link";

type FooterBarProps = {
  socials: {
    data: SocialsConnectionQuery;
    variables: SocialsConnectionQueryVariables;
    query: string;
  };
};

export function FooterBar(props: FooterBarProps) {
  const tina = useTina({
    data: props.socials.data,
    query: props.socials.query,
    variables: props.socials.variables,
  });

  const socialData = tina.data.socialsConnection.edges![0]?.node;

  return (
    <div className="flex justify-between items-center w-full z-50 p-4 text-accent">
      <span className="h-fit">
        Made by {" "}
        <Link className="link" href="https://tobydevlin.com">Toby Devlin</Link>
      </span>
      <div className="flex gap-2 p-2 rounded-box bg-accent">
        {socialData.facebook && (
          <div className="h-6 w-6 ">
            <SocialFacebook profile={socialData.facebook} />
          </div>
        )}
        {socialData.instagram && (
          <div className="h-6 w-6">
            <SocialInstagram profile={socialData.instagram} />
          </div>
        )}
        {socialData.youtube && (
          <div className="h-6 w-6">
            <SocialYoutube profile={socialData.youtube} />
          </div>
        )}
        {socialData.twitter && (
          <div className="h-6 w-6">
            <SocialTwitter profile={socialData.youtube} />
          </div>
        )}
      </div>
    </div>
  );
}
