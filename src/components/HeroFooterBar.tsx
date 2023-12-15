import { useTina } from "tinacms/dist/react";
import {
  CameraApatureSVG,
  SocialFacebook,
  SocialInstagram,
  SocialTwitter,
  SocialYoutube,
} from "./svgs";
import Link from "next/link";
import { PageImage, SiteDataQueryResponse } from "@/types";

type HeroFooterBarProps = {
  siteData: SiteDataQueryResponse;
  image?: PageImage;
};

export function HeroFooterBar(props: HeroFooterBarProps) {
  const tina = useTina({
    data: props.siteData.data,
    query: props.siteData.query,
    variables: props.siteData.variables,
  });

  const socialData = tina.data.siteDataConnection.edges![0]?.node;

  return (
    <div className="flex justify-between items-center w-full z-50 p-4 text-primary">
      <span className="h-fit">
        Made by{" "}
        <Link className="link" href="https://tobydevlin.com">
          Toby Devlin
        </Link>
      </span>
      <div className="flex gap-2 p-2 rounded-box bg-primary">
        {(props.image.tooltip.text || props.image.tooltip.link) && (
          <div className="h-6 w-6">
            <CameraApatureSVG image={props.image} />
          </div>
        )}
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

// Photo by <a href="https://unsplash.com/@lochieriordan?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Lochlainn Riordan</a> on <a href="https://unsplash.com/photos/blue-body-of-water-near-mountain-during-daytime-zU4_tCl7ayQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
