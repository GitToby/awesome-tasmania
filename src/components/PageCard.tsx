import { ClassNameMixin, PageData } from "@/types";
import { PageLink } from "./PageLink";
import Image from "next/image";

type PageCardBtnProps = {
  page: PageData;
  parentPage?: PageData;
} & ClassNameMixin;

export function PageCard({ page, parentPage }: PageCardBtnProps) {
  return (
    <div className="card shadow-xl image-full max-h-max">
      <figure>
        <Image
          src={page.image.url}
          alt={page.image.alt}
          fill
          objectFit="cover"
        ></Image>

        {/* <img src={page.image.url} alt={page.image.alt} /> */}
      </figure>
      <div className="card-body place-items-center">
        <div className="divider divider-primary" />
        <h1 className="card-title text-xl capitalize">{page.title}</h1>
        <div className="divider divider-primary" />
        <p className="mb-3">{page.description}</p>
        <PageLink title="More" parentPage={parentPage} page={page} className="btn btn-primary" />
      </div>
    </div>
  );
}
