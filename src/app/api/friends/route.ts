import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Session could not be found." });
  }

  try {
    const response = await sql`
    SELECT u.username AS friend_name
    FROM users u
    JOIN (
        SELECT
            CASE
                WHEN user_id = ${session.id} THEN friend_user_id
                ELSE user_id
            END AS friend_id
        FROM user_friends
        WHERE (user_id = ${session.id} OR friend_user_id = ${session.id})
        AND status = 'accepted'
    ) fr ON u.id = fr.friend_id
    ORDER BY friend_name ASC;`;
    const responseValue = response.rows;
    return NextResponse.json(responseValue);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Friends could not be loaded." });
  }
}
