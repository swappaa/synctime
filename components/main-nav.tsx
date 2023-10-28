"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.accountId}`,
      label: "Time",
      active: pathname === `/${params.accountId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Expenses",
      active: pathname === `/${params.accountId}/billboards`,
    },
    {
      href: `/${params.accountId}/categories`,
      label: "Projects",
      active: pathname === `/${params.accountId}/categories`,
    },
    {
      href: `/${params.accountId}/products`,
      label: "Team",
      active: pathname === `/${params.accountId}/products`,
    },
    {
      href: `/${params.accountId}/products`,
      label: "Manage",
      active: pathname === `/${params.accountId}/products`,
    },
    {
      href: `/${params.accountId}/settings`,
      label: "Settings",
      active: pathname === `/${params.accountId}/settings`,
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-semibold transition-colors hover:text-secondary text-white",
            route.active ? "" : ""
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
