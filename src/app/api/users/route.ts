import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query');

  try {
    if (!session) {
      return NextResponse.json({ error: "No session established." });
    }
    if(query === null) {
        return NextResponse.json({ error: "No query provided." });
    }
    const retrievedUsersResult = await sql`
      SELECT * FROM users
      WHERE username ILIKE ${query + "%"}
      AND id != ${session.id}
      LIMIT 10
    `;
    const retrievedUsers = retrievedUsersResult.rows;
    return NextResponse.json({
      retrievedUsers,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Users could not be retrieved.",
    });
  }
}
