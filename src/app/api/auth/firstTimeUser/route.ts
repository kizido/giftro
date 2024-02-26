import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!!session) {
    const response = await sql`
    SELECT * FROM users WHERE email=${session?.user?.email}`;
    const user = response.rows[0];
    return NextResponse.json(user.is_first_time_user);
  }
  return NextResponse.json(
    "Can't determine first time user. No session available."
  );
}
