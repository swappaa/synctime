import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

import { type TokenSet } from "next-auth";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = (await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })) as {
      refresh_token: string;
    };

    if (token) {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID as string,
          client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
          grant_type: "refresh_token",
          refresh_token: token.refresh_token,
        }),
        method: "POST",
      });

      const tokens = (await response.json()) as TokenSet;

      if (!response.ok) {
        return new NextResponse("Error refreshing id token", { status: 500 });
      }

      return NextResponse.json(tokens.id_token);
    } else {
      return NextResponse.json(null);
    }
  } catch (error) {
    console.log("[GET_REFRESH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
