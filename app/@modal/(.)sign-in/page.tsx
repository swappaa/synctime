"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import UserAuth from "@/components/user-auth";
import { Icons } from "@/components/icons";

const SigninPage = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-50">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white w-full h-fit p-10 md:p-14 rounded-lg shadow-lg">
          <div className="absolute top-4 right-4">
            <X
              onClick={() => router.back()}
              aria-label="close modal"
              className="h-4 w-4 cursor-pointer hover:opacity-75"
            />
          </div>
          <div className="flex flex-col space-y-6">
            <Icons.logo className="h-6 w-6 hidden" />
            <h4 className="text-base sm:text-xl md:text-2xl font-medium">
              Sign in to unlock the best of Shopify Schema generator
            </h4>
          </div>
          <UserAuth className="mt-10" />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
