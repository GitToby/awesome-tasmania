import {
  CameraApatureSVG,
  SocialFacebook,
  SocialInstagram,
  SocialTwitter,
  SocialYoutube,
} from "./svgs";
import { Image } from "@/types";
import { SiteData } from "../../tina/__generated__/types";

type HeroFooterBarProps = {
  siteData: SiteData;
  image?: Image;
};

export function HeroFooterBar({ siteData, image }: HeroFooterBarProps) {
  return (
    <div className="flex justify-end items-center w-full z-50 p-4 text-primary">
      <div className="flex gap-2 p-2 rounded-box bg-primary">
        {(image?.tooltip || image?.alt) && (
          <div className="h-6 w-6">
            <CameraApatureSVG image={image} />
          </div>
        )}
        {siteData.facebook && (
          <div className="h-6 w-6 ">
            <SocialFacebook profile={siteData.facebook} />
          </div>
        )}
        {siteData.instagram && (
          <div className="h-6 w-6">
            <SocialInstagram profile={siteData.instagram} />
          </div>
        )}
        {siteData.youtube && (
          <div className="h-6 w-6">
            <SocialYoutube profile={siteData.youtube} />
          </div>
        )}
        {siteData.twitter && (
          <div className="h-6 w-6">
            <SocialTwitter profile={siteData.youtube} />
          </div>
        )}
      </div>
    </div>
  );
}

// Photo by <a href="https://unsplash.com/@lochieriordan?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Lochlainn Riordan</a> on <a href="https://unsplash.com/photos/blue-body-of-water-near-mountain-during-daytime-zU4_tCl7ayQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
