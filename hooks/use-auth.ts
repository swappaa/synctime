import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";

export function useAuth() {
  const { data: session, status } = useSession();

  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      if (forceRefreshToken) {
        const response = await fetch("/api/openid/refresh");
        return (await response.json()) as string;
      } else {
        const response = await fetch("/api/openid/token");
        return (await response.json()) as string;
      }
    },
    []
  );

  return useMemo(
    () => ({
      isLoading: status === "loading",
      isAuthenticated: !!session,
      fetchAccessToken,
    }),
    [session, status, fetchAccessToken]
  );
}
