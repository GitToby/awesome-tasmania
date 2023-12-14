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
    <div className={[font.className, "scroll-smooth"].join(" ")}>
      <DefaultSeo
        title="Home"
        titleTemplate="%s | Next Tina Tailwind"
        description="This is tobys template for the Next Tina Tailwind combo."
        canonical={url}
      />
      <AwaitHydration>
        <Component {...pageProps} />
      </AwaitHydration>
    </div>
  );
}
