import { ClassNameMixin, PageData } from "@/types";
import { PageLink } from "./PageLink";
import Image from "next/image";
import { Page } from "../../tina/__generated__/types";

type PageCardBtnProps = {
  page: Page;
} & ClassNameMixin;

export function PageCard({ page }: PageCardBtnProps) {
  return (
    <div className="card shadow-xl image-full max-h-max">
      <figure>
        <Image
          className="rounded-box"
          src={page.image.url}
          alt={page.image.alt}
          fill
          objectFit="cover"
        ></Image>
      </figure>
      <div className="card-body place-items-center">
        <div className="divider divider-primary" />
        <h1 className="card-title text-xl capitalize">{page.title}</h1>
        <div className="divider divider-primary" />
        <p className="mb-3">{page.description}</p>
        <PageLink title="More" page={page} className="btn btn-primary" />
      </div>
    </div>
  );
}
