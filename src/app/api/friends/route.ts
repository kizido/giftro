import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

type FriendsReqestBody = {
  receiver: string;
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const body: FriendsReqestBody = await request.json();
  const { receiver } = body;

  try {
    await sql`
        INSERT INTO user_friends (User_id, Friend_user_id, Status, Created_at)
        VALUES (${session?.id},
        (SELECT Id FROM users WHERE username = '${receiver}'),
        'requested', CURRENT_TIMESTAMP);`;
  } catch (error) {
    console.log(error);
  }
}
