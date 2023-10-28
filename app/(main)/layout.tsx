"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import { Spinner } from "@/components/spinner";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { data: session } = useSession();

  useEffect(() => {
    if ((session as any)?.error === "RefreshAccessTokenError") {
      signIn();
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default MainLayout;
