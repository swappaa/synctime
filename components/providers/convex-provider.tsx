"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { useAuth } from "@/hooks/use-auth";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// do not cache this layout
export const revalidate = 0;

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ConvexProviderWithAuth client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithAuth>
    </SessionProvider>
  );
};
