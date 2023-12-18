import { MetadataRoute } from "next";
import client from "../../tina/__generated__/client";
import { BASE_URL } from "@/app/const";

const changeFreq = "yearly";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await client.queries.pageConnection();

  const smE = [];

  let edges = pages.data.pageConnection.edges;
  const extraPages = edges
    ? edges.map((edge) => {
        return {
          url: `${BASE_URL}${edge}`,
          lastModified: new Date(),
          changeFrequency: "yearly" as
            | "always"
            | "hourly"
            | "daily"
            | "weekly"
            | "monthly"
            | "yearly"
            | "never",
          priority: 1,
        };
      })
    : [];
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...extraPages,
  ];
}
