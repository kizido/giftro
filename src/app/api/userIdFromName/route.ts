import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Gets a user ID from a username
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Session could not be found." });
  }
  const username: string = await request.json();

  try {
    const response = await sql`
      SELECT id FROM users WHERE username = ${username}`;
      console.log(response);
    if (response.rows.length === 0) {
      return NextResponse.json({ error: "User not found." });
    }
    const userId = response.rows[0].id;
    // const responseValue = response.rows;
    return NextResponse.json(userId);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Could not retrieve user ID." });
  }
}
