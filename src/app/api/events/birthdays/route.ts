import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "There is no current session." });
  }

  try {
    // Get the user ids of all friends
    const responseFriends = await sql`
    SELECT
        CASE
            WHEN user_id = ${session.id} THEN friend_user_id
            ELSE user_id
        END AS friend_id
    FROM user_friends
    WHERE ${session.id} IN (user_id, friend_user_id);`;
    const friendIds = responseFriends.rows.map(
      (friendRow) => friendRow.friend_id
    );

    // const responseBirthdayEvents = await sql`
    // SELECT username, birthday
    // FROM users
    // WHERE id = ANY(${sql.array(friend_ids, "int4")});
    // `;

    return NextResponse.json(friendIds);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Friends could not be loaded." });
  }
}
