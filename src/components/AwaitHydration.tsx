import { ReactNode, useEffect, useState } from "react";

type AwaitHydrationProps = {
  children: ReactNode;
};

export function AwaitHydration({ children }: AwaitHydrationProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <></>;
  }
  return children;
}
