import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

import UserAuth from "@/components/user-auth";
import { Icons } from "@/components/icons";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) return redirect("/time");

  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>

        <div className="flex flex-col space-y-6">
          <Icons.logo className="h-6 w-6 hidden" />
          <h4 className="text-base sm:text-xl md:text-2xl font-medium">
            Sign in to unlock the best of Shopify Schema generator
          </h4>
        </div>
        <UserAuth className="mt-10" />
      </div>
    </div>
  );
}
