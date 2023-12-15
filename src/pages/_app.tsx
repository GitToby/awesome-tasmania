import { AwaitHydration } from "@/components/AwaitHydration";
import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
// pick from https://fonts.google.com/
import { Ruda as Font } from "next/font/google";
import { useRouter } from "next/router";

const font = Font({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const url = `${router.asPath}`;

  return (
    <div className={[font.className].join(" ")}>
      <DefaultSeo
        title="Home"
        titleTemplate="%s | Awesome Tasmania"
        description="Embrace Awesome Tasmania, an island where nature unfolds its grandeur and spirited adventure beckons around every bend. From breathtaking landscapes to thrilling escapades, immerse yourself in a world where awe meets discovery. Experience the extraordinary on this Australian gem that promises endless wonder at every turn."
        canonical={url}
      />
      <AwaitHydration>
        <Component {...pageProps} />
      </AwaitHydration>
    </div>
  );
}
