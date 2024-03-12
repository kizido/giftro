import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

type FriendsReqestBody = {
  receiver: string;
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const body: FriendsReqestBody = await request.json();
  const { receiver } = body;

  try {
    await sql`
  INSERT INTO user_friends (user_id, friend_user_id, status, created_at)
  VALUES (${session?.id},
    (SELECT Id FROM users WHERE username = ${receiver}),
    'pending', CURRENT_TIMESTAMP);`;
    return NextResponse.json({ message: "Friend successfully added." });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Friend request failed." });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  try {
    const result = await sql`
    SELECT users.*
    FROM users
    JOIN user_friends ON users.id = user_friends.user_id
    WHERE user_friends.friend_user_id = ${session?.id};`;
    const requests = result.rows;
    return NextResponse.json({ requests });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Friend requests could not be queried.",
    });
  }
}
