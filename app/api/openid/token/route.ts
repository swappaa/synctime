/* eslint-disable no-console */
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (token) {
      return NextResponse.json(token.id_token);
    } else {
      return NextResponse.json(null);
    }
  } catch (error) {
    console.log("[GET_TOKEN]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
